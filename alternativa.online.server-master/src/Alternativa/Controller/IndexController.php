<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Alternativa\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

use Zend\Db\Adapter\Driver\ResultInterface;
use Zend\Db\ResultSet\ResultSet;
use Zend\Config\Factory;

class IndexController extends AbstractActionController {
    
    /**
     * Рабочий стол программы.
     * По сути основная точка входа.
     * @see \Zend\Mvc\Controller\AbstractActionController::indexAction()
     */
    public function indexAction() {
        $view = new ViewModel();
        $this->layout("layout/desktop");
        return $view;
    }
    
}


