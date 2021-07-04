<?php


namespace BeonOrder\Libs\VpsX;


use BeonOrder\Libs\Logger\Exception;

class OsTemplate extends Base
{
    protected $module ='ostemplate';

    function __construct()
    {
        parent::__construct($this->module);
    }

    public function getInformationDetail($template_id)
    {
        try {
            $action = 'getDetailInformationTemplate';
            $params = [
                'template_id'   => $template_id,
                'userid'        => 0,
                'token'         => $this->token
            ];

            $result = $this->curl_post($params, $action);

            return $result;
        } catch (Exception $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

    public function fetch()
    {
        try {
            $action = 'fetch';
            $params = [
                'grouping'      => 0,
                'token'         => $this->token
            ];

            $result = $this->curl_post($params, $action);

            return $result;
        } catch (Exception $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }
}