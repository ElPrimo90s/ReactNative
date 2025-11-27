<?php
// Configuración de la conexión a la base de datos
$host = "localhost";
$user = "root";
$password = "12345678"; // Contraseña del root
$db = "salud_solidaria"; // Nombre de la base de datos
 
// Crear conexión
$conn = new mysqli($host, $user, $password, $db);
 
// Verificar conexión
if ($conn->connect_error) {
    // Si la conexión falla, se detiene la ejecución
    die("Conexión fallida: " . $conn->connect_error);
}
?>