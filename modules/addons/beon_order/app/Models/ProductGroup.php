<?php


namespace BeonOrder\Models;

use BeonOrder\Helpers\Config;
use Illuminate\Database\Capsule\Manager as Capsule;

class ProductGroup
{
    private $productGroup       = 'order_productgroup';
    private $productGroupLink   = 'order_productgroup_link';
    private $grouptype          = 'order_grouptype';

    function __construct()
    {
        $this->Migration();
//        $this->insertDefaultDatas();
    }

    public function Migration()
    {
        $this->MigrateProductGroup();
        $this->MigrateGroupLink();
        $this->MigrateGroupType();
//        $this->insertDefaultDatas();
    }

    private function MigrateProductGroup(){
        $schema = Capsule::schema();
        /*Miigrate ProductGroup*/
        if (!$schema->hasTable($this->productGroup)) {
            $schema->create($this->productGroup, function ($table) {
                $table->increments('id');
                $table->string('name');
                $table->integer('type_id');
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
        }else{
            if(!$schema->hasColumn($this->productGroup, 'name'))
                $schema->table($this->productGroup, function ($table){
                    $table->string('name')->after('id');
                });
            if(!$schema->hasColumn($this->productGroup, 'type_id'))
                $schema->table($this->productGroup, function ($table){
                    $table->string('type_id')->after('name');
                });
            if(!$schema->hasColumn($this->productGroup, 'created_at'))
                $schema->table($this->productGroup, function ($table){
                    $table->dateTime('created_at')->nullable();
                });
            if(!$schema->hasColumn($this->productGroup, 'created_at'))
                $schema->table($this->productGroup, function ($table){
                    $table->dateTime('updated_at')->nullable();
                });
        }
    }
    private function MigrateGroupLink(){
        $schema = Capsule::schema();
        /*Miigrate ProductGroup*/
        if (!$schema->hasTable($this->productGroupLink)) {
            $schema->create($this->productGroupLink, function ($table) {
                $table->increments('id');
                $table->integer('groupid');
                $table->integer('productid');
            });
        }else{
            if(!$schema->hasColumn($this->productGroupLink, 'groupid'))
                $schema->table($this->productGroupLink, function ($table){
                    $table->integer('groupid')->after('id');
                });
            if(!$schema->hasColumn($this->productGroupLink, 'productid'))
                $schema->table($this->productGroupLink, function ($table){
                    $table->integer('productid');
                });
        }
    }
    private function MigrateGroupType(){
        $schema = Capsule::schema();
        /*Miigrate ProductGroup*/
        if (!$schema->hasTable($this->grouptype)) {
            $schema->create($this->grouptype, function ($table) {
                $table->increments('id');
                $table->string('name');
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
        }else{
            if(!$schema->hasColumn($this->grouptype, 'name'))
                $schema->table($this->grouptype, function ($table){
                    $table->string('name')->after('id');
                });
            if(!$schema->hasColumn($this->grouptype, 'created_at'))
                $schema->table($this->grouptype, function ($table){
                    $table->dateTime('created_at')->nullable();
                });
            if(!$schema->hasColumn($this->grouptype, 'created_at'))
                $schema->table($this->grouptype, function ($table){
                    $table->dateTime('updated_at')->nullable();
                });
        }
    }

    private function insertDefaultDatas(){
        try{
            $config = new Config();
            $defaultproducts = $config->getDefaultProductConfigs();
            foreach ($defaultproducts as $defaultproduct){
                $grouptype = $this->addGroupType($defaultproduct['type']);
                if($grouptype['status']!=1)throw new \Exception($grouptype['message']);
                foreach ($defaultproduct['groups'] as $defaultgroup){
                    $productgroup =
                        $this->addProductgroup($defaultgroup['name'], $grouptype['data']['id']);
                    if($productgroup['status']!=1)throw new \Exception($productgroup['message']);
                    foreach ($defaultgroup['products'] as $product){
                        $productlink = $this->addProductLink($product, $productgroup['data']['id']);
                        if($productlink['status']!=1)throw new \Exception($productlink['message']);
                    }
                }
            }
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function addProductLink($productid, $groupid){
        try {
            $check = Capsule::table($this->productGroupLink)
                ->where('productid', $productid)
                ->where('groupid', $groupid)
                ->first();
            if(!$check){
                $insert = Capsule::table($this->productGroupLink)
                    ->insertGetId([
                        'productid' =>$productid,
                        'groupid'   =>$groupid,
                    ]);
                if(!$insert)throw new \Exception("Couldnt Insert Link {$productid} on Group {$groupid}");
                return [
                    'status'=>1,
                    'data'=>[
                        'id'=>$insert
                    ]
                ];
            }
            return [
                'status'=>1,
                'data'  =>$check->id
            ];

        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function addProductgroup($name, $type_id){
        try {
            $check = Capsule::table($this->productGroup)
                ->where('name', $name)
                ->where('type_id', $type_id)
                ->first();
            if(!$check){
                $insert = Capsule::table($this->productGroup)
                    ->insertGetId([
                        'name'=>$name,
                        'type_id'=>$type_id,
                        'created_at'=>date('Y-m-d H:i:s')
                    ]);
                if(!$insert)throw new \Exception("Couldnt Insert Product Group {$name} with TypeId {$type_id}");
                return [
                    'status'=>1,
                    'data'=>[
                        'id'=>$insert
                    ]
                ];
            }
            return [
                'status'=>1,
                'data'  =>$check->id
            ];

        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }


    public function addGroupType($name){
        try {
            $check = Capsule::table($this->grouptype)
                ->where('name', $name)
                ->first();
            if(!$check){
                $insert = Capsule::table($this->grouptype)
                    ->insertGetId([
                        'name'=>$name,
                        'created_at'=>date('Y-m-d H:i:s')
                    ]);
                if(!$insert)throw new \Exception("Couldnt Insert Type {$name}");
                return [
                    'status'=>1,
                    'data'=>[
                        'id'=>$insert
                    ]
                ];
            }
            return [
                'status'=>1,
                'data'  =>$check->id
            ];

        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function getProductById($pid)
    {
        try {
            $data = Capsule::table($this->productGroupLink)
                ->select([
                    'order_productgroup_link.id',
                    'order_productgroup_link.groupid',
                    'order_productgroup.name as groupname',
                    'order_productgroup_link.productid',
                ])
                ->join('order_productgroup', 'order_productgroup.id', '=', 'order_productgroup_link.groupid')
                ->where('order_productgroup_link.productid', '=', $pid)
                ->first();
            $data   = (array) $data;
            if (!$data) throw new \Exception('Data not found');

            return [
                'status' => 1,
                'data' => $data,
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getProductGroups()
    {
        try {
            $data = Capsule::table($this->productGroup)
                ->get();
            if (!$data) throw new \Exception('Data not found');

            return [
                'status' => 1,
                'data' => $data,
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getProducts()
    {
        try {
            $data = Capsule::table($this->productGroupLink)
                ->get();
            if (!$data) throw new \Exception('Data not found');

            return [
                'status' => 1,
                'data' => $data,
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e->getMessage(),
            ];
        }
    }

    public function getGroupType()
    {
        try {
            $data = Capsule::table($this->grouptype)
                ->select([
                    'order_grouptype.id',
                    'order_grouptype.name as type',
                    'order_productgroup.id as groupid',
                    'order_productgroup.name as groupname',
                ])
                ->join('order_productgroup', 'order_productgroup.type_id', '=', 'order_grouptype.id')
                ->get();
            if (!$data) throw new \Exception('Data not found');

            return [
                'status' => 1,
                'data' => $data,
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e->getMessage(),
            ];
        }
    }
}