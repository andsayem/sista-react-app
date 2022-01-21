//import React, { Component, useEffect, useState, createRef } from "react";
import React, { useEffect, useRef , useState , createRef } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, 
        TextInput, TouchableOpacity, SectionList , View, Keyboard, ToastAndroid } from "react-native";
import Styles from "../styles";
import { Icon } from 'react-native-elements';   
import Loader from '../components/Loader';  
import RBSheet from "react-native-raw-bottom-sheet"; 
 
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

function RegisterScreen ({navigation,props}){  
    const [userName, setUserName] = useState(false);
    const [userEmail, setUserEmail] = useState(false);
    const [userAge, setUserAge] = useState('9-12');
    const [userGender, setUserGender] = useState('Male');
    const [userZipcode, setUserZipcode] = useState(false);
    const [userPassword, setUserPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState(false);
    const [successText, setSuccesstext] = useState(false);  
    const refRBSheetAge = useRef();
    const refRBSheet = useRef();
    const nameInputRef = createRef();
    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const genderInputRef = createRef();
    const zipcodeInputRef = createRef();
    const passwordInputRef = createRef(); 
    useEffect(()=>{
      setErrortext(false);
    })
    const ageDataSet = (value)=>{
      setUserAge(value);
      refRBSheetAge.current.close();
    }
    const genderDataSet = (value)=>{
      setUserGender(value);
      refRBSheet.current.close();
    }
    const handleSubmitButton = () => {   

      setErrortext(false);
      if (!userName) { 
        setErrortext({message : 'Please fill Name'}); 
        //setSuccesstext({message:'Registration Successful. Please Login to proceed'}); 
        return;
      }
      if (!userEmail) {
        setErrortext({message : 'Please fill Email'}); 
        return;
      }
      if (!userPassword) {
        setErrortext({message : 'Please fill Password'});   
        return;
      } 
      if (!userAge) {
        setErrortext({message : 'Please fill age'});  
        return;
      }
      if (!userZipcode) {
        setErrortext({message : 'Please fill Zip Code'}); 
        return;
      }
      
      //Show Loader
      setLoading(true); 
      var dataToSend = { 
        name: userName,
        email: userEmail,
        age_range: userAge,
        gender: userGender,
        zip_code : userZipcode,
        password: userPassword,
      }; 
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch('http://sista.andsayem.com/api/users', {
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
          if (responseJson.success === true) { 
            setSuccesstext({message:'Registration Successful. Please Login to proceed'}); 
            navigation.replace('Login')
          } else {
            //setErrortext(responseJson.msg);
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
          <Loader loading={loading} />
          <View style={Styles.container}> 
          <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)}/>
          <Toast visible={successText} message ={successText.message} />
            <Text
              style={Styles.title} >Sign up</Text>
            <Text
              style={Styles.sub_title} >Create your account to inspire or be inspired by{"\n"}all levels of artists
(Poets, Song writers, Painters and more) </Text>
            <Image
              style={Styles.logo}
              source={require('../img/Screenshot_1.png')}
            />             
            <Text style={Styles.lebel} >Name</Text> 
            <TextInput
              style={Styles.inputText}
              onChangeText={(UserName) => setUserName(UserName)} 
              value={userName}
              keyboardType="Name"
              ref={nameInputRef}
              returnKeyType="next" 
              blurOnSubmit={true}
              placeholder="Sista" 
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }/>
            <Text style={Styles.lebel} >E-mail address</Text>
            <TextInput
              style={Styles.inputText}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)} 
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next" 
              blurOnSubmit={false}
              placeholder="Enter your email id" 
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              } 
            />
            <Text
              style={Styles.lebel} >Password</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="Enter password" 
              onChangeText={(UserPassword) => setUserPassword(UserPassword)} 
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true} 
              blurOnSubmit={false}
              onSubmitEditing={() =>
                ageInputRef.current
              }
            />
          <Text style={Styles.lebel} >Age range</Text>
          <View style={{width:'100%'}}>
            <View style={[Styles.selectSheet,Styles.inputText]}> 
              <Text style={{ color : '#929292'}}  onPress={() => refRBSheetAge.current.open()}>  
                  
                  { userAge ? userAge+' years old' : 'Select your age range'}
              {/* <Icon   style={{padding : 2 , textAlign : 'right' , right : 0 }}  type='font-awesome' name="angle-right" size={20}  /> */}
              </Text>
            </View> 
             <RBSheet 
                 customStyles={{
                  container: {  
                    paddingTop : 10, 
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20 
                  },
                  wrapper: {
                   // backgroundColor: "transparent"
                  },
                  draggableIcon: {
                    backgroundColor: "#000"
                  }
                }}
                ref={refRBSheetAge}
                closeOnDragDown={true}
                closeOnPressMask={true} 
                height={310}
                openDuration={500} >
                <Text style={{ textAlign : 'center', color : '#000000', fontWeight : 'bold'}} onPress={() => refRBSheetAge.current.close()} > 
                <Icon   style={{ color : 'black' , fontSize : 10 , paddingEnd :30}} type='font-awesome' name="arrow-left" size={20}  />
                Select your age range 
                </Text> 
                {/* <Text  style={{ textAlign : 'right' , fontWeight : 'bold'}} >Apply  </Text> */}
                <View style={Styles.footer_item_view}>
                  <SectionList
                        style={{
                          alignContent: 'center', 
                        }}
                        sections={[
                          { data: ['9-12', '13-16', '17-21' , '22-25']}, 
                        ]}
                        renderItem={({item}) => <Text onPress={()=>{ ageDataSet(item)}} 
                        style={[Styles.footer_item, (item==  userAge )?Styles.footer_item_active:'']}
                        >{item} years old</Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                      />
                  </View>
              </RBSheet> 
          </View>

          <Text style={Styles.lebel} >Gender</Text>
          <View style={{width:'100%'}}>
            <View style={[Styles.selectSheet,Styles.inputText]}> 
              <Text   onPress={() => refRBSheet.current.open()}  style={{ color : '#929292'}} >  
                 { userGender ? userGender : 'Select your gender'}
              {/* <Icon   style={{padding : 2 , textAlign : 'right' , right : 0 }}  type='font-awesome' name="angle-right" size={20}  /> */}
              </Text>
            </View> 
             <RBSheet 
                 customStyles={{
                  container: {  
                    paddingTop : 10, 
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20 
                  },
                  wrapper: {
                   // backgroundColor: "transparent"
                  },
                  draggableIcon: {
                    backgroundColor: "#000"
                  }
                }}
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true} 
                height={260}
                openDuration={500} >
                <Text style={{ textAlign : 'center', color : '#000000', fontWeight : 'bold'}} onPress={() => refRBSheet.current.close()} > 
                <Icon   style={{ color : 'black' , fontSize : 10 , paddingEnd :30}} type='font-awesome' name="arrow-left" size={20}  />
                Select your gender </Text> 
                {/* <Text  style={{ textAlign : 'right' , fontWeight : 'bold'}} >Apply  </Text> */}
                <View style={Styles.footer_item_view}>
                  <SectionList
                        style={{
                          alignContent: 'center', 
                        }}
                        sections={[
                          { data: ['Male', 'Female', 'Other']}, 
                        ]}
                        renderItem={({item}) => <Text 
                        onPress={()=>{ genderDataSet(item)}}  
                        style={[Styles.footer_item, (item== userGender )?Styles.footer_item_active:'']}
                        >{item}</Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                        keyExtractor={(item, index) => index}
                      />
                  </View>
              </RBSheet> 
          </View>
            {/* <Text style={Styles.lebel} >Age range</Text>
            <DropDownPicker
                items={[
                      {label: '0-17', value: '0-17'},
                      {label: '18-25', value: '18-25'},
                      {label: '26-50', value: '26-50'},
                      {label: '51+', value: '51+'},
                  ]} 
                  placeholder="Select you age range"
                  containerStyle={{height: 40, width:280}}
                  style={Styles.DropDown}
                  ref={ageInputRef}
                  itemStyle={{ justifyContent: 'flex-start'}}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={item => setUserAge(item.value)} 
                  returnKeyType="next"
            />  */}
            {/* <Text  style={Styles.lebel} >Gender</Text>
            <DropDownPicker
                items={[
                    {label: 'Male', value: 'Male'},
                    {label: 'Female', value: 'Female'},
                    {label: 'Other', value: 'Other'}
                ]} 
                placeholder="Select you age range"
                containerStyle={{height: 40, width:280}}
                style={Styles.DropDown}
                ref={genderInputRef}
                itemStyle={{ justifyContent: 'flex-start' }}
                dropDownStyle={{backgroundColor: '#fafafa'}} 
                onChangeItem={item => setUserGender(item.value)} 
                returnKeyType="next"
            />  */}
            <Text
              style={Styles.lebel} >ZIP code</Text>
            <TextInput
              style={Styles.inputText}
              placeholder="ZIP code" 
              onChangeText={(userZipcode) => setUserZipcode(userZipcode)} 
              autoCapitalize="sentences"
              ref={zipcodeInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}/>
 
            <Text style={Styles.signup} onPress={() => navigation.navigate('PrivacyPolicy')} >By continuing, you agree to ours's
              Terms  & Privacy policy</Text>               
            <TouchableOpacity onPress={handleSubmitButton}   
              style={Styles.loginBtn}>
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
  DropDown:{
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
    alignItems: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
    padding: 30,
  },

});
