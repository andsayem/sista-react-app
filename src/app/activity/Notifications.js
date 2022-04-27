import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {  Icon, Header } from 'react-native-elements';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconOct from 'react-native-vector-icons/Octicons';
import IconFea from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMat from 'react-native-vector-icons/MaterialIcons'; 
import Styles from "../../theme/styles";
import api from '../../providers/api';
import moment from 'moment';
export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[
        //{id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:"https://via.placeholder.com/100x100/FFB6C1/000000"},
        // {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink",     text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:"https://via.placeholder.com/100x100/20B2AA/000000"},
        // {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Finn DoRemiFaso",  text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:""},
        // {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Maria More More",  text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:""},
        // {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Frank Odalthh",    text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:"https://via.placeholder.com/100x100/7B68EE/000000"},
        // {id:6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name:"Clark June Boom!", text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:""},
        // {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name:"The googler",      text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:""},
      ]
    }
  }

  componentDidMount() {
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
                                            