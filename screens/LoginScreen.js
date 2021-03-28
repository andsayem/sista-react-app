import React, { Component,useEffect, useState,  createRef } from "react";
import { Image, Text, TextInput, TouchableOpacity, View, ToastAndroid, Button, StatusBar,
  Keyboard } from "react-native";
import Styles from "../styles";
import ForgotPassword from "../activity/forgot_password";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader'; 
const showToast = () => {
  ToastAndroid.show("A pikachu appeared nearby !", ToastAndroid.SHORT);
};

const showToastWithGravity = () => {
  ToastAndroid.showWithGravity(
    "All Your Base Are Belong To Us",
    ToastAndroid.SHORT,
    ToastAndroid.CENTER
  );
};

const showToastWithGravityAndOffset = () => {
  ToastAndroid.showWithGravityAndOffset(
    "A wild toast appeared!",
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};

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


function LoginScreen({ navigation }){
    const [userEmail, setUserEmail] = useState(false);
    const [userPassword, setUserPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState(false);
    const [successtext, setSuccesstext] = useState(false);
    const [data, setData] = useState(false);
    const [visibleToast, setvisibleToast] = useState(false);

    const passwordInputRef = createRef();
    const handleSubmitPress = () => {
      
      //setErrortext('');
      if (!userEmail) {
        setvisibleToast(true);
        setErrortext({message:'Please fill Email'});
        //alert('Please fill Email');
        return;
      }
      if (!userPassword) {
        setvisibleToast(true);
        setErrortext({message:'Please fill Password'});
        return;
      }
      if (userEmail && userPassword) {
        setLoading(true);
        setErrortext(false)
      }else{
        setLoading(false); 
      }
      
      let dataToSend = {email: userEmail, password: userPassword};
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch('http://sista.abdulmazidcse.com/api/auth/login', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        console.log('response',json); 
        setData(json)
        //If server response message same as Data Matched
        if (json.status===1) {
          setLoading(true);
          setErrortext(false);
          AsyncStorage.setItem('user_id', json);
          setSuccesstext({message:json.message});
          console.log('jsondata',json.message);
          //navigation.replace('Tabs');
          //navigation.replace('DrawerNavigationRoutes');
        } else {
          setLoading(false);
          setErrortext({message : json.message});  
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
    }; 
    useEffect(()=>{
        if(data){ 
          if(data.status ===1 && data.access_token !=''){
            setLoading(true);
            navigation.replace('Tabs')
          }
        }
    })
    
    useEffect(() => setvisibleToast(false), [visibleToast]);
    //useEffect(() => setLoading(false), [loading]);
    useEffect(() => setErrortext(false), [errortext]);
    //useEffect(() => setErrortext(false), [errortext]);

    return (
      
      <View  style={Styles.container} >
        <Loader loading={loading} />
        <Text
          style={Styles.title} >Login </Text>
        <Text
          style={Styles.sub_title} >To flourish your inner creativity</Text>
        <Image
          style={Styles.logo}
          source={require('../img/Screenshot_1.png')}
        />
        <Text
          style={Styles.lebel} >E-mail address</Text>
        <TextInput
          style={Styles.inputText}
          placeholder="tina@gmail.com"
          placeholderTextColor="#707070"
          onChangeText={(UserEmail) =>
            setUserEmail(UserEmail)
          }
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() =>
            passwordInputRef.current &&
            passwordInputRef.current.focus()
          }
          underlineColorAndroid="#f000"
          blurOnSubmit={false}/>
        <Text
          style={Styles.lebel} >Password</Text>
        <TextInput
          style={Styles.inputText}
          onChangeText={(UserPassword) =>
            setUserPassword(UserPassword)
          }
          placeholder="Enter password"
          placeholderTextColor="#707070"
          keyboardType="default"
          ref={passwordInputRef}
          onSubmitEditing={Keyboard.dismiss}
          blurOnSubmit={false}
          secureTextEntry={true}
          returnKeyType="next"/>
        <Text title="Forgot Password" onPress={() => navigation.navigate('Forgot_password') }
          style={Styles.lebel_right} >Forgot password?</Text>
        <Toast visible={errortext} message={errortext.message} />
        <Toast visible={successtext} message={successtext.message} />
      {/* <Toast visible={visibleToast} message={errortext.message} />  */}

        <Text title="Register" onPress={() => navigation.navigate('Register') } style={Styles.signup}>Don't have any account? Signup</Text>

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
