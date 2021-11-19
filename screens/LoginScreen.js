import React, { useEffect, useState, createRef } from "react";
import {
  Image, Text, ScrollView, TextInput, TouchableOpacity, View, ToastAndroid, StyleSheet, Button, StatusBar,
  Keyboard
} from "react-native";
import { Icon } from 'react-native-elements';
import Styles from "../styles";
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../components/Loader';
import { useHistory } from "react-router-dom";
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
    backgroundColor: "#f8f8f8",
    iconColor: '#BABDC3'
  });
  const [passFocusStyle, setPassInpuStyle] = useState({
    backgroundColor: "#f8f8f8",
    iconColor: '#BABDC3'
  });
  const [getEye, setEye] = useState('eye');
  const [passtype, setPassType] = useState(true);
  const onChangeText = userUser => setUser(userUser)

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const history = useHistory();

  const onFocusEmail = () => {
    setEmailInpuStyle({
      backgroundColor: "#944CD4",
      iconColor: "#fff",
      inputColor: '#ffffff'
    });
  }

  const onBlurEmail = () => {
    setEmailInpuStyle({
      backgroundColor: "#f8f8f8",
      color: '#929292'
    });
  }

  const onFocusPass = () => {
    setPassInpuStyle({
      backgroundColor: "#944CD4",
      iconColor: "#fff",
      inputColor: '#ffffff'
    });
  }

  const onBlurPass = () => {
    setPassInpuStyle({
      backgroundColor: "#f8f8f8",
      color: '#929292'
    });
  }

  handleSubmitPress = () => {

    if (!userEmail) {
      setvisibleToast(true);
      setErrortext({ message: 'Please fill Email' });
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
    axios.post('https://sista.andsayem.com/api/auth/login',
      {
        email: userEmail,
        password: userPassword
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log('login===', res.data);
        let userData = res.data;
        if (userData.status === 1) {
          setLoginData(res.data);
          saveToken(userData.access_token);
          saveData(userData.user);
          setUserData(userData)
          console.log('=========================', userData);
          props.navigation.navigate("Home");
          
        } else {
          setErrortext({ message: 'Your User or password wrong!' });
        }
        // props.navigation.navigate("Home");
        setLoading(false);
      }).catch(function (error) {
        setLoading(false);
      });
  };


  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem(TOKEN, token);
      setSuccesstext({ message: 'Token successfully saved ' });
    } catch (e) {
      setErrortext({ message: 'Failed to save the data to the storage loginscreen.js' });
    }
  }

  const saveData = async (loginData) => {
    try {
      //console.log('1232sdxfd',loginData)
      let userData = JSON.stringify(loginData);
      await AsyncStorage.setItem(STORAGE_KEY, userData)
      setSuccesstext({ message: 'Data successfully saved' });
    } catch (e) {
      //console.log('Error', e);
      setErrortext({ message: 'Failed to save the data to the storage' });
    }
  }

  const readData = async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY);
      const token = await AsyncStorage.getItem(TOKEN);
      if ((token) && (user)) {
        props.navigation.navigate("Home");
      }
    } catch (e) {
      setErrortext({ message: 'Failed to save the data to the storage readdata' });
    }
  }
  onLogin = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({}));
      props.navigation.navigate("Home");
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    readData();
  }, [])

  useEffect(() => setvisibleToast(false), [visibleToast]);
  useEffect(() => setSuccesstext(false), [successtext]);
  useEffect(() => setErrortext(false), [errortext]);

  const handleRegisterPress = () => {
    props.navigation.navigate("RegisterScreen");
  }
  const handleForgotPasswordPress = () => {
    props.navigation.navigate("ForgotPassword");
  }
  const _changeIcon = () => {
    //let passtpe = passtype();
    if (passtype == true) {
      setPassType(false);
    } else {
      setPassType(true);
    }
    //let eyeicon = getEye();
    if (getEye == 'eye') {
      setEye('eye-slash');
    } else {
      setEye('eye');
    }


  }

  return (
    <ScrollView>
      <View style={Styles.container} >
        <Loader loading={loading} />
        <Text style={Styles.title} >Login </Text>
        <Text style={Styles.sub_title} >Get in touch with your inner artist and
          a community of other creatives  </Text>
        <Image style={Styles.logo} source={require('../img/Screenshot_1.png')} />
        <Text style={Styles.lebel} >E-mail address</Text>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#efefef',
          height: 50,
          borderRadius: 25,
          margin: 10,
          backgroundColor: emailFocusStyle.backgroundColor,
          color: emailFocusStyle.color
        }}>

          <Icon color={emailFocusStyle.iconColor} style={{ padding: 10 }} type='font-awesome' name="envelope-o" size={20} />
          <TextInput
            onFocus={() => onFocusEmail()}
            placeholderStyle={{ color: 'red' }}
            style={{
              width: '75%',
              color: emailFocusStyle.inputColor
            }}
            onChangeText={(userEmail) => setUserEmail(userEmail)}
            placeholder="Enter your email id"
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#efefef',
          height: 50,
          borderRadius: 25,
          margin: 10, backgroundColor: passFocusStyle.backgroundColor,
          color: passFocusStyle.color
        }}>

          <Icon color={passFocusStyle.iconColor} style={{ padding: 10 }} type='font-awesome' name="key" size={20} />

          <TextInput
            style={{
              width: '65%',
              color: passFocusStyle.inputColor
            }}
            onChangeText={(UserPassword) =>
              setUserPassword(UserPassword)
            }
            onFocus={() => onFocusPass()}
            placeholder="Enter password"
            keyboardType="default"
            ref={passwordInputRef}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false}
            secureTextEntry={passtype}
            returnKeyType="next" />
          <Icon color={passFocusStyle.iconColor} style={{ padding: 10 }} onPress={() => { _changeIcon() }} name={getEye} type='font-awesome' size={20} />
        </View>
        <Text title="Forgot Password" onPress={handleForgotPasswordPress}
          style={Styles.lebel_right} >Forgot password?</Text>
        <Toast visible={errortext} message={errortext.message} />
        <Toast visible={successtext} message={successtext.message} />

        <Text title="Register" onPress={handleRegisterPress} style={Styles.signup}>Don't have any account? <Text style={styles2.signup}>Signup</Text></Text>

        <TouchableOpacity

          style={Styles.loginBtn}
          activeOpacity={0.5}
          onPress={handleSubmitPress}>
          <Text style={Styles.loginText} >Log In</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

export default LoginScreen;
const styles2 = StyleSheet.create({
  loginPassword: {

  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 50,
    borderRadius: 25,
    backgroundColor: "#944CD4",
    margin: 10,
    color: "black",
    borderColor: '#efefef'
  },
  inputStyle: {
    width: '75%'
  },
  inputStylePass: {
    width: '65%'
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
    color: '#efefef'
  },
  rightIcon: {
    padding: 10,
    color: '#efefef'
  },
  signup: {
    color: '#944CD4',
    fontWeight: 'bold'
  }
});
