
import React, {Component} from "react"; 
import { DrawerItem  , DrawerContentScrollView } from "@react-navigation/drawer";  
import { View , ScrollView , StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch, 
  Paragraph
} from 'react-native-paper';
import {
  shareOnFacebook,
  shareOnTwitter,
} from 'react-native-social-share'; 
import { Icon } from "react-native-elements"; 
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user'; 
const TOKEN = 'token';
class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.fatchData = this.fatchData.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = { 
      userData:[], 
      post_items:[], 
      isLoading: false, 
      successtext:'', 
      loading:false,
      token:'',
      parent_id:0,
      isOnline: null,
      user_id: null,
      };  
  }   
  facebookShare = () => { 
    shareOnFacebook({
        'text':'Global democratized marketplace for art',
        'link':'https://artboost.com/',
        'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
        //or use image
        'image': 'artboost-icon',
      },
      (results) => { 
      }
    );
  } 
  clearAsyncStorage = async() => {
    AsyncStorage.clear(); 
    this.props.navigation.navigate("Login");
  }  
  asyncStorageData = async () => {
    try { 
      let tokn = await AsyncStorage.getItem(TOKEN); 
      let user_data = await AsyncStorage.getItem(STORAGE_KEY); 
      this.setState({token:tokn})
      this.setState({userData:user_data}) 
      if(!tokn){  
        this.props.navigation.navigate("Login");; 
      }      
    } catch (e) {    
      this.props.navigation.navigate("Login");
    }
  }
  async componentDidMount() {    
    this.asyncStorageData(); 
  }  
  async componentWillUnmount() { 
    this.asyncStorageData();   
  }  
  render(){
    return (
      <ScrollView style={{ flex : 1, backgroundColor : '#5C48BA'  }}>
        <DrawerContentScrollView {...props} >
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{  flexDirection : 'row' , marginTop : 15 }}>
                <Avatar.Image size={50}  source={require('../img/images/user_3.jpg')} > </Avatar.Image>
                <View style={{ marginLeft : 13 , marginTop : 12  , flexDirection : 'column'}}>
                  <Title  style={{ color : '#fff'}} > AS Sayem </Title>
                  <Caption style={{ color : '#fff'}} >Information </Caption>
                </View>
              </View>   
            </View>
          </View> 
        </DrawerContentScrollView>
        <Drawer.Section style={{ color : '#fff'}}>   
          <DrawerItem
            color = '#fff' 
            onPress={()=>{props.navigation.navigate('Quizzes')}} 
            label={() => <Text style={{ color: '#fff' }}>Quizzes</Text> }
          />
          <DrawerItem
            style={{ color : '#fff'}} 
            onPress={()=>{props.navigation.navigate('Product')}} 
            label={() => <Text style={{ color: '#fff' }}>Product's</Text> }
          />
          <DrawerItem
            style={{ color : '#fff'}} 
            onPress={()=>{props.navigation.navigate('Settings')}} 
            label={() => <Text style={{ color: '#fff' }}>Settings</Text> } 
          />
          <DrawerItem
            style={{ color : '#fff'}} 
            onPress={()=>{props.navigation.navigate('AppInformation')}} 
            label={() => <Text style={{ color: '#fff' }}>App Information</Text> } 
          />
          <DrawerItem
            onPress={()=>{props.navigation.navigate('About')}} 
            label={() => <Text style={{ color: '#fff' }}>About My Sista's KeepHer </Text> } 
            
          />
          <DrawerItem
            onPress={()=>{facebookShare()}}           
            label={() => <Text style={{ color: '#fff' }}>Share app</Text> }  
          />
          <DrawerItem
            onPress={()=>{props.navigation.navigate('RatingApp')}} 
            label={() => <Text style={{ color: '#fff' }}>Rate Us</Text> }  
          />
          <DrawerItem
            onPress={()=>{props.navigation.navigate('Support')}} 
            label={() => <Text style={{ color: '#fff' }}>Support</Text> }  
          />
          <DrawerItem
            onPress={()=>{props.navigation.navigate('PrivacyPolicy')}} 
            label={() => <Text style={{ color: '#fff' }}>Privacy Policy</Text> }            
          />
          { this.state.token ? 

          <DrawerItem
          onPress={()=> {clearAsyncStorage() }} 
          label={() => <Text style={{ color: '#fff' }}>Logout</Text> }            
          />
          :
          <DrawerItem
            onPress={()=>{props.navigation.navigate('Login')}} 
            label={() => <Text style={{ color: '#fff' }}>Login</Text> }            
          />
          }
          
        </Drawer.Section>
      
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  drawerContent : {
    flex : 1 
  },
  userInfoSection : {
    paddingLeft : 20 ,
  },
  title : {
    fontSize : 16 ,
    lineHeight : 14 
  },
  caption : {
    fontSize : 14 ,
    lineHeight : 14 
  },
  row : {
    marginTop : 20 ,
    flexDirection : 'row',
    alignItems : 'center'
  },
  section : {
    flexDirection :'row',
    alignItems :  'center',
    marginRight : 15
  },
  paragraph :{
    fontWeight : 'bold',
    marginRight : 3
  },
  drawerSection :{
    marginTop : 10 
  },
  buttomDrawerSection : {
    marginBottom : 15 ,
    borderTopColor : '#f4f4f4',
    borderTopWidth : 1 ,
    color :  '#fff'
  },
  preferecnce : {
    flexDirection : 'row' ,
    justifyContent : 'space-between' ,
    paddingVertical : 12 ,
    paddingHorizontal : 16
  }
  

}) 

export default DrawerContent;