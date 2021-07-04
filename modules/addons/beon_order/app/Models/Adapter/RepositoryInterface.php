<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 3/5/18
 * Time: 11:19 AM
 */

namespace BeonOrder\Models\Adapter;


interface RepositoryInterface
{
    function buildParam();
    function validate();
}