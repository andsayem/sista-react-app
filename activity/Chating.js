import React, { useEffect, Component, useRef, useState } from "react";
import { View, FlatList, ActivityIndicator, Text, SafeAreaView, Dimensions, Button, ToastAndroid, TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, colors, Icon, Header } from 'react-native-elements';
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import helpers from '../helpers';
import Pusher from 'pusher-js/react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
const STORAGE_KEY = 'save_user';
//Pusher.logToConsole = true;
const TOKEN = 'token';
// var pusher = new Pusher(helpers.pusherConfig().app_key, {
//   cluster: helpers.pusherConfig().app_key
// });
var pusher = new Pusher('28f66afb2b72c8e97219', {
  cluster: 'ap2'
});

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
};

class Chating extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      user: [],
      sender_id: this.props.route.params.sender_id,
      isLoading: false,
      errortext: '',
      successtext: '',
      send_message: '',
      sending: false,
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height-305
    }; 
  }  
  componentDidMount = async () => {
    const user = await AsyncStorage.getItem(STORAGE_KEY);
    this.setState({ user: JSON.parse(user) });
    let self = this;
    var channel = pusher.subscribe('chart-channel.' + this.state.user.id);
    channel.bind('chart-event', function (data) {   
      self.fatchData();
    });
    this.fatchData();
  } 
  async fatchData() {
    this.setState({ isLoading: true })
    api.getData('user_conversations?receiver_id=' + this.props.route.params.receiver_id)
      .then((response) => { 
        this.setState({ items: response.data.data })
      })
      .finally(() => this.setState({ isLoading: false }));
  }
  handleOnRefresh = () => {
    this.setState({ page: 1, data: [] })
    this.setState({ page: 1, refreshing: true, seed: this.state.seed + 1 }, () => {
      this.fatchData();
    })
  }
  readData = async () => {
    try {
      token = await AsyncStorage.getItem(TOKEN);
      this.setState({ token: token })
    } catch (e) {
    }
  }

  handleSubmitButton = async () => {
    if (!this.state.send_message) {
      this.setState({ errortext: 'Please fill field' });
      return;
    } else {
      let formData = new FormData();
      this.setState({ sending: true });
      formData.append("receiver_id", this.props.route.params.receiver_id);
      formData.append("message", this.state.send_message);
      axios.post(helpers.baseurl() + 'api/new_conversation', formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + await AsyncStorage.getItem(TOKEN)
          }
        })
      api.getData('user_conversations')
        .then((response) => {
          this.setState({ sending: false })
          this.setState({ send_message: '' }, function () {
            this.fatchData();
          })
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  handleKeyDown = (e) => {
    if (e.nativeEvent.key == "Enter") {
      dismissKeyboard();
    }
  }
  renderRow = ({ item }) => {
    return (
      <View  >
        {this.state.user.id != item.sender_id ?
          <View style={{fontFamily : 'IBMPlexSans-Regular',backgroundColor: "#f00", minHeight:1505  }}>
            <ListItem  >
              <Avatar rounded size="small" source={item.receiver.pro_image ? { uri: item.sender.pro_image } : ''} />
              <ListItem.Content  >
                <Text style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: '#E4E4E4', borderRadius: 7, padding: 5, textAlign: 'left' }}>
                  {item.message}  
                </Text>
              </ListItem.Content>
            </ListItem>
          </View>
          : <ListItem  >
            <ListItem.Content>

            </ListItem.Content>
            <Text style={{fontFamily : 'IBMPlexSans-Regular', textAlign: 'right', alignItems: 'flex-end', backgroundColor: '#FF5D8F', color: '#fff', borderRadius: 7, padding: 5 }}>
              {item.message}  </Text>
            <Avatar rounded size="small" source={item.sender.pro_image ? { uri: item.sender.pro_image } : ''} />
          </ListItem>}
      </View>
    )
  }
  renderFooter = () => {
    return (
      <View> 
        {this.state.isLoading ? (
          <View>
            <Text style={styles.title}>Loading Data..</Text>
          </View>
        ) : (
          <View>
            {this.state.refreshing ? (<Text style={styles.title}>Please wait a moment</Text>) : (<Text style={styles.title}></Text>)}
          </View>
        )}
      </View>
    );
  }   
  renderDate = (date) => {
    return(
      <Text style={styles.time}>
        {moment(date).fromNow('a A')}
      </Text>
    );
  }
  render() {
    let { items, isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container} >
        <Toast visible={this.state.errortext} message={this.state.errortext} />
        <Toast visible={this.state.successtext} message={this.state.successtext} />
        {/* <Header 
            leftComponent={<Icon color={colors.black} size={30} name='menu' 
            onPress ={ ( ) =>  props.navigation.toggleDrawer()  } ></Icon> }
            centerComponent={{ text: 'Chats', style: {
              fontFamily : 'IBMPlexSans-Regular', color: '#1E1E1E' , fontSize : 20 } }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{fontFamily : 'IBMPlexSans-Regular',   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
        /> */}
        <View style={{fontFamily : 'IBMPlexSans-Regular', paddingTop: 35, backgroundColor: "#efefef", }}  >
          <View >
            <ListItem >
              <Avatar rounded size="medium" source={require('../img/images/user_1.jpg')} />
              <View style={ styles.avaterCircle} />
              <ListItem.Content>
                <ListItem.Title> <Text style={{fontSize:15}}>{this.state.user.name}</Text></ListItem.Title>
                <ListItem.Title> <ListItem.Subtitle>
                <Text style={{fontSize:12}}>Active</Text></ListItem.Subtitle></ListItem.Title> 
              </ListItem.Content>
            </ListItem>
          </View>
        </View>
        {this.state.items ?
          <FlatList style={{backgroundColor: "#fff", borderTopRightRadius:8, borderTopLeftRadius:8, }}
            data={Object.values(this.state.items)}
            renderItem={ this.renderRow}
            keyExtractor={(item, i) => item.id.toString()}
            refreshing={isLoading}
            extraData={this.state}
            ListFooterComponent={this.renderFooter}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            onRefresh={this.fatchData}
          /> : <View>Empty</View>}
        <View style={styles.footer}>
          <ScrollView horizontal>
            <View style={styles.textAreaContainer} >
            <TouchableOpacity >
              <Entypo size={25} name='camera' color='#9E9E9E' style={{marginTop:6}}></Entypo>
              </TouchableOpacity>
              <TextInput 
                onChangeText={(test) => this.setState({ send_message: test }, this.setState({ errortext: false }))}
                value={this.state.send_message}
                blurOnSubmit={true}
                onBlur={() => this.validation()}
                underlineColorAndroid="transparent"
                placeholder="Type something"
                multiline={true}
              />
            </View> 
              <TouchableOpacity
                onPress={this.handleSubmitButton}
                style={styles.submit} >
                <View style={{flexDirection: 'row', }}>
                {this.state.sending ? <ActivityIndicator size="small" color="#0000ff" /> :
                  <Icon size={35} name='sc-telegram' type='evilicon' color='#0000ff'></Icon>
                }  
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{ flexDirection: 'row', }}> 
                <Icon size={35} name='like' type='evilicon' color='#5C6BC0'></Icon>
                </View>
              </TouchableOpacity>  
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
}
const styles = StyleSheet.create({
  avaterCircle:{
    backgroundColor: '#0DD452', padding: 6, borderRadius:9, marginTop:37, marginLeft:-28,
  }, 
  title: {
    fontFamily : 'IBMPlexSans-Regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  container: {
    fontFamily : 'IBMPlexSans-Regular',
    marginTop: 20,
    flex: 1,
    padding: 2,
  },
  header: {
    fontFamily : 'IBMPlexSans-Regular',
    backgroundColor: '#fff',
    top: 20,
    height: 200,
    width: '100%',
    borderRadius: 15,
    padding: 1,
    marginBottom: 10
  },
  caption: {
    fontFamily : 'IBMPlexSans-Regular',
    textAlign: 'center',
    fontSize: 18,
  },
  footer: {
    fontFamily : 'IBMPlexSans-Regular',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5
  },
  textAreaContainer: {
    fontFamily : 'IBMPlexSans-Regular',
    borderColor: '#efefef',
    width: 330
  },
  textArea: {
    fontFamily : 'IBMPlexSans-Regular',
    height: 50,
  },
  submit: {
    fontFamily : 'IBMPlexSans-Regular',
    marginTop: 2,
    paddingTop: 0,
  },
  container:{
    flex:1, 
  }, 
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: '#fff',
    paddingHorizontal:10,
    padding:5,
  } ,    
  itemIn: {
    alignSelf: 'flex-end', 
  },
  itemOut: {
    alignSelf: 'flex-start'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#ABABAB",
  },
  item: { 
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row', 
    borderRadius:300,
    padding:5,
  },
})

export default Chating;