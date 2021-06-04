import React, { Component, useEffect, useState } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet'; 
import { Icon } from 'react-native-elements'
import Styles from "../styles";
import api from '../api';
function Chating({navigation, route}) {
  const { item } = route.params;
  const [senderId, setSenderId] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [getUser, setUser] = useState([]); 
  //setSenderId(item);
  //setSenderId(route.params);  
  const user = async => { 
    api.getData('users/'+route.params)
      .then((res)=>{
        setUser( res.data.data);  
          console.log('users',res.data.data)
      })
      .catch((error) => {
          //console.log(error)
      }) 
  }
  useEffect(() => user(),[getUser]);  
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
         
      </ScrollView>
      
    );
}

export default Chating;
