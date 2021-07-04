<?php


namespace BeonOrder\Models;

use Illuminate\Database\Capsule\Manager as Capsule;

class Orders
{
    private $table = 'tblorders';
    public function getOrderByInvoice($invoice_id)
    {
        try {
            $data = Capsule::table($this->table)
                ->select("{$this->table}.*")
                ->where('invoiceid', '=', $invoice_id)
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

    public function updateToActive($id) {
        try {
            $data = Capsule::table($this->table)
                ->where('id', $id)
                ->update([
                    'status' => 'Active',
                ]);
            if (!$data) throw new \Exception('Error update');

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