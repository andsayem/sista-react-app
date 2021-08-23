import React, { Component, useEffect, useRef , useState, createRef } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet';  
import Textarea from 'react-native-textarea';
import AsyncStorage from '@react-native-community/async-storage';
import Styles from "../styles";
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'; 
//import renderIf from './renderIf'
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

function Journaladd({navigation}) {
  const [title, setTitle] = useState(false);
  const [details, setDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [successText, setSuccesstext] = useState(false);   
  const [index, setIndex] = useState(0);
  useEffect(() => setSuccesstext(false), [successText]);  
  useEffect(() => setErrortext(false), [errortext]);
   
  useEffect(()=>{
    setErrortext(false);
    setSuccesstext(false);
  },[handleSubmitButton])
  const handleSubmitButton = async () => {    
    setErrortext(false);
    if (!details) { 
      setErrortext({message : 'Please fill caption'});  
      return;
    }else{
      setSuccesstext(false);
    }
    setLoading(true); 
    var dataToSend = { 
      user_id: 1, 
      details: details,    
      title: title,    
    }; 
    console.log('caption Data',dataToSend);
    fetch('http://sista.abdulmazidcse.com/api/journals', {
      method: 'POST', 
      headers: { 
       // Authorization :"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MmU5Njg1Ny00ZmQ4LTQ0N2ItYjEyZC05MGRjMzBlMTU2MTYiLCJqdGkiOiI2MDQwOGNlMmQ4MzkzM2MxNWI1N2VlOWM0ZGZmYTJlZmQyZjFlMTliM2YzOGIwMDkxNjRhOTkwNThkNTEyNzlhNGE0MGU0NWUwNDRhNzMzMiIsImlhdCI6IjE2MjIxNDAwNjkuMzYxMTMxIiwibmJmIjoiMTYyMjE0MDA2OS4zNjExMzQiLCJleHAiOiIxNjUzNjc2MDY5LjM1ODUyMCIsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.A0w81TgcNg-dRAWmxM1dxYgGsgjwjuMnv2oRPbXsZfzqUqawH7uJl9P9iWKQSYIx2uO8SUxdTE2Ky9zray-fHFKW_TF0MPllEyeg6uh0GWDEveHjz8UV3e1W8TzCj9OYcSDjG40ORuKNZrPK2WgrPOzjjyr0w-vhmn4tyBL1XEHlW4gRxRYBjdXBay5LBjSHF_k_7cv_DagK4bscjWYTC5sJpjjYOVIKBj1vyQo6z13s6tAK6DPS899bM89E7AqW_JdUuwI95R6UwVnl1OqFvc0j2DArrHl1XLWa0-iRMseM1k4zibQA10-mzBftuJ-ivfH0zxRQAMg_9U4wIlSkFtNpGF3r93pmdvgvhhoShyEwwvsG8UGr_a3hIq23v2xXBID8flW7239AI__Ss8eDOPoq0A-_B3FFDu2TPVnej7cYl1PS29zi6EtXMVVM2o2hSHKCcY2m5OornonklaUZLrJwWShNG2SchxuLqhAVZsZFoHUjqH6R_451Keke2wyZXNkfprb7MIqiogBkkUWUQtyl5O9qducahbnWwY6CkSNNiLo0rxPhxYYsgQ_oUWUYiYZNhm8FUOIFWMaGQOH56dJVrKAZ-UIU-0Bqt6Zi4FuE6uxjGMHFzbRFT_CYlmC3xE3-F8y_WswE0nqqqYkEe1qnLOGG400I5XQ05mtWXik",
        'Content-Type': 'application/json',
        Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN)
      },
      body: JSON.stringify(dataToSend) 
      })
      .then((response) => response.json())
      .then((responseJson) => { 
        setLoading(false); 
        if (responseJson.success === true) { 
          setSuccesstext({message:'Journal submit successful'}); 
          setTitle('');
          setDetails(''); 
        } else { 
        }
      })
      .catch((error) => { 
        setLoading(false); 
      });
  }; 

    return ( 
      
        <ScrollView >
          <Header 
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Writing Prompts', style: { color: '#fff' } }} 
          />
      
          <ListItem > 
              <ListItem.Content 
                style={{
                  width: 10
                }}
              >  
                    <ListItem.Subtitle>Title : </ListItem.Subtitle> 
              </ListItem.Content>  
              <ListItem.Content
               style={{
                width: 100
              }}>  
                  
                  <ListItem.Input style={{
                    textAlign: 'left'
                  }}
                  onChangeText={(title) => setTitle(title)} 
                  value={title}
                  placeholder="Title here" ></ListItem.Input>
                  
              </ListItem.Content>   
            </ListItem>
          
            <ListItem > 
             
              <ListItem.Content >   
              <Textarea
                  onChangeText={(details) => setDetails(details)} 
                  value={details}
                  blurOnSubmit={true}
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  maxLength={1000}
                  placeholder={'Type something...'}  
                  returnKeyType="next"
                  multiline={true}
                  underlineColorAndroid="transparent"
                  underlineColorAndroid={'transparent'}
                />
              </ListItem.Content>   
            </ListItem>
          
          <ListItem>
            <TouchableOpacity
             onPress={handleSubmitButton} 
              style={Styles.journalBtn}
              activeOpacity={0.5} >
              <Text style={Styles.journalText} >Save</Text>
            </TouchableOpacity>

             
          </ListItem>
          
        </ScrollView>
      
    );
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor:  '#efefef',
    borderWidth: 1,  
  },
  textArea: {
    height: 150, 
    
  } ,
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
 
  cat_title : {
    textAlign: 'left', 
    padding : 15,  
    width : '100%'
    },
  radio : {
    fontSize : 10
  }
})


export default Journaladd;
