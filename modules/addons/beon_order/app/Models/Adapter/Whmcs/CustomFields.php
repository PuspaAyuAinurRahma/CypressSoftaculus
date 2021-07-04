<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 15/06/20
 * Time: 15:09
 */

namespace BeonOrder\Models\Adapter\Whmcs;
use Illuminate\Database\Capsule\Manager as DB;


class CustomFields
{
    protected $table = "tblcustomfields";

    public function getByTypeAndName($type, $name){
        try{
            DB::connection()->setFetchMode(\PDO::FETCH_ASSOC);

            $query = DB::table($this->table)
                ->where('type','=',$type)
                ->where('fieldname','=',$name)
                ->first();
            if(!$query)throw new \Exception("Custom Fields Not Found : {$name}");
            return [
                'status'=>1,
                'data'  =>$query
            ];

        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    public function getValue($fieldid, $relid){
        try{
            DB::connection()->setFetchMode(\PDO::FETCH_ASSOC);

            $query = DB::table($this->table."values")
                ->where('fieldid','=',$fieldid)
                ->where('relid','=',$relid)
                ->first();
            if(!$query)throw new \Exception("Custom Fields Not Found");
            return [
                'status'=>1,
                'data'  =>$query
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
    public function getByValue($fieldid, $relid, $value){
        try{
            DB::connection()->setFetchMode(\PDO::FETCH_ASSOC);

            $query = DB::table($this->table."values")
                ->where('fieldid','=',$fieldid)
                ->where('relid','=',$relid)
                ->where('value', '=', $value)
                ->first();
            if(!$query)throw new \Exception("Custom Fields Not Found");
            return [
                'status'=>1,
                'data'  =>$query
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function updateValue($id, $value){
        try{
            DB::connection()->setFetchMode(\PDO::FETCH_ASSOC);

            $query = DB::table($this->table."values")
                ->where('id', '=', $id)
                ->update([
                    "value"         => $value,
                    "updated_at"    => date('Y-m-d H:i:s')
                ]);
            if(!$query)throw new \Exception("Could not update data");
            return [
                'status'=>1,
                'data'  =>$query
            ];
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }
}