import React, { Component } from 'react'; 
import { StyleSheet,  ImageBackground ,Text, Button, TouchableOpacity, View,Image, ScrollView } from 'react-native'; 
import { ListItem, Avatar, Icon } from 'react-native-elements';   
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconOct from 'react-native-vector-icons/Octicons';
import IconFea from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
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
      //console.log('Post = props',this.props.item.catjoin.cat_name);                 
      return (                                                                        
        <ScrollView key={this.props.item.id} >
          <View style={{ backgroundColor: '#fff', height: 320, width: '100%', borderRadius: 15, padding: 10, marginBottom :10  }} > 
            <View style={{ backgroundColor: "#FEFEFE", width: '100%'}}>
              <ListItem bottomDivider> 
                  <Avatar onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)} rounded size="medium" 
                 source={this.props.item.userjoin ? {uri: this.props.item.userjoin.pro_image } : null}   />
                  <ListItem.Content >
                    <ListItem.Title>                     
                    <Text onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)}>
                    {this.props.item.userjoin.name}
                      </Text></ListItem.Title> 
                    <ListItem.Subtitle  > 
                      {this.props.item.catjoin.cat_name } - {moment(this.props.item.created_at).fromNow() }
                      </ListItem.Subtitle>
                  </ListItem.Content>  
                  <TouchableOpacity onPress={() => this.props.onPressFollow(this.props.index)}    
                  activeOpacity={0.5} >   
                  <View style={{borderRadius:10}}>
                  {this.props.item.followings == 1?
                    <Text style={styles.following}>+Following </Text>
                    : 
                    <Text style={styles.follow}>+Follow </Text> 
                  } 
                  </View>
                  </TouchableOpacity>    
              </ListItem>    
            </View> 
           
            {this.props.item.post_type == 3 ?
            
            <View style={{ width: '100%', borderRadius: 10, height: 160,paddingBottom :5 }}  >  
            <ImageBackground  source={require("../img/text/1.jpg")}  resizeMode="cover" style={styles.image_bg}>
              <Text onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={styles.text_bg}>{this.props.item.caption}  </Text>
            </ImageBackground>  
            </View> 
            :
            <View>
               <Text numberOfLines={1}   
                style={{  fontFamily: "RobotoRegular", fontSize: 12, paddingBottom :5 ,  color: "#0D0E10",  }} 
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
            <View style={{ paddingTop: 20, flexDirection: "row", width: '100%' }}>
                <View style={{ marginStart: 30, flexDirection: "row", width: '25%' }}>                    
                  <TouchableOpacity onPress={() => this.props.onPressLike(this.props.index)}    
                  activeOpacity={0.5} >  
                  {this.props.liked ?
                    <Text ><IconAnt name="heart" size={25} color="#FF5D8F" /> </Text>
                    : 
                    <Text ><IconAnt name="hearto" size={25} color="#FF5D8F" /> </Text>
                  }  
                  
                  </TouchableOpacity>  
                  <Text style={{ paddingLeft: 10,color:"#929292" }}>{ this.props.like } </Text>
                </View> 
                
                <View style={{ flexDirection: "row", width: '25%' }}>
                  <Text ><IconOct name="comment" size={25} color="#B461FE" /> </Text>
                  <Text style={{ paddingLeft: 12,color:"#929292" }}>{this.props.item.comment }</Text>
                </View>
                <View style={{ flexDirection: "row", width: '25%' }}>
                  <IconFea name="share" size={25} color="#B461FE" />
                </View>
                <View style={{ width: '15%' }}>
                  <Text style={{ alignSelf: 'flex-end' }}>
                    <IconEnt name="dots-three-vertical" size={20} color="#B461FE" />
                  </Text>
                </View>
              </View>
            <View> 
            </View>  
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
    },
    following:{
      paddingLeft:10, 
      color : '#0D0E10',    
      borderRadius: 30,
      borderWidth: 1,
      height:35,
      width:90,
      paddingTop: 8,
      borderColor: '#E6E8EA',
      fontWeight: "bold",
    },
    follow:{
      paddingLeft:10, 
      color : '#0D0E10',    
      borderRadius: 30,
      borderWidth: 1,
      height:35,
      width:72,
      fontWeight: "bold",
      paddingTop: 8,
      borderColor: '#E6E8EA'
    }
  });
 