<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/14/18
 * Time: 3:11 PM
 */

namespace BeonOrder\Models;

use BeonOrder\Libs\Logger\Exception;
use Illuminate\Database\Capsule\Manager as Capsule;

class Clients
{
    private $table  = 'tblclients';

    public function getById($id)
    {
        try {
            $data = Capsule::table($this->table)
                ->where('id', $id)->first();
            $data   = (array) $data;
            if (!$data) throw new \Exception('Data not found');
            return [
                'status' => 1,
                'data' => $data,
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

}