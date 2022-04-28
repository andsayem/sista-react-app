import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import Pusher from 'pusher-js/react-native';
import { Header } from 'react-native-elements';
import IconAnt from 'react-native-vector-icons/AntDesign'; 
import Styles from "../../theme/styles";
import api from '../../providers/api';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
var pusher = new Pusher('28f66afb2b72c8e97219', {
  cluster: 'ap2'
});
const STORAGE_KEY = 'save_user'; 
const TOKEN = 'token'; 
class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[
        //{id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:"https://via.placeholder.com/100x100/FFB6C1/000000"},
      ],
      user: [],
    }
  }

  componentDidMount = async () => {
     const user = await AsyncStorage.getItem(STORAGE_KEY);
    this.setState({ user: JSON.parse(user) });
    let self = this;
    var channel = pusher.subscribe('notification-channel.2');
    console.log('------------------',channel);
    alert('check');
    channel.bind('notification-event', function (data) {   
      self.fatchData();
    });
    this.fatchData();
  }
  componentwillmount() {
    this.fatchData();
  }

  fatchData = () => {
    this.setState({ isLoading: true })
    api.getData('notifications')
      .then(response => response.data.data)
      .then(json => this.setState({ items: json }))
      .finally(() => this.setState({ isLoading: false }))
  }
  handlePostDetails = (source_id , source_type) => {
    if(source_type == 'post_like' || source_type == 'comment' ||  source_type == 'post_unlike' ){
        this.props.navigation.navigate('PostDetails', { id: source_id });
    }
  }
  render() {
    return (
      <FlatList 
        style={Styles.notifyRoot}
        data={this.state.items}
        extraData={this.state}
        ListHeaderComponent={ 
          <Header
          leftComponent={<View style={Styles.leftComponent}>
              <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} /> 
             <Text style={Styles.heater_title}> Notifications</Text>
          </View>
          }
          rightComponent={{}}
          containerStyle={Styles.containerStyle}
       />
        }
        ItemSeparatorComponent={() => {
          return (
            <View style={Styles.notifySeparator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          let attachment = <View/>;

          let mainContentStyle;
          if(Notification.attachment) {
            mainContentStyle = Styles.notifyMainContent;
            attachment = <Image style={Styles.notifyAttachment} source={{uri:Notification.attachment}}/> 
          }
          return(
            <View style={Styles.notifyContainer} >
              <Image source={{uri:Notification.sender.pro_image}} style={Styles.notifyAvatar}/>
              <View style={Styles.notifyContent}>
              <TouchableOpacity onPress={() => this.handlePostDetails(Notification.source_id , Notification.source_type)}  >
                <View style={mainContentStyle}>
                  <View style={Styles.notifyText}>
                    <Text  style={Styles.notifyName}>{Notification.sender.name}</Text>
                    <View><Text  onPress={() => this.handlePostDetails(Notification.source_id , Notification.source_type)}  style={Styles.notifyText}>{Notification.content}</Text></View>
                  </View>
                  <Text style={Styles.notifyTimeAgo}>
                    
                  {moment(Notification.created_at).fromNow('mm')}
                    {/* 2 hours ago */}
                  </Text>
                </View>
               {attachment}</TouchableOpacity>
              </View>
            </View>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({ 
  
}); 
export default Notifications;                                           