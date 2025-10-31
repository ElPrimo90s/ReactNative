import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

// --- FUNCIONES DE LÓGICA ---

// Ejercicio 1: Máximo de Cinco Números
const calcularMaximo = (nums) => {
    // Convierte la cadena de entrada (separada por comas o espacios) en un array de números
    const numList = nums.split(/[, ]+/).map(Number).filter(n => !isNaN(n));
    if (numList.length !== 5) return "Ingrese exactamente 5 números";
    return Math.max(...numList);
};

// Ejercicio 2: Salario Neto del Obrero (Quincenal)
const calcularSalarioObrero = () => {
    // Constantes
    const HORAS_DIARIAS = 8;
    const DIAS_QUINCENA = 15;
    const PAGO_POR_HORA = 50.00;
    const COMPENSACION_PORCENTAJE = 0.02;
    const DESCUENTO_IMSS_PORCENTAJE = 0.015;
    const DESCUENTO_ISPT_PORCENTAJE = 0.012;

    const horasTotales = HORAS_DIARIAS * DIAS_QUINCENA;
    const salarioBruto = horasTotales * PAGO_POR_HORA;
    
    const compensacion = salarioBruto * COMPENSACION_PORCENTAJE;
    const descuentoIMSS = salarioBruto * DESCUENTO_IMSS_PORCENTAJE;
    const descuentoISPT = salarioBruto * DESCUENTO_ISPT_PORCENTAJE;

    const salarioNeto = salarioBruto + compensacion - descuentoIMSS - descuentoISPT;
    
    return `Salario Bruto: $${salarioBruto.toFixed(2)}, Neto: $${salarioNeto.toFixed(2)}`;
};

// Ejercicio 3: Mayor de Dos Números
const determinarMayor = (num1, num2) => {
    const a = Number(num1);
    const b = Number(num2);
    if (isNaN(a) || isNaN(b)) return "Ingrese dos números válidos";
    if (a === b) return "Los números son iguales";
    return a > b ? a : b;
};

// Ejercicio 4: Costo de Bates (10 o más vs. menos de 10)
const calcularCostoBates = (cantidad) => {
    const cant = Number(cantidad);
    if (isNaN(cant) || cant <= 0) return "Ingrese una cantidad válida";
    
    const PRECIO_MAYOR_O_IGUAL_A_10 = 100;
    const PRECIO_MENOR_A_10 = 108;

    let costo;
    if (cant >= 10) {
        costo = cant * PRECIO_MAYOR_O_IGUAL_A_10;
    } else {
        costo = cant * PRECIO_MENOR_A_10;
    }
    return `$${costo.toFixed(2)}`;
};

// Ejercicio 5: Salario con Horas Extras (primeras 40 a $14, extras a $26)
const calcularSalarioHorasExtras1 = (horas) => {
    const h = Number(horas);
    if (isNaN(h) || h < 0) return "Ingrese horas válidas";
    
    const TARIFA_NORMAL = 14.00;
    const HORAS_NORMALES = 40;
    const TARIFA_EXTRA = 26.00;
    let salario;

    if (h <= HORAS_NORMALES) {
        salario = h * TARIFA_NORMAL;
    } else {
        const salarioNormal = HORAS_NORMALES * TARIFA_NORMAL;
        const horasExtra = h - HORAS_NORMALES;
        const salarioExtra = horasExtra * TARIFA_EXTRA;
        salario = salarioNormal + salarioExtra;
    }
    return `$${salario.toFixed(2)}`;
};

// Ejercicio 6: Costo de Balones (por rangos de cantidad)
const calcularCostoBalones = (cantidad) => {
    const cant = Number(cantidad);
    if (isNaN(cant) || cant <= 0) return "Ingrese una cantidad válida";

    let precioUnitario;
    if (cant > 15) {
        precioUnitario = 85;
    } else if (cant > 10 && cant <= 15) {
        precioUnitario = 92;
    } else { // 10 o menos
        precioUnitario = 99;
    }
    const costoTotal = cant * precioUnitario;
    return `$${costoTotal.toFixed(2)}`;
};

