import { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { Button } from 'react-native-web';
export default function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [suma, setSuma] = useState(0);
  const [resta, setResta] = useState(0);
  const [multiplicacion, setMultiplicacion] = useState(0);
  const [division, setDivision] = useState(0);
  
  const calcularSuma = () => {
    setSuma (num1 + num2);
  }
  const calcularResta = () => {
    setResta (num1 - num2);
  }
  const calcularMultiplicacion = () => {
    setMultiplicacion (num1 * num2);
  }
  const calcularDivision = () => {
    setDivision (num1 / num2);
  }

  return (
    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
      <Text>Calculadora de 2 Numeros</Text>
      <TextInput
        placeholder="Numero 1"
        keyboardType="numeric"
        onChangeText={(num) => setNum1(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Numero 2"
        keyboardType="numeric"
        onChangeText={(num) => setNum2(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Calcular Suma' onPress={calcularSuma} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {suma !== 0 && <Text>El resultado de la suma es: {suma} </Text>}
      <Text >.</Text>
      <Button title='Calcular Resta' onPress={calcularResta} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {resta !== null && <Text>El resultado de la resta es: {resta} </Text>}
      <Text >.</Text>
      <Button title='Calcular Multiplicacion' onPress={calcularMultiplicacion} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {multiplicacion !== 0 && <Text>El resultado de la multiplicacion es: {multiplicacion} </Text>}
      <Text >.</Text>
      <Button title='Calcular Division' onPress={calcularDivision} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {division !== 0 && <Text>El resultado de la division es: {division} </Text>}
    </View>
  );
}

