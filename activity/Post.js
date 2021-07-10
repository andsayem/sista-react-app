import React, { Component } from 'react'; 
import { StyleSheet, Text, Button, TouchableOpacity, View,Image, ScrollView } from 'react-native'; 
import { ListItem, Avatar, Icon } from 'react-native-elements';   
//import moment from "moment";
class Post extends  React.Component{      
    constructor(props) {
      super(props);  
    }                          
    shouldComponentUpdate(nextProps, nextState) {                                     
      const { liked, like } = nextProps                                          
      const { liked: oldLiked, like: oldLikeCount } = this.props                 
  
      // If "liked" or "likeCount" is different, then update                          
      return liked !== oldLiked || like !== oldLikeCount                         
    }                                                                                 
  
    render() { 
      //console.log('Post = props',this.props.item);                 
      return (                                                                        
        <ScrollView keyExtractor={(item , i) => item.id} >
          <View style={{ backgroundColor: '#fff', height: 310, width: '100%', borderRadius: 15, padding: 10, marginBottom :10  }} > 
            <View style={{ backgroundColor: "#FEFEFE", width: '100%'}}>
              <ListItem style={{ backgroundColor: "#FEFEFE", width: '100%'}}>
                  <Avatar rounded size="medium" source={require('../img/images/user_3.jpg')} />
                  <ListItem.Content >
                    <ListItem.Title> {this.props.item.userjoin.name} </ListItem.Title>
                    <ListItem.Subtitle>  54 mins ago</ListItem.Subtitle>
                  </ListItem.Content> 
                  <ListItem.Content >
                  <Text>+ Following</Text>
                  </ListItem.Content>
              </ListItem>             
            </View> 
            <View> 
              <Text numberOfLines={1}   
                style={{  fontFamily: "RobotoRegular", fontSize: 12,  paddingBottom :5 ,  color: "#0D0E10",  }} 
                note onPress={() => this.props.onPressPostDetails(this.props.item.id)}>{this.props.item.caption}
              </Text>   
            </View>
            <View> 
              <Image source={this.props.item.file ? {uri: this.props.item.file } : null} 
              style={{ width: '100%', borderRadius: 10, height: 130 }} />            
            </View>  
            <View style={{flex:30}}></View> 
            <View>
              <TouchableOpacity onPress={() => this.props.onPressLike(this.props.index)}    
              activeOpacity={0.5} > 
              <View style={{ height: 66,  width: 80, }} 
              >
              {this.props.liked ?
                <Text style={{ color : '#a21919'}}>Unlike {this.props.like}</Text>
                : 
                <Text style={{ color : '#a21919'}}>Like {this.props.like ? 0 : ''}</Text> 
              }
              </View>
              </TouchableOpacity>  
            </View>  
            <View  style={{   height: 66, width: 120}} >
              <Text> Comment <Icon  style={{paddingTop : 10}}  type='font-awesome' name="comment-o" size={12}  /> {this.props.comment} </Text>
            </View>
            <View style={{  height: 66,  width: 100}}  >
              <Text style={{ color : '#1c81b0'}} > <Icon  style={{paddingTop : 10}}  type='font-awesome' name="upload" size={12}  /> {this.props.share} </Text>
            </View>    
          </View>  
        </ScrollView>                                                                     
      )                                                                               
    }                                                                                 
  } 
  export default Post;     
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
 