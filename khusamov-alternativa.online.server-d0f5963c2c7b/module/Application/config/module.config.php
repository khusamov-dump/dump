<?php

return array(
	
    'router' => array(
        'routes' => array(
        	
            'home' => array(
                'type' => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/',
                    'defaults' => array(
                        'controller' => 'Application\Controller\Index',
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
                        '__NAMESPACE__' => 'Application\Controller',
                        'controller'    => 'Index',
                        'action'        => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:controller[/:action]][/]',
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
            
            // Маршрут для обработки REST-запросов от клиента на Sencha Ext JS 
            'rest' => array(
                'type'    => 'Literal',
                'options' => array(
                    'route'    => '/application/rest',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Application\Controller',
                        'controller'    => 'Index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/:controller[/][:id]',
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
    
    'service_manager' => array(
        'abstract_factories' => array(
            'Zend\Cache\Service\StorageCacheAbstractServiceFactory',
            'Zend\Log\LoggerAbstractServiceFactory',
            'Zend\Db\Adapter\AdapterAbstractServiceFactory',
        ),
        'aliases' => array(
            'translator' => 'MvcTranslator',
        ),
    ),
    
    /*'translator' => array(
        'locale' => 'en_US',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),*/
    
    'controllers' => array(
        'invokables' => array(
            'Application\Controller\Test' => 'Application\Controller\TestController',
            'Application\Controller\Index' => 'Application\Controller\IndexController',
            'Application\Controller\Individual' => 'Application\Controller\IndividualController',
            'Application\Controller\Legal' => 'Application\Controller\LegalController',
            'Application\Controller\LegalForm' => 'Application\Controller\LegalFormController',
            'Application\Controller\Businessman' => 'Application\Controller\BusinessmanController',
            'Application\Controller\Contractor' => 'Application\Controller\ContractorController',
            'Application\Controller\Contract' => 'Application\Controller\ContractController'
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
    
    // Placeholder for console routes
    /*'console' => array(
        'router' => array(
            'routes' => array(
            ),
        ),
    ),*/

	'db' => array(
		'adapters' => array(
			'db/test' => array(
				'driver' => 'Pgsql',
				'hostname' => 'localhost',
				'database' => 'test',
				'username' => 'test',
				'password' => 'ltlvfpfq',
				'profiler' => true
			),
			'db/temp' => array(
				'driver' => 'Pgsql',
				'hostname' => 'localhost',
				'database' => 'temp2',
				'username' => 'test',
				'password' => 'ltlvfpfq',
				'profiler' => true
			)
		)
	),
	   
);
