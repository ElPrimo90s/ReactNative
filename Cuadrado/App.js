import { useState } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const [area, setArea] = useState(0);
  const [perimetro, setPerimetro] = useState(0);
  const [lado, setlado] = useState(0);

  const calcularArea = () => {
    setArea (Math.pow(lado, 2));
  };
  const calcularPerimetro = () => {
    setPerimetro (lado * 4);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calcular Area</Text>
      <TextInput
        placeholder="Lado"
        keyboardType="numeric"
        onChangeText={(num) => setlado(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Calcular Area' onPress={calcularArea} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {area !== 0 && <Text>El area es: {area} cm2</Text>}
      <Text>Calcular Perimetro</Text>
      <TextInput
        placeholder="Lado"
        keyboardType="numeric"
        onChangeText={(num) => setlado(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Calcular Perimetro' onPress={calcularPerimetro} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {perimetro !== 0 && <Text>El perimetro es: {perimetro} cm </Text>}
    </View>
  );
}