// Ejercicio 7: Costo de Lápices (por rangos de cantidad)
const calcularCostoLapices = (cantidad) => {
    const cant = Number(cantidad);
    if (isNaN(cant) || cant <= 0) return "Ingrese una cantidad válida";

    let precioUnitario;
    if (cant >= 100) { // El enunciado dice "10 o más" (80c), pero lo más restrictivo es 100 o más. Asumo 100+ para el tramo más barato.
        precioUnitario = 0.80; // 80 centavos
    } else if (cant > 50) { // Menos de 100 pero más de 50
        precioUnitario = 1.20;
    } else if (cant >= 30) { // De 30 a 50
        precioUnitario = 1.50;
    } else { // Menos de 30
        precioUnitario = 2.10;
    }
    const costoTotal = cant * precioUnitario;
    return `$${costoTotal.toFixed(2)}`;
};

// Ejercicio 8: Costo de Bates (Diferencial)
const calcularCostoBatesDiferencial = (cantidad) => {
    const cant = Number(cantidad);
    if (isNaN(cant) || cant <= 0) return "Ingrese una cantidad válida";

    const PRECIO_NORMAL = 250;
    const PRECIO_DESCUENTO = 230;
    const LIMITE = 10;
    let costoTotal;

    if (cant <= LIMITE) {
        costoTotal = cant * PRECIO_NORMAL;
    } else {
        const costoPrimerosDiez = LIMITE * PRECIO_NORMAL;
        const restantes = cant - LIMITE;
        const costoRestantes = restantes * PRECIO_DESCUENTO;
        costoTotal = costoPrimerosDiez + costoRestantes;
    }
    return `Bates: ${cant}, Costo Total: $${costoTotal.toFixed(2)}`;
};

// Ejercicio 9: Salario con Horas Extras (40 o menos a $50, extras a $70)
const calcularSalarioHorasExtras2 = (horas) => {
    const h = Number(horas);
    if (isNaN(h) || h < 0) return "Ingrese horas válidas";
    
    const TARIFA_NORMAL = 50.00;
    const HORAS_NORMALES = 40;
    const TARIFA_EXTRA = 70.00;
    let salario;

    if (h <= HORAS_NORMALES) {
        salario = h * TARIFA_NORMAL;
    } else {
        const salarioNormal = HORAS_NORMALES * TARIFA_NORMAL;
        const horasExtra = h - HORAS_NORMALES;
        const salarioExtra = horasExtra * TARIFA_EXTRA;
        salario = salarioNormal + salarioExtra;
    }
    return `$${salario.toFixed(2)}`;
};

// Ejercicio 10: Menor de Dos Números
const determinarMenor = (num1, num2) => {
    const a = Number(num1);
    const b = Number(num2);
    if (isNaN(a) || isNaN(b)) return "Ingrese dos números válidos";
    if (a === b) return "Los números son iguales";
    return a < b ? a : b;
};

// --- COMPONENTE PRINCIPAL DE LA APP ---

