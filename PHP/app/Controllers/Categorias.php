<?php namespace App\Controllers;

use App\Models\CategoriaModel;
use CodeIgniter\RESTful\ResourceController;

class Categorias extends ResourceController
{
    public function __construct() {
        $this->model = $this->setModel(new CategoriaModel());
    }

	public function index()
	{
        $categorias = $this->model->findAll();
        return $this->respond($categorias);
    } 
    
    public function create()
    {
        try {
            $categoria = $this->request->getJSON();
            if($this->model->insert($categoria)):
                $categoria->id = $this->model->insertID();
                return $this->respondCreated($categoria);
            else:
                return $this->failValidationError($this->model->validation->listErrors());
            endif;
        } catch (\Exception $e) {
            return $this->failServerError('Ha ocurrido un error en el servidor');
        }
    }

    public function update($id = null)
	{
        try {
            if($id == null)
                return $this->failValidationError('No se ha pasado un Id valido');

            $categoriaVerificada = $this->model->find($id);
            if($categoriaVerificada == null)
                return $this->failNotFound('No se ha encontrado una categoría con el id: '.$id);

            $categoria = $this->request->getJSON();

            if($this->model->update($id, $categoria)):
                $categoria->id = $id;
                return $this->respondUpdated($categoria);
            else:
                return $this->failValidationError($this->model->validation->listErrors());
            endif;

        } catch (\Exception $e) {
            return $this->failServerError('Ha ocurrido un error en el servidor');
        }
    }
    
    public function delete($id = null)
	{
        try {
            if($id == null)
                return $this->failValidationError('No se ha pasado un Id valido');

            $categoriaVerificada = $this->model->find($id);
            if($categoriaVerificada == null)
                return $this->failNotFound('No se ha encontrado una categoría con el id: '.$id);

            if($this->model->delete($id)):
                return $this->respondDeleted($categoriaVerificada);
            else:
                return $this->failServerError('No se ha podido eliminar el registro');
            endif;

        } catch (\Exception $e) {
            return $this->failServerError('Ha ocurrido un error en el servidor');
        }
	}
}