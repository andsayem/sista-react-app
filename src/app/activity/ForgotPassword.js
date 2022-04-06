import React, { useEffect,useState } from "react";
import { View, Text, Image, TextInput, ToastAndroid, TouchableOpacity, StyleSheet } from "react-native";
import Styles from "../../theme/styles";
import Loader from '../components/Loader';
import axios from 'axios'; 
const STORAGE_KEY = 'save_user';
import helpers from '../../providers/helpers';
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
        'Content-Type': 'application/json'
      };
      setLoading(true);
      axios.post(helpers.baseurl() + 'api/forgot-password', article, { headers })
        .then((response) => {
          setLoading(false);
          if (response.data.success) {
            setSuccesstext({ message: response.data.message });
            props.navigation.navigate("CheckYourEmail");
          } else {
            setSuccesstext({ message: response.data.message });
          }
          setLoading(false);
        }).catch((error) => {
          setLoading(false);
          setSuccesstext({ message: error.response.data.message });
        });

    }
  };
  return (
    <View style={Styles.container}>
      <Loader loading={loading} />
      <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)} />
      <Toast visible={successText} message={successText.message} />
      <Text
        style={{
          fontFamily: 'IBMPlexSans-Regular',
          width: "80%",
          paddingLeft: 15,
          fontSize: 20,
          textAlign: "center"
        }} >Forgot your password?</Text>
      <Text
        style={{
          fontFamily: 'Montserrat-Regular',
          width: "80%",
          paddingLeft: 15,
          color: "#929292",
          fontSize: 13,
          textAlign: "center"
        }} >Enter your registered email below
        to receive password reset link </Text>
      <Image
        style={Styles.logo}
        source={require('../../assets/img/Screenshot_2.png')}
      />
      <Text> {email} </Text>

      <TextInput value={email}
        style={Styles.inputText}
        placeholder="Enter your email id"
        maxLength={50}
        onChangeText={(email) => setEmail(email)} /> 
      <TouchableOpacity style={Styles.loginBtn}
        onPress={handleSubmitButton} >
        <Text style={Styles.loginText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
} 
export default ForgotPassword;
