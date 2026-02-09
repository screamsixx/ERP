<?php 

namespace App\Models;

use CodeIgniter\Model;

class EmpleadoModel extends Model
{
    protected $table            = 'empleado';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;
    protected $returnType       = 'array';
    protected $allowedFields    = ['puesto_id', 'nombre', 'apellido', 'email', 'fecha_ingreso'];

    // SQLite no tiene estas columnas en tu SQL actual
    protected $useTimestamps    = false;

    protected $validationRules = [
        'puesto_id'     => 'required|integer|is_not_unique[puesto.id]',
        'nombre'        => 'required|string|min_length[2]|max_length[150]',
        'apellido'      => 'required|string|min_length[2]|max_length[150]',
        // La regla is_unique[tabla.campo,id,{id}] permite actualizar el mismo registro sin error de duplicado
        'email'         => 'required|valid_email|is_unique[empleado.email,id,{id}]',
        'fecha_ingreso' => 'permit_empty|valid_date[Y-m-d]'
    ];

    protected $validationMessages = [
        'puesto_id' => [
            'is_not_unique' => 'El puesto seleccionado no existe en nuestra base de datos.'
        ],
        'email' => [
            'is_unique' => 'Este correo electrónico ya pertenece a otro empleado.'
        ]
    ];

    protected $skipValidation = false;
}