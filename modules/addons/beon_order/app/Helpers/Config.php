<?php
/**
 * Created by PhpStorm.
 * User: jojo
 * Date: 06/07/18
 * Time: 10:28
 */

namespace BeonOrder\Helpers;

use BeonOrder\Libs\Wizcrm\Basic\One;
use Illuminate\Database\Capsule\Manager as Capsule;

class Config extends One
{
    private $module;
    private $table;
    private $configtable='tblconfiguration';
    private $config;

    public function __construct()
    {
        $this->module   = 'beon_order';
        $this->table    = 'tbladdonmodules';
        $yamlconfig     = \BeonOrder\Libs\Parser\Yaml\Yaml::parse(file_get_contents(BEON_ORDER_BASE_DIR . "/config.yml"));
        $ini_config     = parse_ini_file(BEON_ORDER_BASE_DIR."/config.ini", 1);
        $this->config = array_merge($yamlconfig, $ini_config);
    }

    public function getModulesConfig($key)
    {
        try {
            $data = Capsule::table($this->table)
                ->where('module', $this->module)
                ->where('setting',$key)
                ->first();

            return [
                'status' => 1,
                'data' => $data,
                'message' => 'success'
            ];
        } catch (\Exception $e) {
            return [
                'status' => 0,
                'message' => $e,
            ];
        }
    }
    public function getSystemConfig($key){
        try {
            $data = Capsule::table($this->configtable)
                ->where('setting', $key)
                ->first();
            return [
                'status' => 1,
                'data' => $data,
                'message' => 'success'
            ];
        }catch (\Exception $exception){
            return [
                'status' => 0,
                'message' => $exception->getMessage(),
            ];
        }
    }
    public function getAppEnv(){
        return $this->config['application']['environment'];
    }
    public function getDefaultProductConfigs(){
        return $this->config['default_products'][$this->getAppEnv()];
    }

    public function getPersyaratanDomain(){
        return $this->config['persyaratan_domain'];
    }
    /**
     * @return mixed
     */
    public function getConfig()
    {
        return $this->config;
    }

    /**
     * @param mixed $config
     */
    public function setConfig($config)
    {
        $this->config = $config;
    }
}