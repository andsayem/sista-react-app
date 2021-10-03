import React, { Component, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , colors , Icon , Header  } from 'react-native-elements'; 
import Styles from "../styles"; 
import api from '../api';
function Chats(props) {
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
    useEffect(() => {getUser()},[]); 
    const Allusers = ({ ItemData }) => (
      <View key={ItemData.sender_id+'cu'.toString()} style={{ backgroundColor: '#fff' ,padding: 5  }} > 
          <Avatar  onPress={() => props.navigation.navigate('Chating',{ 
                  sender_id: ItemData.sender_id,
                 }) }   rounded   size="medium" source={require('../img/images/user_1.jpg')} />
          <Text>{ItemData.name}</Text> 
      </View> 
    );
    const renderAllUsers = ({ item }) => {   
      return (
        <Allusers ItemData={item} />
      );
    };
    const Convusers = ({ ItemData }) => (
      <View  >
          <ListItem key={ItemData.id+'cvu'.toString()} style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.receiver_id,
                 }) }   size="medium" source={require('../img/images/user_3.jpg')} />
                <ListItem.Content>
                  <ListItem.Title>{ItemData.name}  </ListItem.Title>
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
            leftComponent={<Icon color={colors.black} size={30} name='menu' 
            onPress ={ ( ) =>  props.navigation.toggleDrawer()  } ></Icon> }
            centerComponent={{ text: 'Chats', style: { color: '#1E1E1E' , fontSize : 20 } }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
        />

       
         <ScrollView key={'cvu'.toString()} horizontal  
         style={{  backgroundColor: '#fff',  marginLeft : 0 }}  > 
           <FlatList horizontal
            data={getUsers} 
            keyExtractor={(item, index) => index} 
            renderItem={renderAllUsers} 
            extraData={selectedId}
          />   
        </ScrollView>
      <View  style={{  backgroundColor: '#fff',  paddingTop : 0, marginTop : 10  }}  >
     
      <View >
        <ListItem key={'nm'.toString()} style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded   size="medium" source={require('../img/images/massage.png')} />
                <ListItem.Content>
                  <ListItem.Title> New Message Requests </ListItem.Title>
                  <ListItem.Subtitle>From Mayank Jain</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View> 
        <FlatList 
            data={getUsers} 
            keyExtractor= {(item , i) => item.sender_id.toString()} 
            renderItem={renderConvUsers} 
            extraData={selectedId}
          />
 
      </View>
    </ScrollView>
      
    );
}

export default Chats;
