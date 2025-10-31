import { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const [Salario, setSalario] = useState(0);
  const [Horas, setHoras] = useState(0);
  const [Resultado, setResultado] = useState(0);
  
  const calcularSalario = () => {
    setResultado (Salario * Horas + (Salario * Horas * 0.02) - (Salario * Horas * 0.015) - (Salario * Horas * 0.012));
    if (Horas > 8) {
      const HorasExtras = Horas - 8;
      const PagoHorasExtras = HorasExtras * Salario * 2;
      setResultado (Salario * 8 + PagoHorasExtras + (Salario * Horas * 0.02) - (Salario * Horas * 0.015) - (Salario * Horas * 0.012));
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calcular Salario</Text>
      <TextInput
        placeholder="Salario por hora"
        keyboardType="numeric"
        onChangeText={(num) => setSalario(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Horas trabajadas"
        keyboardType="numeric"
        onChangeText={(num) => setHoras(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Calcular Salario' onPress={calcularSalario} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {Resultado !== 0 && <Text>El salario neto es: ${Resultado} por dia </Text>}
    </View>
  );

}


