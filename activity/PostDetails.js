import React, { Component, useEffect , useRef } from 'react';
import { StyleSheet, Dimensions, FlatList,  Text, View, SafeAreaView, ActivityIndicator, ImageBackground, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import api from '../api';
import { colors, Icon, Header } from 'react-native-elements';
import Comment from './Comment';
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import IconFnt from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconOct from 'react-native-vector-icons/Octicons';
import IconFea from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import IconIonic from 'react-native-vector-icons/Ionicons';
import Styles from "../styles";
import RBSheet from "react-native-raw-bottom-sheet"; 
import AutoHeightImage from 'react-native-auto-height-image';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
const win = Dimensions.get('window').width;
import helpers from '../helpers';
const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
};

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.fatchData = this.fatchData.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = {
      items: [],
      post_items: [],
      like:'',
      liked:false,
      isLoading: false,
      errortext: '',
      successtext: '',
      post_comment: '',
      loading: false,
      token: '',
      parent_id: 0,
      reply_to_name: '',
      isOnline: null,
      sending: false
    };
  }
  componentDidMount() {
    this.fatchData();
    // ChatAPI.subscribeToFriendStatus(      
    //   this.props.friend.id,      
    //   this.handleStatusChange    
    // );  
  }
  componentWillUnmount() {
    this.fatchData();
    // ChatAPI.unsubscribeFromFriendStatus(      
    //   this.props.friend.id,      
    //   this.handleStatusChange    
    // );  
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TOKEN');
      if (value !== null) {
        this.setState({ token: value }); 
      }
    } catch (error) {
      // Error retrieving data  
    }
  };
  fatchData = () => { 
    this.setState({ isLoading: true })
    api.getData('singelpost/' + this.props.route.params.id)
      .then(response => {
        this.setState({ post_items: response.data.data })
        this.setState({ items: response.data.data.all_comments })
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  renderFooter = () => { 
    return (
      <View>
        <SafeAreaView>

        </SafeAreaView>
      </View>
    );
  }
  validation = () => {
    //this.state.post_comment ? this.setState({errortext:''}) :  this.setState({errortext:'Comment field is required'}); 
  }
  handleSubmitButton = async () => {
    if (!this.state.post_comment) {
      this.setState({ errortext: 'Please fill caption' });
      return;
    } else {
      this.setState({ sending: true });
      this.setState({ errortext: '' });
      this.setState({ successtext: '' });
      this.setState({ loading: true });
      var dataToSend = {
        post_id: this.props.route.params.id,//route.params.id,
        parent_id: this.state.parent_id,
        user_id: 2,
        comm_test: this.state.post_comment,
      };
      fetch(helpers.baseurl()+'api/all_comments', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: "Bearer " + await AsyncStorage.getItem(TOKEN)
        },
        body: JSON.stringify(dataToSend)
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ loading: false });
          this.setState({ sending: false });
          this.setState({ parent_id: 0 });
          this.setState({ reply_to_name: '' });
          if (responseJson.success === true) {
            this.setState({ post_comment: '' })
            this.setState({ successtext: 'Post Submit Successful' }, function () {
              this.fatchData();
            });
          } else {
          }
        })
        .catch((error) => { 
          this.setState({ loading: false });
        });
    }
  }

  handleCommentReply = (id, name) => {
    this.setState({ parent_id: id });
    this.setState({ reply_to_name: name });
  }
  renderRow = ({ item, index }) => {
    const { liked, like, props } = item
    return (
      <View >
        <Comment
          item={item}
          index={index.toString()}
          liked={liked}
          like={like}
          onPressLike={this.handleLikePost}
          onPressFollow={this.handleFollowPost}
          onPressPostDetails={this.handlePostDetails}
          onPressUserProfile={this.handleUserProfile}
          onPressCommentLike={this.handleLikeComment}
          onPressCommentReply={this.handleCommentReply}
        />
      </View>
    )
  }
  handleUserProfile = (id) => {
    this.props.navigation.navigate('UserProfile', { id: id });
  }
  handlePostDetails = (id) => {
    this.props.navigation.navigate('PostDetails', { id: id });
  }
  handleToggleDrawer = () => {
    this.props.navigation.navigate.toggleDrawer();
  }
 
  handleFollowPost = index => {
    let post = this.state.items[index] 
    api.getData('following/' + post.user_id).then((res) => { 
      this.fatchData();
    })
  }
  handleCancelButton = () => {
    this.setState({ parent_id: 0 });
    this.setState({ reply_to_name: '' });
  }
  handleLikeComment = (index) => {
    
    api.getData('commentlike/'+index)
    .catch((error) => { 
    });
    
    this.fatchData();
  }
  handleLikePost2 = (id) => { 
    api.getData('postlike/' + id) 
    this.fatchData();
    
  } 
  handleLikePost = index => {     
    let post = this.state.items[index] 
    this.state.post_items 
     
  }
  render() {
    let { items, isLoading } = this.state; 
    return ( 
      <SafeAreaView style={styles.container}>  
      <ScrollView>
        {this.state.post_items ?
          <View style={styles.header}>
            <View style={{ borderRadius: 10 }}> 
            {this.state.post_items.post_type == 3 ?
              <View style={{ width: '100%', borderRadius: 10, height: 160, paddingBottom :5,paddingLeft:20, paddingRight:20 }}  >  
                <ImageBackground  source={require("../img/text/1.jpg")}  resizeMode="cover" style={styles.image_bg}>
                  <Text numberOfLines={5}  style={styles.text_bg}>{this.state.post_items.caption}  </Text>
                </ImageBackground>  
              </View>
            //  <AutoHeightImage
            //     width={win}
            //     source={require("../img/text/1.jpg")}
            //   />  
            : 
            <View>
              <AutoHeightImage
                width={win}
                source={{ uri: this.state.post_items.file ? this.state.post_items.file : '' }}
              /> 
                <Text style={styles.caption}>{this.state.post_items.caption}</Text>
            </View> 
            } 
          
              
            </View>

            {/* <Image source={this.state.post_items.file ? { uri: this.state.post_items.file } : null}
              style={{ width: '100%', borderRadius: 10, height: 130 }} /> */} 
              <View style={{ paddingTop: 20, flexDirection: "row", width: '100%' }}>
                <View style={{ marginStart: 30, flexDirection: "row", width: '25%' }}>
                  <TouchableOpacity onPress={() => this.handleLikePost(this.state.post_items.id)}    
                  activeOpacity={0.5} >  
                  {this.state.post_items.liked ?
                    <Text><IconAnt name="heart" size={23} color="#FF5D8F" /> </Text>
                    : 
                    <Text><IconAnt name="hearto" size={23} color="#FF5D8F" /> </Text>
                  }                    
                  </TouchableOpacity>  
                  <Text style={{ paddingLeft: 10 }}>{this.state.post_items.like}</Text>
                </View>
                <View style={{ flexDirection: "row", width: '28%' }}>
                  <Text ><IconOct name="comment" size={23} color="#FF5D8F" /> </Text>
                  <Text style={{ paddingLeft: 12 }}>{this.state.post_items.comment}</Text>
                </View>
                <View style={{ flexDirection: "row", width: '30%' }}>
                  <IconFea name="share" size={23} color="#FF5D8F" />
                </View>
                <Text style={{ alignSelf: 'flex-end' }}>
                  <IconEnt  onPress={() => this.RBSheet.open()}  name="dots-three-vertical" size={23} color="#FF5D8F" />
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
          : ''
        }
        <Toast visible={this.state.errortext} message={this.state.errortext} />
        {
          this.state.items ?
            <FlatList style={{ paddingTop: 30, paddingBottom:30}}
              data={Object.values(this.state.items)}
              renderItem={this.renderRow}
              refreshing={isLoading}
              extraData={this.state.items}
              ListFooterComponent={this.renderFooter}
              onEndReachedThreshold={0.1}
              onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
              onRefresh={this.fatchData}
            /> : <View>Empty</View>
        }
        <View>
          {this.state.reply_to_name ?

            <Text>{this.state.reply_to_name} <Text onPress={this.handleCancelButton} >Cancel</Text> </Text>

            : <View></View>}
        </View>
        </ScrollView>
         <View style={styles.main_footer} >
          <View style={styles.footer}>
            <View style={{ width: '100%', flexDirection: 'column' }} horizontal showsHorizontalScrollIndicator={false} >
              <TextInput
                onChangeText={(test) => {
                  this.setState({ post_comment: test },
                    this.setState({ errortext: false, reply_to_name: '' }))
                }}
                onBlur={() => this.validation()}
                value={this.state.post_comment}
                underlineColorAndroid="transparent"
                placeholder="Type Here..."
                multiline={true}
                placeholderTextColor={'white'}
                style={{
                  backgroundColor: '#944CD4',
                  width: '100%',
                  alignSelf: 'center'
                }}
              />

              <TouchableOpacity
                onPress={this.handleSubmitButton}
                style={styles.submit}
                activeOpacity={0.5} >
                {this.state.sending ? <ActivityIndicator size="small" color="#0000ff" /> :
                  <Icon size={35} name='sc-telegram' type='evilicon' color='#B461FE' />
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>  
        
      </SafeAreaView>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 2,
    width: '100%'
  },
  header: {
    backgroundColor: '#fff',
    top: 20, 
    width: '100%',
    borderRadius: 15,
    paddingBottom: 20,
    marginBottom: 10
  },
  caption: {
    paddingTop:5,
    textAlign: 'center',
    fontSize: 18,
    color:"#535353"
  },
  main_footer: {
    alignItems: "center",
    justifyContent: "center", 
    paddingBottom:40
  },
  footer: {  
    position: 'absolute',  
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    width: '90%'
  },
  textAreaContainer: {
    borderColor: '#944CD4',
    backgroundColor: 'blue',
    // width: '90%'
  },
  textArea: {
    height: 50,
  },
  submit: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 1,
    paddingLeft: 1,
    margin: 4,
    borderRadius: 40,
    position: 'absolute',
    right: 2,
    top: 3.2,
    backgroundColor: '#fff'
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
})
export default PostDetails;