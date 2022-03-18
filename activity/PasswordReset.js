import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, ToastAndroid , TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../styles";
import Loader from '../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'
import helpers from '../helpers';
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
    } else if (confirmpassword != password ) {
      setErrortext({ message: 'The password and confirmation password do not match.' });
      return;
    }else {
      setSuccesstext(false); 
      const article = { 
        email: email , 
        password : password  ,
        confirmpassword : confirmpassword  ,
      };
      const headers = { 
        'Content-Type':'application/json'
      };
      setLoading(true); 
      axios.post(helpers.baseurl()+'api/password-reset', article,{headers})
      .then((response) => {
        setLoading(false); 
        if(response.data.success){
          setSuccesstext({message: response.data.message });
          if(response.data.data == 1){
            props.navigation.navigate('CongratulationResetPassword') 
          }  
        }else{
          setSuccesstext({message: response.data.message });
        } 
        setLoading(false);
      }).catch((error) => { 
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
      <Loader loading={loading} />
      <Toast style={Styles.errorTextStyle} 
      visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)} />
      <Toast visible={successText} message={successText.message} />
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
      value={password}
         maxLength={16}
        style={Styles.inputText}
        onChangeText={(password) => setPassword(password)}
        placeholder="Enter password" 
          />
      <Text
        style={Styles.lebel} >Confirm password</Text>
      <TextInput
      value={confirmpassword}
        maxLength={16}
        onChangeText={(confirmpassword) => setConfirmpassword(confirmpassword)}
        style={Styles.inputText}
        placeholder="Enter password" 
        />

      <TouchableOpacity onPress={handleSubmitButton } style={Styles.loginBtn}>
        <Text style={Styles.loginText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: '#efefef',
    borderWidth: 1,
  },
  textArea: {
    height: 150,

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },

  cat_title: {
    textAlign: 'left',
    padding: 15,
    width: '100%'
  },
  radio: {
    fontSize: 10
  }
})

export default PasswordReset;
