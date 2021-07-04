<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/14/18
 * Time: 4:32 PM
 */

namespace BeonOrder\Models\Adapter;


interface ApiInterface
{
    function sendPost($action, $params = []);

    function authenticate($username, $password);
}