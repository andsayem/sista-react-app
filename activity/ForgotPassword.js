import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TextInput, ToastAndroid, TouchableOpacity, StyleSheet } from "react-native";
import Styles from "../styles";
import Loader from '../components/Loader';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
import helpers from '../helpers';
const TOKEN = 'token';
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
function ForgotPassword(props) {
  const [errortext, setErrortext] = useState(false);
  const [successText, setSuccesstext] = useState(false);
  const [email, setEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  // const handleCheckYourEmailPress = () => { 
  //   props.navigation.navigate("CheckYourEmail");  
  // }
  useEffect(() => {
    setErrortext(false);
    setSuccesstext(false);
  }, [handleSubmitButton])
  const handleSubmitButton = async () => {
    setErrortext(false);
    if (!email) {
      setErrortext({ message: 'Please fill email' });
      return;
    } else {
      setSuccesstext(false); 
      const article = { email: email };
      const headers = { 
        'Content-Type':'application/json'
      };
      setLoading(true); 
      axios.post(helpers.baseurl()+'api/forgot-password', article,{headers})
        .then((response) => {
          setLoading(false); 
          if(response.data.success){
            setSuccesstext({message: response.data.message }); 
            props.navigation.navigate("CheckYourEmail");  
          }else{
            setSuccesstext({message: response.data.message });
          } 
          setLoading(false);
        }).catch((error) => {
         // console.log(error.response.data.message);
         setLoading(false); 
          setSuccesstext({message: error.response.data.message }); 
        });


      // axios({
      //   method: 'post',
      //   responseType: 'json',
      //   url: helpers.baseurl()+'api/forgot-password',
      //   data: {
      //     email: email
      //   }
      // })
      //  .then(response => {
      //    console.log(response);
      //    //dispatch(something(response));
      //  })
      //  .catch(error => {
      //   console.log(error);
      //   //  dispatch({ type: AUTH_FAILED });
      //   //  dispatch({ type: ERROR, payload: error.data.error.message });
      //  });




      // fetch(helpers.baseurl()+'api/forgot-password', {
      //   method: 'POST', 
      //   headers: {  
      //     'Content-Type':'application/json'
      //   },
      //   body: JSON.stringify(dataToSend) 
      //   })
      //   .then((response) => {
      //     response.json() ;  
      //     console.log(response);
      //     setSuccesstext({message:' Post Submit Successful'}); 
      //   })
      //   .then((responseJson) => { 
      //     console.log(responseJson);
      //     setLoading(false);  
      //     if (responseJson.success === true) { 
      //       setSuccesstext({message:'Post Submit Successful'}); 
      //       setCaption('');
      //       setCategories(''); 
      //     } else { 
      //     }
      //   })
      //   .catch((error) => { 
      //     console.log(error);
      //     setLoading(false); 
      //   });
    }
  };
  return (
    <View style={Styles.container}>
      <Loader loading={loading} />
      <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)} />
      <Toast visible={successText} message={successText.message} />
      <Text
        style={Styles.title_center} >Forgot your password?</Text>
      <Text
        style={Styles.sub_title_center} >Enter your registered email below
        to receive password reset link </Text>
      <Image
        style={Styles.logo}
        source={require('../img/Screenshot_2.png')}
      />
      <Text> {email} </Text>

      <TextInput value={email}
      style={Styles.inputText}
      placeholder="Enter your email id" 
        maxLength={50}
        onChangeText={(email) => setEmail(email)} />

      {/* 
      <TextInput 
        value={email}
        style={Styles.inputText}
        placeholder="tina@gmail.com" 
        onChangeText={(email) => setEmail(email) }/> */}
      <TouchableOpacity style={Styles.loginBtn}
        onPress={handleSubmitButton} >
        <Text style={Styles.loginText}>Log In</Text>
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


export default ForgotPassword;
