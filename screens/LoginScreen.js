import React, { Component, useEffect, useState, createRef } from "react";
import {
  Image, Text, TextInput, TouchableOpacity, View, ToastAndroid, Button, StatusBar,
  Keyboard
} from "react-native";
import Styles from "../styles";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
const STORAGE_KEY = 'save_user';

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
  const onChangeText = userUser => setUser(userUser)

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

    let dataToSend = { email: userEmail, password: userPassword };
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
        console.log('response', json);

        
        //If server response message same as Data Matched
        if (json.status === 1) {
          setLoginData(json);
          setLoading(true);
          setErrortext(false);
          //AsyncStorage.setItem('user_info', json);
          setSuccesstext({ message: json.message });
          console.log('getData', json.message);
          //navigation.replace('Tabs');
          //navigation.replace('DrawerNavigationRoutes');
        } else {
          setLoading(false);
          setErrortext({ message: json.message });
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };



  const saveData = async () => {
    try {
      console.log('1232sdxfd',loginData)
      let test =  JSON.stringify(loginData);
      await AsyncStorage.setItem(STORAGE_KEY, test)
      alert('Data successfully saved')
    } catch (e) {
      console.log('successfullyerror', e);
      alert('Failed to save the data to the storage login')
    }
  }
  const readData = async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY);
      let jsonuser = JSON.parse(user)
      if (user !== null) {
        setUserData(jsonuser)
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear()
      alert('Storage successfully cleared!')
    } catch (e) {
      alert('Failed to clear the async storage.')
    }
  }

  useEffect(() => {
    if(userData.status===1){
      setLoading(true);
        navigation.replace('Tabs')
    }

  })

  useEffect(() => {
    readData();

  }, [])
  useEffect(() => {
    // // Readyfun.chckesdff();
    if (loginData) {
      if (loginData.status === 1 && loginData.access_token != '') {
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
  //useEffect(() => setLoading(false), [loading]);
  useEffect(() => setErrortext(false), [errortext]);
  //useEffect(() => setErrortext(false), [errortext]);

  return (

    <View style={Styles.container} >
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

      <TouchableOpacity onPress={clearStorage} >
        <Text  >Clear Storage</Text>
      </TouchableOpacity>
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
        blurOnSubmit={false} />
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
        returnKeyType="next" />
      <Text title="Forgot Password" onPress={() => navigation.navigate('Forgot_password')}
        style={Styles.lebel_right} >Forgot password?</Text>
      <Toast visible={errortext} message={errortext.message} />
      <Toast visible={successtext} message={successtext.message} />

      <Text title="Register" onPress={() => navigation.navigate('Register')} style={Styles.signup}>Don't have any account? Signup</Text>

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
