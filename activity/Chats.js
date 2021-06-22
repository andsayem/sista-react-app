import React, { Component, useEffect, useState } from "react";
import { View, Text, FlatList, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header  , Icon } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet';  
import Styles from "../styles";
import api from '../api';
function Chats({navigation}) {
    const [getUsers, setUsers] = useState([]); 
    const [selectedId, setSelectedId] = useState(null);
    const getUser = () =>{
      api.getData('conversation_list')
        .then((res)=>{
          setUsers( res.data.data);  
            console.log('users',res.data.data)
        })
        .catch((error) => {
            //console.log(error)
        }) 
    }
    useEffect(() => getUser(),[getUsers]); 
    const Allusers = ({ ItemData }) => (
      <View style={{ backgroundColor: '#fff' ,padding: 5  }} > 
          <Avatar  onPress={() => navigation.navigate('Chating',{ 
                  sender_id: ItemData.sender_id,
                 }) }   rounded   size="medium" source={require('../img/images/user_1.jpg')} />
          <Text>{ItemData.name} {ItemData.sender_id}</Text> 
      </View> 
    );
    const renderAllUsers = ({ item }) => {   
      return (
        <Allusers ItemData={item} />
      );
    };
    const Convusers = ({ ItemData }) => (
      <View >
          <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded onPress={() => navigation.navigate('Chating',{ 
                  sender_id: ItemData.sender_id,
                 }) }   size="medium" source={require('../img/images/user_3.jpg')} />
                <ListItem.Content>
                  <ListItem.Title>{ItemData.name} {ItemData.sender_id}  {ItemData.receiver_id}  {ItemData.show_id}</ListItem.Title>
                  <ListItem.Subtitle>hi dear, have u got the prom...</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>  
    );
    const renderConvUsers = ({item}) =>{
      return (
        <Convusers ItemData={item} />
      );
    }

    return (
      <ScrollView >
        <Header 
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Inspire me', style: { color: '#fff' , fontSize : 20 } }}
              rightComponent={{ icon: 'notifications', color: '#fff' }}
            />
         <ScrollView  horizontal  
         style={{  backgroundColor: '#fff',  marginLeft : 0 }}  > 
          <FlatList horizontal
            data={getUsers} 
            keyExtractor={(item, index) => item.index} 
            renderItem={renderAllUsers} 
            extraData={selectedId}
          />  
        </ScrollView>
      <View  style={{  backgroundColor: '#fff',  paddingTop : 0, marginTop : 10  }}  >
     
      <View >
        <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded   size="medium"  onPress={() => navigation.navigate('Chating') }  source={require('../img/images/massage.png')} />
                <ListItem.Content>
                  <ListItem.Title> New Message Requests </ListItem.Title>
                  <ListItem.Subtitle>From Mayank Jain</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View> 
        <FlatList 
            data={getUsers} 
            keyExtractor={(item, index) => item.index} 
            renderItem={renderConvUsers} 
            extraData={selectedId}
          />  
 
      </View>
    </ScrollView>
      
    );
}

export default Chats;
