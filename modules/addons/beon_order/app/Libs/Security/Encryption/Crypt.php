<?php
/**
 * Created by PhpStorm.
 * User: beon
 * Date: 3/12/18
 * Time: 2:38 AM
 */

namespace BeonOrder\Libs\Security\Encryption;


use BeonOrder\Libs\Security\Crypto\Crypto;
use BeonOrder\Libs\Security\Crypto\Exception\BadFormatException;
use BeonOrder\Libs\Security\Crypto\Exception\EnvironmentIsBrokenException;
use BeonOrder\Libs\Security\Crypto\Key;
use BeonOrder\Libs\Security\Crypto\KeyProtectedByPassword;

class Crypt
{

    /**
     * @var KeyProtectedByPassword $key
     */
    public static $key;
    private $password;
    /**
     * @var Key $decryptedKey
     */
    private $decryptedKey;

    public function __construct($password)
    {
        $this->password = $password;
    }

    public function setPassword($password){
        $this->password = $password;
    }

    /**
     * Creates a new random key protected by the password that have been set before.
     *
     * @throws EnvironmentIsBrokenException
     *
     */
    public function createNewKey(){
        self::$key = KeyProtectedByPassword::createRandomPasswordProtectedKey($this->password);
        $this->decryptedKey = null;
    }

    /**
     * Creates a new random key protected by the password that have been set before.
     *
     * @throws EnvironmentIsBrokenException
     *
     */
    public function createNewKeyIfNotExist(){
        if(!(self::$key instanceof KeyProtectedByPassword)){
            self::$key = KeyProtectedByPassword::createRandomPasswordProtectedKey($this->password);
            $this->decryptedKey = null;
        }
    }

    /**
     * Load key protected with password from ascii key.
     *
     * @throws BadFormatException
     *
     */
    public function loadExistingKey($ascii_key){
        self::$key = KeyProtectedByPassword::loadFromAsciiSafeString($ascii_key);
        $this->decryptedKey = null;
    }

    /**
     * Decrypt data with unlocked key
     *
     * @throws \Exception
     *
     */
    public function decrypt($data){
        $this->decryptKey();

        if(!($this->decryptedKey instanceof Key))
            throw new \Exception('You must decrypt the encrypted key first before encrypting a/some data');

        return Crypto::decrypt($data, $this->decryptedKey);

    }

    /**
     * Encrypt data with unlocked key
     *
     * @throws \Exception
     *
     */
    public function encrypt($data){
        $this->decryptKey();

        if(!($this->decryptedKey instanceof Key))
            throw new \Exception('You must decrypt the encrypted key first before encrypting a/some data');

        return Crypto::encrypt($data, $this->decryptedKey);

    }

    /**
     * Decrypt the current encrypted key with password that have been set before
     *
     * @throws \Exception
     *
     */
    private function decryptKey(){
        if(!(self::$key instanceof KeyProtectedByPassword))
            throw new \Exception('You must specify key by load existing or creating new one');
        if(empty($this->password))
            throw new \Exception('You must specify the password that used for decryption');

        if(!($this->decryptedKey instanceof Key)){
            $this->decryptedKey = self::$key->unlockKey($this->password);
        }

    }

}