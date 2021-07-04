<?php
/**
 * Created by PhpStorm.
 * User: sai
 * Date: 11/28/15
 * Time: 3:26 PM
 */

namespace BeonOrder\Libs\Wizcrm\Basic;


use Phalcon\Di\FactoryDefault;
use Phalcon\Validation;
use Phalcon\Validation\Validator\Email;
use Phalcon\Validation\Validator\PresenceOf;

class Validator
{

    /**
     * @var Validation
     */
    public $v;

    public $messages;

    public $isValid = false;

    /**
     * Validator constructor.
     */
    public function __construct()
    {
        $this->v =  new Validation();
    }

    public function reset()
    {
        $this->v = new Validation();
        return $this;
    }

    public function required($name, $message)
    {
        $this->v->add(
            $name,
            new PresenceOf(
                array(
                    'message' => $message
                )
            )
        );

        $this->v->setFilters($name, 'trim');

        return $this;
    }


    public function url($name, $message)
    {
        $this->v->add(
            $name,
            new \Phalcon\Validation\Validator\Url(
                array(
                    'message' => $message
                )
            )
        );

        return $this;
    }

    public function email($name, $message)
    {
        $this->v->add(
            $name,
            new Email(
                array(
                    'message' => $message,
                    'allowEmpty' => true
                )
            )
        );

        return $this;
    }

    public function number($name, $message)
    {
//        $this->v->add(
//            $name,
//            new \Phalcon\Validation\Validator\Numericality(
//                array(
//                    'message' => $message,
//                    'allowEmpty' => true
//                )
//            )
//        );
//
        return $this;
    }

//    public function file($name, $label, $maxSize='2b', $allowedTypes=['image/jpeg', 'image/png'], $maxResolution = '1x1')
//    {
//
//        $this->v->add($name, new \Phalcon\Validation\Validator\File(array(
//            'maxSize' => $maxSize,
//            'messageSize' => $label . ' exceeds the max filesize (:max)',
//            'allowedTypes' => $allowedTypes,
//            'messageType' => 'Allowed file types are :types',
//            'maxResolution' => $maxResolution,
//            'messageMaxResolution' => 'Max resolution of '.$label.' is :max'
//        )));
//
//        return $this;
//    }


    public function validate($params)
    {
        $messages = $this->v->validate($params);
        if (count($messages)) {
            $this->buildMessage();
            $this->isValid = false;
        }else{
            $this->isValid = true;
        }
    }

    public function buildMessage()
    {
        $this->messages = [];
        foreach ($this->v->getMessages() as $message) {
            $this->messages[$message->getField()] = $message->getMessage();
        }
    }



}