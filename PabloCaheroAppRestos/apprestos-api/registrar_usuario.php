<?php
// htdocs/apprestos-api/registrar_usuario.php
include 'conexion.php';

// Recibir JSON de React Native
$data = json_decode(file_get_contents("php://input"), true);

$nombre = $data['nombre'] ?? '';
$correo = $data['correo'] ?? '';
$pass = $data['contrasena'] ?? '';
$tipo = $data['tipo_usuario'] ?? 'Consumidor';
// Telefono y dirección pueden ser opcionales al inicio
$telefono = $data['telefono'] ?? '';
$direccion = $data['direccion'] ?? '';

if(empty($correo) || empty($pass) || empty($nombre)) {
    echo json_encode(["success" => false, "message" => "Faltan datos obligatorios"]);
    exit();
}

// Encriptar contraseña (IMPORTANTE)
$pass_hash = password_hash($pass, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nombre_usuario, correo, contrasena, tipo_usuario, telefono, direccion) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $nombre, $correo, $pass_hash, $tipo, $telefono, $direccion);

if($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Usuario registrado"]);
} else {
    echo json_encode(["success" => false, "message" => "Error al registrar (quizás el correo ya existe)"]);
}
$stmt->close();
$conn->close();
?>