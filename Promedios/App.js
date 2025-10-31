import { useState } from 'react';
import { Text, View, Button, TextInput  } from 'react-native';
export default function App() {
  const [num1, setnum1] = useState(0);
     const [num2, setnum2] = useState(0);
     const [num3, setnum3] = useState(0);
     const [num4, setnum4] = useState(0);
     const [resultado, setresultado] = useState(0);
     const calcularPromedio = () => {
       setresultado((num1 + num2 + num3 + num4) / 4);
     };
  return (<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
       <Text>Calcular Promedio de 4 Alumnos</Text>
       <TextInput placeholder='Numero 1' onChangeText={(num) => setnum1(parseFloat(num))} keyboardType='numeric' style={{borderWidth: 1, width: 100, marginBottom: 10}}></TextInput>
       <TextInput placeholder='Numero 2' onChangeText={(num) => setnum2(parseFloat(num))} keyboardType='numeric' style={{borderWidth: 1, width: 100, marginBottom: 10}}></TextInput>
       <TextInput placeholder='Numero 3' onChangeText={(num) => setnum3(parseFloat(num))} keyboardType='numeric' style={{borderWidth: 1, width: 100, marginBottom: 10}}></TextInput>
       <TextInput placeholder='Numero 4' onChangeText={(num) => setnum4(parseFloat(num))} keyboardType='numeric' style={{borderWidth: 1, width: 100, marginBottom: 10}}></TextInput>
       <Button title='Calcular Promedio' onPress={calcularPromedio}></Button>
       {resultado !== 0 && <Text>El resultado es: {resultado}</Text>}
     </View>
  );
}

