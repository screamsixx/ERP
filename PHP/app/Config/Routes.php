<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->post('/auth/login', 'Auth::login');
$routes->get('testdb', 'TestDb::index');


$routes->group('api', ['namespace' => 'App\Controllers', 'filter' => 'authFilter'], function ($routes) {

	//Solo puede consumir los administradores

	$routes->get('roles', 'Roles::index');
	$routes->post('roles/create', 'Roles::create');
	$routes->get('roles/edit/(:num)', 'Roles::edit/$1');
	$routes->put('roles/update/(:num)', 'Roles::update/$1');
	$routes->delete('roles/delete/(:num)', 'Roles::delete/$1');

	$routes->get('usuarios', 'Usuarios::index');
	$routes->put('usuarios/update/(:num)', 'Usuarios::update/$1');
	$routes->delete('usuarios/delete/(:num)', 'Usuarios::delete/$1');
	$routes->post('usuarios/create', 'Usuarios::create');

		// Rutas para Categorias
	$routes->get('categorias', 'Categorias::index');
	$routes->post('categorias/create', 'Categorias::create');
	$routes->put('categorias/update/(:num)', 'Categorias::update/$1');
	$routes->delete('categorias/delete/(:num)', 'Categorias::delete/$1');

	// Rutas para Precios
	$routes->get('precios', 'Precios::index');
	$routes->post('precios/create', 'Precios::create');
	$routes->put('precios/update/(:num)', 'Precios::update/$1');
	$routes->delete('precios/delete/(:num)', 'Precios::delete/$1');

	// Rutas para Puestos
    $routes->get('puestos', 'Puestos::index');
    $routes->post('puestos/create', 'Puestos::create');
    $routes->get('puestos/show/(:num)', 'Puestos::show/$1'); // Opcional por si quieres ver uno solo
    $routes->put('puestos/update/(:num)', 'Puestos::update/$1');
    $routes->delete('puestos/delete/(:num)', 'Puestos::delete/$1');

    // Rutas para Empleados
    $routes->get('empleados', 'Empleados::index');
    $routes->post('empleados/create', 'Empleados::create');
    $routes->get('empleados/show/(:num)', 'Empleados::show/$1'); // Opcional
    $routes->put('empleados/update/(:num)', 'Empleados::update/$1');
    $routes->delete('empleados/delete/(:num)', 'Empleados::delete/$1');
});


/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
