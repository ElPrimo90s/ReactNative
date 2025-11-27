<?php
// htdocs/apprestos-api/login.php
include 'conexion.php';

$data = json_decode(file_get_contents("php://input"), true);
$correo = $data['correo'] ?? '';
$pass = $data['contrasena'] ?? '';

$sql = "SELECT id_usuario, nombre_usuario, contrasena, tipo_usuario FROM usuarios WHERE correo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo);
$stmt->execute();
$result = $stmt->get_result();

if($row = $result->fetch_assoc()) {
    // Verificar el hash de la contraseña
    if(password_verify($pass, $row['contrasena'])) {
        echo json_encode([
            "success" => true,
            "message" => "Bienvenido",
            "id_usuario" => $row['id_usuario'],
            "nombre_usuario" => $row['nombre_usuario'],
            "role" => $row['tipo_usuario'] // Esto controla tu navegación en React Native
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
}
$stmt->close();
$conn->close();
?>