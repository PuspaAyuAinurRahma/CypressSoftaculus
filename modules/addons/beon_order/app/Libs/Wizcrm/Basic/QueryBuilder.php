<?php
namespace BeonOrder\Libs\Wizcrm\Basic;

class QueryBuilder extends \Phalcon\Mvc\Model\Query\Builder
{
    protected function conditionOperatorValidation($operator){
        if(!in_array(strtolower($operator),array('=','<=','>=','<','>','in','not in','<>','like','not like'))){
            throw new \Exception('Operator Not Valid. Allow Operator is =,<=,>=,<,>,in,not in,<>,like,not like');
        }
    }

    protected $_columns = '*';
    /**
     * @param array $placeholders
     * @return \Phalcon\Db\ResultInterface
     */
    public function execute(array $placeholders = null)
    {
        $sqlString = $this->getPhql();
        $bindParams = (array) $placeholders + (array) $this->_bindParams;

        $di = $this->getDI();
        /** @var $mm \Phalcon\Mvc\Model\Manager */
        $mm = $di->get('modelsManager');
        /** @var $db \Phalcon\Db\AdapterInterface */
        $db = $di->get('db');
        /**
         * Replace model names to table names
         * [App\Models\Schemaname\Tablename] -> schemaname.tablename
         */
        $sqlString = preg_replace_callback('/\[([^\]]*)\]/m', function (array $matches) use ($mm) {
            if (strpos($matches[1], '\\') !== false) {
                $model = $mm->load($matches[1]);
                $schema = $model->getSchema();
                $table = $model->getSource();
                return $schema ? "$schema.$table" : $table;
            }
            return $matches[1];
        }, $sqlString);
        /**
         * Replace PHQL placeholders to PDO placeholders
         * :name: -> :name
         */
//        $sqlString = preg_replace('/(:[\w]*)(:)/m', '$1', $sqlString);

        /**
         * Replace new PHQL placeholders to PDO placeholders
         * {name} -> :name
         * {id:int} -> :id
         * {ids:array} -> :ids0, :ids1
         */
        $overiderBindParams = [];
        foreach($bindParams as $key => $value){
            if(ctype_digit(strval($key))){
                $overiderBindParams[":".$key.":"] = "'$value'";
            }else{
                $overiderBindParams[":".$key.":"] = $value;
            }
        }
        $queryWithParam     = str_replace(array_keys($overiderBindParams),array_values($overiderBindParams),$sqlString);
        return $db->query($queryWithParam);
    }

    public function buildCondition($conditions){
        $filter     = array();
        if(!empty($conditions)){
            $bind   = array();
            $condition = array();
            foreach($conditions['condition'] as $key => $value){
                $this->conditionOperatorValidation($value['operator']);
                if(strpos($value['field'], 'created_at')=== false){
                    if(strtolower($value['operator'])=="in" OR strtolower($value['operator'])=="not in"){
                        $condition[$key] = "`".$value['field']."` ".strtolower($value['operator'])." (:{$key}:)";
                    }else{
                        $condition[$key] = "`".$value['field']."` ".strtolower($value['operator'])." :{$key}:";
                    }
                }else{
                    $condition[$key] = "UNIX_TIMESTAMP(`".$value['field']."`) ".$value['operator']." UNIX_TIMESTAMP(:{$key}:)";
                }
                $bind[$key] = $value['value'];
            }
            $filter_conditions = "";
            $replace        = array('('=>' ) ',')'=>' ) ');
            $rewrite_pattern= str_replace(array_keys($replace),array_values($replace),$conditions['pattern']);
            $arr_pattern    = explode(' ',$rewrite_pattern);

            foreach($arr_pattern as $value){
                $index = trim($value);
                if(array_key_exists($index,$condition)){
                    $filter_conditions .= " ".$condition[$value];
                }else{
                    $filter_conditions .= " ".$value;
                }
            }
            $filter['bind'] = $bind;
            $filter['conditions'] = $filter_conditions;
        }
        return $filter;
    }
}