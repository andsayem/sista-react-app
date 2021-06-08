import React, { Component } from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet'; 
import { Icon } from 'react-native-elements'
import Styles from "../styles";
function PostDetails({navigation}) {
    return (
      <View  >
         <View
            style={{
              backgroundColor: '#fff' ,
              height: 200,
              width: '100%',
              borderRadius: 15,
              padding: 10,
              marginBottom :10
            }}
          >
           
            <Image
              source={require("../img/images/3.jpg")}
              style={{ width: '100%', borderRadius: 10, height: 200 }}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginRight: -40, marginTop: 10 }}
            >

              <View
                style={{
                  height: 66,
                  width: 80,
                }}
              >
                <Text style={{ color : '#a21919'}}>  

                 Like  4.5k </Text>
              </View>
              <View
                style={{
                  height: 66,
                  width: 120,
                }}
              >
                <Text> Comment  3.5k </Text>
              </View>
              <View
                style={{
                  height: 66,
                  width: 100,
                }}
              >
                <Text style={{ color : '#1c81b0'}} > Share 7.5k </Text>
              </View>
            </ScrollView>
          </View>
          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
             <ListItem style={{
              backgroundColor: "#FEFEFE",
              width: '100%',
            }}>
              <Avatar rounded   size="medium" source={require('../img/images/user_1.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{  marginTop: -10 , marginLeft : 80 }}
            >
            <View
                style={{
                  width: 80, 
                }}
              >
                <Text style={{ color : '#a21919'}}> Like </Text>
              </View>
              <View
                style={{ 
                  width: 120,
                }}
              >
                <Text> Reply</Text>
              </View>
            </ScrollView> 
          </View>

          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
                  <ListItem style={{
                    backgroundColor: "#FEFEFE",
                    width: '100%',
                  }}>
                    <Avatar rounded   size="medium" source={require('../img/images/user_2.jpg')} />
                    <ListItem.Content>
                      <ListItem.Title> Chris   </ListItem.Title>
                      <ListItem.Subtitle>  Chairman</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{  marginTop: -10 , marginLeft : 80 }}
                  >
                  <View
                      style={{
                        width: 80, 
                      }}
                    >
                      <Text style={{ color : '#a21919'}}> Like </Text>
                    </View>
                    <View
                      style={{ 
                        width: 120,
                      }}
                    >
                      <Text> Reply</Text>
                    </View>
                  </ScrollView> 
                  <View
                    style={{
                      backgroundColor: '#fff' , 
                      borderRadius: 10,
                      padding: 5,
                      marginBottom :2,
                      marginLeft : 50 ,
                      marginRight :20 
                    }}
                  >
                  <ListItem style={{
                    backgroundColor: "#FEFEFE",
                    width: '100%',
                  }}>
                    <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
                    <ListItem.Content>
                      <ListItem.Title> Chris Jackson </ListItem.Title>
                      <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{  marginTop: -10 , marginLeft : 80 }}
                  >
                  <View
                      style={{
                        width: 80, 
                      }}
                    >
                      <Text style={{ color : '#a21919'}}> Like </Text>
                    </View>
                    <View
                      style={{ 
                        width: 120,
                      }}
                    >
                      <Text> Reply</Text>
                    </View>
                  </ScrollView> 
                </View>
          </View>
     
          <View
              style={{
                backgroundColor: '#fff' , 
                borderRadius: 10,
                padding: 5,
                marginBottom :2,
                marginLeft : 20 ,
                marginRight :20 
              }}
            >
             <ListItem style={{
              backgroundColor: "#FEFEFE",
              width: '100%',
            }}>
              <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{  marginTop: -10 , marginLeft : 80 }}
            >
            <View
                style={{
                  width: 80, 
                }}
              >
                <Text style={{ color : '#a21919'}}> Like </Text>
              </View>
              <View
                style={{ 
                  width: 120,
                }}
              >
                <Text> Reply</Text>
              </View>
            </ScrollView> 
          </View>
         
      </View>
    );
}

export default PostDetails;
