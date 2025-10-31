import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Alert } from 'react-native';
// --- FUNCIONES DE LOS EJERCICIOS ---

// Eje 2: Imprimir del 1 al 30 con salto de línea cada 7
const generarSaltosDeLinea = () => {
    let output = [];
    for (let i = 1; i <= 30; i++) {
        output.push(i);
        // Si es múltiplo de 7, agregamos un salto de línea (\n)
        if (i % 7 === 0 && i !== 30) {
            output.push('\n');
        }
    }
    return output.join(''); 
};

// Eje 4: Lectura de 5 alumnos * 3 calificaciones (Datos de muestra)
const generarLecturaAlumnos = () => {
    const alumnos = [
        { nombre: 'Alumno 1', cal: [9, 8, 7] },
        { nombre: 'Alumno 2', cal: [6, 7, 8] },
        { nombre: 'Alumno 3', cal: [10, 9, 9] },
        { nombre: 'Alumno 4', cal: [5, 6, 5] },
        { nombre: 'Alumno 5', cal: [8, 8, 9] },
    ];
    return alumnos.map((a, index) => 
        <Text key={index} style={styles.listItem}>
            {a.nombre}: {a.cal.join(', ')} (Promedio: {(a.cal.reduce((sum, c) => sum + c, 0) / 3).toFixed(1)})
        </Text>
    );
};

// Eje 5: Leer 10 calificaciones aceptando solo 6 a 10 (Simulación con arreglo de prueba)
const generarCalificacionesRango = () => {
    const calificacionesPrueba = [8, 11, 7, 5, 9, 10, 4, 6, 9, 8, 12];
    const validas = calificacionesPrueba.filter(c => c >= 6 && c <= 10);
    const resumen = `Intentos: ${calificacionesPrueba.join(', ')}\n`;
    const resultado = `Aceptadas (Rango 6-10): ${validas.join(', ')}`;
    return { resumen, resultado };
};

// Eje 6: Números pares en rango 2 a 15
const generarPares = () => {
    let pares = [];
    for (let i = 2; i <= 15; i += 2) {
        pares.push(i);
    }
    return pares.join(', ');
};

// Eje 7: Imprimir del 0 al 100 de diez en diez
const generarDecenas = () => {
    let output = [];
    for (let i = 0; i <= 100; i += 10) {
        output.push(i);
    }
    return output.join(', ');
};

// Eje 10: Suma de cuadrados de los 100 primeros enteros
const calcularSumaCuadrados = () => {
    let suma = 0;
    for (let i = 1; i <= 100; i++) {
        suma += i * i;
    }
    return suma;
};


// --- Componente Principal de la Aplicación ---

