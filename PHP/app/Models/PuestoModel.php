<?php

namespace App\Models;

use CodeIgniter\Model;

class PuestoModel extends Model
{
    protected $table            = 'puesto';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['nombre', 'salario_base'];

    // SQLite no tiene estas columnas en tu tabla actual
    protected $useTimestamps    = false;

    protected $validationRules = [
        // is_unique[puesto.nombre,id,{id}] evita duplicados pero permite editar el mismo registro
        'nombre'       => 'required|string|min_length[3]|max_length[100]|is_unique[puesto.nombre,id,{id}]',
        'salario_base' => 'permit_empty|numeric'
    ];

    protected $validationMessages = [
        'nombre' => [
            'is_unique' => 'Ya existe un puesto con ese nombre.'
        ]
    ];

    protected $skipValidation = false;
}