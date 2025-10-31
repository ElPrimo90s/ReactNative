import { useState } from 'react';
import { Text, View, Button, TextInput  } from 'react-native';

export default function App() {
  const [Circunferencia, setCircunferencia] = useState(0);
  const [Area, setArea] = useState(0);
  const [Diametro, setDiametro] = useState(0);
  const [resultado1, setresultado1] = useState(0);
  const [resultado2, setresultado2] = useState(0);
  const [resultado3, setresultado3] = useState(0);
  const CalcularRadio = () => {
    setresultado1(Circunferencia / (2 * Math.PI));
    
  };
  const CalcularRadioArea = () => {
    setresultado2(Math.sqrt(Area / Math.PI));
  };
  const CalcularRadioDiametro = () => {
    setresultado3(Diametro / 2);
  };
  return (
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Calcular Radio a partir de la Circunferencia</Text>
      <TextInput 
    placeholder='Circunferencia' 
    onChangeText={(num) => setCircunferencia(parseFloat(num))} 
    keyboardType='numeric' 
    style={{borderWidth: 1, width: 100, marginBottom: 10}}>
</TextInput>
      <Button title='Calcular Radio' onPress={CalcularRadio}></Button>
      {resultado1 !== 0 && <Text>El resultado es: {resultado1}</Text>}

      <Text>Calcular Radio a partir del Area</Text>
      <TextInput 
    placeholder='Area' 
    onChangeText={(num) => setArea(parseFloat(num))} 
    keyboardType='numeric' 
    style={{borderWidth: 1, width: 100, marginBottom: 10}}>
</TextInput>
      <Button title='Calcular Radio' onPress={CalcularRadioArea}></Button>
      {resultado2 !== 0 && <Text>El resultado es: {resultado2}</Text>}

      <Text>Calcular Radio a partir del Diametro</Text>
      <TextInput 
    placeholder='Diametro' 
    onChangeText={(num) => setDiametro(parseFloat(num))} 
    keyboardType='numeric' 
    style={{borderWidth: 1, width: 100, marginBottom: 10}}>
</TextInput>
      <Button title='Calcular Radio' onPress={CalcularRadioDiametro}></Button>
      {resultado3 !== 0 && <Text>El resultado es: {resultado3}</Text>}
    </View>
  );
}

