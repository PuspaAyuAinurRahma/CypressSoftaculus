<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class CrossSales
{
    protected $table = "cross_sales";

    public function MigrateCrossSales(){
        $schema = Capsule::schema();

        if (!$schema->hasTable($this->table)) {
            $schema->create($this->table, function ($table) {
                $table->increments('id');
                $table->integer('master_cross_sales_id');
                $table->integer('product_id');
                $table->string('required_billing_cycle');
                $table->string('billing_cycle_cross_sales');
                $table->text('description');
                $table->dateTime('created_at')->nullable();
                $table->dateTime('updated_at')->nullable();
            });
        }
    }

}