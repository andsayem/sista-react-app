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
          <View style={{ backgroundColor: '#fff', height: 320, width: '100%', borderRadius: 15, padding: 10, marginBottom :10  }} > 
            <View style={{ backgroundColor: "#FEFEFE", width: '100%'}}>
              <ListItem style={{ backgroundColor: "#FEFEFE", width: '100%'}}> 
                  <Avatar onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)} rounded size="medium" 
                 source={this.props.item.userjoin ? {uri: this.props.item.userjoin.pro_image } : null}   />
                  <ListItem.Content >
                    <ListItem.Title>                     
                    <Text onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)}>
                    {this.props.item.userjoin.name}
                      </Text></ListItem.Title> 
                    <ListItem.Subtitle>  {moment(this.props.item.created_at).fromNow() }</ListItem.Subtitle>
                  </ListItem.Content> 
                  <ListItem.Content >
                  <TouchableOpacity onPress={() => this.props.onPressFollow(this.props.index)}    
                  activeOpacity={0.5} >  
                  <Text>{this.props.item.follow }</Text>
                  {this.props.item.followings == 1?
                    <Text style={{ color : '#a21919'}}>Following </Text>
                    : 
                    <Text style={{ color : '#a21919'}}>+Follow </Text> 
                  } 
                  </TouchableOpacity>   
                  </ListItem.Content>
              </ListItem>             
            </View> 
           
            {this.props.item.post_type == 3 ?
            
            <View style={{ width: '100%', borderRadius: 10, height: 190 }}  >  
            <ImageBackground  source={require("../img/text/1.jpg")}  resizeMode="cover" style={styles.image_bg}>
              <Text onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={styles.text_bg}>{this.props.item.caption}  </Text>
            </ImageBackground> 
            <View>
              <View style={{flexDirection: "row", marginTop:20 }}>
                <Text style={{ flex: 1, marginStart:20}}>
                  <Text ><IconAnt  name="hearto" size={25} color="#FF5D8F" /> </Text>
                  <Text >4.5k</Text> 
                </Text>
                <Text style={{ flex: 2,marginStart:20, flexDirection:"column"}}> 
                  <Text ><IconOct  name="comment" size={25} color="#FF5D8F" /> </Text>
                  <Text >916</Text>
                </Text>
                <Text style={{ flex:1,marginStart:20, left:-70}}>
                  <IconFea name="share" size={25} color="#FF5D8F" />
                </Text>
                <Text onPress={() => this.RBSheet.open()}  style={{ alignSelf: 'flex-end' }}>
                  <IconEnt name="dots-three-vertical" size={25} color="#FF5D8F" />
                </Text>
              </View> 
            </View>
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
                <View>
              <View style={{flexDirection: "row", marginTop:20 }}>
                <Text style={{ flex: 1, marginStart:20}}>
                  <Text ><IconAnt  name="hearto" size={25} color="#FF5D8F" /> </Text>
                  <Text >4.5k</Text> 
                </Text>
                <Text style={{ flex: 2,marginStart:20, flexDirection:"column"}}> 
                  <Text ><IconOct  name="comment" size={25} color="#FF5D8F" /> </Text>
                  <Text >916</Text>
                </Text>
                <Text style={{ flex:1,marginStart:20, left:-70}}>
                  <IconFea name="share" size={25} color="#FF5D8F" />
                </Text>
 
                <Text onPress={() => this.RBSheet.open()}   style={{ alignSelf: 'flex-end' }}>
                  <IconEnt name="dots-three-vertical" size={25} color="#FF5D8F" />
                </Text> 
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
                  <Text style={Styles.share_item}> <IconAnt  name="sharealt" size={16} color="#000000" /> Share To....</Text>
                  <Text style={Styles.share_item}> <IconFea  name="bookmark" size={16} color="#000000" /> Save</Text>
                </View>
                </RBSheet>
              </View> 
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
            <View  style={{   height: 66, width: 120}} >
              <Text> Comment <Icon  style={{paddingTop : 10}}  type='font-awesome' name="comment-o" size={12}  /> {this.props.comment} </Text>
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
    }
  });
 