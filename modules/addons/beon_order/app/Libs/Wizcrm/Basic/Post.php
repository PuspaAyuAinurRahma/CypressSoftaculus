<?php
namespace BeonOrder\Libs\Wizcrm\Basic;

use Psr\Http\Message\ResponseInterface;

class Post extends One
{
    /**
     * @var ResponseInterface
     */
    public $response;

    /**
     * @var \GuzzleHttp\Client
     */
    public $client;

    public function one($url, $postfields)
    {
        $this->response = $this->client->post($url, [
            'form_params' => $postfields
        ]);
        return $this;
    }


    public function isOk()
    {
        return $this->response->getStatusCode() == 200;
    }

    public function asRaw($res = null)
    {
        if($res == null){
            return (string)$this->response->getBody();
        }else{
            return (string)$res->getBody();
        }

    }

    public function asArray($res = null)
    {
        if($res == null){
            $data = (string)$this->response->getBody();
            return @json_decode($data, true);
        }else{
            $data = (string)$res->getBody();
            return @json_decode($data, true);
        }

    }

    /**
     * Post constructor.
     */
    public function __construct()
    {
        $this->client = new \GuzzleHttp\Client();
    }

    public $multi;

    /**
     *
     * contoh param config
     *
     * ```
    $config = [
    'key' => [
    'url',
    [
    'action'=>'add-user',
    'param1'=>'test',
    ]
    ]
    ];
     * ```
     *
     * @param $config
     * @return mixed
     */
    public function multi($config)
    {
        $promise = [];
        foreach ($config as $key => $item) {
            $promise[$key] = $this->client->postAsync(
                $item[0], [
                    'form_params' => $item[1]
                ]
            );
        }
        return \GuzzleHttp\Promise\settle($promise)->wait();
    }

}