<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Puestos extends ResourceController
{
    protected $modelName = 'App\Models\PuestoModel';
    protected $format    = 'json';

    // GET: Listar todos los puestos
    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    // GET: Obtener un puesto por ID
    public function show($id = null)
    {
        $puesto = $this->model->find($id);
        if (!$puesto) {
            return $this->failNotFound('Puesto no encontrado');
        }
        return $this->respond($puesto);
    }

    // POST: Crear nuevo puesto
    public function create()
    {
        try {
            $data = $this->request->getJSON(true);
            if (empty($data)) return $this->fail('Datos inválidos', 400);

            if ($this->model->insert($data)) {
                $data['id'] = $this->model->insertID();
                return $this->respondCreated($data);
            }

            return $this->failValidationErrors($this->model->errors());
        } catch (\Exception $e) {
            return $this->failServerError('Error: ' . $e->getMessage());
        }
    }

    // PUT: Actualizar puesto
    public function update($id = null)
    {
        try {
            $data = $this->request->getJSON(true);
            if (!$this->model->find($id)) {
                return $this->failNotFound('El puesto no existe');
            }

            if ($this->model->update($id, $data)) {
                $data['id'] = $id;
                return $this->respondUpdated($data);
            }

            return $this->failValidationErrors($this->model->errors());
        } catch (\Exception $e) {
            return $this->failServerError('Error: ' . $e->getMessage());
        }
    }

    // DELETE: Eliminar puesto
    public function delete($id = null)
    {
        try {
            if (!$this->model->find($id)) {
                return $this->failNotFound('Puesto no encontrado');
            }

            // Verificación Senior: No borrar si hay empleados en este puesto
            $db = \Config\Database::connect();
            $empleadosEnPuesto = $db->table('empleado')->where('puesto_id', $id)->countAllResults();

            if ($empleadosEnPuesto > 0) {
                return $this->fail('No se puede eliminar el puesto porque tiene ' . $empleadosEnPuesto . ' empleado(s) asignado(s).', 400);
            }

            if ($this->model->delete($id)) {
                return $this->respondDeleted(['id' => $id, 'mensaje' => 'Puesto eliminado']);
            }

            return $this->failServerError('No se pudo eliminar el registro');
        } catch (\Exception $e) {
            return $this->failServerError('Error: ' . $e->getMessage());
        }
    }
}