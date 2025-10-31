import { useState } from 'react';
import { Button } from 'react-native-web';
import { TextInput, Text, View } from 'react-native';

export default function App() {
  const [num1, setnum1] = useState(0);
  const [pulgadas, setPulM] = useState(0);
  const [metros, setMetros] = useState(0);
  const [piesP, setPiesP] = useState(0);
  const [GaLL, setGaLL] = useState(0);
  const [Centri, setCentri] = useState(0);

  const convertir = () => {
    setMetros (num1 / 3.281);
    setPulM (num1 / 39.37);
    setPiesP (num1 * 12);
    setGaLL (num1 * 3.78541);
    setCentri ((num1 * 9/5) + 32);

  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Convertidor</Text>
      <TextInput
        placeholder="Ingrese un valor"
        keyboardType="numeric"
        onChangeText={(num) => setnum1(parseFloat(num))}
        style={{ borderWidth: 1, width: 100, marginBottom: 10 }}
      />
      <Button title='Convertir' onPress={convertir} style={{ marginBottom: 10, color: 'blue' }}>
      </Button>
      <Text>------------------------</Text>
      {metros !== 0 && <Text>Pies a Metros: {metros} m</Text>}
      <Text>------------------------</Text>
      {pulgadas !== 0 && <Text>Pulgadas a Metros: {pulgadas} m</Text>}
      <Text>------------------------</Text>
      {piesP !== 0 && <Text>Pies a Pulgadas: {piesP} in</Text>}
      <Text>------------------------</Text>
      {GaLL !== 0 && <Text>Galones a Litros: {GaLL} L</Text>}
      <Text>------------------------</Text>
      {Centri !== 0 && <Text>Centigrados a Farenheit: {Centri} °F</Text>}
      <Text>------------------------</Text>
    </View>
  );
}

