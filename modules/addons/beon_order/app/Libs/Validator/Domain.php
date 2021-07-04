<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 3/5/18
 * Time: 2:56 PM
 */

namespace BeonOrder\Libs\Validator;


class Domain extends Base
{
    private $domain;

    public function __construct($domain = '')
    {
        if(!empty($domain)){
            $this->domain = $domain;
        }
    }

    public function getDomain($domain) {
        if(preg_match("/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i", $domain, $matches))
        {
            return $matches['domain'];
        } else {
            return $domain;
        }
    }

    public function getSubdomains($domain) {
        $subdomains = $domain;
        $domain = $this->getDomain($subdomains);

        $subdomains = rtrim(strstr($subdomains, $domain, true), '.');
        if(!empty($subdomains))
            return explode('.', $subdomains);
        return false;
    }


    public function isSubdomain($domain = ''){
        try{
            if(empty($domain))
                $domain = $this->domain;
            if(empty($domain))
                throw new \Exception('Domain cannot be empty');

            $parsedDomain = parse_url($domain, PHP_URL_HOST);
            if(null === $parsedDomain){
                $url='http://'.$domain;
                $parsedDomain=parse_url($url, PHP_URL_HOST);
                $domain = $parsedDomain;
            }

            $subDomains = $this->getSubdomains($domain);
            if(empty($subDomains))
                throw new \Exception('Domain ' . $domain . ' is not a subdomain');

            return [
                'status' => 1,
                'data' => $subDomains,
                'message' => 'Domain ' . $domain . ' is a subdomain',
            ];
        }catch (\Exception $e){
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

    public function validate($domain = ''){
        try{
            if(empty($domain))
                $domain = $this->domain;
            if(empty($domain))
                throw new \Exception('Domain cannot be empty');

            preg_match('/(?P<domain>^(http[s]?\:\/\/)?((\w+)\.)?(([\w-]+)?)(?P<extension>\.[\w-]+){1,2}$)/i', $domain, $match);
            if(empty($match))
                throw new \Exception('Domain ' . $domain . ' is not valid. e.g. example.com');

            $url = $domain;
            $parsedDomain = parse_url($url);
            if(!array_key_exists('host', $parsedDomain)){
                $url='http://'.$domain;
                $parsedDomain=parse_url($url);
            }

            if(array_key_exists('path', $parsedDomain))
                throw new \Exception('Domain cannot contain any path like example.com/example');

            $validateDomain = $parsedDomain['host'];
            if(strpos($validateDomain, '.') === false)
                throw new \Exception('Domain must have an extension. e.g. example.com');

            $this->domain = $validateDomain;

            return [
                'status' => 1,
                'data' => $validateDomain,
            ];
        }catch (\Exception $e){
            return [
                'status' => $e->getCode(),
                'message' => $e->getMessage(),
            ];
        }
    }

}