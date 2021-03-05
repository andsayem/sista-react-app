import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";
import  Styles   from "../styles";
import { Avatar, ListItem , Icon , Header} from "react-native-elements";
class Profile extends Component {
  render() {
    return ( <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
      <ScrollView style={Styles.scrollView}>
        <ListItem   bottomDivider>
          <Avatar source={require('../img/Screenshot_8.png')} />
          <ListItem.Content>
            <ListItem.Title> Chris Jackson </ListItem.Title>
          </ListItem.Content>
        </ListItem>

      </ScrollView>
      </View>
    );
  }
}

export default Profile;
