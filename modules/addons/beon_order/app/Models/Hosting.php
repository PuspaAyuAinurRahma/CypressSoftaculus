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
use MongoDB\Driver\Exception\ExecutionTimeoutException;

class Hosting
{
    private $table  = 'tblhosting';

    public function getProduct($id)
    {
        try {
            $data = Capsule::table($this->table)
                ->select([
                    'tblhosting.id',
                    'tblhosting.domain',
                    'tblhosting.nextduedate',
                    'tblhosting.billingcycle',
                    'tblhosting.domainstatus as status',
                    'tblproducts.NAME as name',
                    'tblproductgroups.name as groupname'
                ])
                ->join('tblproducts', 'tblhosting.packageid', '=', 'tblproducts.id')
                ->join('tblproductgroups', 'tblproducts.gid', '=', 'tblproductgroups.id')
                ->where('tblhosting.id', '=', $id)
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

    public function getHosting($id) {
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