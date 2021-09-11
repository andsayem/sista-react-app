import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, ToastAndroid ,TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../styles";
import Loader from '../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'
const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
};
function PasswordReset(props) {
  const [errortext, setErrortext] = useState(false);
  const [successText, setSuccesstext] = useState(false);
  const [email, setEmail] = useState('andsayem@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setErrortext(false);
    setSuccesstext(false);
  }, [handleSubmitButton])
  const handleSubmitButton = async () => {
    setErrortext(false);
    if (!email) {
      setErrortext({ message: 'Please fill email' });
      return;
    } else if (!password) {
      setErrortext({ message: 'Please fill password' });
      return;
    } else if (!confirmpassword) {
      setErrortext({ message: 'Please fill Confirm Password' });
      return;
    } else {
      setSuccesstext(false); 
      const article = { email: email , otp_code : otpcode };
      const headers = { 
        'Content-Type':'application/json'
      };
      setLoading(true); 
      axios.post('http://sista.bdmobilepoint.com/api/varify-password-otp', article,{headers})
      .then((response) => {
        setLoading(false); 
        if(response.data.success){
          setSuccesstext({message: response.data.message });
          if(response.data.data == 1){
            props.navigation.navigate('PasswordReset') 
          } 
         // props.navigation.navigate("CheckYourEmail");  
        }else{
          setSuccesstext({message: response.data.message });
        } 
        setLoading(false);
      }).catch((error) => {
       // console.log(error.response.data.message);
       setLoading(false); 
        setSuccesstext({message: error.response.data.message }); 
      }); 
    }
  }

  const handleCongratulationResetPress = ()=>{
    props.navigation.navigate('CongratulationResetPassword')
  }
  return (
    <View style={Styles.container}>
      <Text
        style={Styles.title} >Password reset</Text>
      <Text
        style={Styles.sub_title} >We have sent a link to your email</Text>
      <Image
        style={Styles.logo}
        source={require('../img/Screenshot_4.png')}
      />
      <Text
        style={Styles.lebel} >Password</Text>
      <TextInput
        style={Styles.inputText}
        placeholder="Enter password" 
          />
      <Text
        style={Styles.lebel} >Confirm password</Text>
      <TextInput
        style={Styles.inputText}
        placeholder="Enter password" 
        />

      <TouchableOpacity onPress={handleCongratulationResetPress } style={Styles.loginBtn}>
        <Text style={Styles.loginText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PasswordReset;
