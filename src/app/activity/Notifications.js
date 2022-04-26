import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  Image,
  FlatList
} from 'react-native';
import {  Icon, Header } from 'react-native-elements';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconOct from 'react-native-vector-icons/Octicons';
import IconFea from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMat from 'react-native-vector-icons/MaterialIcons'; 
import Styles from "../../theme/styles";

export default class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:"https://via.placeholder.com/100x100/FFB6C1/000000"},
        {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink",     text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:"https://via.placeholder.com/100x100/20B2AA/000000"},
        {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Finn DoRemiFaso",  text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:""},
        {id:5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name:"Maria More More",  text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:""},
        {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Frank Odalthh",    text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:"https://via.placeholder.com/100x100/7B68EE/000000"},
        {id:6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name:"Clark June Boom!", text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:""},
        {id:7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name:"The googler",      text:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.", attachment:""},
      ]
    }
  }

  render() {
    return (
      <FlatList 
        data={this.state.data}
        extraData={this.state}
        ListHeaderComponent={
          <Header
          leftComponent={<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 300, minHeight: 30 }}>
            <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} /> 
          </View>
          }
          rightComponent={{}}
          containerStyle={{
            fontFamily: 'IBMPlexSans-Regular',
            color: '1E1E1E',
            backgroundColor: '#F5F5F5',
            height: 90

          }} />
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
            <View style={Styles.notifyContainer}>
              <Image source={{uri:Notification.image}} style={Styles.notifyAvatar}/>
              <View style={Styles.notifyContent}>
                <View style={mainContentStyle}>
                  <View style={Styles.notifyText}>
                    <Text style={Styles.notifyName}>{Notification.name}</Text>
                    <Text>{Notification.text}</Text>
                  </View>
                  <Text style={Styles.notifyTimeAgo}>
                    2 hours ago
                  </Text>
                </View>
                {attachment}
              </View>
            </View>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({ 
  
}); 
                                            