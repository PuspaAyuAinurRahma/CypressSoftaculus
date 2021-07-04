<?php
namespace BeonOrder\Libs\Wizcrm\BackgroundJob\RabbitMq;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMq
{
    protected $connection;
    public function __construct($HOST,$PORT,$USER,$PASS)
    {
        $this->connection   = new AMQPStreamConnection($HOST, $PORT, $USER, $PASS);
    }

    public function info($text){
        echo '*** ['.date("Y-m-d H:i:s").']Message : '.$text."\n";
    }

    public function SendingJob($queue,$class,$function,$loop,$data){
        $channel = $this->connection->channel();
        $channel->queue_declare(
            $queue,
            $passive = false,
            $durable = true,
            $exclusive = false,
            $auto_delete = false,
            $nowait = false,
            $arguments = null,
            $ticket = null
        );

        $param  = [
            'class'     =>$class,
            'function'  =>$function,
            'loop'      =>$loop,
            'data'      =>$data
        ];
        $param  = json_encode($param);
        $msg = new AMQPMessage($param,[
            'delivery_mode'=>AMQPMessage::DELIVERY_MODE_PERSISTENT
        ]);
        $channel->basic_publish($msg, '', $queue);
        $channel->close();
        $this->connection->close();
    }

    public function MultiSendingJob($queue,$data){
        $channel = $this->connection->channel();
        $channel->queue_declare(
            $queue,
            $passive = false,
            $durable = true,
            $exclusive = false,
            $auto_delete = false,
            $nowait = false,
            $arguments = null,
            $ticket = null
        );
        foreach($data as $key => $value){
            $param  = [
                'class'     =>$value['class'],
                'function'  =>$value['function'],
                'loop'      =>$value['loop'],
                'data'      =>$value['data']
            ];
            $param  = json_encode($param);
            $msg = new AMQPMessage($param,[
                'delivery_mode'=>AMQPMessage::DELIVERY_MODE_PERSISTENT
            ]);
            $channel->basic_publish($msg, '', $queue);
        }
        $channel->close();
        $this->connection->close();
    }

    public function ListenJob($queue, $is_wait = 0, $wait_until = 10, $log_to_whmcs = 0){
        $channel = $this->connection->channel();
        $channel->queue_declare(
            $queue,
            $passive = false,
            $durable = true,
            $exclusive = false,
            $auto_delete = false,
            $nowait = false,
            $arguments = null,
            $ticket = null
        );
        $this->info('LISTENING ON QUEUE : '.$queue. "\n");
        $callback = function($msg) use($queue,$channel,$is_wait,$wait_until,$log_to_whmcs){
            $data   = json_decode($msg->body,1);
            $is_valid   = 1;
            if(!array_key_exists('class',$data)) {
                $is_valid   = 0;
                $this->info('Class Not Found');
            }
            if(!array_key_exists('function',$data)) {
                $is_valid   = 0;
                $this->info('Function Not Found');
            }
            if(!array_key_exists('loop',$data)) $data['loop']   = 0;
            if(!array_key_exists('data',$data)) $data['data']   = [];
            $strClass   = $data['class'];
            $strFunc    = $data['function'];
            $loop       = $data['loop'];
            $param      = $data['data'];

            $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
            if($loop>9) {
                $status = -1;
                if(key_exists('status', $data))
                    $status = $data['status'];
                if($status === 0){
                    $param  = [
                        'class'     =>$strClass,
                        'function'  =>$strFunc,
                        'loop'      =>0,
                        'data'      =>$data['data'],
                    ];
                    if(!empty($is_wait)){
                        if(!key_exists('wait_count', $data))
                            $param['wait_count'] = 0;
                        else
                            $param['wait_count'] = $data['wait_count'] + 1;
                        //More wait
                        if($data['wait_count'] >= $wait_until){
                            $param['wait_count'] = 0;
                            if(!key_exists('more_wait_count', $data))
                                $param['more_wait_count'] = 0;
                            else
                                $param['more_wait_count'] = $data['more_wait_count'] + 1;
                        }
                    }
                    $param  = json_encode($param);
                    if(!empty($log_to_whmcs)){
                        $this->info("Log to whmcs enabled");
                        if(function_exists("logActivity")){
                            logActivity('BeonAutoWordpress', $queue, $param, '', '', '');
                            $this->info("Logged to whmcs module log");
                        }
                    }
                    $msg = new AMQPMessage($param,[
                        'delivery_mode'=>AMQPMessage::DELIVERY_MODE_PERSISTENT
                    ]);
                    if(!empty($is_wait) && (int)$data['wait_count'] < $wait_until){
                        $channel->basic_publish($msg, '', "{$queue}-wait");
                        $this->info("Still on wait {$data['wait_count']} until {$wait_until} times, Moving to failed queue {$queue}-wait");
                    }else{
                        if(!empty($is_wait) && (int)$data['more_wait_count'] < 3){
                            $channel->basic_publish($msg, '', "{$queue}-more-wait");
                            $this->info("Still on more-wait {$data['more_wait_count']} until 3 times, Moving to failed queue {$queue}-more-wait");
                        }else{
                            $channel->basic_publish($msg, '', "{$queue}-failed");
                            $this->info("Moving to failed queue {$queue}-failed");
                        }
                    }
                }
                $is_valid = 0;
                $this->info('Reach Limit Execution');
            }
            if($is_valid==1){
                try{
                    $this->info("CLASS : ".$data['class']);
                    $this->info("FUNCTION : ".$data['function']);
                    $this->info("LOOP : ".$data['loop']);
                    $this->info("DATA : ".json_encode($data['data']));

                    $Class  = new $strClass();
                    $result = $Class->$strFunc($param);

                    if($result['status']!=1){
                        $this->info('Process Failed');
                        throw new \Exception($result['message'], $result['status']);
                    }
                    $this->info('Process Success');
                }catch (\Exception $e){
                    $this->info("Error Raise : ".$e->getMessage());
                    $this->info('Trying to Re-Register Job');

                    switch ($e->getCode()){
                        case 0:
                            $loop = $loop+1;
                            break;
                        case 2:
                            $loop = 10;
                            break;
                        default:
                            $loop = $loop+1;
                            break;
                    }

                    $param  = [
                        'class'     =>$strClass,
                        'function'  =>$strFunc,
                        'loop'      =>$loop,
                        'data'      =>$data['data'],
                        'status'    =>$e->getCode(),
                    ];

                    if(!empty($is_wait)){
                        if(!key_exists('wait_count', $data))
                            $param['wait_count'] = 0;
                        else
                            $param['wait_count'] = $data['wait_count'];
                        //More wait
                        if(!key_exists('more_wait_count', $data))
                            $param['more_wait_count'] = 0;
                        else
                            $param['more_wait_count'] = $data['more_wait_count'];
                    }
                    $param  = json_encode($param);
                    $msg = new AMQPMessage($param,[
                        'delivery_mode'=>AMQPMessage::DELIVERY_MODE_PERSISTENT
                    ]);
                    $channel->basic_publish($msg, '', $queue);
                }
            }
        };
        $channel->basic_qos(null, 1, null);
        $channel->basic_consume(
            $queue,
            $consumer_tag = '',
            $no_local = false,
            $no_ack = false,
            $exclusive = false,
            $nowait = false,
            $callback
        );
        while(count($channel->callbacks)) {
            $channel->wait();
        }
        $channel->close();
        $this->connection->close();
    }
}