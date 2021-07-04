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

class Payments
{
    private $table  = 'tblpaymentgateways';

    public function fetchByGateway($gateway)
    {
        try {
            $query  = Capsule::table($this->table)
                ->where('gateway', $gateway)
                ->get();
            if (!$query) throw new \Exception('Failed to fetch data payment');

            return [
                'status'    => 1,
                'data'      => $query,
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e,
            ];
        }
    }

}