<?php


namespace BeonOrder\Libs\VpsX;

use BeonOrder\Libs\Logger\Exception;

class Tutorial extends Base
{
    protected $module ='tutorial';

    function __construct()
    {
        parent::__construct($this->module);
    }

    public function insertLog($tutorial_id, $userid, $sessionid, $source)
    {
        try {
            $action = 'addLog';
            $params = [
                'token'         => 'secret',
                'tutorial_id'   => $tutorial_id,
                'userid'        => $userid,
                'sessionid'     => $sessionid,
                'source'        => $source
            ];

            $result = $this->curl_post($params, $action);
            if ($result['data']['status'] !== 1)
                throw new Exception($result['message']);

            return [
                'status'    => 1,
                'message'   => $result['data']['message']
            ];
        } catch (Exception $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

    public function addRatingTutorial($userid, $tutorial_id, $rating, $feedback, $note)
    {
        try {
            $action = 'addRating';
            $params = [
                'token'         => 'secret',
                'tutorial_id'   => $tutorial_id,
                'userid'        => $userid,
                'rating'        => $rating,
                'feedback'      => $feedback,
                'note'          => $note
            ];

            $result = $this->curl_post($params, $action);
            if ($result['data']['status'] !== 1)
                throw new Exception($result['message']);

            return [
                'status'    => 1,
                'data'      => $result['data']['data']
            ];
        } catch (Exception $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getRatingTutorial($userid, $tutorial_id)
    {
        try {
            $action = 'getRating';
            $params = [
                'token'         => 'secret',
                'tutorial_id'   => $tutorial_id,
                'userid'        => $userid,
            ];

            $result = $this->curl_post($params, $action);
            if ($result['data']['status'] !== 1)
                throw new Exception($result['message']);

            return [
                'status'    => 1,
                'data'      => $result['data']['data']
            ];
        } catch (Exception $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }
}