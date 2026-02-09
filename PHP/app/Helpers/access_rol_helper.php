<?php

use Config\Services;
use Firebase\JWT\JWT;
use Firebase\JWT\Key; // IMPORTANTE: Necesario para la v7.0.2
use App\Models\RolModel;

/**
 * Valida el acceso basado en roles y el encabezado de autorización.
 * Actualizado para PHP 8.2+ y Firebase JWT v7.0+
 */
function validateAccess($roles, $authHeader)
{
    // 1. Validaciones básicas de entrada
    if (!is_array($roles) || empty($authHeader)) {
        return false;
    }

    try {
        // 2. Obtener la clave secreta y extraer el token
        $key = Services::getSecretKey();
        $arr = explode(' ', $authHeader);
        
        // Verificamos que el array tenga al menos el índice del token
        $jwtToken = $arr[1] ?? null;

        if (!$jwtToken) {
            return false;
        }

        /**
         * 3. Decodificación (Nueva sintaxis v7+)
         * Reemplazamos el array ['HS256'] por el objeto Key.
         */
        $decoded = JWT::decode($jwtToken, new Key($key, 'HS256'));

        // 4. Validar la existencia del rol en el modelo
        $rolModel = new RolModel();
        
        // Acceso al objeto decodificado (v7 mantiene la estructura de objeto)
        $rolId = $decoded->data->rol ?? null;

        if (!$rolId) {
            return false;
        }

        $rol = $rolModel->find($rolId);

        if ($rol == null) {
            return false;
        }

        // 5. Verificar si el nombre del rol está en la lista permitida
        if (!in_array($rol["nombre"], $roles)) {
            return false;
        }

        return true;

    } catch (\Exception $e) {
        // En un helper de validación, cualquier error (firma, expiración, etc.)
        // simplemente debe resultar en un acceso denegado (false).
        log_message('debug', '[validateAccess Error] ' . $e->getMessage());
        return false;
    }
}