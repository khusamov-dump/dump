<?php

return array(
    
    'controllers' => array(
        'invokables' => array(
            'Alternativa\Controller\Index' => 'Alternativa\Controller\IndexController',
            'Alternativa\Controller\Config' => 'Alternativa\Controller\ConfigController',
            'Alternativa\Controller\Contractors' => 'Alternativa\Controller\ContractorsController',
            'Alternativa\Controller\Ref' => 'Alternativa\Controller\RefController'
        ),
    ),
		
	 'controller_plugins' => array(
	 	  'invokables' => array(
	 	  		//'currentDate' => 'Alternativa\Controller\Plugin\CurrentDate'
	 	  )
	 ),
    
    'router' => array(
        'routes' => array(
            
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Alternativa\Controller\Index',
                        'action'     => 'index',
                    ),
                ),
            ),
            
            // The following is a route to simplify getting started creating
            // new controllers and actions without needing to create a new
            // module. Simply drop new controllers in, and you can access them
            // using the path /application/:controller/:action
            'application' => array(
                'type'    => 'Literal',
                'options' => array(
                    'route'    => '/application',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Alternativa\Controller',
                        'controller'    => 'Index',
                        'action'        => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:controller[/:action]]/',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'     => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),
            ),
            
            // Маршрут для обработки REST-запросов от клиента на Sencha Ext JS 4
            'rest' => array(
                'type'    => 'Literal',
                'options' => array(
                    'route'    => '/alternativa/rest',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Alternativa\Controller',
                        'controller'    => 'Index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/:controller/[:id]',
                            'constraints' => array(
                                'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),
            ), 
            
        ),
    ),
    
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => array(
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
        'strategies' => array(
        	   'ViewJsonStrategy'
        )
    ),
    
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Db\Adapter\AdapterAbstractServiceFactory',
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
        ),
    ),
    
    'db' => array('adapters' => array(
        // Подключение к базе PostgreSQL
        'db/alternativa' => array(
            'driver' => 'Pgsql',
            'hostname' => 'alternativa.loc',
            'database' => 'alternativa',
            'username' => 'postgres',
            'password' => ''
        ),
    )),
    
    'caches' => array(
        'cache' => array(
            'adapter' => 'filesystem'
        )
    ),
    
);


