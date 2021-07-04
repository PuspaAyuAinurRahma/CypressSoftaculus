<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 3/14/18
 * Time: 12:57 PM
 */

namespace BeonOrder\Libs\Security\Encryption;

use BeonOrder\Libs\Security\Jwt\JWT as HelperJWT;

class Jwt
{
    private $private_key = <<<EOD
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEA0vMFxSCnh3nsYADTQY3AyNoX221oW4a77swP4MR7pxLkEBMH
FdIzIYQQTtoHAKepLZJ8CI1o/2DUsQHq/tf3wJX+SG+wgGGGzXfUD1sEOyNR8Kh5
EdqZE/AdjEIhrtHqfDyDJLovdAkhf3uS45UEsh498bpceGJSVMw/aoc4f33ZQNnk
I8zg5C7IfjpcX9Ab7IkvWScfbochSY8NMXUNcwKtAdxfRX76tcXk523rFXlYSnNr
1N23SciUjvmzsRT/NXeMXOd+HmsMKEKgBMETP6cHJlY+vWnXy3t2MdqckI3sj8Rp
MrdjxAJCv1KNcmQ2cMFgkOP0K4VbMEea929ETwIDAQABAoIBADjLn7kUcqaiKAct
EbPro4UwWw4EJf3Gh+DiZkABBr3T8z10sgqo/oU+lll0kEAX5A/WCbkPwb5IZtuF
hay5nwXmHIGKOL5IA9BcO+cqfTgi6VPfOEGbVm2sz3fM8l6sO/LZJAIGcvJN5wv4
zHKj05DVXZ4wq+bpqfsUxto6r/Z7AXCk2V0rSncN1Z1aRnJWQ+2YPvd3ZH0QsTLR
LxQoFPe4GoxQhsc6ruJjiFRywk34Kec2305iKYQ9+lOiOAzDTNnFgZudKbTh1Aw8
lc9+HCcbZ37ZRF835sAK89KflW9YuQYX4bLCFNOdde4ZlGBqxJf6iP0zB11xqySE
T/TTI2ECgYEA9HGsspyMBVDvdOuxDru4daRa8CWxl318KX8fZV0ifAzspOxneqIT
LbKnw8Tg0fy51I2GJqwbKPOd68JJWveGtKgFZw7snldx9OZYX4URS0jP3Mgy2DNy
3vjnrXtwzFRH9bYlusdF20SsuUNUciSeWhUz8+F8h9rXoLc+Bdno4t8CgYEA3Ov8
Ztimdw5njGYgut2UJFUmCqB79XkZgGEsJlKk/Pd1cv1mknAC46Toq5LyNdsurfOr
jeLLO8N+lPyd1qhbvDXAjtJ5QHXVoijZlMbWOAnEDJt/YV3tir+ayyRADrlVQ+Ri
7Ka6U+FGoQmsgTXnkEPUU86j5nf7NYP4Wqx1vJECgYAupj75+ywxm4eHPa+Vizeh
o9MC/36L1ZPLa4o3UvXQzLqgoskAu0uDrhOcJcdt65gfOz79xFyOjSd3JaXQKWrY
sTQOvedkNHX38bmtyPxK7MNWdBJX9kGW0dOM5QDazb7J4pACvCLVvJ5l4LaN7fUW
ZfN7OG4GkzoRXscEYNiz6wKBgHXrTEUFHQ1tVd394Th87wbZoD2J3cBvzCnXND6c
XE5eM4WWNjqxqQkjS8HQ5JHUlTzqVEaeqIYU2iriD8m1AYobUtWpCGlcvBQbI9Ai
tdMhe1CTa1FoVlN55EDL75ksWZOsgxT4BXqiQxXP2RD62cgKPHojUR7CKgctktGr
PgjRAoGBANnoBsmdBXMyNJBC5Buy6QO0WYSY9WCaMPbVxcS7slXRldFwQY1gb+3w
3Ug/c/XEI30ns3A06LJ9om967qQbl3mYqf6N1eSH97tteyXyX3xfCyOav7Ykb1kY
bMnPMJZpX8w0VKyM27ZUO3OFoaLswisMcr77l6mYBsvdrZgXSo5O
-----END RSA PRIVATE KEY-----
EOD;
    private $public_key = <<<EOD
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0vMFxSCnh3nsYADTQY3A
yNoX221oW4a77swP4MR7pxLkEBMHFdIzIYQQTtoHAKepLZJ8CI1o/2DUsQHq/tf3
wJX+SG+wgGGGzXfUD1sEOyNR8Kh5EdqZE/AdjEIhrtHqfDyDJLovdAkhf3uS45UE
sh498bpceGJSVMw/aoc4f33ZQNnkI8zg5C7IfjpcX9Ab7IkvWScfbochSY8NMXUN
cwKtAdxfRX76tcXk523rFXlYSnNr1N23SciUjvmzsRT/NXeMXOd+HmsMKEKgBMET
P6cHJlY+vWnXy3t2MdqckI3sj8RpMrdjxAJCv1KNcmQ2cMFgkOP0K4VbMEea929E
TwIDAQAB
-----END PUBLIC KEY-----
EOD;

    public function encrypt($token){
        return HelperJWT::encode($token, $this->private_key, 'RS256');
    }

    public function decrypt($jwt){
        return HelperJWT::decode($jwt, $this->public_key, array('RS256'));
    }

}