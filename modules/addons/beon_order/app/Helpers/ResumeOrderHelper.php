<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 22/05/17
 * Time: 9:15
 */

namespace BeonOrder\Helpers;

use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Helpers\Hosting;
use BeonOrder\Helpers\Domain;
use BeonOrder\Helpers\Product;
use BeonOrder\Helpers\ProductsGroups;

class ResumeOrderHelper
{
    public function getDataByRellIdAndType($arrayData, $invoiceid)
    {
        try {
            $hHosting   = new Hosting();
            $hDomain    = new Domain();
            $hProduct   = new Product();
            $dataArr    = [];
            foreach ($arrayData as $key => $data) {
                $type   = $data['type'];
                $relid  = $data['relid'];
                $amount = round($data['amount']);
                $amountNow = number_format($amount, 0, ",", ".");;
                if ($type == 'Upgrade' || $type == 'Hosting') {
                    $getData    = $hHosting->getProduct($relid);
                    if ($getData['status'] != 1) throw new Exception($getData['message']);

                    $dueDate    = date("d/m/Y", strtotime($getData['data']['nextduedate']));
                    $duration   = $getData['data']['billingcycle'];
                    $getData['data']['nextduedate']  = $dueDate;
                    $getData['data']['type']  = 'hosting';
                    $getData['data']['amount']  = $amountNow;

                    $durationMessage    = '';
                    if ($duration == 'One Time') {
                        $durationMessage    = 'Satu Kali';
                    }
                    else if ($duration == 'Monthly') {
                        $durationMessage    = '1 Bulanan';
                    }
                    else if ($duration == 'Quarterly') {
                        $durationMessage    = '3 Bulanan';
                    }
                    else if ($duration == 'Semi-Annually') {
                        $durationMessage    = '6 Bulanan';
                    }
                    else if ($duration == 'Annually') {
                        $durationMessage    = '1 Tahunan';
                    }
                    else if ($duration == 'Biennially') {
                        $durationMessage    = '2 Tahunan';
                    }
                    else if ($duration == 'Triennially') {
                        $durationMessage    = '3 Tahunan';
                    }
                    else if ($duration == 'Free Account') {
                        $durationMessage    = 'Free Account';
                    }

                    $getData['data']['durations']  = $durationMessage;
                    $dataArr['data'][$key]  = $getData['data'];
                }
                else if ($type == 'Domain' || $type == 'DomainTransfer' || $type == 'DomainRegister' || $type == 'DomainAddonPPW' || $type == 'DomainAddonIDP' || $type == 'DomainAddonEMF' || $type == 'DomainAddonDNS') {
                    $getData    = $hDomain->getById($relid);
                    if ($getData['status'] != 1) throw new Exception($getData['message']);

                    $dueDate        = date("d/m/Y", strtotime($getData['data']['nextduedate']));
                    $dataArr['data'][$key]  = [
                        'id'        => $getData['data']['id'],
                        'domain'    => $getData['data']['domain'],
                        'status'    => $getData['data']['status'],
                        'name'      => '',
                        'groupname' => 'Domain',
                        'nextduedate' => $dueDate,
                        'type'      => 'domain',
                        'amount'    => $amountNow
                    ];
                }
            }

            $dataArr['data']['invoiceid']   = $invoiceid;
            return [
                'status' => 1,
                'data' => $dataArr['data']
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }

}