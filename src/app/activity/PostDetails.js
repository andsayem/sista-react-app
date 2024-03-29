import React, { Component } from 'react';
import { StyleSheet, Dimensions, FlatList, Text, View, SafeAreaView, ActivityIndicator, ImageBackground, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import api from '../../providers/api';
import {  Icon, Header } from 'react-native-elements';
import Comment from './Comment';
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'; 
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconOct from 'react-native-vector-icons/Octicons';
import IconFea from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMat from 'react-native-vector-icons/MaterialIcons'; 
import Styles from "../../theme/styles";
import RBSheet from "react-native-raw-bottom-sheet";
import AutoHeightImage from 'react-native-auto-height-image';
import VideoPlayer from 'react-native-video-player';
import moment from 'moment';
import * as mime from 'react-native-mime-types'; 
const TOKEN = 'token';
const win = Dimensions.get('window').width;
import helpers from '../../providers/helpers';
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
      userData: [],
      like: '',
      liked: false,
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
  }
  componentWillUnmount() {
    this.fatchData(); 
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
        this.setState({ userData: response.data.data.userjoin })
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
      fetch(helpers.baseurl() + 'api/all_comments', {
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

    api.getData('commentlike/' + index)
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
        <Header
          leftComponent={<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 300, minHeight: 30 }}>
            <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} /> 
          </View>
          }
          rightComponent={{}}
          containerStyle={{
            fontFamily: 'IBMPlexSans-Regular',
            color: '1E1E1E',
            backgroundColor: '#F5F5F5',
            height: 90

          }} />
        <ScrollView>
          {this.state.post_items ?
            <View style={styles.header}>
              <View style={{ fontFamily: 'IBMPlexSans-Regular', borderRadius: 10 }}>
                {this.state.post_items.post_type == 3 ?
                  <View style={{ fontFamily: 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, height: 160, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}  >
                    <ImageBackground source={require("../../assets/img/text/1.jpg")} resizeMode="cover" style={styles.image_bg}>
                      <Text numberOfLines={5} style={styles.text_bg}>{this.state.post_items.caption}  </Text>
                    </ImageBackground>
                  </View>  
                  :
                  <View>

                    {mime.lookup(this.state.post_items.file) == 'video/mp4' ?
                      <VideoPlayer
                        onBuffer={this.onBuffer}
                        fullScreenOnLongPress={true}
                        ref={r => this.player = r}
                        playControl={true}
                        controlButton={true}
                        video={{ uri: this.state.post_items.file }}
                        thumbnail={{ uri: 'https://i.picsum.photos/id/866/1600/900.jpg' }}
                        style={styles.backgroundVideo}
                      /> :
                      <AutoHeightImage width={win}
                        source={{ uri: this.state.post_items.file ? this.state.post_items.file : '' }}
                      />
                    }
                    <View style={{ fontFamily: 'IBMPlexSans-Regular', backgroundColor: "#FEFEFE", width: '100%' }}>
                      <ListItem style={{ height: 75 }} >
                        <Avatar rounded size="medium"
                          source={this.state.userData ? { uri: this.state.userData.pro_image } : null} />
                        <ListItem.Content >
                          <ListItem.Title>
                            <Text style={{ fontFamily: 'IBMPlexSans-SemiBold', fontSize: 15, color: '#0D0E10' }} >
                              {this.state.userData.name}
                            </Text></ListItem.Title>
                          <ListItem.Subtitle  >
                            <Text style={{ fontFamily: 'IBMPlexSans-Light', fontSize: 13, color: '#000000' }} >{moment(this.state.post_items.created_at).fromNow('hh')}
                            </Text>
                          </ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                      <Text style={styles.caption}>{this.state.post_items.caption}</Text>
                    </View>

                  </View>
                }


              </View>

              {/* <Image source={this.state.post_items.file ? { uri: this.state.post_items.file } : null}
              style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, height: 130 }} /> */}
              <View style={{ fontFamily: 'IBMPlexSans-Regular', paddingTop: 10, flexDirection: "row", width: '100%' }}>
                <View style={{ fontFamily: 'IBMPlexSans-Regular', marginStart: 30, flexDirection: "row", width: '20%' }}>
                  <TouchableOpacity onPress={() => this.handleLikePost(this.state.post_items.id)}
                    activeOpacity={0.5} >
                    {this.state.post_items.liked ?
                      <Text><IconAnt name="heart" size={23} color="#FF3D79" /> </Text>
                      :
                      <Text><IconAnt name="hearto" size={23} color="#FF3D79" /> </Text>
                    }
                  </TouchableOpacity>
                  <Text style={{fontFamily : 'IBMPlexSans-Regular', paddingLeft: 10, color: "#929292" }}>{this.state.post_items.like} </Text>
                </View>
                <View style={{ fontFamily: 'IBMPlexSans-Regular', flexDirection: "row", width: '20%' }}>
                  <Text ><IconOct name="comment" size={23} color="#B461FE" /> </Text>
                  <Text style={{fontFamily : 'IBMPlexSans-Regular', paddingLeft: 12, color: "#929292" }}>{this.state.post_items.comment}</Text>
                  
                </View>
                <View style={{ fontFamily: 'IBMPlexSans-Regular', flexDirection: "row", width: '20%' }}>
                  <IconFea name="share" size={23} color="#B461FE" />
                </View>
                <View style={{ fontFamily: 'IBMPlexSans-Regular', width: '27%' }}>
                  <Text onPress={() => this.RBSheet.open()} style={{ fontFamily: 'IBMPlexSans-Regular', alignSelf: 'flex-end' }}>
                    <Text style={{ fontFamily: 'IBMPlexSans-Regular', alignSelf: 'flex-end' }}>
                      <IconEnt name="dots-three-vertical" size={20} color="#B461FE" />
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
                  <View style={{ fontFamily: 'IBMPlexSans-Regular', width: '100%' }}>
                    <Text style={[Styles.share_item, { color: '#F00' }]}> <IconAnt name="warning" size={16} color="#000000" />  Report</Text>
                    <Text style={[Styles.share_item, { color: '#F00' }]}> <IconMat name="do-not-disturb" size={17} color="#000000" /> Not Interested</Text>
                    {/* <Text style={Styles.share_item}> <IconIonic name="copy-outline" size={16} color="#000000" /> Copy Link</Text> */}
                    <Text style={Styles.share_item}> <IconAnt name="sharealt" size={16} color="#000000" /> Share To....</Text>
                    <Text style={Styles.share_item}> <IconFea name="bookmark" size={16} color="#000000" /> Save</Text>
                  </View>
                </RBSheet>
              </View>
            </View>
            : ''
          }
          <Toast visible={this.state.errortext} message={this.state.errortext} />
          {
            this.state.items ?
              <FlatList style={{ fontFamily: 'IBMPlexSans-Regular', paddingTop: 3, paddingBottom: 30 }}
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
        </ScrollView>
        <View style={styles.main_footer} >
          <View style={styles.footer}>
            <View style={{ fontFamily: 'IBMPlexSans-Regular', width: '100%', flexDirection: 'column' }} horizontal showsHorizontalScrollIndicator={false} >
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
                  fontFamily: 'IBMPlexSans-Regular',
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
    fontFamily: 'IBMPlexSans-Regular',
    // marginTop: 20,
    flex: 1,
    padding: 2,
    width: '100%'
  },
  header: {
    fontFamily: 'IBMPlexSans-Regular',
    backgroundColor: '#fff',
    // top: 20,
    width: '100%',
    borderRadius: 15,
    paddingBottom: 20,
    marginBottom: 10
  },
  caption: {
    lineHeight: 25,
    letterSpacing: 0.5,
    fontFamily: 'IBMPlexSans-Medium',
    paddingLeft: 15,
    fontSize: 12,
    color: "#565656"
  },
  main_footer: {
    fontFamily: 'IBMPlexSans-Regular',
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 40
  },
  footer: {
    fontFamily: 'IBMPlexSans-Regular',
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    width: '90%'
  },
  textAreaContainer: {
    fontFamily: 'IBMPlexSans-Regular',
    borderColor: '#944CD4',
    backgroundColor: 'blue',
    // width: '90%'
  },
  textArea: {
    fontFamily: 'IBMPlexSans-Regular',
    height: 50,
  },
  submit: {
    fontFamily: 'IBMPlexSans-Regular',
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
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: "center"
  },
  text_bg: {
    fontFamily: 'IBMPlexSans-Regular',
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  backgroundVideo: {
    fontFamily: 'IBMPlexSans-Regular',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
export default PostDetails;