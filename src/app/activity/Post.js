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
        <View style={Styles.post_item} >
          <View style={Styles.post_item_view}>
            <ListItem  >
              <Avatar onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)} rounded size="medium"
                source={this.props.item.userjoin ? { uri: this.props.item.userjoin.pro_image } : null} />
              <ListItem.Content >
                <ListItem.Title>
                  <Text style={Styles.post_item_user_name} onPress={() => this.props.onPressUserProfile(this.props.item.userjoin.id)}>
                    {this.props.item.userjoin.name}
                  </Text></ListItem.Title>
                <ListItem.Subtitle  >
                  <Text style={Styles.post_item_cat_name} >
                  {this.props.item.catjoin.cat_name} <Text style={Styles.post_date} >- {moment(this.props.item.created_at).fromNow()}</Text>
                  </Text>
                </ListItem.Subtitle>
              </ListItem.Content>
              <TouchableOpacity onPress={() => this.props.onPressFollow(this.props.index)}
                activeOpacity={0.5} >
                <View style={{borderRadius: 15 }}>
                  {this.props.user.id != this.props.item.userjoin.id ?
                    this.props.item.followings == 1 ?
                      <Text style={Styles.following}>+Following  </Text>
                      :
                      <Text style={Styles.follow}>+Follow </Text>
                    :
                    <Text ></Text>
                  }
                </View>
              </TouchableOpacity>
            </ListItem>
          </View>

          {this.props.item.post_type == 3 ?

            <View style={Styles.post_text_view}  >
              <ImageBackground source={require("../../assets/img/text/1.jpg")} resizeMode="cover" style={Styles.post_image_bg}>
                <Text numberOfLines={5} onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={Styles.post_text_bg}>{this.props.item.caption}  </Text>
              </ImageBackground>
            </View>
            :
            <View style={ Styles.text_ReadMore_view } >
              <ReadMore numberOfLines={2} onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={ Styles.text_ReadMore }>
                {this.props.item.caption}
              </ReadMore>

              <View>
                <TouchableOpacity onPress={() => this.props.onPressPostDetails(this.props.item.id)}>

                  {mime.lookup(this.props.item.file) == 'video/mp4' ?
                    <VideoPlayer
                      video={{ uri: this.props.item.file }}
                      style={Styles.VideoPlayer}
                      thumbnail={require('../../assets/img/images/v2.png')}
                    /> : 
                    <Image
                      source={this.props.item.file ? { uri: this.props.item.file_path + 'thumbnail/large_'+ this.props.item.file} : null}
                      style={Styles.post_image} />}

                </TouchableOpacity>
              </View>
            </View>
          }
          <View style={Styles.post_like_section}>
            <View style={Styles.post_like_view}>
              <TouchableOpacity onPress={() => this.props.onPressLike(this.props.index)}
                activeOpacity={0.5} >
                {this.props.liked ?
                  <Text><IconAnt name="heart" size={23} color="#FF3D79" /> </Text>
                  :
                  <Text><IconAnt name="hearto" size={23} color="#FF3D79" /> </Text>
                }
              </TouchableOpacity>
              <Text style={Styles.like}>{this.props.like} </Text>
            </View>
            <View style={Styles.post_comment_section}>
              <Text onPress={() => this.props.onPressPostDetails(this.props.item.id)} style={Styles.post_comment_section_icon} >
                <IconOct name="comment" size={25} color="#B461FE" /> </Text>
              <Text style={Styles.post_comment_text}>{this.props.item.comment}</Text>
            </View>
            <View style={{fontFamily : 'IBMPlexSans-Regular', flexDirection: "row", width: '25%' }}>
              <IconFea onPress={() => this.facebookShare(this.props.item)} name="share" size={23} color="#B461FE" />
            </View>
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: '27%' }}>
              <Text onPress={() => this.RBSheet.open()} style={ Styles.post_share_icon}>
                <Text style={Styles.post_share_text}>
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
              <View style={Styles.post_rb_sheet}>
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
 
