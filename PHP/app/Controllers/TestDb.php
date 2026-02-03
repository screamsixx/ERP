<?php namespace App\Controllers;

use CodeIgniter\Controller;
use Config\Database;

class TestDb extends Controller
{
	public function index()
	{
		try
		{
			$db = Database::connect();
			$db->initialize();
			echo "¡Éxito! Se ha accedido correctamente a la base de datos en: " . $db->database;
		}
		catch (\Throwable $e)
		{
			echo "Error de conexión: " . $e->getMessage();
		}
	}
}