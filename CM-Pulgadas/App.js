import { useState } from 'react';
import { Text, View, Button, TextInput  } from 'react-native';

export default function App() {
  const [num1, setnum1] = useState(0);
  const [resultado, setresultado] = useState(0);
  const CMaPulgadas = () => {
    setresultado(num1 / 2.54);
  };
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Convierte CM a Pulgadas</Text>
      <TextInput placeholder='Centimetros' onChangeText={(num) => setnum1(parseFloat(num))} keyboardType='numeric' style={{borderWidth: 1, width: 100, marginBottom: 10}}></TextInput>
      <Button title='Convertir a Pulgadas' onPress={CMaPulgadas}></Button>
      {resultado !== 0 && <Text>El resultado es: {resultado}</Text>}
    </View>
  );
}

