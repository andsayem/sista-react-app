import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { ListItem, Avatar , Image } from 'react-native-elements';
import  Styles   from "../styles";

class Notification extends Component {
  render() {
    return (
      <View>
        <ScrollView style={Styles.scrollView}>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_8.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_8.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_5.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_2.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <Avatar source={require('../img/Screenshot_1.png')} />
          <ListItem.Content>
            <ListItem.Title>Limited supply! Its like digital gold!</ListItem.Title>
            <View style={styles.subtitleView}>
              <Image source={require('../img/Screenshot_4.png')} style={styles.ratingImage}/>
              <Text style={styles.ratingText}>5 months ago</Text>
            </View>
          </ListItem.Content>
        </ListItem>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_8.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_8.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_5.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_2.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <Avatar source={require('../img/Screenshot_1.png')} />
          <ListItem.Content>
            <ListItem.Title>Limited supply! Its like digital gold!</ListItem.Title>
            <View style={styles.subtitleView}>
              <Image source={require('../img/Screenshot_4.png')} style={styles.ratingImage}/>
              <Text style={styles.ratingText}>5 months ago</Text>
            </View>
          </ListItem.Content>
        </ListItem>
        </ScrollView>
      </View>
    );
  }
}

styles = StyleSheet.create({
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingImage: {
    height: 19.21,
    width: 100
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  }
})
export default Notification;
