import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button , ToastAndroid ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet'; 
import { Icon } from 'react-native-elements'
import Styles from "../styles";
import api from '../api';
import Textarea from 'react-native-textarea';
import post_api from '../post_api';
function Chating({navigation, route}) {
  const { sender_id } = route.params.sender_id;
  console.log('fffffffffffffffffffffffffffffffffffff =========================',route.params.sender_id)

  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [message, setMessage] = useState(false);
  const [getUser, setUser] = useState([]);  
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [successText, setSuccesstext] = useState(false);   
  const [index, setIndex] = useState(0);
  const [conversations, setConversations] = useState(0);
  
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

  const fatchData = async => {
    api.getData('conversations?receiver_id='+sender_id)
    .then((res)=>{
      setPost( res.data.data); 
      console.log('res.data.data',res.data.data); 
    })
    .catch((error) => {
        console.log(error)
    }) 
  }; 

  const convers = async => { 
    api.getData('conversations/'+sender_id)
      .then((res)=>{
        setConversations( res.data.data);  
        console.log('conversations',res.data.data)
      })
      .catch((error) => {
          //console.log(error)
      }) 
  }
  const handleSubmitButton = () => {    
    setErrortext(false);
    if (!message) { 
      setErrortext({message : 'Please fill caption'});  
      return;
    }else{
      setSuccesstext(false);
    }
    setLoading(true); 
    var dataToSend = { 
      receiverId: 1,
      senderId: senderId,
      caption: message
    }; 
    post_api.postData('users/'+sender_id,dataToSend)
      .then((res)=>{
        setUser( res.data.data);  
        setSenderId(sender_id); 
      })
      .catch((error) => {
          //console.log(error)
      }) 
  }
  useEffect(() => fatchData(false),[conversations]);  
  useEffect(() => {convers()}, [conversations]);
  //useEffect(() => errortext(false),[setSuccesstext(false)]);   
    return (
      <ScrollView > 
        
        <View  style={{  paddingTop : 0  ,   backgroundColor: "#efefef",  }}  > 
            <View >
              <ListItem style={{
                      backgroundColor: "#efefef",
                      width: '100%',
                    }}>
                      <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
                      <ListItem.Content>
                        <ListItem.Title> {getUser.name} </ListItem.Title>
                        <ListItem.Subtitle>Active</ListItem.Subtitle>
                      </ListItem.Content>
                    </ListItem>
              </View>     
        </View> 
          <ListItem style={{ backgroundColor: "#FEFEFE",  width: '100%' }}>
            <Avatar rounded size="small" source={require('../img/images/user_3.jpg')} />
            <ListItem.Content stayl={{ }}>
              <Text style={{ backgroundColor : '#E4E4E4' ,  borderRadius: 7, padding :5 , textAlign : 'left' }}> Hii whats going on budy  </Text>  
              
            </ListItem.Content>
          </ListItem> 
          <ListItem style={{ backgroundColor: "#FEFEFE",  width: '100%' }}>
            <Avatar rounded size="small" source={require('../img/images/user_3.jpg')} />
            <ListItem.Content stayl={{ }}>
              <Text style={{ backgroundColor : '#E4E4E4' ,  borderRadius: 7, padding :5 , textAlign : 'left' }}> A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  </Text>   
            </ListItem.Content>
          </ListItem> 
          <ListItem style={{ width: '100%',   flex: 1 }}> 
            <ListItem.Content stayl={{}}> 
            <View style={{flex: 1,   backgroundColor: "#FEFEFE"  ,flexDirection: 'row'}}> 
              <View style={{flex: 1}}>
                <Text style={{  textAlign: 'right' , alignItems : 'flex-end' ,backgroundColor : '#FF5D8F' ,  color : '#fff' ,  borderRadius: 7, padding :5  }}>A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  </Text>
              </View>
            </View> 
            </ListItem.Content>
            
          <Avatar rounded size="small" source={require('../img/images/user_1.jpg')} />
          </ListItem> 
          <ListItem style={{ backgroundColor: "#FEFEFE",  width: '100%' }}>
            <Avatar rounded size="small" source={require('../img/images/user_3.jpg')} />
            <ListItem.Content stayl={{ }}>
              <Text style={{ backgroundColor : '#E4E4E4' ,  borderRadius: 7, padding :5 , textAlign : 'left' }}> A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  </Text>   
            </ListItem.Content>
          </ListItem> 
          <ListItem style={{ width: '100%',   flex: 1 }}> 
            <ListItem.Content stayl={{}}> 
            <View style={{flex: 1 ,flexDirection: 'row'}}> 
              <View style={{flex: 1}}>
                <Text style={{  textAlign: 'right' , alignItems : 'flex-end' ,backgroundColor : '#FF5D8F' ,  color : '#fff' ,  borderRadius: 7, padding :5  }}>A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  </Text>
              </View>
            </View> 
            </ListItem.Content> 
          <Avatar rounded size="small" source={require('../img/images/user_1.jpg')} />
          </ListItem> 
          <ListItem style={{ backgroundColor: "#FEFEFE",  width: '100%' }}>
            <Avatar rounded size="small" source={require('../img/images/user_3.jpg')} />
            <ListItem.Content stayl={{ }}>
              <Text style={{ backgroundColor : '#E4E4E4' ,  borderRadius: 7, padding :5 , textAlign : 'left' }}> A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  </Text>   
            </ListItem.Content>
          </ListItem> 
          <ListItem style={{ width: '100%',   flex: 1 }}> 
            <ListItem.Content stayl={{}}> 
            <View style={{flex: 1 ,flexDirection: 'row'}}> 
              <View style={{flex: 1}}>
                <Text style={{  textAlign: 'right' , alignItems : 'flex-end' ,backgroundColor : '#FF5D8F' ,  color : '#fff' ,  borderRadius: 7, padding :5  }}>A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  </Text>
              </View>
            </View> 
            </ListItem.Content> 
          <Avatar rounded size="small" source={require('../img/images/user_1.jpg')} />
          </ListItem> 
          
          <ListItem style={{ backgroundColor: "#FEFEFE",  width: '100%' }}>
            <Avatar rounded size="small" source={require('../img/images/user_3.jpg')} />
            <ListItem.Content stayl={{ }}>
              <Text style={{ backgroundColor : '#E4E4E4' ,  borderRadius: 7, padding :5 , textAlign : 'left' }}> A wonderful Society has taken  possession of my entire soul,  like these sweet mornings of from bottom of my heart  </Text>   
            </ListItem.Content>
          </ListItem> 
          
          <View style={styles.textAreaContainer} >                
                <Textarea
                  onChangeText={(message) => setMessage(message)} 
                  value={message}
                  blurOnSubmit={true}
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  maxLength={1000}
                  placeholder={'Type something...'}
                  placeholderTextColor="grey" 
                  returnKeyType="next"
                  multiline={true}
                  underlineColorAndroid="transparent"
                  underlineColorAndroid={'transparent'}
                />
                </View>
              <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)}/>
              <Toast visible={successText} message ={successText.message} />
              <TouchableOpacity
             onPress={handleSubmitButton} 
              style={Styles.journalBtn}
              activeOpacity={0.5} >
              <Text style={Styles.journalText}               
              >Submit</Text>
            </TouchableOpacity>
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
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
export default Chating;