export default function LogicaEjerciciosApp() {
    // Estados para los inputs
    const [numeros5, setNumeros5] = useState(''); // Eje 1
    const [numMayor1, setNumMayor1] = useState(''); // Eje 3, num1
    const [numMayor2, setNumMayor2] = useState(''); // Eje 3, num2
    const [cantBates1, setCantBates1] = useState(''); // Eje 4
    const [horasObrero1, setHorasObrero1] = useState(''); // Eje 5
    const [cantBalones, setCantBalones] = useState(''); // Eje 6
    const [cantLapices, setCantLapices] = useState(''); // Eje 7
    const [cantBates2, setCantBates2] = useState(''); // Eje 8
    const [horasObrero2, setHorasObrero2] = useState(''); // Eje 9
    const [numMenor1, setNumMenor1] = useState(''); // Eje 10, num1
    const [numMenor2, setNumMenor2] = useState(''); // Eje 10, num2

    const InputGroup = ({ label, value, onChangeText, result, keyboardType = 'default' }) => (
        <View style={styles.group}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={value}
                keyboardType={keyboardType}
                placeholder="Ingrese valor(es)"
            />
            <Text style={styles.result}>Resultado: {result}</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Ejercicios de Lógica en React Native</Text>

            {/* Ejercicio 1: Máximo de 5 Números */}
            <InputGroup
                label="1. Máximo de 5 Números (Separe con coma o espacio):"
                value={numeros5}
                onChangeText={setNumeros5}
                result={calcularMaximo(numeros5)}
                keyboardType="numbers-and-punctuation"
            />

            {/* Ejercicio 2: Salario Neto Obrero (Quincenal) */}
            <View style={styles.group}>
                <Text style={styles.label}>2. Salario Neto Obrero (Quincenal):</Text>
                <Text style={styles.result}>{calcularSalarioObrero()}</Text>
            </View>

            {/* Ejercicio 3: Mayor de 2 Números */}
            <View style={styles.group}>
                <Text style={styles.label}>3. Mayor de 2 Números:</Text>
                <View style={styles.row}>
                    <TextInput style={styles.inputSmall} onChangeText={setNumMayor1} value={numMayor1} keyboardType="numeric" placeholder="Número 1" />
                    <TextInput style={styles.inputSmall} onChangeText={setNumMayor2} value={numMayor2} keyboardType="numeric" placeholder="Número 2" />
                </View>
                <Text style={styles.result}>Mayor: {determinarMayor(numMayor1, numMayor2)}</Text>
            </View>

            {/* Ejercicio 4: Costo de Bates (10 o más vs. menos de 10) */}
            <InputGroup
                label="4. Costo Bates (10 o + a $100, < 10 a $108):"
                value={cantBates1}
                onChangeText={setCantBates1}
                result={calcularCostoBates(cantBates1)}
                keyboardType="numeric"
            />

            {/* Ejercicio 5: Salario Horas Extras 1 ($14/40h, $26/extra) */}
            <InputGroup
                label="5. Salario Obrero (Primeras 40h a $14, extras a $26):"
                value={horasObrero1}
                onChangeText={setHorasObrero1}
                result={calcularSalarioHorasExtras1(horasObrero1)}
                keyboardType="numeric"
            />

            {/* Ejercicio 6: Costo de Balones (Rangos de cantidad) */}
            <InputGroup
                label="6. Costo Balones (Rangos: >15 a $85, 10-15 a $92, <10 a $99):"
                value={cantBalones}
                onChangeText={setCantBalones}
                result={calcularCostoBalones(cantBalones)}
                keyboardType="numeric"
            />
            
            {/* Ejercicio 7: Costo de Lápices (Rangos de cantidad) */}
            <InputGroup
                label="7. Costo Lápices (Rangos de cantidad):"
                value={cantLapices}
                onChangeText={setCantLapices}
                result={calcularCostoLapices(cantLapices)}
                keyboardType="numeric"
            />

            {/* Ejercicio 8: Costo de Bates (Diferencial) */}
            <InputGroup
                label="8. Costo Bates Diferencial (10 o - a $250, >10 restantes a $230):"
                value={cantBates2}
                onChangeText={setCantBates2}
                result={calcularCostoBatesDiferencial(cantBates2)}
                keyboardType="numeric"
            />

            {/* Ejercicio 9: Salario Horas Extras 2 ($50/40h, $70/extra) */}
            <InputGroup
                label="9. Salario Obrero (40h a $50, extras a $70):"
                value={horasObrero2}
                onChangeText={setHorasObrero2}
                result={calcularSalarioHorasExtras2(horasObrero2)}
                keyboardType="numeric"
            />

            {/* Ejercicio 10: Menor de 2 Números */}
            <View style={styles.group}>
                <Text style={styles.label}>10. Menor de 2 Números:</Text>
                <View style={styles.row}>
                    <TextInput style={styles.inputSmall} onChangeText={setNumMenor1} value={numMenor1} keyboardType="numeric" placeholder="Número 1" />
                    <TextInput style={styles.inputSmall} onChangeText={setNumMenor2} value={numMenor2} keyboardType="numeric" placeholder="Número 2" />
                </View>
                <Text style={styles.result}>Menor: {determinarMenor(numMenor1, numMenor2)}</Text>
            </View>
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
        borderLeftColor: '#007bff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
        color: '#555',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    inputSmall: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        width: '48%',
        backgroundColor: '#fff',
    },
    result: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#28a745',
    },
});