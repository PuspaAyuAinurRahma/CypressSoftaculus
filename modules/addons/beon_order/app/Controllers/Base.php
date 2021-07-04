<?php
namespace BeonOrder\Controllers;

class Base
{
    public $vars;
    protected $admin_id;
    protected $module_config;
    protected $post;
    protected $get;
    protected $errorPage;

    public function __construct($vars)
    {
        $this->vars     = $vars;
        $this->post     = $vars['post'];
        $this->get      = $vars['get'];
        $this->admin_id = $_SESSION['adminid'];
        $this->vars['_lang'] = $this->loadLang();
    }

    protected function loadTemplate($path,$param){
        $this->loadAssets();
        extract((array)$param);

        require_once(BEON_ORDER_BASE_DIR."/app/Views".$path.".php");
    }

    protected function responseJson($data){
        header('Content-Type: application/json');
        echo json_encode($data);
        die;
    }

    protected function reformatDate($date){
        $newdate    =  explode("/",$date);
        if(is_array($newdate)){
            return $newdate[2]."-".$newdate[1]."-".$newdate[0];
        }
        return "";
    }

    protected function formatDate($date){
        $newdate    =  explode("-",date("d/m/Y",$date));
        if($newdate){
            return $newdate;
        }
        return "";
    }

    public function loadAssets(){
        echo '
        <link href="../modules/addons/revoluzio_crm/node_modules/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="../modules/addons/revoluzio_crm/node_modules/froala-editor/css/froala_editor.pkgd.min.css" rel="stylesheet" type="text/css" />
        <link href="../modules/addons/revoluzio_crm/node_modules/froala-editor/css/froala_style.min.css" rel="stylesheet" type="text/css" />
        <link href="../modules/addons/revoluzio_crm/node_modules/datatables/media/css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
        <link href="../modules/addons/revoluzio_crm/node_modules/sweetalert2/dist/sweetalert2.min.css" rel="stylesheet" type="text/css" />
        <link href="../modules/addons/revoluzio_crm/node_modules/switchery/dist/switchery.min.css" rel="stylesheet" type="text/css" />
        <link href="../modules/addons/revoluzio_crm/node_modules/select2/dist/css/select2.min.css" rel="stylesheet" type="text/css" />
        
        
        <script type="text/javascript" src="../modules/addons/revoluzio_crm/node_modules/datatables/media/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="../modules/addons/revoluzio_crm/node_modules/sweetalert2/dist/sweetalert2.min.js"></script>
        <script type="text/javascript" src="../modules/addons/revoluzio_crm/node_modules/switchery/dist/switchery.min.js"></script>
        <script type="text/javascript" src="../modules/addons/revoluzio_crm/node_modules/select2/dist/js/select2.min.js"></script>
        <script type="text/javascript" src="../modules/addons/revoluzio_crm/node_modules/froala-editor/js/froala_editor.pkgd.min.js"></script>
        ';
    }

    public function download_send_headers($filename) {
        // disable caching
        $now = gmdate("D, d M Y H:i:s");
        header("Expires: Tue, 03 Jul 2001 06:00:00 GMT");
        header("Cache-Control: max-age=0, no-cache, must-revalidate, proxy-revalidate");
        header("Last-Modified: {$now} GMT");

        // force download
        header("Content-Type: application/force-download");
        header("Content-Type: application/octet-stream");
        header("Content-Type: application/download");

        // disposition / encoding on response body
        header("Content-Disposition: attachment;filename={$filename}");
        header("Content-Transfer-Encoding: binary");
    }

    function array2csv(array $header, array &$array)
    {
        if (count($array) == 0) {
            return null;
        }
        ob_start();
        $df = fopen("php://output", 'w');

        $head_row = [];
        foreach($header as $hv) {
            $head_row[] = $hv['name'];
        }
        fputcsv($df, $head_row);

        foreach ($array as $row) {
            $fix_row    = [];
            $temp_row   = (array) $row;

            foreach($header as $h => $hv) {
                if(!empty($temp_row[$h])) {
                    $fix_row[] = str_replace('[[value]]', $temp_row[$h], $hv['format']);
                }
            }

            fputcsv($df, $fix_row);
        }
        fclose($df);
        return ob_get_clean();
    }

    public function loadLang()
    {
        global $CONFIG;
        if(array_key_exists($_SESSION,'Language')){
            $lang   = $_SESSION['Language'];
        }else{
            $lang   = $CONFIG['Language'];
        }
        if(file_exists(__DIR__ . '../../../lang/'.$lang.'.php')){
            $lang_file  = __DIR__ . '../../../lang/'.$lang.'.php';
        }else{
            $lang_file  = __DIR__ . '../../../lang/english.php';
        }
        $lang = include $lang_file;

        return $lang;
    }

    public function isJSON($string)
    {
        return is_string($string) && is_array(json_decode($string, true)) && (json_last_error() == JSON_ERROR_NONE) ? true : false;
    }

    public function convertMonth($month)
    {
        $new_month = '';

        switch($month){
            case 1: $new_month = 'Januari'; break;
            case 2: $new_month = 'Februari'; break;
            case 3: $new_month = 'Maret'; break;
            case 4: $new_month = 'April'; break;
            case 5: $new_month = 'Mei'; break;
            case 6: $new_month = 'Juni'; break;
            case 7: $new_month = 'Juli'; break;
            case 8: $new_month = 'Agustus'; break;
            case 9: $new_month = 'September'; break;
            case 10: $new_month = 'Oktober'; break;
            case 11: $new_month = 'November'; break;
            case 12: $new_month = 'Desember'; break;
        }

        return $new_month;
    }

    public function convertDay($day)
    {
        $new_day = '';

        switch($day){
            case 1: $new_day = 'Senin'; break;
            case 2: $new_day = 'Selasa'; break;
            case 3: $new_day = 'Rabu'; break;
            case 4: $new_day = 'Kamis'; break;
            case 5: $new_day = 'Jum\'at'; break;
            case 6: $new_day = 'Sabtu'; break;
            case 7: $new_day = 'Minggu'; break;
        }

        return $new_day;
    }
}