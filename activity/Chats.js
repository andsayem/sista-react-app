import React, { Component, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , SearchBar , colors , Icon , Header  } from 'react-native-elements'; 
import Styles from "../styles"; 
import api from '../api';
function Chats(props) {
    const [getUsers, setUsers] = useState([]); 
    const [getSearchusers, setSearchusers] = useState([]); 
    const [getSearchkey, setSearchkey] = useState(''); 
    const [selectedId, setSelectedId] = useState(null);
    const getUser = () =>{ 
      api.getData('conversation_list')
        .then((res)=>{
          setUsers( res.data.data);  
            console.log('users',res.data.data)
        })
        .catch((error) => {
            //console.log(error)
            //pro_image
        }) 
    } 
    const updateSearch =  async (search) => {    
      setSearchkey(search );   
      console.log('res.data.data=====');
     
      api.getData('users_search/'+search)
      .then((res)=>{
        console.log(res.data.data);
        setSearchusers( res.data.data);   
      })
      .catch((error) => {
          //console.log(error)
          //pro_image
      }) 
    };
    useEffect(() => {getUser()},[]); 
    const Allusers = ({ ItemData }) => (
      <View key={ItemData.sender_id+'cu'.toString()} style={{ backgroundColor: '#fff' ,padding: 5  }} > 
          <Avatar  onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.show_id,
                 }) }   rounded   size="medium" source={ItemData.pro_image ? {uri:'https://sista.droidit.net/storage/app/public/posts/'+ItemData.pro_image}: ''}/>
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
                  receiver_id: ItemData.show_id,
                 }) }   size="medium" source={ItemData.pro_image ? {uri:'https://sista.droidit.net/storage/app/public/posts/'+ItemData.pro_image}: ''} />
                <ListItem.Content >
                  <ListItem.Title onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.show_id,
                 }) }  onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.show_id,
                 }) } >{ItemData.name}  </ListItem.Title>
                  <ListItem.Subtitle onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.show_id,
                 }) } >hi dear, have u got the prom... </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>  
    );
    const SearchData = ({ ItemData }) => (
      <View  >
          <ListItem key={ItemData.id.toString()} style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.id,
                 }) }   size="medium" source={ItemData.pro_image ? {uri:'https://sista.droidit.net/storage/app/public/posts/'+ItemData.pro_image}: ''} />
                <ListItem.Content >
                  <ListItem.Title onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.id,
                 }) }  onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.id,
                 }) } >{ItemData.name}  </ListItem.Title>
                  <ListItem.Subtitle onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.id,
                 }) } >{ ItemData.email}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>  
    );
    const renderConvUsers = ({item}) =>{
      return (
        <Convusers ItemData={item} />
      );
    }
    const renderSearchUsers = ({item}) =>{
      return (
        <SearchData ItemData={item} />
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
         <SearchBar 
                  lightTheme
                  //  containerStyle={{backgroundColor: '#ffffff' , borderWidth : 0 }}
                  //  iconStyle={{backgroundColor:'#fff'}}
                  //  inputStyle={{backgroundColor: '#ffffff'}} 
                 
                  value={getSearchkey}
                  onChangeText={(getSearchkey) => { updateSearch(getSearchkey)}}
                  placeholder="Type Here..."   />

   
      
        { getSearchkey =='' ? 
        <View>
              
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
        </View>
          :
        <FlatList 
            data={getSearchusers} 
            keyExtractor= {(item , i) => item.id.toString()} 
            renderItem={renderSearchUsers} 
            extraData={selectedId}
          />
        }
  
    </ScrollView>
      
    );
}

export default Chats;