export default function EjerciciosCiclicosApp() {
    // Estados para inputs
    const [numAntes, setNumAntes] = useState('');     // Eje 1
    const [calificacionEje3, setCalificacionEje3] = useState(''); // Eje 3
    const [numTabla, setNumTabla] = useState('');     // Eje 8
    
    // Estado de control para el Ejercicio 9 (Bucle S/N)
    const [continuarEje9, setContinuarEje9] = useState(true); 

    // Eje 1: Elementos antes del número
    const generarAntes = (num) => {
        const n = Number(num);
        if (isNaN(n) || n <= 1) return "Ingrese un entero mayor a 1";
        let output = [];
        for (let i = 1; i < n; i++) {
            output.push(i);
        }
        return output.join(', ');
    };

    // Eje 3: Calificación en intervalo 0 a 10 (Se simula la repetición)
    const verificarCalificacion = () => {
        const cal = Number(calificacionEje3);
        if (isNaN(cal)) return Alert.alert("Error", "Ingrese un número.");
        
        // Simula el bucle: sigue pidiendo si es inválida
        if (cal >= 0 && cal <= 10) {
            Alert.alert("Validación", `Calificación ${cal} aceptada.`);
        } else {
            // La alerta informa que debe volver a pedir, simulando la acción del bucle
            Alert.alert("Intente de nuevo", `Calificación ${cal} NO válida. Debe estar entre 0 y 10.`);
            // En una app real, podrías limpiar el input aquí para "volver a pedir"
            // setCalificacionEje3(''); 
        }
    };
    
    // Eje 8: Tabla de multiplicar
    const generarTablaMultiplicar = (numero) => {
        const num = Number(numero);
        if (isNaN(num) || num <= 0) return "";
        
        let tabla = [];
        for (let i = 1; i <= 10; i++) {
            tabla.push(`${num} x ${i} = ${num * i}`);
        }
        return tabla.join('\n');
    };

    // Eje 9: Pregunta ¿Desea continuar S/N? (Controlado por botón)
    const manejarContinuar = () => {
        if (!continuarEje9) {
            return Alert.alert("Detenido", "El programa ha finalizado. Presione 'Reiniciar' para volver a preguntar.");
        }
        
        // Simula el bucle do-while
         Alert.alert(
            "Pregunta Cíclica", 
            "¿Desea continuar (S/N)?",
            [
                {
                    text: "Sí (S)",
                    onPress: () => Alert.alert("Continuar", "Ha elegido S. El programa sigue preguntando."),
                },
                {
                    text: "No (N)",
                    onPress: () => {
                        setContinuarEje9(false); // Sale del bucle
                        Alert.alert("Finalizado", "Ha elegido N. El bucle se detiene.");
                    },
                    style: 'cancel',
                },
            ]
        );
    };
    
    // Resultado Eje 5
    const resultadoEje5 = generarCalificacionesRango();

    const InputGroup = ({ label, children }) => (
        <View style={styles.group}>
            <Text style={styles.label}>{label}</Text>
            {children}
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Actividades Cíclicas (Estructuras Repetitivas)</Text>

            {/* Ejercicio 1: Elementos antes del número */}
            <InputGroup label="1. Elementos antes de N:">
                <TextInput style={styles.input} onChangeText={setNumAntes} value={numAntes} keyboardType="numeric" placeholder="Ingrese N" />
                <Text style={styles.result}>{generarAntes(numAntes)}</Text>
            </InputGroup>

            {/* Ejercicio 2: Imprimir del 1 al 30 con salto cada 7 */}
            <InputGroup label="2. Imprimir 1 al 30 (salto de línea cada 7):">
                <Text style={styles.resultSalto}>{generarSaltosDeLinea()}</Text>
            </InputGroup>

            {/* Ejercicio 3: Calificación en intervalo 0 a 10 */}
            <InputGroup label="3. Validar Calificación (0 a 10):">
                <TextInput style={styles.input} onChangeText={setCalificacionEje3} value={calificacionEje3} keyboardType="numeric" placeholder="Ingrese calificación" />
                <Button title="Verificar (Simular Bucle)" onPress={verificarCalificacion} color="#ff9800" />
            </InputGroup>

            {/* Ejercicio 4: Leer 5 alumnos * 3 calificaciones */}
            <InputGroup label="4. Lectura de 5 Alumnos (3 calif. c/u - Bucle anidado):">
                {generarLecturaAlumnos()}
            </InputGroup>

            {/* Ejercicio 5: Leer 10 calificaciones (rango 6 a 10) */}
            <InputGroup label="5. Lectura de 10 Calificaciones (Aceptar solo 6-10):">
                <Text style={styles.result}>{resultadoEje5.resumen}</Text>
                <Text style={styles.result}>{resultadoEje5.resultado}</Text>
            </InputGroup>

            {/* Ejercicio 6: Números pares de 2 a 15 */}
            <InputGroup label="6. Números pares en rango 2 a 15:">
                <Text style={styles.result}>{generarPares()}</Text>
            </InputGroup>

            {/* Ejercicio 7: Números del 0 al 100 de diez en diez */}
            <InputGroup label="7. Números del 0 al 100 (de 10 en 10):">
                <Text style={styles.result}>{generarDecenas()}</Text>
            </InputGroup>

            {/* Ejercicio 8: Tabla de multiplicar */}
            <InputGroup label="8. Tabla de Multiplicar:">
                <TextInput style={styles.input} onChangeText={setNumTabla} value={numTabla} keyboardType="numeric" placeholder="Ingrese número para la tabla" />
                <Text style={styles.resultTabla}>{generarTablaMultiplicar(numTabla)}</Text>
            </InputGroup>
            
            {/* Ejercicio 9: Pregunta ¿Desea continuar S/N? */}
            <InputGroup label="9. Pregunta ¿Desea continuar S/N? (Bucle do-while):">
                <Button 
                    title={continuarEje9 ? "Preguntar (Simular Bucle)" : "Bucle Finalizado"}
                    onPress={manejarContinuar}
                    color={continuarEje9 ? "#007AFF" : "#6c757d"}
                    disabled={!continuarEje9}
                />
                <Button 
                    title="Reiniciar Pregunta" 
                    onPress={() => setContinuarEje9(true)} 
                    color="#dc3545" 
                    style={{ marginTop: 10 }}
                />
            </InputGroup>

            {/* Ejercicio 10: Suma de los cuadrados de los 100 primeros enteros */}
            <InputGroup label="10. Suma de los cuadrados de los 100 primeros enteros:">
                <Text style={styles.result}>Suma Total: {calcularSumaCuadrados()}</Text>
            </InputGroup>

        </ScrollView>
    );
}

// --- ESTILOS ---

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    group: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15,
        borderLeftWidth: 5,
        borderLeftColor: '#17a2b8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    result: {
        fontSize: 16,
        marginTop: 5,
        color: '#28a745',
    },
    resultSalto: {
        fontSize: 16,
        marginTop: 5,
        color: '#28a745',
        // Esto es necesario para que el salto de línea (\n) se muestre correctamente
        lineHeight: 25, 
    },
    resultTabla: {
        fontSize: 16,
        marginTop: 5,
        color: '#28a745',
        // Asegura que cada línea de la tabla de multiplicar se muestre
        lineHeight: 25, 
    },
    listItem: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 2,
    }
});