import React, {  Component  } from "react";
import { View, FlatList, ActivityIndicator, Text, SafeAreaView, Dimensions,  ToastAndroid, TextInput, TouchableOpacity, StyleSheet } from "react-native"; 
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar,  Icon } from 'react-native-elements';
import api from '../../providers/api';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import helpers from '../../providers/helpers';
import Pusher from 'pusher-js/react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'; 
import moment from 'moment';
import Styles from "../../theme/styles";
const STORAGE_KEY = 'save_user'; 
const TOKEN = 'token'; 
// const windowWidth = Dimensions.get('window').width;
// const windowHeight = Dimensions.get('window').height;  
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
      <View style={{marginRight:20 }} >
        {this.state.user.id != item.sender_id ? 
            <View  style={Styles.messageitem} >
              <Avatar rounded size="small" source={item.receiver.pro_image ? { uri: item.sender.pro_image } : ''} /> 
                <Text style={Styles.charting_message}>
                  {item.message}   
                </Text>
                <Text style={{   paddingBottom: 35, paddingLeft:10, alignSelf: 'flex-end', }}>{this.renderDate(item.created_at)}</Text>  
            </View> 
          : <ListItem style={Styles.messageitemIn} > 
            <Text style={Styles.messageitemOut } >{this.renderDate(item.created_at)}</Text>
            <Text style={Styles.charting_message_sende}>
              {item.message}  </Text> 
          </ListItem>}
      </View>
    )
  }
  renderFooter = () => {
    return (
      <View> 
        {this.state.isLoading ? (
          <View>
            <Text style={Styles.loadert}>Loading Data..</Text>
          </View>
        ) : (
          <View>
            {this.state.refreshing ? (<Text style={Styles.loadert}>Please wait a moment</Text>) : (<Text style={Styles.loadert}></Text>)}
          </View>
        )}
      </View>
    );
  }   
  renderDate = (date) => {
    return(
      <Text style={Styles.messageTime}>
        {moment(date).fromNow('a A')}
      </Text>
    );
  }
  render() {
    let { items, isLoading } = this.state;
    return (
      <SafeAreaView style={Styles.messageAreaView} >
        <Toast visible={this.state.errortext} message={this.state.errortext} />
        <Toast visible={this.state.successtext} message={this.state.successtext} /> 
        <View style={{ paddingTop: 35}}  >
          <View>
            <ListItem containerStyle={{backgroundColor:"#F5F5F5"}}>
              <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} />  
              <Avatar rounded size="medium" source={require('../../assets/img/images/user_1.jpg')} />
              <View style={ Styles.avaterCircle} />
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
        <View style={Styles.messagefooter}>
          <ScrollView horizontal>
            <View style={Styles.textAreaContainer} >
              <TouchableOpacity >
              <Entypo size={25} name='camera' color='#9E9E9E' style={{marginTop:6}}></Entypo>
              </TouchableOpacity>
              <TextInput 
                style={{
                width:this.state.windowWidth-130 }}
                onChangeText={(test) => this.setState({ send_message: test }, this.setState({ errortext: false }))}
                value={this.state.send_message} 
                blurOnSubmit={true} 
                underlineColorAndroid="transparent"
                placeholder="Type something"
                multiline={true}
              />
            </View> 
            
            <View style={{ flexDirection: 'row', paddingTop:6 }}>
              <TouchableOpacity 
                onPress={this.handleSubmitButton}  > 
                <View>
                {this.state.sending ? <ActivityIndicator size="small" color="#0000ff" /> :
                  <Icon size={35} name='sc-telegram' type='evilicon' color='#0000ff'></Icon>
                }   
                </View>
              </TouchableOpacity>
              <TouchableOpacity> 
                <Icon size={35} name='like' type='evilicon' color='#5C6BC0'></Icon> 
              </TouchableOpacity>  
              </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
}
  
export default Chating;