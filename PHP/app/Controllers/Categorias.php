<?php 

namespace App\Controllers;

use App\Models\CategoriaModel;
use CodeIgniter\RESTful\ResourceController;

class Categorias extends ResourceController
{
    // Al definir modelName, CI4 instancia el modelo automáticamente y lo pone en $this->model
    protected $modelName = 'App\Models\CategoriaModel';
    protected $format    = 'json';

    /**
     * Listar categorías
     */
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    /**
     * Crear categoría
     */
    public function create()
    {
        try {
            $data = $this->request->getJSON(true);

            if (empty($data)) {
                return $this->fail('Cuerpo de la petición inválido o vacío', 400);
            }

            if ($this->model->insert($data)) {
                $data['id'] = $this->model->insertID();
                return $this->respondCreated($data);
            }

            // Si falla la validación del modelo
            return $this->failValidationErrors($this->model->errors());

        } catch (\Exception $e) {
            return $this->failServerError('Error en el servidor: ' . $e->getMessage());
        }
    }

    /**
     * Actualizar categoría
     */
    public function update($id = null)
    {
        try {
            if ($id === null) {
                return $this->failValidationError('No se ha proporcionado un ID válido');
            }

            $existe = $this->model->find($id);
            if (!$existe) {
                return $this->failNotFound('No se encontró la categoría con ID: ' . $id);
            }

            $data = $this->request->getJSON(true);

            if (empty($data)) {
                return $this->fail('No hay datos para actualizar', 400);
            }

            if ($this->model->update($id, $data)) {
                $data['id'] = $id;
                return $this->respondUpdated($data);
            }

            return $this->failValidationErrors($this->model->errors());

        } catch (\Exception $e) {
            return $this->failServerError('Error en el servidor: ' . $e->getMessage());
        }
    }

    /**
     * Eliminar categoría
     */
    public function delete($id = null)
    {
        try {
            if ($id === null) {
                return $this->failValidationError('No se ha proporcionado un ID válido');
            }

            $categoria = $this->model->find($id);
            if (!$categoria) {
                return $this->failNotFound('No se encontró la categoría con ID: ' . $id);
            }

            if ($this->model->delete($id)) {
                return $this->respondDeleted(['id' => $id, 'mensaje' => 'Eliminado con éxito']);
            }

            return $this->failServerError('No se pudo eliminar el registro');

        } catch (\Exception $e) {
            return $this->failServerError('Error en el servidor: ' . $e->getMessage());
        }
    }
}