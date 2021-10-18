import React, { Component, useEffect } from 'react'; 
import { StyleSheet, FlatList, Text, View,SafeAreaView, ActivityIndicator, Image,TextInput,TouchableOpacity,ToastAndroid } from 'react-native';
import api from '../api';
import {colors , Icon , Header } from 'react-native-elements';  
import Comment from './Comment'; 
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements'; 
import AsyncStorage from '@react-native-community/async-storage';
import FormData from 'form-data'; 
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'; 
const Toast = ({ visible, message }) => {
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

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.fatchData = this.fatchData.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = { 
      items:[], 
      post_items:[], 
      isLoading: false,
      errortext:'',
      successtext:'',
      post_comment:'',
      loading:false,
      token:'',
      parent_id:0,
      isOnline: null
      };  
  }  
  componentDidMount() {    
    this.fatchData(); 
    // ChatAPI.subscribeToFriendStatus(      
    //   this.props.friend.id,      
    //   this.handleStatusChange    
    // );  
  }  
  componentWillUnmount() {   
    this.fatchData(); 
    // ChatAPI.unsubscribeFromFriendStatus(      
    //   this.props.friend.id,      
    //   this.handleStatusChange    
    // );  
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
  fatchData = () => { 
    //console.log('this-props====',this.props.route.params.id);
    // https://sista.bdmobilepoint.com/api/singelpost/319
    this.setState({isLoading:true})  
    api.getData('singelpost/'+this.props.route.params.id)
    .then(response => { 
      this.setState({post_items:response.data.data})
      this.setState({items:response.data.data.all_comments})
    }) 
    .finally( ()=>this.setState({isLoading: false})) 
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
  validation = () => {
    //this.state.post_comment ? this.setState({errortext:''}) :  this.setState({errortext:'Comment field is required'}); 
  }
  handleSubmitButton = async() => { 
    console.warn('storatw',this.props.route.params.id); 
    console.warn('state  =====',this.state);  
    if (!this.state.post_comment) { 
      this.setState({errortext:'Please fill caption'}); 
      return;
    }else{
      this.setState({errortext:''});
      this.setState({successtext:''}); 
      this.setState({loading:true});  
      var dataToSend = {  
      post_id: this.props.route.params.id,//route.params.id,
      parent_id: this.state.parent_id,
      user_id:2,
      comm_test: this.state.post_comment,       
    };  
    console.log('dataToSend--==',dataToSend);
    console.log('Token--==', this.state.token);
    fetch('http://sista.bdmobilepoint.com/api/all_comments', {
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
        this.setState({loading:false});  
        console.log('responseJson============',responseJson)
        if (responseJson.success === true) { 
          this.setState({post_comment:''}) 
          this.setState({successtext:'Post Submit Successful'},function () {
            this.fatchData();
          });  
        } else { 
        }
      })
      .catch((error) => { 
        console.log('error===',error);
        this.setState({loading:false});
      });
    }
  }
  renderRow = ({ item , index }) => {  
    const { liked, like, props } = item
    return ( 
      <View>
        <Comment
          item= {item} 
          index={index.toString()}
          liked={liked}
          like={like}  
          onPressLike={this.handleLikePost}
          onPressFollow={this.handleFollowPost}
          onPressPostDetails={this.handlePostDetails}
          onPressUserProfile={this.handleUserProfile}
        /> 
      </View>
    )
  } 
  handleUserProfile = (id) => {
    this.props.navigation.navigate('UserProfile', {id: id });
  }
  handlePostDetails = (id) => {
    this.props.navigation.navigate('PostDetails', {id: id });
  }
  handleToggleDrawer = () => {
    this.props.navigation.navigate.toggleDrawer();
  }

  handleLikePost = index => {     
    let post = this.state.items[index] 
    const { liked, like } = post 
    const newPost = {
      ...post,
      liked: !liked,
      like: liked ? post.like - 1 : post.like + 1
    }  
    api.getData('postlike/'+post.id)
    this.setState({
      items: {
        ...this.state.items,
        [index]: newPost
      }
    })
  }
  handleFollowPost = index => {     
    let post = this.state.items[index] 
    console.log('follow',post.user_id); 
    api.getData('following/'+post.user_id).then((res)=>{
      console.log('test');
      this.fatchData(); 
    }) 
  } 
  render(){
    let {items, isLoading} = this.state;
    //console.log('commmmeee======',this.state.items); 
    console.log('commmmeee======',this.state.post_items.caption);

    //this.state.post_comment ? this.setState({errortext:false}) :  this.setState({errortext:true}); 
    return(
      <SafeAreaView style={styles.container}>  
        {this.state.post_items ?
         <View style={styles.header}> 
          <Image source={this.state.post_items.file ? {uri: this.state.post_items.file } : null} 
                  style={{ width: '100%', borderRadius: 10, height: 130 }} />   
          <Text style={styles.caption}>{this.state.post_items.caption}</Text>
        </View> 
        : '' }
        <Toast visible={this.state.errortext} message={this.state.errortext}/>
        <Toast visible={this.state.successtext} message ={this.state.successtext} />   

        { this.state.items ?      
         <FlatList 
          data={Object.values(this.state.items)}
          renderItem={this.renderRow}
          refreshing={isLoading}
          extraData={this.state.items}
          ListFooterComponent={this.renderFooter}         
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onRefresh={this.fatchData}       
        />:  <View>Empty</View>}  
        <View style={styles.footer} > 
          <View style={styles.textAreaContainer} > 
            <TextInput 
              onChangeText = {(test) => {this.setState({post_comment:test})}}
              onBlur = {() => this.validation()}
              value={this.state.post_comment}
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Type something" 
              multiline={true}
            />
          </View> 
          <TouchableOpacity
            onPress={this.handleSubmitButton} 
            style={styles.submit}
            activeOpacity={0.5} >
            <Text             
            >Submit</Text>
          </TouchableOpacity>
        </View>      
      </SafeAreaView>
    )
    }
  
}
const styles = StyleSheet.create({
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
  },
  textArea: {
    height: 50,     
  },
  submit:{   
    alignItems:'flex-end', 
    backgroundColor:'#efefef', 
  }
})
export default PostDetails;