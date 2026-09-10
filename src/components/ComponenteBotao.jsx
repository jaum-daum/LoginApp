import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function ComponenteBotao({title, onPress}){
    return(
    <TouchableOpacity style={styles.button} onPress={onPress}>
         <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
)}

const styles = StyleSheet.create({
  /* Botão*/
  button:{
    backgroundColor: '#0664fb',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText:{
    color:'#010101',
    fontSize:16,
    fontWeight:'bold'
  }
});

