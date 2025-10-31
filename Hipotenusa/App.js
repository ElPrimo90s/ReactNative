import { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const [cateto1, setCateto1] = useState(0);
  const [cateto2, setCateto2] = useState(0);
  const [hipotenusa, setHipotenusa] = useState(0);

  const calcularHipotenusa = () => {
    setHipotenusa (Math.sqrt(cateto1 ** 2 + cateto2 ** 2));
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calcular la hipotenusa</Text>
      <TextInput
        placeholder="Cateto 1"
        keyboardType="numeric"
        onChangeText={(num) => setCateto1(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Cateto 2"
        keyboardType="numeric"
        onChangeText={(num) => setCateto2(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Calcular Hipotenusa' onPress={calcularHipotenusa} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {hipotenusa !== 0 && <Text>La hipotenusa es: {hipotenusa}</Text>}
    </View>
  );
}

