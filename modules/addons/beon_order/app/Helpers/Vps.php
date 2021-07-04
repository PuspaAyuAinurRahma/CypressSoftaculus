<?php


namespace BeonOrder\Helpers;


use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Libs\VpsX\OsTemplate;
use BeonOrder\Libs\VpsX\Tutorial;

class Vps
{
    public function getInformationTemplate($template_id)
    {
        try {
            $libsOsTemplate = new OsTemplate();
            $getInformation = $libsOsTemplate->getInformationDetail($template_id);
            if ($getInformation['status'] !== 1)
                throw new Exception($getInformation['message']);

            return [
                'status' => 1,
                'data' => $getInformation['data']['data']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

    public function insertLogTutorial($tutorial_id, $userid, $sessionid, $source) {
        try {
            $lTutorial  = new Tutorial();
            $insertLog  = $lTutorial->insertLog($tutorial_id, $userid, $sessionid, $source);
            if ($insertLog['status'] !== 1)
                throw new Exception($insertLog['message']);

            return [
                'status'    => 1,
                'message'   => $insertLog['message']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

    public function addRatingTutorial($userid, $tutorial_id, $rating, $feedback, $note) {
        try {
            $lTutorial  = new Tutorial();
            $addRating  = $lTutorial->addRatingTutorial($userid, $tutorial_id, $rating, $feedback, $note);
            if ($addRating['status'] !== 1)
                throw new Exception($addRating['message']);

            return [
                'status'    => 1,
                'data'      => $addRating['data']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

    public function getRatingTutorial($userid, $tutorial_id) {
        try {
            $lTutorial  = new Tutorial();
            $getRating  = $lTutorial->getRatingTutorial($userid, $tutorial_id);
            if ($getRating['status'] !== 1)
                throw new Exception($getRating['message']);

            return [
                'status'    => 1,
                'data'      => $getRating['data']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

    public function fetchOsTemplates() {
        try {
            $hVps           = new OsTemplate();

            $informations   = $hVps->fetch();
            if ($informations['status'] !== 1)
                throw new Exception($informations['message']);

            $tutorial = [];

            foreach ($informations['data']['data'] as $template) {
                if (!empty($template['link_guide'])) {
                    $tutorial[$template['id']] = $template['link_guide'];
                }
            }

            return [
                'status'    => 1,
                'data'      => $tutorial
            ];

        } catch (Exception $exception) {
            return [
                'status'  => 0,
                'message' => $exception->getMessage()
            ];
        }
    }
}