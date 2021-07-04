<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class GimmickSelection
{
    protected $table = "order_gimmick_selection";

    function __construct()
    {
        $this->Migration();
    }

    public function Migration()
    {
        $schema = Capsule::schema();

        if (!$schema->hasTable($this->table)) {
            $schema->create($this->table, function ($table) {
                $table->increments('id');
                $table->integer('pid');
                $table->text('gimmick_text');
                $table->text('status')->default('active');
                $table->dateTime('created_at')->nullable();
            });
        }

    }

    public function getActive()
    {
        try {
            $data = Capsule::table($this->table)
                ->where('status','=','active')
                ->get();
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