import React, { Component, useEffect, useState, createRef } from "react";
import {
  Image, Text, TextInput, ScrollView , TouchableOpacity, View, ToastAndroid, StyleSheet, Button, StatusBar,
  Keyboard
} from "react-native";
import {Icon } from 'react-native-elements'; 
import Styles from "../styles";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import axios from 'axios';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};

function LoginScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState(false);
  const [userPassword, setUserPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [successtext, setSuccesstext] = useState(false);
  const [userData, setUserData] = useState('');
  const [loginData, setLoginData] = useState('');
  const [visibleToast, setvisibleToast] = useState(false);
  const [emailFocusStyle, setEmailInpuStyle] = useState({
      backgroundColor:"#f8f8f8", 
      iconColor : '#BABDC3'
  });
  const [passFocusStyle, setPassInpuStyle] = useState({
    backgroundColor:"#f8f8f8", 
    iconColor : '#BABDC3'
});
  const onChangeText = userUser => setUser(userUser)

  const onFocusEmail = () => {
    setEmailInpuStyle({ 
      backgroundColor:"#FF5D8F",
      iconColor : "#fff",
      inputColor : '#ffffff' 
    });  
  }
  
  const onBlurEmail = ()  => {
    setEmailInpuStyle({ 
      backgroundColor:"#f8f8f8", 
      color : '#929292'
    }); 
  }

  const onFocusPass = () => {
    setPassInpuStyle({ 
      backgroundColor:"#FF5D8F",
      iconColor : "#fff",
      inputColor : '#ffffff' 
    });  
  }

  const onBlurPass = ()  => {
    setPassInpuStyle({ 
      backgroundColor:"#f8f8f8", 
      color : '#929292'
    }); 
  }

  const passwordInputRef = createRef();
  const handleSubmitPress = () => {

    //setErrortext('');
    if (!userEmail) {
      setvisibleToast(true);
      setErrortext({ message: 'Please fill Email' });
      //alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      setvisibleToast(true);
      setErrortext({ message: 'Please fill Password' });
      return;
    }
    if (userEmail && userPassword) {
      setLoading(true);
      setErrortext(false)
    } else {
      setLoading(false);
    }
 
     axios.post('https://sista.abdulmazidcse.com/api/auth/login',
     {
      email: userEmail ,
      password: userPassword 
     },
     {
          headers: {
              "Content-Type": "application/json", 
          },
      })
      .then((res) => { 
        let userData  = res.data ;   
        saveToken(userData.access_token);
          //AsyncStorage.setItem(STORAGE_KEY, userData.user);
        setLoading(false);
        
         // setItems( res.data.data); 
      }).catch(function (error) {
        console.log('=========OUT========');
        console.log(error);
        setLoading(false);
      }); 
  };

  const saveToken = async (token) =>{ 
    try { 
      console.log('token ==============');
      console.log(token);
      await AsyncStorage.setItem(TOKEN, token ); 
      navigation.replace('Tabs') 
      setSuccesstext({ message:'Data successfully saved' }); 
    } catch (e) { 
      setErrortext({ message: 'Failed to save the data to the storage' }); 
    }
  }
 
  const saveData = async () => {
    try {
      console.log('1232sdxfd',loginData)
      let userData =  JSON.stringify(loginData);
      await AsyncStorage.setItem(TOKEN, loginData.access_token)
     
      await AsyncStorage.setItem(STORAGE_KEY, userData)
      setSuccesstext({ message:'Data successfully saved' }); 
    } catch (e) {
      console.log('successfullyerror', e);
      setErrortext({ message: 'Failed to save the data to the storage' }); 
    }
  }
  const readData = async () => {
    // try {
    //   const user = await AsyncStorage.getItem(STORAGE_KEY);
    //   let jsonuser = JSON.parse(user)
    //   if (user !== null) {
    //     setUserData(jsonuser)
    //   }
    // } catch (e) {
    //   setErrortext({ message: 'Failed to save the data to the storage' });  
    // }
  } 

  useEffect(() => {
    if(userData.status===1){
      setLoading(true);
        //navigation.replace('Tabs')
    } 
  })

  useEffect(() => {
    readData();
  }, [])
  useEffect(() => {
    // // Readyfun.chckesdff();
    if (loginData) {
      if (loginData.status === 1 && loginData.access_token != '') {
        setSuccesstext({ message:loginData.message }); 
        //AsyncStorage.setItem('access_token', data.access_token);
        if (!loginData) return

        saveData(userData);
        setUserData('')
        setLoading(false);
        navigation.replace('Tabs')
      }
    }
  })

  useEffect(() => setvisibleToast(false), [visibleToast]);
  useEffect(() => setSuccesstext(false), [successtext]);  
  useEffect(() => setErrortext(false), [errortext]); 

  return ( 
      <View style={Styles.container} >
        <Loader loading={loading} />
        <Text  style={Styles.title} >Login </Text>
        <Text  style={Styles.sub_title} >To flourish your inner creativity</Text>
        <Image style={Styles.logo} source={require('../img/Screenshot_1.png')} /> 
        <Text  style={Styles.lebel} >E-mail address</Text> 
          <View   style={{  flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center', 
                            borderWidth: 1,
                            borderColor: '#efefef',
                            height:50,
                            borderRadius:25, 
                            margin: 10, 
                            placeholderTextColor : 'red',
                            backgroundColor : emailFocusStyle.backgroundColor ,
                            color : emailFocusStyle.color }}> 
          
            <Icon  color={emailFocusStyle.iconColor} style={{padding : 10 }}  type='font-awesome' name="envelope-o" size={20}  />
            <TextInput
            onBlur={ () => onBlurEmail() }
            onFocus={ () =>onFocusEmail() }
            placeholderStyle={{ color : 'red'}}
            style={{  
              width :'75%' , 
              placeholderTextColor :  emailFocusStyle.inputColor   , 
              color :  emailFocusStyle.inputColor  }}
              placeholder="tina@gmail.com"
              placeholderTextColor="#707070"
              onChangeText={(UserEmail) =>
                setUserEmail(UserEmail)
              }
              tepe="email"
              keyboardType="email-address"
              returnKeyType="search"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              } 
              blurOnSubmit={false} />
            </View>
        <Text
          style={Styles.lebel} >Password</Text>
        <View style={{  flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center', 
                            borderWidth: 1,
                            borderColor: '#efefef',
                            height:50,
                            borderRadius:25, 
                            margin: 10, 
                            placeholderTextColor : 'red',
                            backgroundColor : passFocusStyle.backgroundColor ,
                            color : passFocusStyle.color }}> 
          
          <Icon color={passFocusStyle.iconColor} style={{padding : 10 }}    type='font-awesome' name="key" size={20}  />
       
            <TextInput 
              style={{  
                width :'65%' , 
                placeholderTextColor :  passFocusStyle.inputColor   , 
                color :  passFocusStyle.inputColor  }}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              onBlur={ () => onBlurPass() }
              onFocus={ () =>onFocusPass() }
              placeholder="Enter password"
              placeholderTextColor="#707070"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              returnKeyType="next" />
            <Icon color={passFocusStyle.iconColor} style={{padding : 10 }}   name="eye"  type='font-awesome' size={20}  />
        </View>
        <Text title="Forgot Password" onPress={() => navigation.navigate('Forgot_password')}
          style={Styles.lebel_right} >Forgot password?</Text>
        <Toast visible={errortext} message={errortext.message} />
        <Toast visible={successtext} message={successtext.message} /> 

        <Text title="Register" onPress={() => navigation.navigate('Register')} style={Styles.signup}>Don't have any account? <Text style={styles2.signup}>Signup</Text></Text>

        <TouchableOpacity
           
          style={Styles.loginBtn}
          activeOpacity={0.5}
          onPress={handleSubmitPress}>
          <Text style={Styles.loginText} >LOGIN</Text>
        </TouchableOpacity> 

      </View>
  );
}

export default LoginScreen;
const styles2 = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    borderWidth: 0.5,
    borderColor: '#000',
    height:50,
    borderRadius:25,
    backgroundColor:"#f8f8f8",
    margin: 10,
    color:"black",
    borderColor :'#efefef'
},
  inputStyle:{
    width :'75%'
  },
  inputStylePass:{
    width :'65%'
  }, 
   searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    leftIcon: {
        padding: 10,
        color :'#efefef'
    },
    rightIcon: {
        padding: 10,
        color :'#efefef'
    },
    signup : {
      color : '#FF5D8F',
      fontWeight :'bold'
    }
    
})
