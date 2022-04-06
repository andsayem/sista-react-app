import React   from 'react';
import { StyleSheet, ImageBackground, Text,  TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconOct from 'react-native-vector-icons/Octicons';
import IconFea from 'react-native-vector-icons/Feather';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconMat from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Styles from "../../theme/styles";
import RBSheet from "react-native-raw-bottom-sheet";
import ReadMore from '@fawazahmed/react-native-read-more';
import helpers from '../../providers/helpers';
import VideoPlayer from 'react-native-video-player';
import * as mime from 'react-native-mime-types';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
import {
  shareOnFacebook,
} from 'react-native-social-share';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: [],
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { liked, like } = nextProps
    const { liked: oldLiked, like: oldLikeCount } = this.props

    const { followings, follow } = nextProps;
    const { followings: oldFollowed, follow: oldFollowCount } = this.props;
    // If "liked" or "likeCount" is different, then update                          
    return liked !== oldLiked || like !== oldLikeCount || followings !== oldFollowed || follow !== oldFollowCount
  }
  facebookShare(item) {
    shareOnFacebook({
      'text': item.caption,
      'link': helpers.baseurl(),
      'imagelink': 'http://www.andsayem.com/img/personal_2.jpg',
      //or use image
      'image': 'artboost-icon',
    },
      (results) => {
      }
    );
  }
  report = async (id) => { 
    var dataToSend = {
      user_id: 1,
      post_id: id,
    };
    fetch('https://sista.droidit.net/api/post_reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + await AsyncStorage.getItem(TOKEN)
      },
      body: JSON.stringify(dataToSend)
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        if (responseJson.success === true) { 
        } else {
        }
      })
      .catch((error) => {
      });
  }


  render() {
    return (
      <ScrollView key={this.props.item.id} >
        <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: '#fff', minHeight: 190, width: '100%', borderRadius: 15, paddingBottom: 10 }} >
          <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: "#FEFEFE", width: '100%' }}>
            <ListItem  >
              <Avatar onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)} rounded size="medium"
                source={this.props.item.userjoin ? { uri: this.props.item.userjoin.pro_image } : null} />
              <ListItem.Content >
                <ListItem.Title>
                  <Text style={{fontFamily : 'IBMPlexSans-SemiBold',fontSize:15, color:'#0D0E10'}} onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)}>
                    {this.props.item.userjoin.name}
                  </Text></ListItem.Title>
                <ListItem.Subtitle  >
                  <Text style={{fontFamily : 'IBMPlexSans-Medium',fontSize:13, color:'#000000'}} >
                  {this.props.item.catjoin.cat_name} <Text style={{fontFamily : 'IBMPlexSans-Light',fontSize:13, color:'#000000'}} >- {moment(this.props.item.created_at).fromNow()}</Text>
                  </Text>
                </ListItem.Subtitle>
              </ListItem.Content>
              <TouchableOpacity onPress={() => this.props.onPressFollow(this.props.index)}
                activeOpacity={0.5} >
                <View style={{borderRadius: 15 }}>
                  {this.props.user.id != this.props.item.userjoin.id ?
                    this.props.item.followings == 1 ?
                      <Text style={styles.following}>+Following  </Text>
                      :
                      <Text style={styles.follow}>+Follow </Text>
                    :
                    <Text ></Text>
                  }
                </View>
              </TouchableOpacity>
            </ListItem>
          </View>

          {this.props.item.post_type == 3 ?

            <View style={{ width: '100%', borderRadius: 10, height: 160, paddingBottom: 5, paddingLeft: 20, paddingRight: 20 }}  >
              <ImageBackground source={require("../../assets/img/text/1.jpg")} resizeMode="cover" style={styles.image_bg}>
                <Text numberOfLines={5} onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={styles.text_bg}>{this.props.item.caption}  </Text>
              </ImageBackground>
            </View>
            :
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, paddingLeft: 20, paddingRight: 20 }} >
              <ReadMore numberOfLines={2} onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={{fontFamily : 'IBMPlexSans-Regular', fontSize: 13, paddingBottom: 9, color: "#707070", }}>
                {this.props.item.caption}
              </ReadMore>

              <View>
                <TouchableOpacity onPress={() => this.props.onPressPostDetails(this.props.item.id)}>

                  {mime.lookup(this.props.item.file) == 'video/mp4' ?
                    <VideoPlayer
                      video={{ uri: this.props.item.file }}
                      style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', height: 175 }}
                      thumbnail={require('../../assets/img/images/v2.png')}
                    /> :
                    <Image
                      source={this.props.item.file ? { uri: this.props.item.file } : null}
                      style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, height: 175 }} />}

                </TouchableOpacity>
              </View>
            </View>
          }
          <View style={{fontFamily : 'IBMPlexSans-Regular', paddingTop: 10, paddingLeft: 20, paddingRight: 20, flexDirection: "row", width: '100%' }}>
            <View style={{fontFamily : 'IBMPlexSans-Regular', marginStart: 2, flexDirection: "row", width: '25%' }}>
              <TouchableOpacity onPress={() => this.props.onPressLike(this.props.index)}
                activeOpacity={0.5} >
                {this.props.liked ?
                  <Text><IconAnt name="heart" size={23} color="#FF3D79" /> </Text>
                  :
                  <Text><IconAnt name="hearto" size={23} color="#FF3D79" /> </Text>
                }
              </TouchableOpacity>
              <Text style={{fontFamily : 'IBMPlexSans-Regular', paddingLeft: 10, color: "#929292" }}>{this.props.like} </Text>
            </View>
            <View style={{fontFamily : 'IBMPlexSans-Regular', flexDirection: "row", left: 0, width: '25%' }}>
              <Text onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={{fontFamily : 'IBMPlexSans-Regular', alignSelf: 'flex-start' }} >
                <IconOct name="comment" size={25} color="#B461FE" /> </Text>
              <Text style={{fontFamily : 'IBMPlexSans-Regular', paddingLeft: 12, color: "#929292" }}>{this.props.item.comment}</Text>
            </View>
            <View style={{fontFamily : 'IBMPlexSans-Regular', flexDirection: "row", width: '25%' }}>
              <IconFea onPress={() => this.facebookShare(this.props.item)} name="share" size={23} color="#B461FE" />
            </View>
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: '27%' }}>
              <Text onPress={() => this.RBSheet.open()} style={{fontFamily : 'IBMPlexSans-Regular', alignSelf: 'flex-end' }}>
                <Text style={{fontFamily : 'IBMPlexSans-Regular', alignSelf: 'flex-end' }}>
                  <IconEnt name="dots-three-vertical" size={20} color="#B461FE" />
                </Text>
              </Text>
            </View>
            <RBSheet
              ref={ref => {
                this.RBSheet = ref;
              }}
              height={230}
              openDuration={250}
              customStyles={{
                container: {
                  justifyContent: "center",
                  alignItems: "center"
                }
              }}
            >
              <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%' }}>
                <Text onPress={() => this.report(this.props.item.id)} style={[Styles.share_item, { color: '#F00' }]}> <IconAnt name="warning" size={16} color="#000000" />  Report</Text>
                <Text style={[Styles.share_item, { color: '#F00' }]}> <IconMat name="do-not-disturb" size={17} color="#000000" /> Not Interested</Text>
                {/* <Text style={Styles.share_item}> <IconIonic name="copy-outline" size={16} color="#000000" /> Copy Link</Text> */}
                <Text onPress={() => this.facebookShare(this.props.item)} style={Styles.share_item}> <IconAnt name="sharealt" size={16} color="#000000" /> Share To....</Text>
                <Text style={Styles.share_item}> <IconFea name="bookmark" size={16} color="#000000" /> Save</Text>
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
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
  },
  image_bg: {
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: "center"
  },
  text_bg: {
    fontFamily: 'IBMPlexSans-Regular',
    color: '#000000',
    fontSize: 13,
    textAlign: "center",
  },
  container: {
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontFamily: 'IBMPlexSans-Regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  fixToText: {
    fontFamily: 'IBMPlexSans-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    fontFamily: 'IBMPlexSans-Regular',
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  horizontal: {
    fontFamily: 'IBMPlexSans-Regular',
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  activityIndicator: {
    fontFamily: 'IBMPlexSans-Regular',
    top: '50%',
    justifyContent: 'center',
    marginTop: '50%',
    alignItems: 'center',
  },
  following: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 13,
    paddingLeft: 10,
    color: '#0D0E10',
    borderRadius: 30,
    borderWidth: 1,
    height: 35,
    width: 90,
    paddingTop: 8,
    borderColor: '#E6E8EA',
  },
  follow: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 13,
    paddingLeft: 10,
    color: '#0D0E10',
    borderRadius: 30,
    borderWidth: 1,
    height: 35,
    width: 72,
    paddingTop: 8,
    borderColor: '#E6E8EA'
  }
});
