<?php
// htdocs/apprestos-api/conexion.php

$host = "localhost";
$user = "root";
$password = "12345678"; // Tu contraseña establecida
$db = "apprestos"; // Tu base de datos

$conn = new mysqli($host, $user, $password, $db);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Conexión fallida: " . $conn->connect_error]));
}

// Permitir acceso desde la app (CORS)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
?>