import React, { Component, useEffect, useState, createRef } from "react";
import {
  Image, Text, TextInput, ScrollView , TouchableOpacity, View, ToastAndroid, StyleSheet, Button, StatusBar,
  Keyboard
} from "react-native";
import {Icon } from 'react-native-elements'; 
import Styles from "../styles";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import RegisterScreen from '../screens/RegisterScreen';
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

function LoginScreen(props) {
  /// { navigation: { navigate } }
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

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const onFocusEmail = () => {
    setEmailInpuStyle({ 
      backgroundColor:"#9253C1",
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
      backgroundColor:"#9253C1",
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
 
   handleSubmitPress = () => {
    ///props.navigation.navigate("Home");
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
       
        let userData  = res.data;  
        if(userData.status ===1){
          setLoginData(res.data);
          saveToken(userData.access_token);         
          saveData();  
          setUserData(userData)
          props.navigation.navigate("Tabs");
        }
        
        setLoading(false);       
      }).catch(function (error) {
        console.log('=========OUT========');
        console.log(error);
        setLoading(false);
      }); 
  };
  

  const saveToken = async (token) =>{  
    try {  
      console.log('Token---------Save',token)
      await AsyncStorage.setItem(TOKEN,token);    
      setSuccesstext({ message:'Token successfully saved ' });       
    } catch (e) { 
      console.log('Token---------Save Don\'n work',e)
      setErrortext({ message: 'Failed to save the data to the storage loginscreen.js' }); 
    }
  }
 
  const saveData = async () => {
    try {
      console.log('1232sdxfd',loginData)
      let userData =  JSON.stringify(loginData);    
      await AsyncStorage.setItem(STORAGE_KEY, userData)
      setSuccesstext({ message:'Data successfully saved' }); 
    } catch (e) {
      console.log('Error', e);
      setErrortext({ message: 'Failed to save the data to the storage' }); 
    }
  }

  const readData = async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY);
      let jsonuser = JSON.parse(user)
      const token = await AsyncStorage.getItem(TOKEN);   
      console.log('jsonuser=============================',jsonuser);
      if((token) && (user)) {
        setSuccesstext({ message:'read successfully saved dfg' });  
        props.navigation.navigate("Home");
      }
    } catch (e) {
      setErrortext({ message: 'Failed to save the data to the storage readdata' });  
    }
  } 
  onLogin = async () => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ }));
        props.navigation.navigate("Home");
    } catch (err) {
        console.log(err);
    }
  }
  const loginRedirent = async () => {
    if (loginData) {
      if (loginData.status === 1 && loginData.access_token != '') {
        setSuccesstext({ message:loginData.message });  
        if (!loginData) return 
        saveData(userData); 
        const token = await AsyncStorage.getItem(TOKEN);
        if(token){
          setLoading(false);        
          navigate('Tabs');
        }
      }
    } 
  }  
  // useEffect(() => {
  //   console.log('userData ============',userData);
  //   if(userData.status===1){ 
  //     setLoading(true);
  //     props.navigation.navigate("Home");
  //   } 
  // },[])

  useEffect(() => {
    readData(); 
  },[]) 

  useEffect(() => setvisibleToast(false), [visibleToast]);
  useEffect(() => setSuccesstext(false), [successtext]);  
  useEffect(() => setErrortext(false), [errortext]); 
  
  const handleRegisterPress = () => {
    props.navigation.navigate("RegisterScreen"); 
  }
  return ( 
      <View style={Styles.container} >
        <Loader loading={loading} />
        <Text  style={Styles.title} >Login </Text>
        <Text  style={Styles.sub_title} >To flourish your inner creativity</Text>
        <Image style={Styles.logo} source={require('../img/Screenshot_1.png')} /> 
        <Text  style={Styles.lebel} >E-mail address {userEmail}</Text> 
        
          <View   style={{  flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center', 
                            borderWidth: 1,
                            borderColor: '#efefef',
                            height:50,
                            borderRadius:25, 
                            margin: 10,  
                            backgroundColor : emailFocusStyle.backgroundColor ,
                            color : emailFocusStyle.color }}> 
          
            <Icon  color={emailFocusStyle.iconColor} style={{padding : 10 }}  type='font-awesome' name="envelope-o" size={20}  />
            <TextInput
            onBlur={ () => onBlurEmail() }
            onFocus={ () =>onFocusEmail() }
            placeholderStyle={{ color : 'red'}}
            style={{  
              width :'75%' ,  
              color :  emailFocusStyle.inputColor  }}
              placeholder="tina@gmail.com"
              value={userEmail} 
              onChangeText={(userEmail) => setUserEmail(userEmail) }
              tepe="email"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
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
                            backgroundColor : passFocusStyle.backgroundColor ,
                            color : passFocusStyle.color }}> 
          
          <Icon color={passFocusStyle.iconColor} style={{padding : 10 }}    type='font-awesome' name="key" size={20}  />
       
            <TextInput 
              style={{  
                width :'65%' ,  
                color :  passFocusStyle.inputColor  }}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              onBlur={ () => onBlurPass() }
              onFocus={ () =>onFocusPass() }
              placeholder="Enter password" 
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

        <Text title="Register" onPress={handleRegisterPress}  style={Styles.signup}>Don't have any account? <Text style={styles2.signup}>Signup</Text></Text>

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
    backgroundColor:"#9253C1", 
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
      color : '#9253C1',
      fontWeight :'bold'
    }
    
})
