<?php namespace App\Models;

use CodeIgniter\Model;

class CategoriaModel extends Model
{
    protected $table            = 'categoria';
    protected $primaryKey       = 'id';
    protected $useAutoIncrement = true;

    protected $returnType       = 'array';
    protected $allowedFields    = ['nombre'];

    // CAMBIA ESTO A FALSE
    protected $useTimestamps    = false; 

    protected $validationRules  = [
        'nombre' => 'required|string|min_length[3]|max_length[100]',
    ];

    protected $skipValidation = false;
}