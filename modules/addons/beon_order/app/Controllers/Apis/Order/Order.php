<?php


namespace BeonOrder\Controllers\Apis\Order;


use BeonOrder\Controllers\Base;
use BeonOrder\Helpers\Promotions\Promotions;
use BeonOrder\Models\Affiliate;
use BeonOrder\Models\Hosting;
use BeonOrder\Models\ReferralAccess;

class Order extends Base
{
    public function checkout() {
        try{
            if(empty($this->post['payment']))throw new \Exception("Payment is Empty");
            if(empty($this->post['cart']))throw new \Exception("Cart is Empty");

            $cart       = $this->post['cart'];
            $payment    = $this->post['payment'];

            $formatData = $this->setupOrder($cart, $payment);
            if ($formatData['status'] != 1)
                throw new \Exception($formatData['message']);

            $result = $this->sendapi('AddOrder', $formatData['data']);
            if ($result['result'] != "success") {
                throw new \Exception("Error");
            }

            $invoiceid      = $result['invoiceid'];
            $userid         = $formatData['data']['clientid'];
            $productids     = explode(',',$result['productids']);
            if (empty($productids)) {
                return [
                    'status'    => 1,
                    'data'      => $result
                ];
            }

            // Aditional for referral program
            if (array_key_exists('referrerid', $formatData['data'])) {
                $referrer_id    = $formatData['data']['referrerid'];
                $forPid         = $formatData['data']['for_pid'];
                $serviceid      = 0;

                // Find service id yang cocok dengan referral product id
                $mHosting = new Hosting();
                foreach ($productids as $id) {
                    $hosting = $mHosting->getHosting($id);
                    if ($hosting['status'] == 1) {
                        if ($forPid == $hosting['data']['packageid']) {
                            $serviceid = $id;
                            continue;
                        }
                    }
                }

                if ($referrer_id != 0 && $serviceid != 0) {
                    $saveReferral = $this->saveRefereeAccess($invoiceid, $serviceid, $userid , $referrer_id);
                    if ($saveReferral['status'] != 1)
                        throw new \Exception($saveReferral['message']);
                }
            }

            return [
                'status'    => 1,
                'data'      => $result
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    public function setupOrder($cart, $payment) {
        try{
            $result = [
                "clientid" => $_SESSION['uid'],
                "paymentmethod" => $payment,
            ];

            if (array_key_exists('WHMCSAffiliateID', $_COOKIE)) {
                $affiliate_id   = $_COOKIE['WHMCSAffiliateID'];
                $mAffiliate     = new Affiliate();
                $affiliate      = $mAffiliate->get($affiliate_id);
                if ($affiliate['status'] == 1) {
                    if ($affiliate['data']['clientid'] != $_SESSION['uid']) {
                        $result['affid'] = $affiliate_id;
                    }
                }
            }

            $counter    = 0;

            foreach ($cart as $product) {

                $formatConfigoptions = [];

                if ($product['type'] == "domains") {
                    switch ($product['domaintype']) {
                        case "transfer":
                            $result["domain"][$counter]         = $product['domain'];
                            $result["domaintype"][$counter]     = $product['domaintype'];
                            $result["eppcode"][$counter]        = $product['epp'];
                            break;
                        default:
                            $result["domain"][$counter]         = $product['domain'];
                            $result["domaintype"][$counter]     = $product['domaintype'];
                            $result["regperiod"][$counter]      = $product['billingcycle'];
                    }
                } else if($product['type'] == "promo") {
                    if ($product["type"] == "promo") {
                        $result["promocode"] = $product["code"];
                        $result["referrerid"] = $product["referrer_id"];
                        $result["for_pid"] = $product['for_product'];
                    }
                } else {
                    $result["pid"][$counter]            = $product['pid'];
                    $result["billingcycle"][$counter]   = $product['billingcycle'];
                    if (array_key_exists("domain", $product)) {
                        switch ($product["domain"]["type"]) {
                            case "use":
                                $result["domain"][$counter]         = $product['domain']['name'];
                                break;
                            case "transfer":
                                $result["domain"][]         = $product['domain']['name'];
                                $result["domaintype"][$counter]     = "transfer";
                                $result["eppcode"][$counter]        = $product['domain']['epp'];
                                break;
                            default:
                                $result["domain"][$counter]         = $product['domain']['name'];
                                $result["domaintype"][$counter]     = "register";
                                $result["regperiod"][$counter]      = $product['domain']['billingcycle'];
                        }
                    }
                    if ($product['crosssaleparent'] != 0){
                        foreach ($cart as $item) {
                            if ($product['crosssaleparent'] == $item['pid']){
                                $result["domain"][$counter]         = $item['domain']['name'];
                            }
                        }
                    }
                    if (array_key_exists("configoptions", $product)) {
                        foreach ($product["configoptions"] as $config) {
                            switch ($config['optiontype']) {
                                case "4":
                                    $formatConfigoptions[$config['id']] = (int) $config['selectedqty'];
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    if (array_key_exists("customfields", $product)) {
                        $formatCustomfield = [];
                        foreach ($product["customfields"] as $custom) {
                            $formatCustomfield[$custom['id']] = $custom['value'];
                        }
                        $result["customfields"][$counter] = base64_encode(serialize($formatCustomfield));
                    }

                    // If VPS X
                    if (array_key_exists("template", $product)) {
                        $vpsxConfigoptions = $this->setupVpsxOrder($product);

                        if (!empty($vpsxConfigoptions)) {
                            $result["customfields"][$counter] = base64_encode(serialize($vpsxConfigoptions['customfileds']));
                        }

                        $result['hostname'][$counter]               = $vpsxConfigoptions['hostname'];
                        $result['rootpw'][$counter]                 = $vpsxConfigoptions['rootpw'];
                        $result['ns1prefix'][$counter]              = $vpsxConfigoptions['ns1prefix'];
                        $result['ns2prefix'][$counter]              = $vpsxConfigoptions['ns2prefix'];
                        $formatConfigoptions[$product['image_id']]  = $product['template']['configid'];
                    }

                    if (!empty($formatConfigoptions)) {
                        $result["configoptions"][$counter] = base64_encode(serialize($formatConfigoptions));
                    }

                    // Cross sale
                    if (array_key_exists("cross_sale", $product)) {
                        foreach ($product['cross_sale'] as $key=>$item) {
                            $result["pid"][$counter + 100]            = $key;
                            $result["billingcycle"][$counter + 100]   = $item['billingcycle'];
                        }
                    }
                }
                $counter += 1;
            }

            return [
                'status'    => 1,
                'data'      => $result
            ];
        } catch (\Exception $e) {
            return [
                'status'    => 0,
                'message'   => $e->getMessage()
            ];
        }
    }

    private function sendapi($command, $data){
        return localAPI($command, $data, 'api');
    }
    public function validatePromoCode(){
        try{
            if(empty($this->post['code']))throw new \Exception("Kode promo tidak boleh kosong");
            if(empty($_SESSION['uid']))throw new \Exception("Kamu harus login terlebih dahulu sob");
            $userid = $_SESSION['uid'];
            $promotionhelper = new Promotions();
            $validate = $promotionhelper->validate($userid, $this->post['code']);
            return $validate;
        }catch (\Exception $exception){
            return [
                'status'=>0,
                'message'=>$exception->getMessage()
            ];
        }
    }

    public function setupVpsxOrder($product) {
        $result = [];
        if (array_key_exists('config', $product['template'])) {
            $configs = [];
            foreach ($product['template']['config'] as $config) {
                $configs[$config['name']] = $config['value'];
            }
            $result['customfileds'][$product['apps_config_id']] = json_encode($configs);
        }

        $result['hostname']     = $product['credentials']['hostname'];
        $result['rootpw']       = $product['credentials']['password'];
        $result['ns1prefix']    = 'ns1.' . $product['credentials']['hostname'];
        $result['ns2prefix']    = 'ns2.' . $product['credentials']['hostname'];

        return $result;
    }

    public function saveRefereeAccess($invoiceId, $serviceId, $refereeUserId, $referrerUserId)
    {
        try {
            $mAccess = new ReferralAccess();
            return $mAccess->addRefereeAccess($invoiceId, $serviceId, $refereeUserId, $referrerUserId, "hold");

        } catch (\Exception $e) {
            return [
                "status"  => 0,
                "message" => $e->getMessage()
            ];
        }
    }
}