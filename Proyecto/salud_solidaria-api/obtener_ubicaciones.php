<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
include("conexion.php");
 

$sql = "SELECT id_ubicacion, nombre, direccion, telefono, horario, tipo, latitud, longitud FROM ubicaciones_salud";
$result = $conn->query($sql);
 
$ubicaciones = array();
 
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ubicaciones[] = $row;
    }
    http_response_code(200);
    echo json_encode($ubicaciones);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "No se encontraron ubicaciones de salud."));
}

$conn->close();
?>