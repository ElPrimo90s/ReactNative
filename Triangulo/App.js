import {useState} from 'react';
import { TextInput, Text, View } from 'react-native';
import { Button } from 'react-native-web';

export default function App() {
  const [base , setBase] = useState(0);
  const [altura, setAltura] = useState(0);
  const [area, setArea] = useState(0);

  const calcularArea = () => {
    setArea ((base * altura) / 2);
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Calcular Area del Triangulo</Text>
      <TextInput
        placeholder="Base"
        keyboardType="numeric"
        onChangeText={(num) => setBase(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Altura"
        keyboardType="numeric"
        onChangeText={(num) => setAltura(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Calcular Area' onPress={calcularArea} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {area !== 0 && <Text>El area es: {area} cm</Text>}

    </View>
  );
}

