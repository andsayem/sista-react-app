import React, { Component , useRef } from 'react'; 
import { StyleSheet,  ImageBackground ,Text, Button, TouchableOpacity, View,Image, ScrollView , SectionList} from 'react-native'; 
import { ListItem, Avatar, Icon } from 'react-native-elements';   
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconOct from 'react-native-vector-icons/Octicons';
import IconFea from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconIonic from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Styles from "../styles";
import RBSheet from "react-native-raw-bottom-sheet"; 
import {
  shareOnFacebook,
  shareOnTwitter,
} from 'react-native-social-share'; 
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
     facebookShare(item){ 
       console.log(item);
      shareOnFacebook({
          'text':item.caption,
          'link':'https://sista.andsayem.com/',
          'imagelink':'http://www.andsayem.com/img/personal_2.jpg',
          //or use image
          'image': 'artboost-icon',
        },
        (results) => {
          console.log(results);
        }
      );
    }                                                                         
  
    render() { 
      //console.log('Post = props',this.props.item.catjoin.cat_name);                 
      return (                                                                        
        <ScrollView key={this.props.item.id} >
          <View style={{ backgroundColor: '#fff', height: 320, width: '100%', borderRadius: 15, padding: 0,   }} > 
            <View style={{ backgroundColor: "#FEFEFE", width: '100%'}}>
              <ListItem  style={{borderRadius: 15}}> 
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
                  <View style={{borderRadius:15}}>
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
            
            <View style={{ width: '100%', borderRadius: 10, height: 160, paddingBottom :5,paddingLeft:20, paddingRight:20 }}  >  
            <ImageBackground  source={require("../img/text/1.jpg")}  resizeMode="cover" style={styles.image_bg}>
              <Text numberOfLines={5} onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={styles.text_bg}>{this.props.item.caption}  </Text>
            </ImageBackground>  
            </View> 
            :
            <View style={{ width: '100%', borderRadius: 10, paddingLeft:20, paddingRight:20 }} >
               <Text numberOfLines={2} ellipsizeMode='tail'   
                style={{  fontFamily: "RobotoRegular", fontSize: 15, paddingBottom :9 ,  color: "#0D0E10",  }} 
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
            <View style={{ paddingTop: 10, paddingLeft:20, paddingRight:20, flexDirection: "row", width: '100%' }}>
                <View style={{  marginStart: 2, flexDirection: "row", width: '25%'}}>                    
                  <TouchableOpacity onPress={() => this.props.onPressLike(this.props.index)}    
                  activeOpacity={0.5} >  
                  {this.props.liked ?
                    <Text><IconAnt name="heart" size={23} color="#FF5D8F" /> </Text>
                    : 
                    <Text><IconAnt name="hearto" size={23} color="#FF5D8F" /> </Text>
                  }                    
                  </TouchableOpacity>  
                  <Text style={{ paddingLeft: 10, color:"#929292" }}>{ this.props.like } </Text>
                </View>                 
                <View style={{ flexDirection: "row", left:0,  width: '25%' }}>
                  <Text onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={{alignSelf:'flex-start'}} >
                    <IconOct name="comment" size={25} color="#B461FE" /> </Text>
                  <Text style={{ paddingLeft: 12, color:"#929292" }}>{this.props.item.comment }</Text>
                </View>
                <View style={{ flexDirection: "row", width: '25%' }}>
                  <IconFea onPress={() => this.facebookShare(this.props.item)}  name="share" size={23} color="#B461FE" />
                </View>
                <View style={{ width: '27%' }}>
                  <Text onPress={() => this.RBSheet.open()}  style={{ alignSelf: 'flex-end' }}> 
                    <Text style={{ alignSelf: 'flex-end' }}>
                      <IconEnt name="dots-three-vertical" size={20} color="#FF5D8F" />
                    </Text>                     
                  </Text>
                </View>
                <RBSheet
                      ref={ref => {
                        this.RBSheet = ref;
                      }}
                      height={300}
                      openDuration={250}
                      customStyles={{
                        container: {
                          justifyContent: "center",
                          alignItems: "center"
                        }
                      }}
                    > 
                    <View style={{width : '100%'}}>
                      <Text style={[Styles.share_item, {  color : '#F00' }]}> <IconAnt name="warning" size={16} color="#000000" />  Report</Text>
                      <Text style={[Styles.share_item, {  color : '#F00' }]}> <IconMat  name="do-not-disturb" size={17} color="#000000" /> Not Interested</Text>
                      <Text style={Styles.share_item}> <IconIonic  name="copy-outline" size={16} color="#000000" /> Copy Link</Text>
                      <Text onPress={() => this.facebookShare(this.props.item)} style={Styles.share_item}> <IconAnt  name="sharealt" size={16} color="#000000" /> Share To....</Text>
                      <Text style={Styles.share_item}> <IconFea  name="bookmark" size={16} color="#000000" /> Save</Text>
                    </View>
                    </RBSheet>
              </View> 
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
 