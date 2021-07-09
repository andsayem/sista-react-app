import React, { Component } from 'react'; 
import { StyleSheet, FlatList, Text, TouchableOpacity, View,Image,SafeAreaView, ScrollView, ActivityIndicator,RefreshControl } from 'react-native';
import api from '../api';
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../styles"; 
import Events from '../components/Events';
import Categories from '../components/Categories';
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items:[], 
      isLoading: false,
      };  
  }
  componentDidMount() {
    //console.log('didlmount after')
    this.fatchData();
    //console.log('didlmount before')
  }    

  fatchData = () => { 
    this.setState({isLoading:true}) 
    let apiUrl = 'https://jsonplaceholder.typicode.com/posts'; 
    api.getData('post_datas')
    .then(response => response.data.data)
    .then(json => this.setState({items:json}))
    .finally( ()=>this.setState({isLoading: false})) 
  } 
  renderRow=({item, index})=>{  
    return(
      <ScrollView key={item.id.toString()}>
        <View style={{ backgroundColor: '#fff' , height: 310,  width: '100%', borderRadius: 15,   padding: 10,  marginBottom :10  }} > 
          <View  style={{  backgroundColor: "#FEFEFE", width: '100%',    }}>
            <ListItem style={{  backgroundColor: "#FEFEFE", width: '100%',    }}>
                <Avatar rounded  size="medium" source={require('../img/images/user_3.jpg')} />
                <ListItem.Content >
                <ListItem.Title > {item.userjoin.name}</ListItem.Title>
                <ListItem.Subtitle> 54 mins ago</ListItem.Subtitle>
                </ListItem.Content> 
                <ListItem.Content >
                <Text>+ Following</Text>
                </ListItem.Content>
            </ListItem>             
          </View> 
          <View>
            <Text numberOfLines={1} key={item.id+'dsc'} 
              style={{  fontFamily: "RobotoRegular", fontSize: 12,  paddingBottom :5 ,  color: "#0D0E10",  }} 
              note onPress={() => this.props.navigation.navigate('PostDetails', {id: item.id })}>{item.caption}
            </Text>   
          </View>
          <View> 
            <Image source={item.file ? {uri: item.file } : null} 
            style={{ width: '100%', borderRadius: 10, height: 130 }} />            
          </View>  
          <View style={{flex:30}}></View> 
          <View>
            <TouchableOpacity onPress={this.likeSubmitButton.bind(this,item)} 
            activeOpacity={0.5} >
            <View style={{ height: 66,  width: 80, }} 
            >
            {item.like ?
              <Text style={{ color : '#a21919'}}  
               >Unlike 
              {item.like}</Text>
              : 
              <Text style={{ color : '#a21919'}} >Like
              {item.like}</Text> }
            </View>
            </TouchableOpacity>  
          </View>  
          <View  style={{   height: 66, width: 120}} >
            <Text> Comment <Icon  style={{paddingTop : 10}}  type='font-awesome' name="comment-o" size={12}  /> {item.comment} </Text>
          </View>
          <View style={{  height: 66,  width: 100}}  >
            <Text style={{ color : '#1c81b0'}} > <Icon  style={{paddingTop : 10}}  type='font-awesome' name="upload" size={12}  /> {item.share} </Text>
          </View>    
        </View>  
      </ScrollView>          
    )
  } 
  handleLoadMore = () => {  
    this.setState({page: this.state.page + 1, isLoading:true}, this.fatchData )   
  } 
  likeSubmitButton = (ItemData) => {    
    console.log('likes======',ItemData)

    api.getData('postlike/'+ ItemData.id)
    .then((res)=>{
      alert(res.data.message);
        //console.log(res.data);  
    })
    .catch((error) => {
        //console.log(error)
    }) 
  }; 
  renderFooter = () => { 
    return(  
        <View>  
          {this.state.isLoading ? (
            <View> 
            <ActivityIndicator size="large" color="#0000ff" /> 
            <Text style={styles.title}>Loading Data...dd</Text>
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

  render(){
    let {items, isLoading} = this.state;
    return(
      <SafeAreaView> 
        
        <Header
            style={{ backgroundColor : 'red'}}
              leftComponent={<Icon color={colors.white} size={30} name='menu' 
              onPress={() => navigation.toggleDrawer()} />}
              centerComponent={{ text: 'Inspire me', style: { color: '#fff' , fontSize : 20 } }}
              rightComponent={{ icon: 'notifications', color: '#fff' }}
                /> 
        
        <Events/>  
        <Categories/>
         
        <FlatList
        data = {items}
        renderItem={this.renderRow}
        keyExtractor={(i,k)=>k.toString()}
        refreshing={isLoading}
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