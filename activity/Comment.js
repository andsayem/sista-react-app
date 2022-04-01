import React, { useEffect, Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, Avatar, Icon } from 'react-native-elements';
import IconFnt from 'react-native-vector-icons/FontAwesome';
import IconAnt from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      liked: false
    };
  }
  render() {
    return (
      <View style={styles.main_div}>
        {/* <View style={styles.sub_main_div}> */}
        {this.props.item ?
          <View style={styles.parents}>
            <ListItem style={{ fontFamily: 'IBMPlexSans-Regular', width: '100%' }}>

              <Avatar rounded size="medium" source={this.props.item.userjoin ? { uri: this.props.item.userjoin.pro_image } : null} />
              <ListItem.Content style={{ marginLeft: -10 }}>
                <ListItem.Title style={{ fontSize: 13, fontFamily: 'IBMPlexSans-Medium' }}> {this.props.item.userjoin.name} </ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 12, fontFamily: 'IBMPlexSans-Regular' }}> {this.props.item.comm_test} </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <View horizontal showsHorizontalScrollIndicator={false} style={{ fontFamily: 'IBMPlexSans-Regular', paddingLeft: 75, width: '100%' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ fontFamily: 'IBMPlexSans-Regular', width: 70 }} >
                  <TouchableOpacity onPress={() => this.props.onPressCommentLike(this.props.item.id)}
                    activeOpacity={0.5} >
                    {this.props.item.liked ?
                      <Text style={{ fontFamily: 'IBMPlexSans-Regular', color: '#535353' }}> <IconAnt name="like1" size={20} color="#5C6BC0" /> Like </Text>
                      : <Text style={{ fontFamily: 'IBMPlexSans-Regular', color: '#535353' }}> <IconAnt name="like2" size={20} color="#535353" /> Like </Text>
                    }
                  </TouchableOpacity>
                </View>
                <View style={{ fontFamily: 'IBMPlexSans-Regular', width: 120 }}>
                  <TouchableOpacity onPress={() => this.props.onPressCommentReply(this.props.item.id, 'Reply')}
                    activeOpacity={0.5} >
                    <Text style={{ fontFamily: 'IBMPlexSans-Regular', color: '#535353' }}> <IconFnt name="comment-o" size={20} color="#535353" /> Reply</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ fontFamily: 'IBMPlexSans-Regular', width: 60, alignSelf: 'flex-end' }}>
                  <Text style={{ fontFamily: 'IBMPlexSans-Regular', alignSelf: 'flex-end' }}>
                    {moment(this.props.item.created_at).fromNow('hh:mm A')}
                  </Text>
                </View>
              </View>
              {this.props.item.reply.map((reply, i) => (

                <View style={styles.child}>
                  <ListItem style={{ fontFamily: 'IBMPlexSans-Regular', backgroundColor: "#FEFEFE", width: '100%' }}>
                    <Avatar rounded size="medium" source={reply.userjoin ? { uri: reply.userjoin.pro_image } : null} />
                    {/* <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} /> */}
                    <ListItem.Content style={{ marginLeft: -10 }}>
                      <ListItem.Title style={{ fontSize: 13, fontFamily: 'IBMPlexSans-Medium' }}> {reply.userjoin.name} </ListItem.Title>
                      <ListItem.Subtitle style={{ fontSize: 12, fontFamily: 'IBMPlexSans-Regular' }}> {reply.comm_test}  </ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={{ fontFamily: 'IBMPlexSans-Regular', width: 60, alignSelf: 'flex-end' }}>
                      <Text style={{ fontFamily: 'IBMPlexSans-Regular', alignSelf: 'flex-end' }}>
                        {moment(reply.created_at).fromNow('hh:mm A')}
                      </Text>
                    </View>
                    
                  </ListItem>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    style={{ fontFamily: 'IBMPlexSans-Regular', marginTop: -10, marginLeft: 75 }}
                  >
                    <View style={{ fontFamily: 'IBMPlexSans-Regular', width: 70 }}>
                      <TouchableOpacity onPress={() => this.props.onPressCommentLike(reply.id)}
                        activeOpacity={0.5} >
                        {reply.liked ?
                          <Text style={{ fontFamily: 'IBMPlexSans-Regular', color: '#535353' }}> <IconAnt name="like1" size={20} color="#5C6BC0" /> Like </Text>
                          : <Text style={{ fontFamily: 'IBMPlexSans-Regular', color: '#535353' }}> <IconAnt name="like2" size={20} color="#535353" /> Like </Text>
                        }

                      </TouchableOpacity>
                    </View>
                    <View style={{ fontFamily: 'IBMPlexSans-Regular', width: 105 }}>
                      <TouchableOpacity onPress={() => this.props.onPressCommentReply(reply.parent_id, 'Reply')}
                        activeOpacity={0.5} >
                        <Text style={{ fontFamily: 'IBMPlexSans-Regular', color: '#535353' }}> <IconFnt name="comment-o" size={20} color="#535353" /> Reply</Text>
                      </TouchableOpacity>
                    </View>

                  </ScrollView>
                </View>
              ))}
            </View>

          </View>
          : <View>Data not found</View>}
      </View>
      // </View>
    )
  }

}
const styles = StyleSheet.create({
  main_div: {
    fontFamily: 'IBMPlexSans-Regular',
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  sub_main_div: {
    backgroundColor: '#000'
  },
  parents: {
    fontFamily: 'IBMPlexSans-Regular',
    width: '93%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom: 10,
    // padding: 1,
    // marginTop: 10,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5
  },
  child: {
    fontFamily: 'IBMPlexSans-Regular',
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 1,
    // marginBottom: 2,
    marginLeft: -15,
    marginRight: -10,
    // marginRight: 20,
    paddingBottom: 10,

  },
  textAreaContainer: {
    fontFamily: 'IBMPlexSans-Regular',
    borderColor: '#efefef',
    borderWidth: 1,
  },
  textArea: {
    fontFamily: 'IBMPlexSans-Regular',
    height: 50,
  },
  submit: {
    fontFamily: 'IBMPlexSans-Regular',
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 50,
    top: 50,
  }
})
export default Comment;
