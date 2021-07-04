<?php


namespace BeonOrder\Models\Adapter\Whmcs;

use BeonOrder\Libs\Logger\Exception;
use Illuminate\Database\Capsule\Manager as DB;

class Product
{
    public function checkRequiredDomain($pid){
        try{
            DB::connection()->setFetchMode(\PDO::FETCH_ASSOC);

            $query = DB::table('tblproducts')
                ->where('tblproducts.id', $pid)
                ->first();

            DB::connection()->setFetchMode(\PDO::FETCH_OBJ);

            if (!$query){
                throw new Exception('Product not Found');
            }

            return [
                'status' => 1,
                'data'   => $query,
            ];
        }catch (Exception $e){
            return [
                'status' => 0,
                'message' => $e->getMessage(),
            ];
        }
    }
}