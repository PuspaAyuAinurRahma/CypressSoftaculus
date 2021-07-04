<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class AppsHosting
{
    protected $table = "beon_apps_hosting";

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
                $table->text('category');
                $table->text('name');
                $table->text('tag');
                $table->text('desc');
                $table->text('link');
                $table->text('img');
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