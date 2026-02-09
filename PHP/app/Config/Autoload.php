<?php

namespace Config;

use CodeIgniter\Config\AutoloadConfig;

/**
 * -------------------------------------------------------------------
 * AUTOLOADER CONFIGURATION
 * -------------------------------------------------------------------
 * Fusionado para compatibilidad PHP 8.3 + CodeIgniter 4.5+
 */
class Autoload extends AutoloadConfig
{
    /**
     * -------------------------------------------------------------------
     * Namespaces
     * -------------------------------------------------------------------
     * Mantenemos 'Config' explícito para evitar errores en tu código viejo.
     *
     * @var array<string, string>
     */
    public $psr4 = [
        APP_NAMESPACE => APPPATH, // Normalmente 'App'
        'Config'      => APPPATH . 'Config',
    ];

    /**
     * -------------------------------------------------------------------
     * Class Map
     * -------------------------------------------------------------------
     */
    public $classmap = [];

    /**
     * -------------------------------------------------------------------
     * Files
     * -------------------------------------------------------------------
     * Requerido por las versiones nuevas de CI4.
     *
     * @var list<string>
     */
    public $files = [];

    /**
     * -------------------------------------------------------------------
     * Helpers
     * -------------------------------------------------------------------
     * Requerido por las versiones nuevas de CI4.
     *
     * @var list<string>
     */
    public $helpers = [];
}