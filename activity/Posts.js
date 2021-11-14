import React, { Component, useEffect } from 'react'; 
import { StyleSheet, FlatList, Text, View,SafeAreaView, TouchableOpacity, ScrollView, StatusBar
} from 'react-native';
import api from '../api';
import { ListItem, colors , Icon , Header } from 'react-native-elements';  
import Events from '../components/Events';
import Categories from '../components/Categories';
import Post from './Post';  
class Posts extends Component {
  constructor(props) {
    super(props);
    this.handlePostCates = this.handlePostCates.bind(this);
    this.fatchData = this.fatchData.bind(this);
    this.state = { 
      items:[], 
      isLoading: false,
      cat_id:'',
      cat_active:'',
      };  
  }  
  componentDidMount(){    
    // StatusBar.setBarStyle('light-content',true);
    // StatusBar.setBackgroundColor("red");
    this.fatchData(); 
  }
  fatchData = async () => { 
    this.setState({isLoading:true})    
    api.getData('post_datas?cat_id='+this.state.cat_id)
    .then(response => response.data.data)
    .then(json => this.setState({items:json}))
    .finally( ()=>this.setState({isLoading: false})) 
  }   
  handleLoadMore = () => {  
    this.setState({page: this.state.page + 1, isLoading:true}, this.fatchData )   
  }  
  renderFooter = () => { 
    useEffect(() => { this.fatchData()},[]) 
    return(  
        <View style={{height:70}}>     
            <Text style={styles.title}>Loading Data..</Text> 
        </View> 
    );
  }
  handleOnRefresh = () => { 
    this.setState({page:1, data:[]})
    this.setState({page:1, refreshing:true, seed: this.state.seed+1},() => {
      this.fatchData();
    })
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
        onPressFollow={this.handleFollowPost}
        onPressPostDetails={this.handlePostDetails}
        onPressUserProfile={this.handleUserProfile}
      />
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
      console.log('test');
      this.fatchData(); 
    })
    
  } 
  
  componentWillUnmount() {   
    this.handlePostCates(); 
    this.fatchData();
    console.log('componentWillUnmount')    
  }
  render(){
    let {isLoading} = this.state;
    let props = this.props; 
    return(
      <SafeAreaView>     
        <Header 
            leftComponent={
            <View> 
              <Icon color={colors.black} size={30} name='menu' 
            onPress ={ ( ) =>  props.navigation.toggleDrawer()  } ></Icon> 
            </View> }
            centerComponent={{ text: 'Inspire me', style: { color: '#1E1E1E' , fontSize : 20 } }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{   
              color : '1E1E1E',
              backgroundColor: '#E4E4E4' }}
        /> 
        <Events/> 
        <ScrollView>
        <View style={{ paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 5 , marginTop : 10}}>   
        <Text style={{backgroundColor: '#fff' , paddingBottom : 0, paddingTop:14, paddingLeft:12, color:'#535353'}}>Category </Text>     
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginRight: -30}}
          >
            <ListItem key={'all'} style={{ padding : 0 , margin : 0}} > 
              <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity onPress={this.handlePostCates}          
              style={{ justifyContent: "center", height: 66, width: 66, borderRadius: 50, backgroundColor: "#944CD4", 
              }}
              > 
              <Icon  
                color='#FFFFFF' 
                name='border-all' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : '100%',color:'#535353'}} >All</Text>
              </ListItem.Content>
            </ListItem>
            <Categories bgcolor={'#944CD4'} handlePostCate={this.handlePostCateWise} active="datat"/>   
        </ScrollView>
        
        <FlatList 
          data={Object.values(this.state.items)}
          renderItem={this.renderRow}
          keyExtractor={(item, i) => item.id.toString()} 
          refreshing={isLoading}
          extraData={this.state}
          ListFooterComponent={this.renderFooter}         
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onRefresh={this.fatchData}      
        /> 
        </View>
        </ScrollView>
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