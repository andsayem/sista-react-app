import React, { Component  } from "react";
import { View, Text, ScrollView , FlatList , SafeAreaView ,StyleSheet , ToastAndroid, TouchableOpacity, Platform } from "react-native"; 
import { Avatar, colors, Icon , Image , Header} from "react-native-elements"; 
import Styles from "../styles";
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
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
class Profile extends Component {
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

  async componentDidMount() {    
    this.setState({user_id:this.props.route.params.id},function () {
      this.fatchData();  
    }) 
    this.fatchData();  
    console.log('componentDidMount',this.props.route.params.id) 
  }  
  async componentWillUnmount() {   
    this.setState({user_id:this.props.route.params.id},function () {
      this.fatchData();  
    }) 
    console.log('componentDidMount',this.props.route.params.id) 
  }  
    handleStatusChange(status) {    
    this.setState({      
      isOnline: status.isOnline    
    });  
  }
  fatchData = async() => {  
    
    
    this.setState({isLoading:true})  
    api.getData('user_profile/'+ await AsyncStorage.getItem(STORAGE_KEY).id)
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
  handleStatusChange(status) {    
    this.setState({      
      isOnline: status.isOnline    
    });  
  }
  _retrieveData = async () => {  
    try { const value = await AsyncStorage.getItem('TOKEN');    
    if (value !== null) {  
      this.setState({token:value});    
      console.log(value);    
    }  
  } catch (error) {    
    // Error retrieving data  
  }};
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
            centerComponent={{ text: 'Profile', style: { color: '#1E1E1E' , fontSize : 20 } }}
            rightComponent={{ icon: 'home', color: '#1E1E1E' }}
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
              {/* <TouchableOpacity
              style={Styles.loginBtn}
              activeOpacity={0.5}>
              <Text  >Logout</Text>
            </TouchableOpacity>
              <Text ></Text> */}
        </View>   
        <View style={{ width : 110}} > 
        
          <Text style={{ fontSize : 16 , fontWeight : '600' , paddingBottom : 17 , borderColor : 'red'}}>Message</Text> 
        </View> 
        <View style={{ width : 110}} > 
              <Text   style={{    justifyContent:"center",  backgroundColor : '#FF5D8E'  }}>Follow </Text> 
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
export default Profile;
