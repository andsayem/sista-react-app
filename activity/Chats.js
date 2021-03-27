import React, { Component } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header  , Icon } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet';  
import Styles from "../styles";
function Chats({navigation}) {
    return (
      <ScrollView >
        <Header 
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Inspire me', style: { color: '#fff' , fontSize : 20 } }}
              rightComponent={{ icon: 'notifications', color: '#fff' }}
            />
         <ScrollView  horizontal  showsHorizontalScrollIndicator={false} style={{  backgroundColor: '#fff',  marginLeft : 0 }}  >
          <View  tyle={{  backgroundColor: '#fff' ,padding: 5,  marginBottom :2, marginLeft : 5 ,   }} > 
              <Avatar  onPress={() => navigation.navigate('Chating') }   rounded   size="medium" source={require('../img/images/user_1.jpg')} />
              <Text>Azamat </Text> 
          </View> 
          <View  style={{  backgroundColor: '#fff' ,padding: 5,  marginBottom :2, marginLeft : 5 ,   }} > 
              <Avatar rounded onPress={() => navigation.navigate('Chating') }    size="medium" source={require('../img/images/user_2.jpg')} />
              <Text>David</Text> 
          </View> 
          <View  style={{  backgroundColor: '#fff' ,padding: 5,  marginBottom :2, marginLeft : 5 ,   }} > 
              <Avatar rounded  onPress={() => navigation.navigate('Chating') }  size="medium" source={require('../img/images/user_3.jpg')} />
              <Text>Thomas</Text> 
          </View> 
          <View  style={{  backgroundColor: '#fff' ,padding: 5,  marginBottom :2, marginLeft : 5 ,   }} > 
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
              <Text>Azamat</Text> 
          </View> 
          <View  style={{  backgroundColor: '#fff' ,padding: 5,  marginBottom :2, marginLeft : 5 ,   }} > 
              <Avatar rounded onPress={() => navigation.navigate('Chating') }   size="medium" source={require('../img/images/user_1.jpg')} />
              <Text>Azamat</Text> 
          </View> 
          <View  style={{  backgroundColor: '#fff' ,padding: 5,  marginBottom :2, marginLeft : 5 ,   }} > 
              <Avatar rounded   onPress={() => navigation.navigate('Chating') }  size="medium" source={require('../img/images/user_2.jpg')} />
              <Text>David</Text> 
          </View> 
          <View  style={{  backgroundColor: '#fff' ,padding: 5,  marginBottom :2, marginLeft : 5 ,   }} > 
              <Avatar rounded onPress={() => navigation.navigate('Chating') }    size="medium" source={require('../img/images/user_3.jpg')} />
              <Text>Thomas</Text> 
          </View> 
          <View  style={{  backgroundColor: '#fff' ,padding: 5,  marginBottom :2, marginLeft : 5 ,   }} > 
              <Avatar rounded onPress={() => navigation.navigate('Chating') }    size="medium" source={require('../img/images/user_1.jpg')} />
              <Text>Azamat</Text> 
          </View> 
         
      </ScrollView>
      <View  style={{  backgroundColor: '#fff' ,  paddingTop : 0 , marginTop : 10  }}  >
     
      <View >
        <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded   size="medium"  onPress={() => navigation.navigate('Chating') }  source={require('../img/images/massage.png')} />
                <ListItem.Content>
                  <ListItem.Title> New Message Requests </ListItem.Title>
                  <ListItem.Subtitle>From Mayank Jain</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>
        <View >
              <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded  onPress={() => navigation.navigate('Chating') }   size="medium" source={require('../img/images/user_1.jpg')} />
                <ListItem.Content>
                  <ListItem.Title> Darshan Barapatre </ListItem.Title>
                  <ListItem.Subtitle>I just want to know dear...</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>
        <View >
          <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded   onPress={() => navigation.navigate('Chating') }   size="medium" source={require('../img/images/user_2.jpg')} />
                <ListItem.Content>
                  <ListItem.Title> Amol Wadmalwar </ListItem.Title>
                  <ListItem.Subtitle>From Mayank Jain</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>
        <View >
          <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded   onPress={() => navigation.navigate('Chating') }   size="medium" source={require('../img/images/user_3.jpg')} />
                <ListItem.Content>
                  <ListItem.Title>Roshni</ListItem.Title>
                  <ListItem.Subtitle>hi dear, have u got the prom...</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>

        <View >
              <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded  onPress={() => navigation.navigate('Chating') }   size="medium" source={require('../img/images/user_1.jpg')} />
                <ListItem.Content>
                  <ListItem.Title> Darshan Barapatre </ListItem.Title>
                  <ListItem.Subtitle>I just want to know dear...</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>
        <View >
          <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded   onPress={() => navigation.navigate('Chating') }  size="medium" source={require('../img/images/user_2.jpg')} />
                <ListItem.Content>
                  <ListItem.Title> Amol Wadmalwar </ListItem.Title>
                  <ListItem.Subtitle>From Mayank Jain</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>
        <View >
          <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded   onPress={() => navigation.navigate('Chating') }  size="medium" source={require('../img/images/user_3.jpg')} />
                <ListItem.Content>
                  <ListItem.Title>Roshni</ListItem.Title>
                  <ListItem.Subtitle>hi dear, have u got the prom...</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>


        <View >
              <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded  onPress={() => navigation.navigate('Chating') }   size="medium" source={require('../img/images/user_1.jpg')} />
                <ListItem.Content>
                  <ListItem.Title> Darshan Barapatre </ListItem.Title>
                  <ListItem.Subtitle>I just want to know dear...</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>
        <View >
          <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded  onPress={() => navigation.navigate('Chating') }   size="medium" source={require('../img/images/user_2.jpg')} />
                <ListItem.Content>
                  <ListItem.Title> Amol Wadmalwar </ListItem.Title>
                  <ListItem.Subtitle>From Mayank Jain</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View>
        <View >
          <ListItem style={{
                backgroundColor: "#FEFEFE",
                width: '100%',
              }}>
                <Avatar rounded  onPress={() => navigation.navigate('Chating') }   size="medium" source={require('../img/images/user_3.jpg')} />
                <ListItem.Content>
                  <ListItem.Title>Roshni</ListItem.Title>
                  <ListItem.Subtitle>hi dear, have u got the prom...</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
        </View> 
      </View>
    </ScrollView>
      
    );
}

export default Chats;
