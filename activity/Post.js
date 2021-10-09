import React, { Component } from 'react'; 
import { StyleSheet,  ImageBackground ,Text, Button, TouchableOpacity, View,Image, ScrollView } from 'react-native'; 
import { ListItem, Avatar, Icon } from 'react-native-elements';   

import moment from 'moment'
const image = { uri: "https://reactjs.org/logo-og.png" };
class Post extends  React.Component{      
    constructor(props) {
      super(props);  
    }                          
    shouldComponentUpdate(nextProps, nextState) {                                     
      const { liked, like } = nextProps                                          
      const { liked: oldLiked, like: oldLikeCount } = this.props 

      const { followings, follow } = nextProps;                                          
      const { followings: oldFollowed, follow: oldFollowCount} = this.props;
      // If "liked" or "likeCount" is different, then update                          
      return liked !== oldLiked || like !== oldLikeCount || followings !== oldFollowed || follow !== oldFollowCount                       
    }                                                                                
  
    render() { 
      //console.log('Post = props',this.props.item);                 
      return (                                                                        
        <ScrollView key={this.props.item.id} >
          <View style={{ backgroundColor: '#fff', height: 280, width: '100%', borderRadius: 15, padding: 10, marginBottom :10  }} > 
            <View style={{ backgroundColor: "#FEFEFE", width: '100%'}}>
              <ListItem style={{ backgroundColor: "#FEFEFE", width: '100%'}}>
                  <Avatar onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)} rounded size="medium" source={require('../img/images/user_3.jpg')} />
                  <ListItem.Content >
                    <ListItem.Title onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)}> {this.props.item.userjoin.name} </ListItem.Title> 
                    <ListItem.Subtitle>  {moment(this.props.item.created_at).fromNow() }</ListItem.Subtitle>
                  </ListItem.Content> 
                  <ListItem.Content >
                  <TouchableOpacity onPress={() => this.props.onPressFollow(this.props.index)}    
                  activeOpacity={0.5} >  
                  <Text>{this.props.item.follow }</Text>
                  {this.props.item.followings ?
                    <Text style={{ color : '#a21919'}}> </Text>
                    : 
                    <Text style={{ color : '#a21919'}}>+Following </Text> 
                  } 
                  </TouchableOpacity>   
                  </ListItem.Content>
              </ListItem>             
            </View> 
           
            {this.props.item.post_type == 3 ?
            
            <View   style={{ width: '100%', borderRadius: 10, height: 130 }}  >  
            <ImageBackground  source={require("../img/text/1.jpg")}  resizeMode="cover" style={styles.image_bg}>
              <Text onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={styles.text_bg}>{this.props.item.caption}  </Text>
            </ImageBackground> 
            </View>
            :
            <View>
               <Text numberOfLines={1}   
                style={{  fontFamily: "RobotoRegular", fontSize: 12,  paddingBottom :5 ,  color: "#0D0E10",  }} 
                note onPress={() => this.props.onPressPostDetails(this.props.item.id)}>{this.props.item.caption}
              </Text> 
                 <View> 
                 <TouchableOpacity onPress={() => this.props.onPressPostDetails(this.props.item.id)}>
                  <Image   
                  source={this.props.item.file ? {uri: this.props.item.file } : null} 
                  style={{ width: '100%', borderRadius: 10, height: 130 }} />   
                  </TouchableOpacity>         
                </View> 
            </View> 
            }  
            <View>
              <TouchableOpacity onPress={() => this.props.onPressLike(this.props.index)}    
              activeOpacity={0.5} > 
              <View style={{ height: 66,  width: 80, }} 
              >
              {this.props.liked ?
                <Text style={{ color : '#a21919'}}>Unlike {this.props.like}</Text>
                : 
                <Text style={{ color : '#a21919'}}>Like 
                {this.props.like  == '0'? '' : this.props.like }   </Text> 
              }
              </View>
              </TouchableOpacity>  
            </View>  
            {/* <View  style={{   height: 66, width: 120}} >
              <Text> Comment <Icon  style={{paddingTop : 10}}  type='font-awesome' name="comment-o" size={12}  /> {this.props.comment} </Text>
            </View> */}
            {/* <View style={{  height: 66,  width: 100}}  >
              <Text style={{ color : '#1c81b0'}} > <Icon  style={{paddingTop : 10}}  type='font-awesome' name="upload" size={12}  /> {this.props.share} </Text>
            </View>     */}
          </View>  
        </ScrollView>                                                                     
      )                                                                               
    }                                                                                 
  } 
  export default Post;     
const styles = StyleSheet.create({
   container_bg: {
      flex: 1,
    },
    image_bg: {
      flex: 1,
      justifyContent: "center"
    },
    text_bg: {
      color: "black", 
      fontWeight: "bold",
      textAlign: "center", 
    },
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
 