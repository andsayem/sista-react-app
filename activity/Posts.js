import React, { Component, useEffect } from 'react';
import {
  StyleSheet, AppRegistry, FlatList, Text, View, SafeAreaView, TouchableOpacity, ScrollView, StatusBar
} from 'react-native';
import api from '../api';
import { ListItem, colors, Icon, Header } from 'react-native-elements';
import Events from '../components/Events';
import Categories from '../components/Categories';
import Post from './Post';
import Styles from "../styles";
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import Pusher from 'pusher-js/react-native';
import helpers from '../helpers';
//import Pusher from 'pusher-js/react-native';

//AppRegistry.registerComponent(appName, () => App);
//Pusher.logToConsole = true;

// import Pusher from 'pusher-js/react-native';
// Pusher.logToConsole = true;

// var pusher = new Pusher('28f66afb2b72c8e97219', {
//   cluster: 'ap2'
// });

// var channel = pusher.subscribe('post-channel');
// channel.bind('post-event', function(data) {
//   alert(JSON.stringify(data));
// });



const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
class Posts extends Component {
  constructor(props) { 
    //Pusher.logToConsole = true; 
    super(props);
    this.handlePostCates = this.handlePostCates.bind(this);
    this.fatchData = this.fatchData.bind(this);
    this.fatchUserData = this.fatchUserData.bind(this);
    this.state = {
      items: [],
      isLoading: true,
      cat_id: '',
      cat_active: '',
      userData: [],
      moreLoding: true,
      refreshing:false,
      page:1
      };
  }  
 
  componentDidMount(){   
    this.focusListener = this.props.navigation.addListener('focus',
        () =>{ 
          this.handleResetParam()
          this.fatchData();
        } ); 
    var pusher = new Pusher(helpers.pusherConfig().app_key, {
      cluster: helpers.pusherConfig().app_key
    }); 
    var channel = pusher.subscribe('blog-channel'); 
    channel.bind('blog-event', function(data) {  
    }); 
   
  }

  /* React get method.  */
 
  componentWillMount(){  
    this.fatchData();
  }
  fatchData = async () => {
    api.getData('post_datas?cat_id='+this.state.cat_id+'&page='+this.state.page)
    .then(response => response.data.data)
    .then((json) => {  
      if(json.length > 1){  
        this.setState({items:this.state.items.concat(json)})
        this.setState({moreLoding:true})
        this.setState({page:this.state.page+1})
      }else{  
        this.setState({moreLoding:false})
      } 
    })
    .finally( ()=>{
      this.setState({isLoading: false, refreshing:false })
    }) 
  }   
  handleLoadMore = () => {   
    if(this.state.moreLoding ){ 
      this.setState({page: this.state.page, isLoading:true }, () => { this.fatchData()});
    } 
       
  }  
  renderFooter = () => {  
    useEffect(() => { 
      let isMounted = true; 
      this.fatchData()
      return () => { isMounted = false };
    },[]) 
    return(  
        <View style={{height:60}}> 
          { this.state.moreLoding ? (
            <View>
              <ActivityIndicator /> 
              <Text style={styles.title}>Loading Data..</Text> 
            </View>
          ):(
            <View> 
              <Text style={styles.title}>Loaded</Text> 
            </View>
          )}
        </View> 
    );
  }
  handleOnRefresh = () => {
    this.setState({ page: 1, items: [] })
    this.setState({ page: 1, refreshing: false, seed: this.state.seed }, () => {
      this.fatchData();
    })
  }

  fatchUserData = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    let user_data = JSON.parse(userData)
    this.setState({ userData: user_data })
  }
  renderRow = ({ item, index }) => {
    const { liked, like, props } = item
    return (
      <View style={{ padding: 5 }}>
        <Post
          item={item}
          index={index.toString()}
          liked={liked}
          like={like}
          user={this.state.userData}
          onPressLike={this.handleLikePost}
          onPressFollow={this.handleFollowPost}
          onPressPostDetails={this.handlePostDetails}
          onPressUserProfile={this.handleUserProfile}
        />
      </View>
    )
  }
  handlePostDetails = (id) => {
    this.props.navigation.navigate('PostDetails', { id: id });
  }
  handleUserProfile = (id) => {
    this.props.navigation.navigate('UserProfile', { id: id });
  }
  handlePostCateWise = (id) => {
    this.handleResetParam()
    this.setState({cat_id: id}, function () {
      this.fatchData();
    });
  }
  handlePostCates = () => {
    this.setState({ cat_id: '' }, function () {
      this.fatchData();
    });
  }
  handleLikePost = index => {
    let post = this.state.items[index]
    const { liked, like } = post
    const newPost = {
      ...post,
      liked: !liked,
      like: liked ? post.like - 1 : post.like + 1
    }
    api.getData('postlike/' + post.id)
    this.setState({
      items: {
        ...this.state.items,
        [index]: newPost
      }
    })
  }
  handleFollowPost = index => {
    let post = this.state.items[index]
    api.getData('following/' + post.user_id).then((res) => {
      this.fatchData();
    })
    
  } 
  handleResetParam = () =>{
    this.state.items=[];
    this.state.page=1;
  }
  componentWillUnmount() {   
    this.focusListener.remove();
    this.handlePostCates(); 
    //this.fatchData();
    this.fatchUserData();
    this.renderFooter();
  }
  render() {
    let { isLoading } = this.state;
    let props = this.props;
    return (
      <View>
        <Header
          leftComponent={<View>
            <Icon color={colors.black} size={30} name='menu'
              onPress={() => props.navigation.toggleDrawer()} ></Icon>
          </View>}
          centerComponent={{ text: 'Inspire me', style: { color: '#1E1E1E', fontSize: 20 } }}
          rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
          containerStyle={{ color : '1E1E1E', backgroundColor: '#E4E4E4' }}
           
      /> 
      <Events/>
      <Categories 
      cat_id= {this.state.cat_id} 
      handlePostCate={this.handlePostCateWise} />
      <View style={{ backgroundColor:"#E4E4E4" , paddingBottom : 5 , marginTop : 10}}> 
      <SafeAreaView>  
        <FlatList 
          data={Object.values(this.state.items)}
          keyExtractor={(item) => new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()} 
           
          onEndReached={this.handleLoadMore}
          renderItem={this.renderRow}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={200}
          refreshing={this.state.refreshing} 
          onRefresh={this.handleOnRefresh}     
        />   
      </SafeAreaView>
      </View> 
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  activityIndicator: {
    top: '50%',
    justifyContent: 'center',
    marginTop: '50%',
    alignItems: 'center',
  }
});

export default Posts;