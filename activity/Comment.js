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
      liked:false
    };
  }
  render() { 
    return (
      <View style={styles.main_div}>
      {/* <View style={styles.sub_main_div}> */}
          {this.props.item ?
            <View style={styles.parents}>
              <ListItem style={{  width: '100%' }}>

                <Avatar rounded size="medium" source={this.props.item.userjoin ? { uri: this.props.item.userjoin.pro_image } : null} />
                <ListItem.Content>
                  <ListItem.Title> {this.props.item.userjoin.name} </ListItem.Title>
                  <ListItem.Subtitle> {this.props.item.comm_test} </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: -10, marginLeft: 80 }}>
                <View style={{ width: 70 }} >
                  <TouchableOpacity onPress={() => this.props.onPressCommentLike(this.props.item.id)}
                    activeOpacity={0.5} >
                      {this.props.item.liked ? 
                          <Text style={{ color: '#535353' }}> <IconAnt name="like1" size={20} color="#5C6BC0" /> Like </Text> 
                          : <Text style={{ color: '#535353' }}> <IconAnt name="like2" size={20} color="#535353" /> Like </Text>
                          } 
                  </TouchableOpacity>
                </View>
                <View style={{ width: 120 }}>
                  <TouchableOpacity onPress={() => this.props.onPressCommentReply(this.props.item.id, 'Reply')}
                    activeOpacity={0.5} >
                    <Text style={{ color: '#535353' }}> <IconFnt name="comment-o" size={20} color="#535353" /> Reply</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: 70 }}>
                  <Text style={{ alignSelf: 'flex-end' }}>
                  {moment(this.props.item.created_at).fromNow('hh:mm A') }
                  </Text>
                </View>
              </ScrollView>
              {this.props.item.reply.map((reply, i) => (

                <View style={styles.child}>
                  <ListItem style={{ backgroundColor: "#FEFEFE", width: '100%' }}>
                    <Avatar rounded size="small" source={reply.userjoin ? { uri: reply.userjoin.pro_image } : null} />
                    {/* <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} /> */}
                    <ListItem.Content>
                      <ListItem.Title> {reply.userjoin.name} </ListItem.Title>
                      <ListItem.Subtitle> {reply.comm_test}  </ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    style={{ marginTop: -10, marginLeft: 80 }}
                  >
                    <View style={{ width: 70 }}>
                      <TouchableOpacity onPress={() => this.props.onPressCommentLike(reply.id)}
                        activeOpacity={0.5} >
                          {reply.liked ? 
                          <Text style={{ color: '#535353' }}> <IconAnt name="like1" size={20} color="#5C6BC0" /> Like </Text> 
                          : <Text style={{ color: '#535353' }}> <IconAnt name="like2" size={20} color="#535353" /> Like </Text>
                          }
                        
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: 105 }}>
                      <TouchableOpacity onPress={() => this.props.onPressCommentReply(reply.parent_id, 'Reply')}
                        activeOpacity={0.5} >
                        <Text style={{ color: '#535353' }}> <IconFnt name="comment-o" size={20} color="#535353" /> Reply</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: 20 }}>
                      <Text style={{ alignSelf: 'flex-end' }}>
                      {moment(reply.created_at).fromNow('hh:mm A') }
                      </Text>
                    </View>
                  </ScrollView>
                </View>
              ))}
            </View>
            : <View>Data not found</View>}
        </View>
        // </View>
    )
  }

}
const styles = StyleSheet.create({
  main_div: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  sub_main_div:{
    backgroundColor : '#000'
  },
  parents: {
    width: '93%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingBottom:10,
    padding: 1,
    marginTop: 10,
    marginBottom: 2,
    marginLeft: 5,
    marginRight: 5
  },
  child: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 1,
    marginBottom: 2,
    marginLeft: 50,
    marginRight: 20,
    paddingBottom:10,

  },
  textAreaContainer: {
    borderColor: '#efefef',
    borderWidth: 1,
  },
  textArea: {
    height: 50,
  },
  submit: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 50,
    top: 50,
  }
})
export default Comment;
