import React, { Component, useEffect, useState, createRef } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, 
        TextInput, TouchableOpacity, View, Keyboard } from "react-native";
import Styles from "../styles";
function RegisterScreen ({navigation,props}){
 
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
      isRegistraionSuccess,
      setIsRegistraionSuccess
    ] = useState(false);

    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitButton = () => {
      setErrortext(''); 
      if (!userEmail) {
        alert('Please fill Email');
        return;
      }
      if (!userAge) {
        alert('Please fill Age');
        return;
      }
      if (!userAddress) {
        alert('Please fill Address');
        return;
      }
      if (!userPassword) {
        alert('Please fill Password');
        return;
      }
      //Show Loader
      setLoading(true);
      var dataToSend = { 
        email: userEmail,
        age: userAge,
        address: userAddress,
        password: userPassword,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch('http://sista.abdulmazidcse.com/api/users', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setLoading(false); 
          // If server response message same as Data Matched
          if (responseJson.status === 'success') {
            setIsRegistraionSuccess(true); 
          } else {
            setErrortext(responseJson.msg);
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    };
    return (
      <SafeAreaView style={Styles.container}>
        <ScrollView style={Styles.scrollView}> 
          <View style={Styles.container}>
            <Text
              style={Styles.title} >Sign up</Text>
            <Text
              style={Styles.sub_title} >Create an account so your reading our
              poetry and other services.</Text>
            <Image
              style={Styles.logo}
              source={require('../img/Screenshot_1.png')}
            />
            <Text
              style={Styles.lebel} >E-mail address</Text>
            <TextInput
              style={Styles.inputText}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)} 
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
              placeholder="tina@gmail.com"  />
            <Text
              style={Styles.lebel} >Password</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="Enter password" 
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              } 
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false}/>

            <Text
              style={Styles.lebel} >Age range</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="Select you age range" 
              onChangeText={text => this.setState({email:text})}/>
            <Text
              style={Styles.lebel} >Gender</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="Gender" 
              onChangeText={text => this.setState({email:text})}/>

            <Text
              style={Styles.lebel} >ZIP code</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="ZIP code" 
              onChangeText={(UserAddress) =>
                setUserAddress(UserAddress)
              } 
              autoCapitalize="sentences"
              ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}/>
 
            <Text style={Styles.signup}>By continuing, you agree to ours's
              Terms  & Privacy policy</Text>
              {/* onPress={() => navigation.navigate('Home_page') }  */}
            <TouchableOpacity onPress={handleSubmitButton}  style={Styles.loginBtn}>
              <Text style={Styles.loginText}>Sign Up</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    );
}


export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
