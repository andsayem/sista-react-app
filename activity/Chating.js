import React, { useEffect, Component ,  useRef , useState } from "react";
import { View, FlatList,  ActivityIndicator ,Text, SafeAreaView ,Image, Button , ToastAndroid ,TextInput , TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler"; 
import { ListItem, Avatar , colors , Icon , Header  } from 'react-native-elements';  
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage'; 
import axios from 'axios'; 
import helpers from '../helpers';
const STORAGE_KEY = 'save_user';

const TOKEN = 'token'; 
// function Chating({navigation, route}) {
 
//   const [getToken, setToken] = useState(false);
//   const [senderId, setSenderId] = useState(null);
//   const [receiverId, setReceiverId] = useState(null);
//   const [message, setMessage] = useState(false);
//   const [conversations, setConversations] = useState([]);
//   const [getUser, setUser] = useState([]);  
//   const [loading, setLoading] = useState(false);
//   const [errortext, setErrortext] = useState(false);
//   const [successText, setSuccesstext] = useState(false);   
//   const [index, setIndex] = useState(0);
 // const [conversations, setConversations] = useState(0);
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
      items:[], 
      user: [],
      sender_id : this.props.route.params.sender_id,
      isLoading: false,
      errortext:'',
      successtext:'',
      send_message:'',
      sending:false,
      };   
    } 
  componentDidMount =  async () =>{
    const user = await AsyncStorage.getItem(STORAGE_KEY);
    this.setState({user: JSON.parse(user)});
    this.fatchData(); 
  }
  async componentwillmount(){   
    this.fatchData();
    //this.socketioClient();
  }

  // socketioClient = async () => {
  //   if (!window.location) {
  //     // App is running in simulator
  //     window.navigator.userAgent = 'ReactNative';
  // }
  
  // This must be below your `window.navigator` hack above
  // const io = require('socket.io-client/socket.io');
  // const sockets = io('http://chat.feathersjs.com', {
  //   transports: ['websocket'] // you need to explicitly tell it to use websockets
  // });
  
  // sockets.on('connect', () => {
  //   console.log('connected!');
  // });
  
  //   const socket = SocketIOClient("https://sista.andsayem.com/api/user_conversations?receiver_id="+this.props.route.params.receiver_id, {
  //       jsonp: true,
  //     });
  //     socket.on("connect", () => {
  //       console.log("connected");
  //       socket.emit("hello", "world");
  //     });
      
  //     socket.on("connect_error", (err) => {
  //       console.log(err instanceof Error);
  //       console.log(err.message); 
  //     }); 
  // }
  fatchData  =  async () => {  
    this.setState({isLoading:true})  
    api.getData('user_conversations?receiver_id='+this.props.route.params.receiver_id)
    .then((response) => { 
      this.setState({items:response.data.data}) 
    })
    .finally( ()=>this.setState({isLoading: false})) ;
  
  } 
  handleOnRefresh = () => { 
    this.setState({page:1, data:[]})
    this.setState({page:1, refreshing:true, seed: this.state.seed+1},() => {
      this.fatchData();
    })
  } 

  readData = async () => {
    try {  
       token = await AsyncStorage.getItem(TOKEN);          
     // setToken(token); 
      this.setState({token:token})        
    } catch (e) {   

    }
  } 
 
  handleSubmitButton = async () => {   
    if (!this.state.send_message) { 
      this.setState({errortext:'Please fill field'}); 
      return;
    }else{
      let formData = new FormData(); 
    this.setState({sending:true}); 
    formData.append("receiver_id", this.props.route.params.receiver_id);
    formData.append("message", this.state.send_message);  
    axios.post(helpers.baseurl()+'api/new_conversation', formData,
    {
      headers: { 
        'Accept': 'application/json',  
        'Content-Type': 'multipart/form-data', 
        Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN)
      }
    })  
    api.getData('user_conversations')
    .then((response) => {
      this.setState({sending:false})
      this.setState({send_message : ''},function () {
        this.fatchData();
      }) 
    }) 
    .finally( ()=>this.setState({isLoading: false})) ; 
  }
  }
  handleKeyDown = (e) => { 
      if(e.nativeEvent.key == "Enter"){
          dismissKeyboard();
      }
  }
  renderRow = ({ item , index }) => {   
    return (
      <View  >  
      {this.state.user.id != item.sender_id ?   
      <View>
        <ListItem style={{ backgroundColor: "#FEFEFE",  width: '100%' }}> 
            <Avatar rounded size="small" source={item.receiver.pro_image ? {uri:item.sender.pro_image}: ''} /> 
            <ListItem.Content  >
              <Text style={{ backgroundColor : '#E4E4E4' ,  borderRadius: 7, padding :5 , textAlign : 'left' }}> 
              {item.message}    
              </Text>             
            </ListItem.Content>
          </ListItem>  
          </View>
          : <ListItem  > 
          <ListItem.Content>   
                
          </ListItem.Content> 
          <Text style={{  textAlign: 'right' , alignItems : 'flex-end' ,backgroundColor : '#FF5D8F' ,  color : '#fff' ,  borderRadius: 7, padding :5  }}>
                {item.message}  </Text>            
          <Avatar rounded size="small" source={item.sender.pro_image ? {uri:item.sender.pro_image}: ''} />
        </ListItem>  }
        </View> 
    )
  } 
  renderFooter = () => { 
    return(  
        <View>  
          {this.state.isLoading ? (
            <View>  
            <Text style={styles.title}>Loading Data..</Text>
            </View>
          ) : (
            <View>  
              {this.state.refreshing ? ( <Text style={styles.title}>Please wait a moment</Text> ) : ( <Text style={styles.title}></Text>)} 
            </View>
          )}
        </View> 
    );
  }
  validation = () => {
    //this.state.post_comment ? this.setState({errortext:''}) :  this.setState({errortext:'Comment field is required'}); 
  }
  //useEffect(() => fatchData(false),[conversations]);  
  //useEffect(() => {fatchData()}, [conversations]);
  //useEffect(() => errortext(false),[setSuccesstext(false)]);   
  render(){  
    let {items, isLoading} = this.state;
  return ( 
      <SafeAreaView style={styles.container}> 
        <Toast visible={this.state.errortext} message={this.state.errortext}/>
        <Toast visible={this.state.successtext} message ={this.state.successtext} />   
         {/* <Header 
            leftComponent={<Icon color={colors.black} size={30} name='menu' 
            onPress ={ ( ) =>  props.navigation.toggleDrawer()  } ></Icon> }
            centerComponent={{ text: 'Chats', style: { color: '#1E1E1E' , fontSize : 20 } }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
        /> */} 
        <View style={{paddingTop :35, backgroundColor: "#efefef",  }}  > 
          <View >
            <ListItem style={{backgroundColor: "#efefef",width: '100%',}}>
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
              <ListItem.Content>
                <ListItem.Title> {this.state.user.name}</ListItem.Title>
                <ListItem.Subtitle>Active </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>     
        </View> 
        { this.state.items ?   
        <FlatList  
            data={Object.values(this.state.items)}
            renderItem={this.renderRow}
            keyExtractor={(item , i) => item.id.toString()} 
            refreshing={isLoading}
            extraData={this.state}
            ListFooterComponent={this.renderFooter}         
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            onRefresh={this.fatchData}      
            />:  <View>Empty</View>}   
        <View style={styles.footer}>  
          <ScrollView horizontal style={styles.scrollView}>
            <View style={styles.textAreaContainer} >
            <TextInput  
              style={styles.textInput}
              onChangeText = {(test) => this.setState({send_message:test},this.setState({errortext:false}))} 
              value={this.state.send_message}    
              blurOnSubmit={true}  
              onBlur = {() => this.validation()} 
              underlineColorAndroid="transparent"
              placeholder="Type something  " 
              multiline={true}
            />
            </View> 
            <View style={styles.submitArea}>
            <TouchableOpacity 
                onPress={this.handleSubmitButton} 
                style={styles.submit}
                activeOpacity={0.5} >
                {this.state.sending ? <ActivityIndicator size="small" color="#0000ff" />: 
                <Icon size={35}  name='sc-telegram'  type='evilicon'  color='#0000ff'></Icon> 
                }
              </TouchableOpacity> 
            </View>
          </ScrollView> 
        </View> 
        </SafeAreaView>  
    );
  };
} 
const styles = StyleSheet.create({    
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  container:{
    marginTop:20,
    flex: 1,
    padding:2, 
  }, 
  header:{
    backgroundColor: '#fff' ,
    top:20,
    height: 200,
    width: '100%',
    borderRadius: 15,
    padding: 1,
    marginBottom :10
  }, 
  caption:{
    textAlign: 'center', 
    fontSize: 18,
  },
  footer:{ 
      backgroundColor: '#fff' , 
      borderRadius: 10,   
      padding:5
  },
  textAreaContainer: {
    borderColor:  '#efefef', 
    width: 330
  },
  textArea: {
    height: 50,     
  },
  submit:{     
    marginTop:2, 
    paddingTop:0,
  }, 
}) 
 
export default Chating;