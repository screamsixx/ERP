<?php namespace App\Models;

use CodeIgniter\Model;

class PrecioModel extends Model
{
    protected $table            = 'precios';
    protected $primaryKey       = 'id';

    protected $returnType       = 'array';
    protected $allowedFields    = ['categoria_id', 'nombre', 'precio_sin_iva', 'precio_con_iva'];

    protected $useTimestamps    = true;
    protected $createdField     = 'created_at';
    protected $updatedField     = 'updated_at';

    protected $validationRules  = [
        'categoria_id'   => 'required|integer|is_not_unique[categoria.id]',
        'nombre' => 'required|string|min_length[3]|max_length[255]',
        'precio_sin_iva' => 'permit_empty|decimal',
        'precio_con_iva' => 'permit_empty|decimal',
    ];

    protected $validationMessages = [
        'categoria_id' => ['is_not_unique' => 'Debe proporcionar una categoría que ya exista.']
    ];

    protected $skipValidation = false;
}