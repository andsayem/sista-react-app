import React, { useEffect, useState } from "react";
import { View, Dimensions, Text, FlatList, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, SearchBar, colors, Icon, Header } from 'react-native-elements';
import Styles from "../styles";
import api from '../api';
import helpers from "../helpers";
import { useNavigation } from '@react-navigation/native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Echo from 'laravel-echo';
//import socketio from 'socket.io-client';
function Chats(props) {
  // const ws = useRef(null);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height; 
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
  const [refreshing, setRefreshing] = useState(false)
   
  const getUser = () => {
    api.getData('conversation_list')
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
      })
  }
  const handleOnRefresh = () => {
    getUser()
  }
  const _onRefresh = () => { 
    setRefreshing(true); 
  };
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
      <View style={styles.avatarBorder}> 
      <View style={styles.avatarBorder2}> 
      <Avatar onPress={() => props.navigation.navigate('Chating', {
        receiver_id: ItemData.show_id,
      })} rounded size="medium" source={ItemData.pro_image ? { uri: helpers.storage() + 'app/public/posts/' + ItemData.pro_image } : ''} />
      </View>
      </View>
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
    <View style={{backgroundColor: "#fff" }}>
      <ListItem key={ItemData.id + 'cvu'.toString()} style={{
        backgroundColor: "#FEFEFE",
        width: '100%',
      }}> 
      <Avatar
        onPress={() => props.navigation.navigate('Chating', {
          receiver_id: ItemData.show_id,
        })}
        rounded
        size="medium"
        source={ItemData.pro_image ? { uri: helpers.storage() + 'app/public/posts/' + ItemData.pro_image } : ''}
        > 
      </Avatar>
      <View style={ styles.avaterCircle} />
        <ListItem.Content >
          <ListItem.Title onPress={() => props.navigation.navigate('Chating', {
            receiver_id: ItemData.show_id,
          })}  >{ItemData.name}  </ListItem.Title>
          <ListItem.Subtitle onPress={() => props.navigation.navigate('Chating', {
            receiver_id: ItemData.show_id,
          })} > {ItemData.latest_message} </ListItem.Subtitle>
        </ListItem.Content> 
        { ItemData.show_id == 45 ? 
        <Text><IconAnt name="checkcircleo" size={23} color="#efefef" /> </Text> 
        : 
        <Avatar rounded size="small" source={ItemData.pro_image ? { uri: helpers.storage() + 'app/public/posts/' + ItemData.pro_image } : ''} />
         
        }
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
    <ScrollView style={{backgroundColor: "#efefef",  }}>
      <View style={{paddingTop :35 }}  > 
          <View >
            <ListItem containerStyle={{backgroundColor:"#efefef"}}>
              <Icon color={colors.black} size={30} name='menu' onPress={() => props.navigation.toggleDrawer()} ></Icon>
              <Avatar rounded size="medium" source={require('../img/images/user_1.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chats </ListItem.Title> 
              </ListItem.Content>
              <ListItem.Subtitle>
              <Icon size={30} name='search'></Icon>
              </ListItem.Subtitle> 
            </ListItem>
          </View>     
        </View>  
      {getSearchkey == '' ?
        <View>

          <ScrollView key={'cvu'.toString()} horizontal
            style={{ backgroundColor: '#fff', marginLeft: 0,padding:15 }}  >
            <FlatList horizontal
              data={getUsers}
              keyExtractor={(item, index) => index}
              renderItem={renderAllUsers}
              extraData={selectedId}
            />
          </ScrollView>
          <View style={{ marginTop: 10 }}  > 
            <FlatList
              data={getUsers}
              keyExtractor={(item, i) => item.sender_id.toString()}
              renderItem={renderConvUsers}
              extraData={selectedId}
              refreshing={refreshing} 
              onRefresh={handleOnRefresh}
              ItemSeparatorComponent={() => (
                <View style={{ backgroundColor: "#efefef", height:2 }} />
              )} 
              ListHeaderComponent={
                <View >
                  <ListItem key={'nm'.toString()} style={{
                    backgroundColor: "#FEFEFE",
                    width: '100%',
                  }}>
                    <Avatar rounded size="medium" source={require('../img/images/massage.png')} />
                    <ListItem.Content>
                      <ListItem.Title> New Message Requests</ListItem.Title>
                      <ListItem.Subtitle>From Mayank Jain</ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={ styles.requestsCircle} />
                  </ListItem>
                  <View style={{ backgroundColor: "#efefef", height:2 }} />
                </View>
              }
              ListFooterComponent={
                <View >
                <View style={{ backgroundColor: "#efefef", height:2 }} />
                <View style={{ backgroundColor: "#fff", minHeight:300 }} />
                </View>
              }
            />
          </View>
        </View>
        :
        <View style={{  marginTop: 10 }} > 
        <FlatList
          data={getSearchusers}
          keyExtractor={(item, i) => item.id.toString()}
          renderItem={renderSearchUsers}
          extraData={selectedId}
          refreshControl={
            <RefreshControl 
                refreshing={refreshing} 
                onRefresh={_onRefresh}
                tintColor="#F8852D"/>
          }
        />
        </View>
      }

    </ScrollView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minHeight:600
  },
  useAvater: {
    backgroundColor: '#fff', padding: 5
  },
  requestsCircle:{
    backgroundColor: '#0287FA', padding: 9, borderRadius:9
  },
  avaterCircle:{
    backgroundColor: '#B16DE4', padding: 6, borderRadius:9, marginTop:29, marginLeft:-29,
  },
  avatarBorder2:{
    borderWidth: 1.2, borderColor: "#fff", borderRadius: 50,
  },
  avatarBorder:{
    borderWidth: 2, borderColor: "#B16DE4", borderRadius: 50,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
export default Chats;
