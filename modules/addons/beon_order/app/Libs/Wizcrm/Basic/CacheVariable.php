<?php
namespace BeonOrder\Libs\Wizcrm\Basic;

class CacheVariable extends One
{
    protected $di;
    protected $session;
    protected $data;
    protected $time;
    protected $defaultCacheTime = 120;// 2 menit

    public function __construct(){
        $this->di =& $GLOBALS['di'];
        $this->session = $this->di->get('session');
    }

    public function get($key){
        $data   = $this->session->get('data');
        $time   = $this->session->get('time');
        if(array_key_exists($key,$data) && array_key_exists($key,$time)){
            if($time[$key] < strtotime('now')){
                return false;
            }else{
                return $data[$key];
            }
        }else{
            return false;
        }
    }

    public function set($key,$value){
        $data   = $this->session->get('data');
        $time   = $this->session->get('time');

        $data[$key] = $value;
        $time[$key] = strtotime('+'.$this->defaultCacheTime." second");
        $this->session->set('data', $data);
        $this->session->set('time', $time);
        return $data[$key];
    }

    public function destroy($key){
        $data   = $this->session->get('data');
        $time   = $this->session->get('time');

        unset($data[$key]);
        unset($time[$key]);
        $this->session->set('data', $data);
        $this->session->set('time', $time);
    }
}