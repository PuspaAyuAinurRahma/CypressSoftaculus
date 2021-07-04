<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;


class MasterCrossSales
{
    protected $table = "master_cross_sales";

    function __construct()
    {
        $this->Migration();
    }

    public function Migration()
    {
        $mCrossSales = new CrossSales();
        $this->MigrateMasterCrossSales();
        $mCrossSales->MigrateCrossSales();
    }

    private function MigrateMasterCrossSales(){
        $schema = Capsule::schema();

        if (!$schema->hasTable($this->table)) {
            $schema->create($this->table, function ($table) {
                $table->increments('id');
                $table->integer('pid');
                $table->text('template');
                $table->integer('status')->default(1);
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
        }
    }

    public function get()
    {
        try {
            $data = Capsule::table($this->table)
                    ->select('cross_sales.*',
                        $this->table.'.pid',
                        $this->table.'.status',
                        $this->table.'.template'
                        )
                    ->join('cross_sales', $this->table.'.id','=','cross_sales.master_cross_sales_id')
                    ->where($this->table.'.status', 1)
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