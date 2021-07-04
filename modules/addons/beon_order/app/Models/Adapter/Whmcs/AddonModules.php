<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 3/13/18
 * Time: 4:49 PM
 */

namespace BeonOrder\Models\Adapter\Whmcs;

use BeonOrder\Libs\Logger\Exception;
use Illuminate\Database\Capsule\Manager as DB;

class AddonModules extends Api
{
    public function getAddonModules($module){
        try{
            $result = [];
            DB::connection()->setFetchMode(\PDO::FETCH_ASSOC);

            if(empty($module))
                throw new Exception('Module cannot be empty');

            $configSetting = DB::table('tbladdonmodules')->where('module', $module)->get();
            if(!$configSetting)
                throw new Exception('Module configuration '. $module .' not found');

            DB::connection()->setFetchMode(\PDO::FETCH_OBJ);

            foreach($configSetting as $cs){
                $result[$cs['setting']] = $cs['value'];
            }

            return $result;
        }catch (Exception $e){
            return false;
        }
    }
}