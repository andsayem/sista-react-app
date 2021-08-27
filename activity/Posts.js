import React, { Component, useEffect } from 'react'; 
import { StyleSheet, FlatList, Text, View,SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import api from '../api';
import {colors , Icon , Header } from 'react-native-elements'; 
import Events from '../components/Events';
import Categories from '../components/Categories';
import Post from './Post'; 
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items:[], 
      isLoading: false,
      };  
  }
  
  // componentWillMount(){
  //   console.log('WillMount after')
  //   this.fatchData();
  //   console.log('WillMount before')
  // } 
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
    useEffect(() => this.fatchData(),[]) 
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
            leftComponent={<Icon color={colors.black} size={30} name='menu' 
            onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } ></Icon> }
            centerComponent={{ text: 'Posts', style: { color: '#1E1E1E' , fontSize : 20 } }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
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