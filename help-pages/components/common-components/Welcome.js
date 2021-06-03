import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function Welcome({navigation,route}) {
  
  const IMAGES = {
    logo: require('./assets/logo.png')
  }
  return (  
      <View style={styles.container}>  
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}>
             
        </View>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}> 
            <Image  style={styles.logo} 
            source={{uri:'https://speechbd.com/img/logo.png'}}/>    
            <View style={styles.hr}></View> 
            <TouchableOpacity style={styles.loginButton} 
              onPress={() => 
                navigation.navigate('Posts', { 
                  name: 'posts',
                  itemId: 0,
                  otherParam: 'I am from home login' 
                 })
              }>
              <Text style={styles.loginButtonText}>See All Posts</Text>
            </TouchableOpacity> 
          </View>
        </View>  
      </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',  
  },
  logo: {
    width: "100%",
    height: 140,
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#ff6b81',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#ff7979',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -.10,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '5%',
  },
  authBox: {
    width: '100%',
    height: Dimensions.get('window').height * 0.3,
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    top:90,
    shadowOpacity: 0.50,
    shadowRadius: 3.84,
    elevation: 30, 
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#eb4d4b',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#ff4757',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});