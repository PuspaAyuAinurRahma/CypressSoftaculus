<?php


namespace BeonOrder\Models;

use BeonOrder\Helpers\Config;
use Illuminate\Database\Capsule\Manager as Capsule;

class PersyaratanDomain
{
    protected $table = "order_persyaratan_domains";

    function __construct()
    {
        $this->Migration();
    }

    public function Migration()
    {
        $this->MigratePersyaratanDomain();
        $this->insertDefaultData();
    }

    private function MigratePersyaratanDomain(){
        $schema = Capsule::schema();

        if (!$schema->hasTable($this->table)) {
            $schema->create($this->table, function ($table) {
                $table->increments('id');
                $table->string('tld');
                $table->text('persyaratan');
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
        }else{
            if(!$schema->hasColumn($this->table, 'tld'))
                $schema->table($this->table, function ($table){
                    $table->string('tld')->after('id');
                });
            if(!$schema->hasColumn($this->table, 'persyaratan'))
                $schema->table($this->productGroup, function ($table){
                    $table->string('persyaratan')->after('tld');
                });
            if(!$schema->hasColumn($this->table, 'created_at'))
                $schema->table($this->table, function ($table){
                    $table->dateTime('created_at')->nullable();
                });
            if(!$schema->hasColumn($this->table, 'updated_at'))
                $schema->table($this->table, function ($table){
                    $table->dateTime('updated_at')->nullable();
                });
        }
    }

    private function insertDefaultData() {
        try{
            $config = new Config();
            $persyaratanDomain = $config->getPersyaratanDomain();
            foreach ($persyaratanDomain as $item) {
                $insert = $this->addPersyaratanDomain($item['tld'], $item['persyaratan']);
                if ($insert['status'] != 1)
                    throw new \Exception($insert['message']);
            };

        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function addPersyaratanDomain($tld, $persyaratan){
        try {
            $check = Capsule::table($this->table)
                ->where('tld', $tld)
                ->first();
            if(!$check){
                $insert = Capsule::table($this->table)
                    ->insert([
                        'tld'=>$tld,
                        'persyaratan'   => $persyaratan,
                        'created_at'=>date('Y-m-d H:i:s')
                    ]);
                if(!$insert)throw new \Exception("Couldnt Insert Domain TLD {$tld}");
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

    public function get()
    {
        try {
            $data = Capsule::table($this->table)->get();
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
}