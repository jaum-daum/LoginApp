import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#c0eddd61',
    padding:24
  },

  logo:{
    width: 120,
    height: 120,
    alignSelf:'center'
  },
  texto:{
    fontSize: 23,
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom: 40

  },
  input:{
    backgroundColor: '#ffff',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 15
  },
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
