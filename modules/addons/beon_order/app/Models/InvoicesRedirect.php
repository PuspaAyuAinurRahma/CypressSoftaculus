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

class InvoicesRedirect
{
    private $table  = 'tbl_invoices_redirect';

    public function getById($id)
    {
        try {
            $data = Capsule::table($this->table)
                ->where('invoiceid', $id)
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

    public function addData($userid, $invoiceid, $date)
    {
        try {
            $params = [
                'userid'        => $userid,
                'invoiceid'     => $invoiceid,
                'set_value'     => 1,
                'created_at'    => $date,
                'updated_at'    => $date
            ];
            $data = Capsule::table($this->table)
                ->insert($params);
            if (!$data) throw new \Exception('Failed save data');

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