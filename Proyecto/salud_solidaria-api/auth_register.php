<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include("conexion.php");


$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->correo) && 
    !empty($data->nombre_usuario) && 
    !empty($data->contrasena)
) {
    $correo = $conn->real_escape_string($data->correo);
    $nombre = $conn->real_escape_string($data->nombre_usuario);
    $contrasena = $conn->real_escape_string($data->contrasena);

    // 1. Verificar si el correo ya existe
    $check_sql = "SELECT id_usuario FROM usuarios WHERE correo = '$correo'";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        http_response_code(409); // Conflicto
        echo json_encode(array("message" => "El correo electrónico ya está registrado."));
        $conn->close();
        exit();
    }

    // 2. Insertar nuevo usuario
    
    $insert_sql = "INSERT INTO usuarios (correo, nombre_usuario, contrasena, fecha_registro) 
                   VALUES ('$correo', '$nombre', '$contrasena', NOW())"; 

    if ($conn->query($insert_sql) === TRUE) {
        http_response_code(201); // Creado
        echo json_encode(array("message" => "Usuario registrado con éxito.", "id_usuario" => $conn->insert_id));
    } else {
        http_response_code(500); // Error interno del servidor
        echo json_encode(array("message" => "Error al registrar usuario: " . $conn->error));
    }

} else {
    http_response_code(400); // Solicitud incorrecta
    echo json_encode(array("message" => "Faltan datos requeridos (correo, nombre o contraseña)."));
}

$conn->close();
?>