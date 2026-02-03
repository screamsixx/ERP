<?php namespace App\Controllers;

use App\Models\PrecioModel;
use CodeIgniter\RESTful\ResourceController;

class Precios extends ResourceController
{
    public function __construct() {
        $this->model = $this->setModel(new PrecioModel());
    }

    public function index()
    {
        $precios = $this->model->findAll();
        return $this->respond($precios);
    }

    public function create()
    {
        try {
            $precio = $this->request->getJSON();
            if ($this->model->insert($precio)) {
                $precio->id = $this->model->insertID();
                return $this->respondCreated($precio);
            } else {
                return $this->failValidationError($this->model->validation->listErrors());
            }
        } catch (\Exception $e) {
            return $this->failServerError('Ha ocurrido un error en el servidor');
        }
    }

    public function update($id = null)
    {
        try {
            if ($id == null) {
                return $this->failValidationError('No se ha pasado un Id valido');
            }

            $precioVerificado = $this->model->find($id);
            if ($precioVerificado == null) {
                return $this->failNotFound('No se ha encontrado un precio con el id: ' . $id);
            }

            $precio = $this->request->getJSON();

            if ($this->model->update($id, $precio)) {
                $precio->id = $id;
                return $this->respondUpdated($precio);
            } else {
                return $this->failValidationError($this->model->validation->listErrors());
            }

        } catch (\Exception $e) {
            return $this->failServerError('Ha ocurrido un error en el servidor');
        }
    }

    public function delete($id = null)
    {
        try {
            if ($id == null) {
                return $this->failValidationError('No se ha pasado un Id valido');
            }

            $precioVerificado = $this->model->find($id);
            if ($precioVerificado == null) {
                return $this->failNotFound('No se ha encontrado un precio con el id: ' . $id);
            }

            if ($this->model->delete($id)) {
                return $this->respondDeleted($precioVerificado);
            } else {
                return $this->failServerError('No se ha podido eliminar el registro');
            }

        } catch (\Exception $e) {
            return $this->failServerError('Ha ocurrido un error en el servidor');
        }
    }
}