<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class UpsaleProduct
{
    protected $table = "order_upsales";

    function __construct()
    {
        $this->Migration();
    }

    public function Migration()
    {
        $this->MigrateUpsale();
    }

    private function MigrateUpsale(){
        $schema = Capsule::schema();

        if (!$schema->hasTable($this->table)) {
            $schema->create($this->table, function ($table) {
                $table->increments('id');
                $table->integer('pid');
                $table->text('persyaratan');
                $table->text('cycles');
                $table->integer('status');
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
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