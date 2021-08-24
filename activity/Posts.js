import React, { Component } from 'react'; 
import { StyleSheet, FlatList, Text, TouchableOpacity, View,Image,SafeAreaView, ScrollView, ActivityIndicator,RefreshControl } from 'react-native';
import api from '../api';
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../styles"; 
import Events from '../components/Events';
import Categories from '../components/Categories';
import Post from './Post';
import { Alert } from 'react-native';
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items:[], 
      isLoading: false,
      };  
  }
  componentWillMount(){
    console.log('WillMount after')
    this.fatchData();
    console.log('WillMount before')
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
     // alert('test');
      // The screen is focused
      // Call any action
    })

    console.log('didlmount after')
    this.fatchData();
    console.log('didlmount before')
  }  
  fatchData = () => { 
    this.setState({isLoading:true})  
    api.getData('post_datas')
    .then(response => response.data.data)
    .then(json => this.setState({items:json}))
    .finally( ()=>this.setState({isLoading: false})) 
  }   
  handleLoadMore = () => {  
    this.setState({page: this.state.page + 1, isLoading:true}, this.fatchData )   
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
    // Other states                                                                         
  }  
  renderRow = ({ item , index }) => { 
    //console.log('itemitemitemitemitemitemitemitemitemitem',index); 
    const { liked, like, props } = item
    return (
      <Post
        item= {item} 
        index={index.toString()}
        liked={liked}
        like={like}  
        onPressLike={this.handleLikePost}
        onPressPostDetails={this.handlePostDetails}
      />
    )
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

    this.setState({
      items: {
        ...this.state.items,
        [index]: newPost
      }
    })
  }

  //////
  render(){
    let {items, isLoading} = this.state;
    return(
      <SafeAreaView>  
        <Header
            style={{ backgroundColor : 'red'}}
            leftComponent={<Icon color={colors.white} size={30} name='menu' 
            onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } ></Icon> }
            centerComponent={{ text: 'Posts', style: { color: '#fff' , fontSize : 20 } }}
            rightComponent={{ icon: 'notifications', color: '#fff' }}
        />

        <Events/>  
        <Categories/>
         
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
        /> 
      </SafeAreaView>
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
  activityIndicator:{  
    top: '50%',
    justifyContent: 'center',
    marginTop: '50%',
    alignItems: 'center',
  }
});

export default Posts;