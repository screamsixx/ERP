<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class Cors implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        // Permitir acceso desde cualquier origen
        header("Access-Control-Allow-Origin: *");
        
        // Permitir los headers específicos que usa Angular (Content-Type, Authorization, etc.)
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
        
        // Permitir los métodos HTTP comunes
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

        // Manejar la petición "Preflight" (OPTIONS) que hace el navegador antes de la real
        $method = $_SERVER['REQUEST_METHOD'];
        if ($method == "OPTIONS") {
            die();
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // No es necesario hacer nada después
    }
}
