import React, { Component } from 'react'; 
import { StyleSheet, FlatList, Text, TouchableOpacity, View,Image,SafeAreaView, ScrollView, ActivityIndicator,RefreshControl } from 'react-native';
import api from '../api';
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../styles"; 
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { data:[], isLoading: true, page:1, refreshing:false, totalData:5, moreLoading:true };  
  }
  componentDidMount() {
    //console.log('didlmount after')
    this.fatchData();
    //console.log('didlmount before')
  }  
  componentWillUnmount() {
    this.fatchData();
    this.renderFooter();
  }    
  fatchData = async() => { 
    // api.getData('post_datas')
    // .then((res)=>{
    //     setItems( res.data.data);  
    //     //console.log('posts=====',res.data.data)
    // })
    // .catch((error) => {
    //     //console.log(error)
    // }) 
    // fetch('https://speechbd.com/api/v1/fontend/posts?column=id&direction=desc&per_page=5&page='+this.state.page)
    api.getData('post_datas')
      .then((json) => { 
        if( Number(this.state.totalData) === Number(this.state.data.length) ){
          this.setState({moreLoading:false})
          //console.log('more loaded data cond = ',this.state.moreLoading);
        }else{
          this.setState({moreLoading:true})
          //console.log('more loaded data cond = ',this.state.moreLoading);
        }
        if(this.state.isLoading){
          this.setState({moreLoading:true})
        } 
        this.setState({  
          data:this.state.data.concat(json.data.data),  // working...
          //totalData:json.data.total, 
          //data:[...this.state.data, ...json.model.data] /// working ...
        });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false, refreshing:false});
      });
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
  ChildView=({childData})=>{ 
    return(
      <ScrollView>
        <View style={{ backgroundColor: '#fff' , height: 310,  width: '100%', borderRadius: 15,   padding: 10,  marginBottom :10  }} > 
         
        <View key={childData.id+'avt'} style={{  backgroundColor: "#FEFEFE", width: '100%',    }}>
            <ListItem key={childData.id+'avt'} style={{  backgroundColor: "#FEFEFE", width: '100%',    }}>
                <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
                <ListItem.Content key={childData.id}>
                <ListItem.Title>  {childData.userjoin.name}</ListItem.Title>
                <ListItem.Subtitle> 54 mins ago</ListItem.Subtitle>
                </ListItem.Content> 
                <ListItem.Content >
                <Text>+ Following</Text>
                </ListItem.Content>
            </ListItem>             
        </View> 
        <Text numberOfLines={1} key={childData.id+'dsc'} style={{  fontFamily: "RobotoRegular", fontSize: 12,  paddingBottom :5 ,  color: "#0D0E10",  }} 
        note onPress={() => 
            this.props.navigation.navigate('PostDetails', {id: childData.id })
          }
           >{childData.caption}
        </Text> 
        <Image source={childData.file ? {uri: childData.file } : null}  
        style={{ width: '100%', borderRadius: 10, height: 130 }}   />
        <View> 
        <View style={{flex:30}}>
          
          </View> 
          <TouchableOpacity onPress={() => this.likeSubmitButton(childData)} 
            activeOpacity={0.5} >
            <View style={{   height: 66,  width: 80, }} 
            >
            {childData.like ?
              <Text style={{ color : '#a21919'}}  
               >Unlike 
              {childData.like}</Text>
              : 
              <Text style={{ color : '#a21919'}} >Like
              {childData.like}</Text> }
            </View>
        </TouchableOpacity> 
        <View  style={{   height: 66, width: 120}} >
          <Text> Comment <Icon  style={{paddingTop : 10}}  type='font-awesome' name="comment-o" size={12}  /> {childData.comment} </Text>
        </View>
        <View style={{  height: 66,  width: 100}}  >
          <Text style={{ color : '#1c81b0'}} > <Icon  style={{paddingTop : 10}}  type='font-awesome' name="upload" size={12}  /> {childData.share} </Text>
        </View>
        </View> 
        </View>  
      </ScrollView>          
    )
  } 
  handleLoadMore = () => {  
    this.setState({page: this.state.page + 1},()=>{
      //this.fatchData();

    })    
  } 
  renderFooter = () => { 
    return(  
        <View>  
          {this.state.moreLoading ? (
            <View> 
            <ActivityIndicator size="large" color="#0000ff" /> 
            <Text style={styles.title}>Loading Data...</Text>
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
    return(  
      <View style={{ marginHorizontal :10 , borderRadius: 10, paddingHorizontal: 8 , paddingBottom : 15 ,   marginTop : 10}}>
      {this.state.isLoading ? (
        <View style={[styles.activityIndicator]}>  
        <ActivityIndicator size="large" color="#0000ff" /> 
        <Text style={styles.title}>Loading Data...</Text>
      </View>
      ) : ( 
        <SafeAreaView>
        <FlatList 
          data={this.state.data}   
          keyExtractor={(item) => item.id.toString()} 
          onEndReached={this.handleLoadMore}
          renderItem={({item})=><this.ChildView childData={item} />}         
          ListFooterComponent={this.renderFooter}         
          onEndReachedThreshold={200}
          refreshing={this.state.refreshing}
          onRefresh={this.handleOnRefresh}
           />
         </SafeAreaView>           
      )}
    </View>
    );          
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