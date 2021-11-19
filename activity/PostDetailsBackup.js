import React, { useEffect, useState } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet,ToastAndroid } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet'; 
import { Icon } from 'react-native-elements'
import Styles from "../styles";
import Textarea from 'react-native-textarea';
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import FormData from 'form-data'; 
const STORAGE_KEY = 'save_user';
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
function PostDetails({navigation,route}) {
  const { item } = route.params.id;
  const [getPost, setPost] = useState(false); 
  const [getComments, setComments] = useState(false); 
  const [post_id, setPost_id] = useState(false);
  const [post_comment, setComment] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [successText, setSuccesstext] = useState(false); 
  const fatchData = async => {
    api.getData('post_datas/'+route.params.id)
    .then((res)=>{
      setPost( res.data.data); 
      console.log('res.data.data',res.data.data); 
    })
    .catch((error) => {
        console.log(error)
    }) 
  };  
  const allComments = async => {
    api.getData('all_comments?parent_id=0&post_id='+route.params.id)
    .then((res)=>{
      //setPost( res.data.data); 
      console.log('allComments',res.data.data); 
    })
    .catch((error) => {
        console.log(error)
    }) 
  };  
  useEffect(() => {fatchData()}, []);
  useEffect(() => {allComments()}, []);
  useEffect(() => setSuccesstext(false), [successText]);  
  useEffect(() => setErrortext(false), [errortext]);
  const handleSubmitButton = async () => {  
    
    setErrortext(false);
    if (!post_comment) { 
      setErrortext({message : 'Please fill caption'});  
      return;
    }else{
      setSuccesstext(false);
    //console.log( video.uri );
    setLoading(true); 
    var dataToSend = {  
      post_id: route.params.id,
      parent_id: 0,
      user_id:2,
      comm_test: post_comment,       
    };  
    console.log('dataToSend--==',dataToSend);
    fetch('http://sista.andsayem.com/api/all_comments', {
      method: 'POST', 
      headers: {  
        'Accept': 'application/json',  
        'Content-Type':'application/json',
        Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN)
      },
      body: JSON.stringify(dataToSend) 
      })
      .then((response) => response.json())
      .then((responseJson) => { 
        setLoading(false);   
        console.log('responseJson============',responseJson)
        if (responseJson.success === true) { 
          setComment('');
          setSuccesstext({message:'Post Submit Successful'});  
        } else { 
        }
      })
      .catch((error) => { 
        console.log('error===',error);
        setLoading(false); 
      });
    }
  }; 
  //useEffect(() => fatchData(false),[getPost]);
  //const stripedHtml = item.description.replace(/<[^>]+>/g, '');
    return (
      <ScrollView>
      <View  >
         <View
            style={{
              backgroundColor: '#fff' ,
              height: 200,
              width: '100%',
              borderRadius: 15,
              padding: 10,
              marginBottom :10
            }}
          >
           
          <Image source={getPost.file ? {uri: getPost.file } : null}  
            style={{ width: '100%', borderRadius: 10, height: 200 }}   />
          <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)}/>
          <Toast visible={successText} message ={successText.message} /> 
            
          </View>
          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
              <Text style={{ textAlign : 'center' , width : '100%'}} >{ getPost.caption }</Text>
             <ListItem style={{
              backgroundColor: "#FEFEFE",
              width: '100%',
            }}>
              
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
              
              <ListItem.Content>
                <ListItem.Title>{ getPost.userjoin ? getPost.userjoin.name : ''} </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{  marginTop: -10 , marginLeft : 80 }}
            >
            <View
                style={{
                  width: 80, 
                }}
              >
                <Text style={{ color : '#a21919'}}> Like </Text>
              </View>
              <View
                style={{ 
                  width: 120,
                }}
              >
                <Text> Reply</Text>
              </View>
            </ScrollView> 
          </View>

          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
                  <ListItem style={{
                    backgroundColor: "#FEFEFE",
                    width: '100%',
                  }}>
                    <Avatar rounded   size="medium" source={require('../img/images/user_2.jpg')} />
                    <ListItem.Content>
                      <ListItem.Title> Chris   </ListItem.Title>
                      <ListItem.Subtitle>  Chairman</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{  marginTop: -10 , marginLeft : 80 }}
                  >
                  <View
                      style={{
                        width: 80, 
                      }}
                    >
                      <Text style={{ color : '#a21919'}}> Like </Text>
                    </View>
                    <View
                      style={{ 
                        width: 120,
                      }}
                    >
                      <Text> Reply</Text>
                    </View>
                  </ScrollView> 
                  <View
                    style={{
                      backgroundColor: '#fff' , 
                      borderRadius: 10,
                      padding: 5,
                      marginBottom :2,
                      marginLeft : 50 ,
                      marginRight :20 
                    }}
                  >
                  <ListItem style={{
                    backgroundColor: "#FEFEFE",
                    width: '100%',
                  }}>
                    <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
                    <ListItem.Content>
                      <ListItem.Title> Chris Jackson </ListItem.Title>
                      <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{  marginTop: -10 , marginLeft : 80 }}
                  >
                  <View
                      style={{
                        width: 80, 
                      }}
                    >
                      <Text style={{ color : '#a21919'}}> Like </Text>
                    </View>
                    <View
                      style={{ 
                        width: 120,
                      }}
                    >
                      <Text> Reply</Text>
                    </View>
                    <View style={styles.textAreaContainer} >
                      <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Type something" 
                        multiline={true}
                      />
                    </View> 
                  </ScrollView> 
                </View>
          </View>
     
          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
             <ListItem style={{
              backgroundColor: "#FEFEFE",
              width: '100%',
            }}>
              <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson dfg </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{  marginTop: -10 , marginLeft : 80 }}
            >
            <View
                style={{
                  width: 80, 
                }}
              >
                <Text style={{ color : '#a21919'}}> Like </Text>
              </View>
              <View
                style={{ 
                  width: 120,
                }}
              >
                <Text> Reply</Text>
              </View>
            </ScrollView> 
            <View style={styles.textAreaContainer} > 
              <TextInput
                onChangeText={(post_comment) => setComment(post_comment)} 
                value={post_comment}
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type something" 
                multiline={true}
              />
            </View> 
            <TouchableOpacity
             onPress={handleSubmitButton} 
              style={Styles.submit}
              activeOpacity={0.5} >
              <Text             
              >Submit</Text>
            </TouchableOpacity>
          </View>
      </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor:  '#efefef',
    borderWidth: 1,  
  },
  textArea: {
    height: 50,     
  },
  submit:{
    position: 'absolute',
    bottom: 10,                                                    
    right: 10,  
    left:50,
    top:50,
  }
})
export default PostDetails;
