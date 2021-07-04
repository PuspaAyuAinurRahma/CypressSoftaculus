<?php
/**
 * Created by PhpStorm.
 * User: agam
 * Date: 21/09/18
 * Time: 13:04
 */

namespace BeonOrder\Helpers\Clients;


use BeonOrder\Helpers\Config;
use BeonOrder\Libs\Logger\Exception;
use BeonOrder\Models\Adapter\Whmcs\AddonModules;

class Base
{
    private $module = 'beon_custom_pages';
    protected $service_id;

    public function __construct()
    {
        $this->getModuleConfig();
    }

    public function getModuleConfig()
    {
        try {
            $hAddonModule = new AddonModules();
            $config = $hAddonModule->getAddonModules($this->module);

            $this->service_id = $config['service_id'];
        } catch (Exception $e) {
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

}