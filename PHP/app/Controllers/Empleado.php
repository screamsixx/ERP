<?php 

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Empleados extends ResourceController
{
    protected $modelName = 'App\Models\EmpleadoModel';
    protected $format    = 'json';

    // GET: Listar todos los empleados con su puesto
    public function index()
    {
        // Usamos el query builder para un JOIN rápido
        $data = $this->model->select('empleado.*, puesto.nombre as puesto_nombre')
                            ->join('puesto', 'puesto.id = empleado.puesto_id')
                            ->findAll();
        return $this->respond($data);
    }

    // GET: Obtener un solo empleado por ID
    public function show($id = null)
    {
        $data = $this->model->find($id);
        if (!$data) {
            return $this->failNotFound('Empleado no encontrado');
        }
        return $this->respond($data);
    }

    // POST: Crear nuevo empleado
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

    // PUT/PATCH: Actualizar empleado
    public function update($id = null)
    {
        try {
            $data = $this->request->getJSON(true);
            if (empty($data)) return $this->fail('No hay datos para actualizar', 400);

            if (!$this->model->find($id)) {
                return $this->failNotFound('El empleado no existe');
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

    // DELETE: Eliminar empleado
    public function delete($id = null)
    {
        try {
            $empleado = $this->model->find($id);
            if (!$empleado) {
                return $this->failNotFound('No se encontró el registro');
            }

            if ($this->model->delete($id)) {
                return $this->respondDeleted($empleado);
            }

            return $this->failServerError('No se pudo eliminar el registro');
        } catch (\Exception $e) {
            return $this->failServerError('Error: ' . $e->getMessage());
        }
    }
}