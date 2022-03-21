import React, { Component, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, SearchBar, colors, Icon, Header } from 'react-native-elements';
import Styles from "../styles";
import api from '../api';
import helpers from "../helpers";
import { useNavigation } from '@react-navigation/native';
import Echo from 'laravel-echo';
//import socketio from 'socket.io-client';

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

  useEffect(() => {

    getUser()
  }, []);
  const Allusers = ({ ItemData }) => (
    <View key={ItemData.sender_id + 'cu'.toString()} style={styles.useAvater} >
      <Avatar onPress={() => props.navigation.navigate('Chating', {
        receiver_id: ItemData.show_id,
      })} rounded size="medium" source={ItemData.pro_image ? { uri: helpers.storage() + 'app/public/posts/' + ItemData.pro_image } : ''} />
      <Text style={{ width : 50  ,  textAlign : 'center'}}>
      {ItemData.name.split(" ").length < 2
                ? `${ItemData.name}`
                : `${ItemData.name.split(" ")[0]}`}
      </Text>
    </View>
  );
  const renderAllUsers = ({ item }) => {
    return (
      <Allusers ItemData={item} />
    );
  };
  const Convusers = ({ ItemData }) => (
    <View  >
      <ListItem key={ItemData.id + 'cvu'.toString()} style={{
        backgroundColor: "#FEFEFE",
        width: '100%',
      }}>
        <Avatar rounded onPress={() => props.navigation.navigate('Chating', {
          receiver_id: ItemData.show_id,
        })} size="medium" source={ItemData.pro_image ? { uri: helpers.storage() + 'app/public/posts/' + ItemData.pro_image } : ''} />
        <ListItem.Content >
          <ListItem.Title onPress={() => props.navigation.navigate('Chating', {
            receiver_id: ItemData.show_id,
          })}  >{ItemData.name}  </ListItem.Title>
          <ListItem.Subtitle onPress={() => props.navigation.navigate('Chating', {
            receiver_id: ItemData.show_id,
          })} > {ItemData.latest_message} </ListItem.Subtitle>
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
        <Avatar rounded onPress={() => props.navigation.navigate('Chating', {
          receiver_id: ItemData.id
        })} size="medium" source={ItemData.pro_image ? { uri: helpers.storage() + 'app/public/posts/' + ItemData.pro_image } : ''} />
        <ListItem.Content >
          <ListItem.Title onPress={() => props.navigation.navigate('Chating', {
            receiver_id: ItemData.id,
          })}    >{ItemData.name}  </ListItem.Title>
          <ListItem.Subtitle onPress={() => props.navigation.navigate('Chating', {
            receiver_id: ItemData.id,
          })} >{ItemData.email}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
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
      <View style={{paddingTop :35, backgroundColor: "#efefef",  }}  > 
          <View >
            <ListItem style={{backgroundColor: "#efefef",width: '100%',}}>
            <Icon color={colors.black} size={30} name='menu'
          onPress={() => props.navigation.toggleDrawer()} ></Icon>
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chats </ListItem.Title> 
              </ListItem.Content>
            </ListItem>
          </View>     
        </View> 

      {/* <Header
        leftComponent={<Icon color={colors.black} size={30} name='menu'
          onPress={() => props.navigation.toggleDrawer()} ></Icon>}
        centerComponent={{ text: 'Chats', style: { color: '#1E1E1E', fontSize: 20 } }}
        rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
        containerStyle={{
          color: '1E1E1E',
          backgroundColor: '#E4E4E4'
        }}
      /> */}
      {/* <SearchBar
        lightTheme
        //  containerStyle={{backgroundColor: '#ffffff' , borderWidth : 0 }}
        //  iconStyle={{backgroundColor:'#fff'}}
        //  inputStyle={{backgroundColor: '#ffffff'}} 

        value={getSearchkey}
        onChangeText={(getSearchkey) => { updateSearch(getSearchkey) }}
        placeholder="Type Here..." /> */}
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
  },
  useAvater: {
    backgroundColor: '#fff', padding: 5
  }
});
export default Chats;
