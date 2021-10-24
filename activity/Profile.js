import React, { Component  } from "react";
import { View, Button ,Text, ScrollView , FlatList , SafeAreaView ,StyleSheet , ToastAndroid, TouchableOpacity, Platform } from "react-native"; 
import { Avatar, colors, Icon , Image , Header} from "react-native-elements"; 
import Styles from "../styles";
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
import * as ImagePicker from 'react-native-image-picker';
const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};
class UserProfile extends Component {
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
      isOnline: null
      };  
  } 

  componentDidMount() {    
    this.fatchData();   
  }  
  componentWillUnmount() {   
    this.fatchData();   
  }  
    handleStatusChange(status) {    
    this.setState({      
      isOnline: status.isOnline    
    });  
  }
  handleChoosePhoto = async() => {
    ImagePicker.launchImageLibrary({
          mediaType: 'photo', 
          includeBase64: true,
          maxHeight: 200,
          maxWidth: 200,
      },
      (response) => {
        this.save(response);
      });  
        
  }
  save =  async(response) =>{
    var dataToSend = {  
      files_base: "data:"+response.type+";base64,"+ response.base64    
    };  
    console.log('dataToSend--==',dataToSend);
    fetch('http://sista.bdmobilepoint.com/api/change-profile-image', {
      method: 'POST', 
      headers: {  
        'Accept': 'application/json',  
        'Content-Type':'application/json',
        Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN)
      },
      body: JSON.stringify(dataToSend) 
      })
      .then((response) => response.json())
      .then((responseJson) => { 
        setLoading(false);   
        console.log('responseJson============',responseJson)
        if (responseJson.success === true) { 
          setSuccesstext({message:'Post Submit Successful'});  
        } else { 
        }
      })
      .catch((error) => { 
        console.log('error===',error);
        setLoading(false); 
      }); 
  }
  fatchData = async() => {   
    const userData = await AsyncStorage.getItem(STORAGE_KEY); 
    let user_data = JSON.parse(userData) 
    this.setState({isLoading:true})  
    api.getData('user_profile/'+ user_data.id)
    .then(response => {  
      console.log('========');
      console.log(response.data.data.photos);
      this.setState({userData:response.data.data}) 
    }) 
    .finally( ()=>this.setState({isLoading: false})) 
  }
  onPressPostDetails(id){
    this.props.navigation.navigate('PostDetails', {id: id });
  }
  renderFooter = () => { 
    //useEffect(() => { this.fatchData()},[]) 
    return(  
      <View>  
        <SafeAreaView>  
        
        </SafeAreaView> 
      </View> 
    );
  }  
 
  render(){
    let {items, isLoading} = this.state;
    return ( <SafeAreaView>
        <Header 
            leftComponent={<Icon color={colors.black} size={30} name='menu' 
            onPress ={ ( ) =>  props.navigation.toggleDrawer()  } ></Icon> }
            centerComponent={{ text: 'My Profile', style: { color: '#1E1E1E' , fontSize : 20 } }}
             
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
        /> 
      
        <View  style={{  backgroundColor: "#FEFEFE",   padding : 10 }}  > 
        {/* <Toast visible={errortext} message={errortext.message} />
        <Toast visible={successtext} message={successtext.message} /> */}
        
        <ScrollView
          horizontal 
          style={{ marginRight: 0, width:'100%',  marginTop: 10 }}
        >
          <View style={{ width : 110}} >
            <Avatar rounded size="medium" source={require('../img/images/user_1.jpg')} />
            <Text style={{ fontSize : 16 , fontWeight : '600' , paddingBottom : 17}}>{ this.state.userData.name}</Text>  
          </View>  
          <View> 
            <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
           </View> 
        </ScrollView> 
        <Text>
           { this.state.userData.description }
        </Text>  
        <ScrollView   horizontal   style={{ marginRight: 0, width:'100%',  marginTop: 10 }}  > 
              <View  style={{   width: 110,   alignItems : 'center' }} >
                <Text style={{ color : '#1c81b0'}}> { this.state.userData.total_potos } </Text>
                <Text style={{ color : '#1c81b0'}}> Photos </Text>
              </View>
              <View style={{  width: 110, alignItems : 'center' }} >
                <Text style={{ color : '#1c81b0'}}> { this.state.userData.total_followers } </Text>
                <Text style={{ color : '#1c81b0'}}> Followers </Text> 
              </View>
              <View  style={{   width: 110, alignItems : 'center'  }}  >
                <Text style={{ color : '#1c81b0'}}> { this.state.userData.total_post } </Text>
                <Text style={{ color : '#1c81b0'}}> Posts </Text> 
              </View>
            </ScrollView> 
        </View>
        <View  style={{  backgroundColor: "#FEFEFE",   padding : 10 , marginTop: 10 , borderRadius: 10  }}  > 
            <ScrollView   horizontal   style={{  width:'100%',  marginTop: 10 }}  > 
              <View  style={{   width: 210,   alignItems : 'flex-start' }} > 
                <Text style={{ color : '#0D0E10'}}> Videos ({ this.state.userData.total_videos}) </Text>
                
              </View> 
              { this.state.userData.total_videos > 3 ?
                <View  style={{   width: 110, alignItems : 'flex-end'  }}  > 
                  <Text style={{ color : '#707070'}}> View all </Text>  
                </View> 
                : <View></View>
              }
            </ScrollView>
            { this.state.userData.total_videos > 3 ?
            <ScrollView   horizontal   style={{  width:'100%',  marginTop: 10 }}  > 
              <View  style={{   width: 110,   alignItems : 'flex-start' }} > 
                <Image
                source={require('../img/images/v1.png')}
                style={{ height: 100, width: 150 , borderRadius: 10 }}
              />
              </View> 
              <View  style={{  width: 220  , alignItems : 'flex-end'  }}  > 
                <Image
                source={require('../img/images/v2.png')}
                style={{ height: 100, width: 150 ,  borderRadius: 10 }}
              />
              </View>
            </ScrollView>
            : <View></View>
             }

            <ScrollView   horizontal   style={{  width:'100%',  marginTop: 20 }}  > 
              <View  style={{   width: 210,   alignItems : 'flex-start' }} > 
                <Text style={{ color : '#0D0E10'}}> Photos ( { this.state.userData.total_potos }) </Text>
                
              </View> 
              { this.state.userData.total_potos > 3 ?
              <View  style={{   width: 110, alignItems : 'flex-end'  }}  > 
                <Text style={{ color : '#707070'}}> View all </Text>  
              </View> 
              :<View></View> }
            </ScrollView>
            <ScrollView   horizontal   style={{  width:'100%',  marginTop: 10 }}  > 
              
              <View  style={{   width: 110,   alignItems : 'flex-start' }} >  
                <Image
                onPress={() => this.onPressPostDetails(this.state.userData.photos[0].id)}
                  source={this.state.userData.photos ? {uri: this.state.userData.photos[0].file } : null} 
                  style={{ height: 150, width: 150 , borderRadius: 10 }}
                />
              </View> 
              <View  style={{  width: 220  , alignItems : 'flex-end'  }}  > 
               
              <Image
               onPress={() => this.onPressPostDetails(this.state.userData.photos[1].id)}
                 source={this.state.userData.photos ? {uri: this.state.userData.photos[1].file } : null} 
                style={{ height: 65, width: 150 , marginTop :15 ,  borderRadius: 10 }}
              />
              <Image
               onPress={() => this.onPressPostDetails(this.state.userData.photos[2].id)}
                 source={this.state.userData.photos ? {uri: this.state.userData.photos[2].file } : null} 
                style={{ height: 65, width: 150 , marginTop :15 ,  borderRadius: 10 }}
              />
              </View>
            
            </ScrollView>
        </View>
      </SafeAreaView>
    );
  }  
}
  const styles = StyleSheet.create({

    MainContainer :{
    
    justifyContent: 'center',
    flex:1,
    margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0
    
    },
    
    GridViewBlockStyle: {
    
      justifyContent: 'center',
      flex:1,
      alignItems: 'center',
      height: 100,
      margin: 5,
      backgroundColor: '#00BCD4'
    
    }
    ,
    
    GridViewInsideTextItemStyle: {
    
       color: '#fff',
       padding: 10,
       fontSize: 18,
       justifyContent: 'center',
       
     },
    
    });
export default UserProfile;
