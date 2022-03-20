import React, { Component, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, SearchBar, colors, Icon, Header } from 'react-native-elements';
import Styles from "../styles";
import api from '../api';
import helpers from "../helpers";
import useWebSocket from 'react-native-use-websocket';
import { Button, } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  Image,
  TouchableOpacity
} from 'react-native';
import Echo from 'laravel-echo';
import socketio from 'socket.io-client';

function Chats(props) {
  // const ws = useRef(null);

  const navigation = useNavigation();
  // const [userList, setUserList] = useState([
  //   {
  //     name: 'Rahul',
  //     email: 'rahul@gmail.com',
  //     image_path: 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
  //     sender_id: '1',
  //     receiver_id: '2',
  //   },
  //   {
  //     name: 'Muskan',
  //     email: 'muskan@gmail.com',
  //     image_path: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png',
  //     sender_id: "2",
  //     receiver_id: '1'
  //   },
  // ])

  const [getUsers, setUsers] = useState([]);
  const [getSearchusers, setSearchusers] = useState([]);
  const [getSearchkey, setSearchkey] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const getUser = () => {
    api.getData('conversation_list')
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
      })
  }

  const updateSearch = async (search) => {
    setSearchkey(search);

    api.getData('users_search/' + search)
      .then((res) => {
        setSearchusers(res.data.data);
      })
      .catch((error) => {
      })
  };
  // setTostNotificetion("123");



  useEffect(() => {
    // const echo = new Echo({
    //   host: 'http://127.0.0.1:6001',
    //   broadcaster: 'socket.io',
    //   client: socketio,


    // });
    // console.log('777777777777777777777777777');
    // console.log(echo);
    // echo.channel('chats.1')
    //   .listen('ChatMessageCreated', ev => {
    //     console.log('8888888888888888888888888888888888888888');
    //     setTostNotificetion(ev.message.text);
    //     console.log(ev.message.text)
    //   }).error(e => {
    //     console.log(e);
    //   });
    getUser()
  }, []);
  const Allusers = ({ ItemData }) => (
    <View key={ItemData.sender_id + 'cu'.toString()} style={{ backgroundColor: '#fff', padding: 5 }} >
      <Avatar onPress={() => props.navigation.navigate('Chating', {
        receiver_id: ItemData.show_id,
      })} rounded size="medium" source={ItemData.pro_image ? { uri: helpers.storage + 'app/public/posts/' + ItemData.pro_image } : ''} />
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
      {/* <ListItem key={ItemData.id+'cvu'.toString()} style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.show_id,
                 }) }   size="medium" source={ItemData.pro_image ? {uri:helpers.storage+'app/public/posts/'+ItemData.pro_image}: ''} />
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
              </ListItem> */}
    </View>
  );
  const SearchData = ({ ItemData }) => (
    <View  >
      {/* <ListItem key={ItemData.id.toString()} style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded onPress={() => props.navigation.navigate('Chating',{ 
                  receiver_id: ItemData.id}) }   size="medium" source={ItemData.pro_image ? {uri:helpers.storage+'app/public/posts/'+ItemData.pro_image}: ''} />
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
              </ListItem> */}
    </View>
  );
  const renderConvUsers = ({ item }) => {
    return (
      <Convusers ItemData={item} />
    );
  }
  const renderSearchUsers = ({ item }) => {
    return (
      <SearchData ItemData={item} />
    );
  }

  return (
    <ScrollView >

      <Header
        leftComponent={<Icon color={colors.black} size={30} name='menu'
          onPress={() => props.navigation.toggleDrawer()} ></Icon>}
        centerComponent={{ text: 'Chats', style: { color: '#1E1E1E', fontSize: 20 } }}
        rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
        containerStyle={{
          color: '1E1E1E',
          backgroundColor: '#E4E4E4'
        }}
      />
      <SearchBar
        lightTheme
        //  containerStyle={{backgroundColor: '#ffffff' , borderWidth : 0 }}
        //  iconStyle={{backgroundColor:'#fff'}}
        //  inputStyle={{backgroundColor: '#ffffff'}} 

        value={getSearchkey}
        onChangeText={(getSearchkey) => { updateSearch(getSearchkey) }}
        placeholder="Type Here..." /> 
      {getSearchkey == '' ?
        <View>

          <ScrollView key={'cvu'.toString()} horizontal
            style={{ backgroundColor: '#fff', marginLeft: 0 }}  >
            <FlatList horizontal
              data={getUsers}
              keyExtractor={(item, index) => index}
              renderItem={renderAllUsers}
              extraData={selectedId}
            />
          </ScrollView>
          <View style={{ backgroundColor: '#fff', paddingTop: 0, marginTop: 10 }}  >

            <View >
              <ListItem key={'nm'.toString()} style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded size="medium" source={require('../img/images/massage.png')} />
                <ListItem.Content>
                  <ListItem.Title> New Message Requests </ListItem.Title>
                  <ListItem.Subtitle>From Mayank Jain</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>
            <FlatList
              data={getUsers}
              keyExtractor={(item, i) => item.sender_id.toString()}
              renderItem={renderConvUsers}
              extraData={selectedId}
            />
          </View>
        </View>
        :
        <FlatList
          data={getSearchusers}
          keyExtractor={(item, i) => item.id.toString()}
          renderItem={renderSearchUsers}
          extraData={selectedId}
        />
      }
      
    </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
export default Chats;
