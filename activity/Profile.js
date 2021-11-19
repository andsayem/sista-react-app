import React, { Component  } from "react";
import { View, Button ,Text, ScrollView , FlatList , SafeAreaView ,StyleSheet , ToastAndroid, TouchableOpacity, Platform } from "react-native"; 
import { Avatar, colors, Icon , Image , Header} from "react-native-elements"; 
import IconEnt from 'react-native-vector-icons/Entypo';
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
      isOnline: null,
      setLoading:true,
      pro1:null,
      pro2:null,
      pro3:null,
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
        this.fatchData();
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
          this.setState({ successtext: 'Profile image change successful' }, function () {
            this.fatchData();
          }); 
        } else { 
          this.setState({ successtext: '' });
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
      console.log(response.data.data);
      this.setState({userData:response.data.data}) 
      this.setState({pro1:response.data.data.photos[0] ? response.data.data.photos[0] : null});
      this.setState({pro2:response.data.data.photos[1] ? response.data.data.photos[1] : null});
      this.setState({pro3:response.data.data.photos[2] ? response.data.data.photos[2] : null});
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
            placement="left"
            leftComponent={<Icon color={colors.black} size={30} name='menu' 
            onPress ={ ( ) =>  this.props.navigation.toggleDrawer() } ></Icon> }
            centerComponent={{ text: 'Profile', style: { color: '#1E1E1E' , fontSize : 25 } }}
            rightComponent={<IconEnt color={colors.black} size={23} name='dots-three-vertical'/>}
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
        />  
        <View  style={{  backgroundColor: "#fff", width:"100%", padding:15 }}  > 
        <Toast visible={this.state.errortext} message={this.state.errortext} />
        <Toast visible={this.state.successtext} message={this.state.successtext} /> 
          
        <ScrollView
          horizontal 
          style={{ marginRight: 0, width:'100%',  marginTop: 10 }}
        >
          <View style={{ width : 110}} >
            <Avatar source={this.state.userData ? {uri: this.state.userData.pro_image } : require('../img/images/user_1.jpg')}
            rounded size="medium" />
            <Text style={{ color:"#000", fontSize : 16 , fontWeight : '600' , paddingBottom : 17, paddingTop:12}}>{ this.state.userData.name}</Text>  
          </View>  
          <View style={{paddingLeft:40}}>  
            <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
           </View> 
        </ScrollView> 
        <Text style={{color:'#535353'}}>
           { this.state.userData.description } 
        </Text> 
        <View style={{borderTopWidth: 2, borderTopColor: '#F5F5F5', backgroundColor:"#fff", color : '#535353', width:'100%', paddingTop:15, marginTop: 10, flexDirection: "row", }}  >              
            <View  style={{  width:'33%', alignItems : 'flex-start'  }} >
              <Text style={{ color : '#535353',paddingBottom:8, paddingLeft:5}}> { this.state.userData.total_potos } </Text>
              <Text style={{  color : '#535353'}}> Photos </Text>
            </View>
            <View style={{  width:'33%',   alignItems : 'center' }} >
              <Text style={{  color : '#535353',paddingBottom:8, textAlign:"justify"}}> { this.state.userData.total_followers } </Text>
              <Text style={{ color : '#535353'}}> Followers </Text> 
            </View>
            <View  style={{  width:'33%',  alignItems : 'flex-end' }}  >
              <Text style={{ color : '#535353',paddingBottom:8, paddingRight:5}}> { this.state.userData.total_post } </Text>
              <Text style={{ color : '#535353'}}> Posts </Text> 
            </View>
        </View> 
        </View>
        <View  style={{  backgroundColor: "#FEFEFE", width:"100%",  padding : 15 , marginTop: 10 , borderRadius: 10  }}  > 
            <View style={{  width:'100%',  marginTop: 10,flexDirection: "row", }}  > 
              <View  style={{   width: "50%",   alignItems : 'flex-start' }} > 
                <Text style={{ color : '#0D0E10'}}> Videos</Text> 
              </View> 
              { this.state.userData.total_videos > 3 ?
                <View  style={{   width: "50%", alignItems : 'flex-end'  }}  > 
                  <Text style={{ color : '#707070'}}> View all </Text>  
                </View> 
                : <View  style={{   width: "50%", alignItems : 'flex-end'  }}  > 
                <Text style={{ color : '#707070'}}> View all </Text>  
              </View> 
              }
            </View>
            { this.state.userData.total_videos > 3 ?
            <View style={{  width:'100%',  marginTop: 10, flexDirection: "row" }}  > 
              <View  style={{ width: "50%", alignItems : 'flex-start' }} > 
                <Image
                source={require('../img/images/v1.png')}
                style={{ height: 100, width: 170 , borderRadius: 10 }}
              />
              </View> 
              <View  style={{ width: "50%", alignItems : 'flex-end'  }}  > 
                <Image
                source={require('../img/images/v2.png')}
                style={{ height: 100, width: 170 ,  borderRadius: 10 }}
              />
              </View>
            </View>
            : 
            <View style={{  width:'100%',  marginTop: 10, flexDirection: "row" }}  > 
                <View  style={{ width: "50%", alignItems : 'flex-start' }} > 
                  <Image
                  source={require('../img/images/v1.png')}
                  style={{ height: 100, width: 170 , borderRadius: 10 }}
                />
                </View> 
                <View  style={{ width: "50%", alignItems : 'flex-end'  }}  > 
                  <Image
                  source={require('../img/images/v2.png')}
                  style={{ height: 100, width: 170 ,  borderRadius: 10 }}
                />
                </View>
            </View>
             }

            <View style={{ width:'100%',  marginTop: 20,flexDirection:"row" }}  > 
              <View  style={{ width: "50%",   alignItems : 'flex-start' }} > 
                <Text style={{ color : '#0D0E10'}}> Photos </Text>                
              </View> 
              { this.state.userData.total_potos > 3 ?
              <View  style={{ width: "50%", alignItems : 'flex-end'  }}  > 
                <Text style={{ color : '#707070'}}> View all </Text>  
              </View> 
              :<View></View> }
            </View> 
            <View style={{  width:'100%',  marginTop: 10,flexDirection:"row" }}  >               
              <View  style={{ width: "50%",   alignItems : 'flex-start' }} >  
              { this.state.userData.photos ?
                <Image
                onPress={() =>  { this.state.pro1 ? this.onPressPostDetails(this.state.pro1.id) : ''}}
                  source={this.state.pro1 ? {uri: this.state.pro1.file } : null} 
                  style={{ height: 150, width: 170 , borderRadius: 10 }}
                />
                : 
              <Text style={styles.noimage}>No image found</Text>
              }
              </View>  
              <View  style={{  width: "50%", alignItems : 'flex-end'  }}  > 
              { this.state.userData.photos ?
              <Image
               onPress={() => { this.state.pro2 ? this.onPressPostDetails(this.state.pro2.id) : ''}}
                 source={this.state.pro2 ? {uri: this.state.pro2.file } : null} 
                style={{ height: 72, width: 165 ,  borderRadius: 10 }}
              />
              : 
              <Text style={styles.noimage}>No image found</Text>
              } 
              { this.state.userData.photos ?
                <Image
                onPress={() =>  { this.state.pro3 ? this.onPressPostDetails(this.state.pro3.id) : ''}}
                  source={this.state.pro3 ? {uri: this.state.pro3.file } : null} 
                 style={{ height: 72, width: 165 , marginTop :10 ,  borderRadius: 10 }}
               /> 
                : 
                <Text style={styles.noimage}>No image found</Text>
               } 
              </View> 
            </View>            
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
