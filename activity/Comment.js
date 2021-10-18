import React, { useEffect, Component } from "react";
import { View, Text, StyleSheet} from "react-native";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements';     
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'; 
 
class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items:[], 
      isLoading: false,
      };  
  }  
  handleLikeComment = (id) => {
    alert(id)
  } 
  renderRow = ({ item , index }) => { 
    console.log('itemitemitemitemitemitemitemitemitemitem',item); 
    const { liked, like, props } = item
    return (
      <Comment
        item= {item} 
        index={index.toString()}
        liked={liked}
        like={like}  
        onPressLike={this.handleLikeComment} 
        onPressCommentReply={this.handleCommentReply} 
      />
    )
  } 
  render(){
    let {items, isLoading} = this.state;
    //console.log('Post = props',this.props.item);
    //console.log('Post = childs',this.props.item.childs);
    return( 
      <View>
      {this.props.item ?
       <View style={styles.parents}> 
            <ListItem style={{ backgroundColor: "#FEFEFE", width: '100%' }}>
              <Avatar rounded size="medium" source={require('../img/images/user_2.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris </ListItem.Title>
                <ListItem.Subtitle> {this.props.item.comm_test} </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem> 
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{  marginTop: -10 , marginLeft : 80 }}>
              <View style={{ width: 80}} >
                <Text style={{ color : '#a21919'}}> Like </Text>
              </View>
              <View  style={{  width: 120}}>
                <Text> Reply</Text>
              </View>
            </ScrollView> 
            {this.props.item.reply ?
            <View style={styles.child}>
              {/* <ListItem style={{ backgroundColor: "#FEFEFE", width: '100%'}}>
                <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
                <ListItem.Content>
                  <ListItem.Title> Chris Jackson </ListItem.Title>
                  <ListItem.Subtitle>{this.props.item.reply.comm_test}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}
                style={{  marginTop: -10 , marginLeft : 80 }}
                >
                <View style={{ width: 80}}>
                  <Text style={{ color : '#a21919'}}> Like </Text>
                </View>
                <View style={{ width: 120}}>
                  <Text> Reply</Text>
                </View>
              </ScrollView>  */}
            </View>
            : ''}
        </View> 
        : <View>Data not found</View> }
        </View>
    )
    }
  
} 
const styles = StyleSheet.create({
  parents:{
    backgroundColor: '#fff' , 
    borderRadius: 10,
    padding: 1,
    marginBottom :2,
    marginLeft : 5 ,
    marginRight :5 
  },
  child:{
    backgroundColor: '#fff' , 
    borderRadius: 10,
    padding: 1,
    marginBottom :2,
    marginLeft : 50 ,
    marginRight :20 

  },
  textAreaContainer: {
    borderColor:  '#efefef',
    borderWidth: 1,  
  },
  textArea: {
    height: 50,     
  },
  submit:{
    position: 'absolute',
    bottom: 10,                                                    
    right: 10,  
    left:50,
    top:50,
  }
})
export default Comment;
