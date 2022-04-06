import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, ToastAndroid , TextInput, TouchableOpacity, View } from "react-native";
import Styles from "../../theme/styles";
import Loader from '../components/Loader';
import axios from 'axios';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'
import helpers from '../../providers/helpers';
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
function CheckYourEmail(props ) {
  const [errortext, setErrortext] = useState(false);
  const [successText, setSuccesstext] = useState(false);
  const [email, setEmail] = useState('andsayem@gmail.com');
  const [otpcode, setOtpcode] = useState('');
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
    } else if (!otpcode) {
      setErrortext({ message: 'Please fill OPT Code' });
      return;
    } else {
      setSuccesstext(false); 
      const article = { email: email , otp_code : otpcode };
      const headers = { 
        'Content-Type':'application/json'
      };
      setLoading(true); 
      axios.post(helpers.baseurl()+'api/varify-password-otp', article,{headers})
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
       setLoading(false); 
        setSuccesstext({message: error.response.data.message }); 
      });


    }
  }
 
  return (
    <View style={Styles.container}>
      <Loader loading={loading} />
      <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)} />
      <Toast visible={successText} message={successText.message} />
      <Text
        style={Styles.title_center} >Check your email</Text>
      <Text
        style={Styles.sub_title_center} >We have sent a link
        to your email</Text>
      <Image
        style={Styles.logo}
        source={require('../../assets/img/Screenshot_2.png')}
      />

      <TextInput value={otpcode}
        maxLength={5}
        placeholder="Code"  
        style={Styles.inputText}
        onChangeText={(otpcode) => setOtpcode(otpcode)} /> 

      <TouchableOpacity onPress={handleSubmitButton }  style={Styles.loginBtn}>
        <Text style={Styles.loginText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  textAreaContainer: {
    fontFamily : 'IBMPlexSans-Regular',
    borderColor: '#efefef',
    borderWidth: 1,
  },
  textArea: {
    fontFamily : 'IBMPlexSans-Regular',
    height: 150,

  },
  input: {
    fontFamily : 'IBMPlexSans-Regular',
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  container: {
    fontFamily : 'IBMPlexSans-Regular',
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    fontFamily : 'IBMPlexSans-Regular',
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    fontFamily : 'IBMPlexSans-Regular',
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },

  cat_title: {
    fontFamily : 'IBMPlexSans-Regular',
    textAlign: 'left',
    padding: 15,
    width: '100%'
  },
  radio: {
    fontFamily : 'IBMPlexSans-Regular',
    fontSize: 10
  }
})


export default CheckYourEmail;
