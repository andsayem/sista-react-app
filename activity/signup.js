import React, { Component } from "react";
import { Image, SafeAreaView , ScrollView ,StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

class Signup extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
              <Text
                style={styles.title} >Sign up</Text>
              <Text
                style={styles.sub_title} >Create an account so your reading our
                poetry and other services.</Text>
              <Image
                style={styles.logo}
                source={require('../img/Screenshot_1.png')}
              />
              <Text
                style={styles.lebel} >E-mail address</Text>
              <TextInput
                style={styles.inputText}
                placeholder="tina@gmail.com"
                placeholderTextColor="#707070"
                 />
              <Text
                style={styles.lebel} >Password</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Enter password"
                placeholderTextColor="#707070"
                 />

              <Text
                style={styles.lebel} >Age range</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Select you age range"
                placeholderTextColor="#707070"
                 />


              <Text
                style={styles.lebel} >Gender</Text>
              <TextInput
                style={styles.inputText}
                placeholder="Gender"
                placeholderTextColor="#707070"
                />

              <Text
                style={styles.lebel} >ZIP code</Text>
              <TextInput
                style={styles.inputText}
                placeholder="ZIP code"
                placeholderTextColor="#707070"
                />



              <Text style={styles.signup}>By continuing, you agree to ours's
                Terms  & Privacy policy</Text>
              <TouchableOpacity style={styles.loginBtn}>
                <Text onPress={() => navigation.navigate('Home_page') } style={styles.loginText}>Sign Up</Text>
              </TouchableOpacity>

            </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView : {
  },
  logo: {
    width: 300,
    height: 230,
    resizeMode: 'stretch'
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black",
    textAlign : "left",
    width:"80%",
    backgroundColor:"#f8f8f8",
    paddingLeft : 30,
    borderRadius:25,
    marginTop:10,
    borderColor: '#A09F9F',
    borderWidth: 1,
    marginBottom:10
  },
  forgot:{
    color:"white",
    fontSize:11,

  },
  lebel :{
    width:"80%",
    color : "#383838" ,
    paddingLeft: 15,
    textAlign: "left"
  },
  title :{
    width:"80%",
    paddingLeft: 15,
    fontSize: 22 ,
    fontWeight : 'bold',
    textAlign: "left"
  },
  sub_title : {
    width:"80%",
    paddingLeft: 15,
    color : "#929292",
    fontSize: 12 ,
    textAlign: "left"
  },
  signup :{
    textAlign : "center" ,
    color : "#383838" ,
    fontSize:11,
    paddingTop :25 ,

  },
  lebel_right:{
    width:"80%",
    paddingRight: 15,
    textAlign: "right"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    textAlign : "center",
    marginTop:20,
    marginBottom:10
  },
});
export default Signup;
