import React, { Component, useEffect } from 'react'; 
import { StyleSheet, FlatList, Text, View,SafeAreaView, ActivityIndicator, Image,TextInput,TouchableOpacity } from 'react-native';
import api from '../api';
import {colors , Icon , Header } from 'react-native-elements';  
import Comment from './Comment'; 
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements'; 
class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items:[], 
      isLoading: false,
      };  
  }  
  fatchData = () => { 
    //console.log('this-props====',this.props.id);
    this.setState({isLoading:true})  
    api.getData('all_comments?parent_id=0')
    .then(response => response.data.data)
    .then(json => this.setState({items:json}))
    .finally( ()=>this.setState({isLoading: false})) 
  }   
  handleLoadMore = () => {  
    this.setState({page: this.state.page + 1, isLoading:true}, this.fatchData )   
  }  
  
  handleOnRefresh = () => { 
    this.setState({page:1, data:[]})
    this.setState({page:1, refreshing:true, seed: this.state.seed+1},() => {
      this.fatchData();
    })
  }  
  handleLoadMore = () => {  
    this.setState({page: this.state.page + 1, isLoading:true}, this.fatchData )   
  }  
  renderFooter = () => { 
    useEffect(() => { this.fatchData()},[]) 
    return(  
        <View>  
          {this.state.isLoading ? (
            <View> 
            <ActivityIndicator size="large" color="#0000ff" /> 
            <Text style={styles.title}>Loading Data..</Text>
            </View>
          ) : (
            <View>  
              {this.state.refreshing ? ( <Text style={styles.title}>Please wait a moment</Text> ) : ( <Text style={styles.title}>No more Data...</Text>)} 
            </View>
          )}
        </View> 
    );
  }
  handleOnRefresh = () => { 
    this.setState({page:1, data:[]})
    this.setState({page:1, refreshing:true, seed: this.state.seed+1},() => {
      this.fatchData();
    })
  } 
  state = {                                                                         
    items: {}                                                                                
  }  

  handleSubmitButton = () => {   
    setErrortext(false);
    if (!post_comment) { 
      setErrortext({message : 'Please fill caption'});  
      return;
    }else{
      setSuccesstext(false); 
    setLoading(true); 
    var dataToSend = {  
      post_id: route.params.id,
      parent_id: 0,
      user_id:2,
      comm_test: post_comment,       
    };  
    console.log('dataToSend--==',dataToSend);
    fetch('http://sista.bdmobilepoint.com/api/all_comments', {
      method: 'POST', 
      headers: {  
        'Accept': 'application/json',  
        'Content-Type':'application/json',
        Authorization :"Bearer "+ AsyncStorage.getItem(TOKEN)
      },
      body: JSON.stringify(dataToSend) 
      })
      .then((response) => response.json())
      .then((responseJson) => { 
        setLoading(false);   
        console.log('responseJson============',responseJson)
        if (responseJson.success === true) { 
          setComment('');
          setSuccesstext({message:'Post Submit Successful'});  
        } else { 
        }
      })
      .catch((error) => { 
        console.log('error===',error);
        setLoading(false); 
      });
    }
  }
  renderRow = ({ item , index }) => { 
    console.log('itemitemitemitemitemitemitemitemitemitem',item); 
    const { liked, like, props } = item
    return ( 
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
    console.log('commmmeee======',this.state.items);
    return(
      <SafeAreaView> 
      <View>
         <View style={styles.header}> 
          <Image source={require('../img/images/user_1.jpg')}  
            style={{ width: '100%', borderRadius: 10, height: 200 }}   />  
        </View> 
        
        <FlatList 
          data={Object.values(this.state.items)}
          renderItem={this.renderRow}
          keyExtractor={(item , i) => item.id.toString()} 
          refreshing={isLoading}
          extraData={this.state}
          ListFooterComponent={this.renderFooter}         
          onEndReachedThreshold={0.1}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onRefresh={this.fatchData}       
        /> 

        <View style={styles.footer} > 
          <View style={styles.textAreaContainer} > 
            <TextInput 
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
            >Submit </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.paddingFooter} >  
        </View>
      </View>       
      </SafeAreaView>
    )
    }
  
}
const styles = StyleSheet.create({
  header:{
    backgroundColor: '#fff' ,
    height: 200,
    width: '100%',
    borderRadius: 15,
    padding: 1,
    marginBottom :10
  }, 
  footer:{ 
      backgroundColor: '#fff' , 
      borderRadius: 10,
      padding: 1,
      marginBottom :2,
      marginLeft : 20 ,
      marginRight : 20,
      bottom : 40 
  },
  textAreaContainer: {
    borderColor:  '#efefef',
    borderWidth: 1,  
  },
  textArea: {
    height: 50,     
  },
  submit:{
    position: 'absolute',
    bottom: 10,                                                    
    right: 10,  
    left:50,
    top:50,
  },
  paddingFooter:{
    paddingBottom:90
  }
})
export default PostDetails;