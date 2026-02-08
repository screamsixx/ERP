<?php 

namespace App\Models;

use CodeIgniter\Model;

class PrecioModel extends Model
{
    protected $table            = 'precios';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;

    protected $returnType       = 'array';
    protected $allowedFields    = ['categoria_id', 'nombre', 'precio_sin_iva', 'precio_con_iva'];

    protected $useTimestamps    = false;

    protected $validationRules  = [
        'categoria_id'   => 'required|integer|is_not_unique[categoria.id]',
        'nombre'         => 'required|string|min_length[3]|max_length[255]',
        // Cambiamos 'decimal' por 'numeric' para que acepte cualquier número (con o sin punto)
        'precio_sin_iva' => 'permit_empty|numeric',
        'precio_con_iva' => 'permit_empty|numeric',
    ];

    protected $validationMessages = [
        'categoria_id' => [
            'required'      => 'El ID de la categoría es obligatorio.',
            'is_not_unique' => 'La categoría proporcionada no existe.'
        ],
        'precio_sin_iva' => [
            'numeric' => 'El precio debe ser un número válido.'
        ],
        'precio_con_iva' => [
            'numeric' => 'El precio debe ser un número válido.'
        ]
    ];

    protected $skipValidation = false;
}