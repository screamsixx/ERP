<?php

namespace App\Filters;

use App\Models\RolModel;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\API\ResponseTrait;
use Config\Services;
use Firebase\JWT\JWT;
use Firebase\JWT\Key; // IMPORTANTE: Nueva clase para v7+
use Firebase\JWT\ExpiredException;
use Firebase\JWT\SignatureInvalidException; // Opcional pero recomendada

class AuthFilter implements FilterInterface
{
    use ResponseTrait;

    public function before(RequestInterface $request, $arguments = null)
    {
        try {
            $key = Services::getSecretKey();
            
            // Obtenemos el header de autorización
            $authHeader = $request->getServer('HTTP_AUTHORIZATION');

            if (empty($authHeader)) {
                return Services::response()->setStatusCode(
                    ResponseInterface::HTTP_UNAUTHORIZED, 
                    'No se ha enviado el JWT requerido'
                );
            }

            // Extraemos el token (Bearer <token>)
            $arr = explode(' ', $authHeader);
            $jwtToken = $arr[1] ?? '';

            if (empty($jwtToken)) {
                return Services::response()->setStatusCode(
                    ResponseInterface::HTTP_UNAUTHORIZED, 
                    'Formato de Token inválido'
                );
            }

            /**
             * CAMBIO CLAVE PARA JWT v7:
             * Ya no se pasa solo la cadena $key y el array de algoritmos.
             * Ahora se instancia un objeto Firebase\JWT\Key.
             */
            $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));

            $rolModel = new RolModel();
            
            // Accedemos a los datos. En v7 se mantienen como objeto por defecto.
            $rolId = $decoded->data->rol ?? null;

            if (!$rolId) {
                return Services::response()->setStatusCode(
                    ResponseInterface::HTTP_UNAUTHORIZED, 
                    'El Token no contiene información de rol'
                );
            }

            $rol = $rolModel->find($rolId);

            if ($rol == null) {
                return Services::response()->setStatusCode(
                    ResponseInterface::HTTP_UNAUTHORIZED, 
                    'El rol del JWT es inválido'
                );
            }

            // Si llegamos aquí, el token es válido.
            return true;

        } catch (ExpiredException $ee) {
            return Services::response()->setStatusCode(
                ResponseInterface::HTTP_UNAUTHORIZED, 
                'Su Token JWT ha expirado'
            );
        } catch (SignatureInvalidException $se) {
            return Services::response()->setStatusCode(
                ResponseInterface::HTTP_UNAUTHORIZED, 
                'La firma del Token es inválida'
            );
        } catch (\Exception $e) {
            // Log para debug en caso de errores inesperados
            log_message('error', '[AuthFilter] ' . $e->getMessage());
            
            return Services::response()->setStatusCode(
                ResponseInterface::HTTP_INTERNAL_SERVER_ERROR, 
                'Ocurrió un error en el servidor al validar el token'
            );
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // No se requiere acción después del controlador
    }
}