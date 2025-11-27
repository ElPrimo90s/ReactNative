<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include("conexion.php");


$data = json_decode(file_get_contents("php://input"));

if (!empty($data->correo) && !empty($data->contrasena)) {
    $correo = $conn->real_escape_string($data->correo);
    $contrasena = $conn->real_escape_string($data->contrasena);

 
    $sql = "SELECT id_usuario, correo, nombre_usuario FROM usuarios WHERE correo = '$correo' AND contrasena = '$contrasena'"; 
    
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        http_response_code(200);
        echo json_encode(array("message" => "Inicio de sesión exitoso.", "user" => $user));
    } else {
        http_response_code(401); // No autorizado
        echo json_encode(array("message" => "Credenciales inválidas."));
    }
} else {
    http_response_code(400); // Solicitud incorrecta
    echo json_encode(array("message" => "Faltan datos de correo o contraseña."));
}

$conn->close();
?>