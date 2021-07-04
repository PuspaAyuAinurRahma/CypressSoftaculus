<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/14/18
 * Time: 3:11 PM
 */

namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class Affiliate
{
    private $table  = 'tblaffiliates';

    public function get($id) {
        try {
            $data = Capsule::table($this->table)
                ->where('id', '=', $id)
                ->first();
            if (!$data) throw new \Exception('Data not found');

            $data   = (array) $data;
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