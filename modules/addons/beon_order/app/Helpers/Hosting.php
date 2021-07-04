<?php
/**
 * Created by PhpStorm.
 * User: jojo
 * Date: 04/07/18
 * Time: 15:03
 */

namespace BeonOrder\Helpers;


use BeonOrder\Libs\Logger\Exception;
use Illuminate\Database\Capsule\Manager as Capsule;
use BeonOrder\Models\Hosting as mHosting;

class Hosting
{
    public function getProduct($id)
    {
        try {
            $mHosting   = new mHosting();
            $result     = $mHosting->getProduct($id);
            if ($result['status'] != 1) throw new Exception($result['message']);

            return [
                'status' => 1,
                'data' => $result['data']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

}