<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class Products
{
    private $product = 'tblproducts';
    public function getProductName($pid)
    {
        try {
            $data = Capsule::table($this->product)
                ->select("{$this->product}.*")
                ->where('id', '=', $pid)
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
}