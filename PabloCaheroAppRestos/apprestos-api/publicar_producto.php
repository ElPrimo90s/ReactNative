<?php
include 'conexion.php';

// Validar método
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// 1. Recibir datos de React Native
$nombre = $data['productName'] ?? '';
$id_usuario = $data['userId'] ?? 0; // Ojo: Asegúrate de enviar userId desde la app
$categoria_app = $data['category'] ?? 'Otros'; // Ej: Frutas
$desc = $data['description'] ?? '';
$fecha_cad = $data['expiryDate'] ?? date('Y-m-d');
$cant = $data['quantity'] ?? '';
$ubi = $data['location'] ?? '';
$precio_app = $data['price'] ?? 0;
$is_donation = $data['isDonation'] ?? false;

// 2. Lógica de Mapeo para tus ENUMs
// Si isDonation es true, el tipo es 'Donacion', si no, es 'Oferta'
$tipo_producto_enum = $is_donation ? 'Donacion' : 'Oferta'; 

// El precio es 0 si es donación
$precio_final = $is_donation ? 0.00 : floatval($precio_app);

// Usaremos el campo 'etiqueta' para guardar la categoría (Frutas, Verduras, etc.)
$etiqueta = $categoria_app; 

// 3. Validación
if(empty($nombre) || empty($id_usuario)) {
    echo json_encode(["success" => false, "message" => "Faltan datos (nombre o usuario)"]);
    exit();
}

// 4. Insertar en Base de Datos
// Nota: Ajustamos el INSERT a los campos de tu tabla 'productos'
$sql = "INSERT INTO productos (nombre_producto, id_usuario, tipo_producto, descripcion, etiqueta, fecha_caducidad, cantidad, ubicacion, precio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

// Tipos: s=string, i=integer, d=double
// Orden: nombre(s), id_user(i), tipo_enum(s), desc(s), etiqueta(s), fecha(s), cant(s), ubi(s), precio(d)
$stmt->bind_param("sissssssd", $nombre, $id_usuario, $tipo_producto_enum, $desc, $etiqueta, $fecha_cad, $cant, $ubi, $precio_final);

if($stmt->execute()) {
    $id_producto_nuevo = $conn->insert_id;

    // 5. Opcional: Crear registro en historial_producto automáticamente
    // Accion: 'Subido'
    $accion = 'Subido';
    $sql_hist = "INSERT INTO historial_producto (id_producto, id_usuario, accion) VALUES (?, ?, ?)";
    $stmt_hist = $conn->prepare($sql_hist);
    $stmt_hist->bind_param("iis", $id_producto_nuevo, $id_usuario, $accion);
    $stmt_hist->execute();

    echo json_encode(["success" => true, "message" => "Producto publicado correctamente"]);
} else {
    echo json_encode(["success" => false, "message" => "Error BD: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>