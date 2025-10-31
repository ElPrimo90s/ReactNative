import { useState } from 'react';
import { TextInput, Text, View } from 'react-native';
import { Button } from 'react-native-web';
export default function App() {
  const [kilos, setKilos] = useState(0);
  const [libras, setLibras] = useState(0);
  
  const calcularLibras = () => {
    setLibras (kilos * 2.20462);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Convertir Kilos a libras</Text>
      <TextInput
        placeholder="Kilos"
        keyboardType="numeric"
        onChangeText={(num) => setKilos(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Calcular Libras' onPress={calcularLibras} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      {libras !== 0 && <Text>El resultado es: {libras} lb</Text>}
    </View>
  );
}

