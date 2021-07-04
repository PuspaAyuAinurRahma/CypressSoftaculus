<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/21/18
 * Time: 9:40 PM
 */

namespace BeonOrder\Libs\Logger;

class Base
{

    protected $url;
    protected $client;

    protected function send($title, $tag, $message, $level = Logger::LEVEL_ERROR , $type = 'text'){
        try{
            $params = [
                'action' => 'log',
                'title' => $title,
                'tag' => $tag,
                'message' => $message,
                'level' => $level,
                'type' => $type,
                'client' => $this->client,
            ];

            $fields_string = http_build_query($params);
            $ch = curl_init();
            curl_setopt($ch,CURLOPT_URL, $this->url);
            curl_setopt($ch,CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);

            $response = curl_exec($ch);
            $result = json_decode($response, 1);
            if(json_last_error())
                throw new \Exception('Error parse data: '. $response);
            if($result['status'] != 1)
                throw new \Exception($result['message'], $result['status']);


            return $result;
        }catch (\Exception $e){
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

}