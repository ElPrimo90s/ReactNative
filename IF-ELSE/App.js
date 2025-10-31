import { useState } from 'react';
import { TextInput, Text, View, Button, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [edad, setEdad] = useState(0);
  //const nombres = [Pablo, Kevin, Cahero, Arantxa, Muriel, Keila, Brayton];
  const [verificado, setVerificado] = useState(false); 

  const handleVerificar = () => {
    
    setVerificado(true);
  };
  
  
  const handleEdadChange = (text) => {
    setEdad(parseInt(text) || 0);
    setVerificado(false); 
  };

  
  let mensajeTexto = '';
  if (edad >= 18) {
    mensajeTexto = '🎉 Eres mayor de edad';
  } else {
    mensajeTexto = '👶 Eres menor de edad';
  }

  let componenteMensaje = null;

 
  if (verificado) {
      componenteMensaje = <Text style={styles.resultado}>{mensajeTexto}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Introduce tu edad</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleEdadChange} 
        value={edad.toString()}
      />
      
      <Button 
        title="Verificar" 
        onPress={handleVerificar} 
      />
      

      {componenteMensaje}
      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 200,
        textAlign: 'center',
        margin: 10,
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    resultado: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'purple',
        textAlign: 'center',
    }
});

