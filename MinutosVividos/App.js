import { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const [edad, setEdad] = useState(0);
  const [minutosVividos, setMinutosVividos] = useState(0);

  const calcularMinutosVividos = () => {
    setMinutosVividos(edad * 365 * 24 * 60);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calcular Minutos Vividos</Text>
      <TextInput
        placeholder="Edad"
        keyboardType="numeric"
        onChangeText={(num) => setEdad(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Calcular Minutos Vividos' onPress={calcularMinutosVividos} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {minutosVividos !== 0 && <Text>Los minutos vividos son: {minutosVividos}</Text>}
    </View>
  );
}

