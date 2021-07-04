<?php

namespace BeonOrder\Libs\AutoTools;

use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Libs\Security\Encryption\Jwt;
use GuzzleHttp\Client as Guzzle;
use GuzzleHttp\Exception\RequestException;

class Base
{
    protected $client;
    protected $service_id;
    protected $currentBaseUri = 'http://api-tools.beon.co.id/tools/';
    protected $token;
    protected $path;

    public function __construct($service_id, $uri)
    {
        $this->service_id = $service_id;
        $this->client = new Guzzle([
            'base_url' => $this->currentBaseUri,
        ]);
        $this->token = $this->generateToken();
        $this->path = $uri;

        if($service_id == 0){
            $this->token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.Ikpvam9CYSNNZW1iZXJhcmVhJEpheWElU2VsYWx1XjEyMyI.CMGAzdGIvPtXJV5r7cFfZZ-8fKFqOC5uRsCsFBb2Owl-BHnOFALxjmdLhZbXWXsF4HcOb6WZCDahKFKtb_tw2KdD5zlEQ-sr1J4l4BFQdDLbCD-Aoa_YdUoM4JXTurG6hUhrYenIlroLL5XRa5_yXFTQEGxlUWBfPLVJPHMVHPLOfMBllgwruSIcRHhv50W6iDhffrfsyj_1TGEaMW3pWlVhYzEgHk1rRd-YXn0VEyAptjyUnQS1Me4tcC-Daoau80g1n92S8XYRRE25NXG6tSPUZrNkPFLdwenVjofVjSv3D8JA44v6meuUaStk23IDgJIW55zPNP1m-bhTItWBQA';
        }
    }

    public function generateToken()
    {
        $data = date('Y-m-d H:i:s');
        $hJwt = new Jwt();
        $encrypted = $hJwt->encrypt($data);

        return $encrypted;
    }

    protected function parse(ResponseInterface $response, $type = 'json')
    {
        switch ($type) {
            case 'json':
                return json_decode((string)$response->getBody(), TRUE);
            case 'xml':
                return simplexml_load_file((string)$response->getBody());
            default:
                throw new Exception(
                    "Invalid response type"
                );
        }
    }

    public function sendPost($action, $params = [])
    {
        try {
            $defaultParams = [
                'token' => $this->token,
                'action' => $action,
                'service_id' => $this->service_id,
            ];
            $params = array_merge($defaultParams, $params);

            $response = $this->client->post($this->path, ['body' => $params]);

            if($response->getStatusCode()!=200)
                throw new Exception('Failed on calling action ' . $action .' on ' . $this->currentBaseUri. ' response code '.$response->getStatusCode());

            $result = json_decode($response->getBody(), true);

            if(empty($result))
                throw new Exception('Failed on calling action ' . $action .' on ' . $this->currentBaseUri, 10);

            return [
                'status' => 1,
                'data' => $result['data'],
            ];
        } catch (RequestException $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getResponse(),
            ];
        }
    }

    function curl_post($data, $url)
    {
        try {
            $data_string = http_build_query($data);
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);
            return [
                'status' => 1,
                'data' => $result,
            ];
        } catch (Exception $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

}