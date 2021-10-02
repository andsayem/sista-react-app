import React, { useEffect, Component ,  useRef , useState } from "react";
import { View, FlatList,  ActivityIndicator ,Text, SafeAreaView ,Image, Button , ToastAndroid ,TextInput , TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler"; 
import { ListItem, Avatar , colors , Icon , Header  } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet'; 
import Styles from "../styles";
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import Textarea from 'react-native-textarea';
import post_api from '../post_api';
import axios from 'axios';
import Loader from '../components/Loader'; 
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
  
 class Chating extends Component {
  constructor(props) {
    super(props);
 
    this.state = { 
      items:[], 
      user: [],
      sender_id : this.props.route.params.sender_id,
      isLoading: false,
      };  
    }
    Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
      return null;
    }
    return null;
  }; 
  componentDidMount() {
    this.fatchData();
  }
  async componentwillmount(){
   
    this.fatchData();
  }
  fatchData  =  async () => { 
    this.setState({isLoading:true})  
    api.getData('user_conversations')
    .then(response => response.data.data)
    .then(json => this.setState({items:json}))
    .finally( ()=>this.setState({isLoading: false})) ;

    const user = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('Test data ', JSON.parse( user)) ;
    // this.state.user = user ;
    this.setState({user: JSON.parse(user)});
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
    let formData = new FormData();
    console.log(this.state.token); 
    formData.append("receiver_id", 6);
    formData.append("message", this.state.message); 
    axios.post('https://sista.bdmobilepoint.com/api/new_conversation', formData,
    {
     headers: { 
       'Accept': 'application/json',  
       'Content-Type': 'multipart/form-data', 
       Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN)
   }
 })  
 setMessage('');
 fatchData();
 setSuccesstext({message:'Test Submit Successful'});  

  }
  handleKeyDown = (e) => { 
      if(e.nativeEvent.key == "Enter"){
          dismissKeyboard();
      }
  }
  renderRow = ({ item , index }) => { 
    //console.log('itemitemitemitemitemitemitemitemitemitem',index); 
    const { liked, like, props } = item
    return (
      <View  >  
      {this.state.user.id != item.sender_id ?   
      <View>
        <ListItem style={{ backgroundColor: "#FEFEFE",  width: '100%' }}>
            <Avatar rounded size="small" source={require('../img/images/user_3.jpg')} />
            <ListItem.Content stayl={{ }}>
              <Text style={{ backgroundColor : '#E4E4E4' ,  borderRadius: 7, padding :5 , textAlign : 'left' }}> 
              {item.message}  
              </Text>             
            </ListItem.Content>
          </ListItem>  
         
            
          </View>
          : <ListItem style={{ width: '100%',   flex: 1 }}> 
          <ListItem.Content stayl={{}}> 
            <View style={{flex: 1,   backgroundColor: "#FEFEFE"  ,flexDirection: 'row'}}> 
              <View style={{flex: 1}}>
                <Text style={{  textAlign: 'right' , alignItems : 'flex-end' ,backgroundColor : '#FF5D8F' ,  color : '#fff' ,  borderRadius: 7, padding :5  }}>
                {item.message}  </Text>
              </View>
            </View> 
          </ListItem.Content>            
          <Avatar rounded size="small" source={require('../img/images/user_1.jpg')} />
        </ListItem>  }
        </View> 
    )
  } 
  renderFooter = () => { 
    return(  
        <View>  
          {this.state.isLoading ? (
            <View> 
            <ActivityIndicator size="large" color="#0000ff" /> 
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
  //useEffect(() => fatchData(false),[conversations]);  
  //useEffect(() => {fatchData()}, [conversations]);
  //useEffect(() => errortext(false),[setSuccesstext(false)]);   
  render(){  
    let {items, isLoading} = this.state;
  return (
      <ScrollView > 
         {/* <Header 
            leftComponent={<Icon color={colors.black} size={30} name='menu' 
            onPress ={ ( ) =>  props.navigation.toggleDrawer()  } ></Icon> }
            centerComponent={{ text: 'Chats', style: { color: '#1E1E1E' , fontSize : 20 } }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
        /> */}
          {/* <Loader loading={loading} />    */}
         {/* <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => this.Toast.setRef(ref)}/>
          <Toast visible={successText} message ={successText.message} />  */}
        <View style={{paddingTop :35, backgroundColor: "#efefef",  }}  > 
          <View >
            <ListItem style={{backgroundColor: "#efefef",width: '100%',}}>
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
              <ListItem.Content>
                <ListItem.Title> User</ListItem.Title>
                <ListItem.Subtitle>Active</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </View>     
        </View> 

        <FlatList 
        style={{ padding : 2, margin : 0}}
            data={Object.values(this.state.items)}
            renderItem={this.renderRow}
            keyExtractor={(item , i) => item.id.toString()} 
            refreshing={isLoading}
            extraData={this.state}
            ListFooterComponent={this.renderFooter}         
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
            onRefresh={this.fatchData}      
          /> 
          

          <View style={styles.textAreaContainer} >                
                <Textarea
                  onChangeText={(msg) => this.setState({message:msg})}   
                  value={this.state.message}
                  blurOnSubmit={true}
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  maxLength={1000}
                  placeholder={'Type something...'} 
                  returnKeyType="done"
                  multiline={true}
                  underlineColorAndroid="transparent"
                  underlineColorAndroid={'transparent'}
                  onKeyPress={this.handleKeyDown}
                />
                </View>
              {/* <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)}/>
              <Toast visible={successText} message ={successText.message} /> */}
              <TouchableOpacity
             onPress={this.handleSubmitButton} 
              style={Styles.journalBtn}
              activeOpacity={0.5} >
              <Text style={Styles.journalText}               
              >Submit</Text>
            </TouchableOpacity>
      </ScrollView>
      
    );
  };
}

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor:  '#efefef',
    borderWidth: 1,       
    alignItems:'center',
  },
  textArea: {
    height: 150, 
    
  } ,
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
 
export default Chating;