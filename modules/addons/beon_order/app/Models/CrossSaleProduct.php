<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class CrossSaleProduct
{
    protected $table = "order_crosssales";

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