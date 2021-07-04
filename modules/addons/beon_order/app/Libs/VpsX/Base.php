<?php


namespace BeonOrder\Libs\VpsX;

use GuzzleHttp\Client as Guzzle;
use GuzzleHttp\Exception\RequestException;
use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Libs\Security\Encryption\Jwt;

class Base
{
    protected $client;
    protected $currentBaseUri = 'http://10.10.48.18/engine/';
    protected $token;
    protected $path;

    public function __construct($uri)
    {
        $this->client = new Guzzle([
            'base_url' => $this->currentBaseUri,
        ]);
        $this->path = $uri;
        $this->token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJob3N0IjoiY29udHJvbGxlci5qYWdvYW5ob3N0aW5nLmNvbSIsImtleSI6ImVlMndqbXRwYWtsdm9lMHlkZnBuY2d0YW50aGVtY3kyIiwicGFzcyI6Im9vdnFyZHF3emh2NmNodzlhOGx1dTVmOGh5cm9xdGo5IiwiZW52aXJvbm1lbnQiOiJzdGFnX2RldiJ9._eqTtc6IPEqkRmvH9JX9u5ME50UNRH8xD5Fs6fsee0w';
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
            ];
            $params = array_merge($defaultParams, $params);

            $url = $this->path ."/". $action;
            $response = $this->client->post($url, ['body' => $params]);

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

    function curl_post($data, $action)
    {
        try {
            $url = $this->currentBaseUri.$this->path.'/'.$action;

            $data_string = http_build_query($data);
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $result = curl_exec($ch);

            $result = json_decode($result, true);
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