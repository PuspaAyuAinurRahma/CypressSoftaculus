<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 2/14/18
 * Time: 10:52 AM
 */
if(!defined('BEON_ORDER_DEBUG'))
    define('BEON_ORDER_DEBUG', 1);

if(!defined('BEON_ORDER_BASE_DIR'))
    define('BEON_ORDER_BASE_DIR', __DIR__);

if(!defined('BEON_ORDER_APP_DIR'))
    define('BEON_ORDER_APP_DIR', __DIR__ . '/app/');

if(!defined('BEON_ORDER_HOOKS_DIR'))
    define('BEON_ORDER_HOOKS_DIR', __DIR__ . '/hooks/');

if(!defined('BEON_ORDER_VIEW_DIR'))
    define('BEON_ORDER_VIEW_DIR', BEON_ORDER_APP_DIR . '/Views/');