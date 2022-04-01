import React, { Component, useEffect } from 'react'; 
import { StyleSheet, FlatList, Text, View,SafeAreaView, TouchableOpacity, ScrollView, StatusBar
} from 'react-native';
import api from '../api';
import { ListItem, colors , Icon , Header } from 'react-native-elements';  
import Events from '../components/Events';
import Categories from '../components/Categories';
import Post from './Post';  
import Styles from "../styles"; 
import AsyncStorage from '@react-native-community/async-storage';
import { ActivityIndicator } from 'react-native-paper';
const STORAGE_KEY = 'save_user'; 
const TOKEN = 'token';
class Posts extends Component {
  constructor(props) {
    super(props);
    this.handlePostCates = this.handlePostCates.bind(this);
    this.fatchData = this.fatchData.bind(this);
    this.fatchUserData = this.fatchUserData.bind(this);
    this.state = { 
      items:[], 
      isLoading: true,
      cat_id:'',
      cat_active:'',
      userData:[],
      moreLoding: true,
      refreshing:false,
      page:1
      };  
  }  
  componentDidMount(){    
    // statusBar.setBarStyle('light-content',true);
    // StatusBar.setBackgroundColor("red");
    this.fatchData(); 
    this.fatchUserData();
  }

  /* React get method.  */

  componentWillMount(){
    this.fatchData(); 
      this.fatchUserData();
  }
  fatchData = async () => { 
    //this.setState({isLoading:true})   
    api.getData('post_datas?cat_id='+this.state.cat_id+'&page='+this.state.page)
    .then(response => response.data.data)
    .then((json) => {
      this.setState({items:json})
      if(json.length > 1){
        this.setState({moreLoding:false})
      }else{
        this.setState({moreLoding:true})
      }
      if(this.state.isLoading){this.setState({moreLoding:true})}
      }
    )
    .finally( ()=>{
      this.setState({isLoading: false, refreshing:false })
    }) 
  }   
  handleLoadMore = () => {    
    this.setState({page: this.state.page + 1, isLoading:true }, () => { this.fatchData()});
    //this.setState({page: this.state.page + 1, isLoading:true}, this.fatchData )   
  }  
  renderFooter = () => { 
    useEffect(() => { this.fatchData()},[]) 
    return(  
        <View style={{fontFamily : 'IBMPlexSans-Regular',height:60}}> 
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
    this.setState({page:1, items:[]})
    this.setState({page:1, refreshing:true, seed: this.state.seed+1},() => {
      this.fatchData();
    })
  }   

  fatchUserData = async() => {   
    const userData = await AsyncStorage.getItem(STORAGE_KEY); 
    let user_data = JSON.parse(userData)  
    this.setState({userData:user_data})  
  } 
  renderRow = ({ item , index }) => {  
    const { liked, like, props } = item
    return (
      <View style={{fontFamily : 'IBMPlexSans-Regular',padding:5}}>
        <Post
        item= {item} 
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
    this.props.navigation.navigate('PostDetails', {id: id });
  } 
  handleUserProfile = (id) => {  
    this.props.navigation.navigate('UserProfile', {id: id });
  }
  handlePostCateWise = (id) => { 
    this.setState({cat_id: id}, function () {
      this.fatchData();
    }); 
  }
  handlePostCates = () => {
    this.setState({cat_id:''}, function () {
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
    api.getData('following/'+post.user_id).then((res)=>{ 
      this.fatchData(); 
    })
    
  } 
  
  componentWillUnmount() {   
    this.handlePostCates(); 
    this.fatchData();
    this.fatchUserData();  
    this.renderFooter();  
  }
  render(){
    let {isLoading} = this.state;
    let props = this.props; 
    return(
      <SafeAreaView> 
        <Header 
            leftComponent={ <View> 
              <Icon color={colors.black} size={30} name='menu' 
              onPress ={ ( ) =>  props.navigation.toggleDrawer()  } ></Icon> 
            </View> }
            centerComponent={{ text: 'Inspire me', style: { color: '#1E1E1E' , fontSize : 20 } }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{ color : '1E1E1E', backgroundColor: '#F5F5F5' }} 
        /> 
        <Events/> 
        <ScrollView style={{fontFamily : 'IBMPlexSans-Regular', margin: 10, backgroundColor: '#fff'}}>
        <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor:"#F5F5F5" , paddingBottom : 5 , marginTop : 10, marginBottom : 290}}>   
        <Text style={{fontFamily : 'IBMPlexSans-Regular',backgroundColor: '#fff' , paddingBottom : 0, paddingTop:14, paddingLeft:12, color:'#535353'}}>Category </Text>     
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: '#fff'}}
          >
            <ListItem key={'all'} style={{fontFamily : 'IBMPlexSans-Regular', padding : 0 , margin : 0}} > 
              <ListItem.Content style={{fontFamily : 'IBMPlexSans-Regular', padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity onPress={this.handlePostCates}          
              style={[this.state.cat_id == '' ? Styles.cat_icon_active_style : Styles.cat_icon_style  ]}
              > 
              
              <Icon   
                color={ this.state.cat_id == '' ? '#FFFFFF' : '#000000'} 
                name='border-all' />  
            </TouchableOpacity> 
            <Text style={{fontFamily : 'IBMPlexSans-Regular', textAlign : 'center' , width : '100%',color:'#535353'}} >All</Text>
              </ListItem.Content>
            </ListItem>
            <Categories 
            cat_id= {this.state.cat_id} 
            bgcolor={'#944CD4'} 
            handlePostCate={this.handlePostCateWise} 
            active="datat"/>   
        </ScrollView>
        
        <FlatList 
          data={Object.values(this.state.items)}
          keyExtractor={(item, i) => item.id.toString()}  
          onEndReached={this.handleLoadMore}
          renderItem={this.renderRow}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.1}
          refreshing={this.state.refreshing} 
          onRefresh={this.handleOnRefresh}    
          onMomentumScrollBegin={() => this.setState({ scrollBegin: true })}
          onMomentumScrollEnd={() => this.setState({ scrollBegin: false })} 
          extraData={this.state}
        /> 
        </View>
        </ScrollView>
      </SafeAreaView>
    )
    }
  
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontFamily: 'IBMPlexSans-Regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  fixToText: {
    fontFamily: 'IBMPlexSans-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    fontFamily: 'IBMPlexSans-Regular',
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  horizontal: {
    fontFamily: 'IBMPlexSans-Regular',
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  activityIndicator:{  
    fontFamily: 'IBMPlexSans-Regular',
    top: '50%',
    justifyContent: 'center',
    marginTop: '50%',
    alignItems: 'center',
  }
});

export default Posts;