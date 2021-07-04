<?php
namespace BeonOrder\Libs\Wizcrm\Basic;

class Slack{
    protected $url;
    function __construct($url="")
    {
        if(empty($url)){
            // revo-api-dashboard
            $this->url  = "https://hooks.slack.com/services/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";
        }else{
            $this->url  = $url;
        }
    }

    public function slack($data,$title="")
    {
        ob_start();
        if(!empty($title)) echo $title."\n";
        echo '```';
        echo "\n";
        echo json_encode($data, JSON_PRETTY_PRINT);
        echo "\n";
        echo '```';
        $output = ob_get_contents();
        ob_end_clean();
        $this->slackSend($output);
    }

    public function slackStart()
    {
        ob_start();
    }

    public function slackEnd($title="")
    {
        $output = ob_get_contents();
        ob_end_clean();
        if(!empty($output))
            $output     = "<strong>{$title}</strong>\n";
        return $output;
    }

    public function slackSend($output)
    {
        $ch = curl_init();
        $curlConfig = array(
            CURLOPT_URL            => $this->url,
            CURLOPT_POST           => true,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POSTFIELDS     => http_build_query([
                'payload'                => json_encode([
                    'text' => $output
                ])
            ])
        );
        curl_setopt_array($ch, $curlConfig);
        curl_exec($ch);
        curl_close($ch);
    }

    public function formatToCode($output){
        return "```".$output."```";
    }
}