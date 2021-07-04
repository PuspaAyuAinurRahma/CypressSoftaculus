<?php

namespace BeonOrder\Controllers\Apis\Vps;

use BeonOrder\Controllers\Base;
use BeonOrder\Controllers\CartPages;
use BeonOrder\Libs\Logger\Exception;

class Vps extends Base
{
    public function addConfigServer()
    {
        try {
            $pid    = $this->post['pid'];
            $server = $this->post['server'];

            return CartPages::addServerConfig($pid, $server);

        } catch (Exception $exception) {
            return [
                'status'  => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

    public function addAppServer()
    {
        try {
            $pid               = $this->post['pid'];
            $customfieldsId    = $this->post['customfields_id'];
            $customfieldsValue = $this->post['customfields_value'];
            return CartPages::addAppConfig($pid, $customfieldsId, $customfieldsValue);

        } catch (Exception $exception) {
            return [
                'status'  => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

    public function getInformationTemplate() {
        try {
            if (empty($this->post['template_id'])) throw new Exception('Template id cannot be empty');

            $hVps           = new \BeonOrder\Helpers\Vps();
            $template_id    = $this->post['template_id'];
            $getInformation = $hVps->getInformationTemplate($template_id);
            if ($getInformation['status'] !== 1)
                throw new Exception($getInformation['message']);

            return [
                'status'    => 1,
                'data'      => $getInformation['data']
            ];

        } catch (Exception $exception) {
            return [
                'status'  => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

    public function insertLogTutorial() {
        try {
            header('Access-Control-Allow-Origin: https://www.jagoanhosting.com');
            header('Access-Control-Allow-Methods: POST');

            if (empty($this->post['tutorial_id'])) throw new Exception('Tutorial ID cannot be empty');
            if (!is_numeric($this->post['tutorial_id'])) throw new Exception('Tutorial ID should be number');
            if (!is_numeric($this->post['userid'])) throw new Exception('User ID should be number');
            if (empty($this->post['sessionid'])) throw new Exception('Session ID cannot be empty');
            if (empty($this->post['source'])) throw new Exception('Source cannot be empty');

            $tutorial_id    = $this->post['tutorial_id'];
            $userid         = $this->post['userid'];
            $sessionid      = $this->post['sessionid'];
            $source         = $this->post['source'];

            $hVps   = new \BeonOrder\Helpers\Vps();
            $insert = $hVps->insertLogTutorial($tutorial_id, $userid, $sessionid, $source);
            if ($insert['status'] !== 1)
                throw new Exception($insert['message']);

            return [
                'status'    => 1,
                'message'   => $insert['message']
            ];

        } catch (Exception $exception) {
            return [
                'status'  => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

    public function addRatingTutorial() {
        try {
            header('Access-Control-Allow-Origin: https://www.jagoanhosting.com');
            header('Access-Control-Allow-Methods: POST');

            if (empty($this->post['tutorial_id'])) throw new Exception('Tutorial ID cannot be empty');
            if (!is_numeric($this->post['tutorial_id'])) throw new Exception('Tutorial ID should be number');
            if (empty($this->post['userid'])) throw new Exception('User ID cannot be empty');
            if (!is_numeric($this->post['userid'])) throw new Exception('User ID should be number');
            if (empty($this->post['rating'])) throw new Exception('Rating cannot be empty');
            if (empty($this->post['feedback'])) throw new Exception('Feedback cannot be empty');

            $tutorial_id    = $this->post['tutorial_id'];
            $userid         = $this->post['userid'];
            $rating         = $this->post['rating'];
            $feedback       = $this->post['feedback'];
            $note           = $this->post['note'];

            $hVps   = new \BeonOrder\Helpers\Vps();
            $insert = $hVps->addRatingTutorial($userid, $tutorial_id, $rating, $feedback, $note);
            if ($insert['status'] !== 1)
                throw new Exception($insert['message']);

            return [
                'status'    => 1,
                'data'      => $insert['data']
            ];

        } catch (Exception $exception) {
            return [
                'status'  => 0,
                'message' => $exception->getMessage()
            ];
        }
    }

    public function getRatingTutorial() {
        try {
            header('Access-Control-Allow-Origin: https://www.jagoanhosting.com');
            header('Access-Control-Allow-Methods: POST');

            if (empty($this->post['tutorial_id'])) throw new Exception('Tutorial ID cannot be empty');
            if (!is_numeric($this->post['tutorial_id'])) throw new Exception('Tutorial ID should be number');
            if (empty($this->post['userid'])) throw new Exception('User ID cannot be empty');
            if (!is_numeric($this->post['userid'])) throw new Exception('User ID should be number');

            $tutorial_id    = $this->post['tutorial_id'];
            $userid         = $this->post['userid'];

            $hVps   = new \BeonOrder\Helpers\Vps();
            $get    = $hVps->getRatingTutorial($userid, $tutorial_id);
            if ($get['status'] != 1)
                throw new Exception($get['message']);

            return [
                'status'    => 1,
                'data'      => $get['data']
            ];

        } catch (Exception $exception) {
            return [
                'status'  => 0,
                'message' => $exception->getMessage()
            ];
        }
    }
}