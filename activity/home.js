

import React, { Component, useEffect, useState} from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../styles";
import AsyncStorage from '@react-native-community/async-storage';
function Home ({navigation}){
  // useEffect(()=>{
  //   let sdfsdf = AsyncStorage.getItem('user_id');
  //     console.log('home_page ',sdfsdf.status);      
  // })
  
  return (
      <ScrollView >
        <Header
        style={{ backgroundColor : 'red'}}
              leftComponent={{ icon: 'menu', color: '#fff' }}
              centerComponent={{ text: 'Inspire me', style: { color: '#fff' , fontSize : 20 } }}
              rightComponent={{ icon: 'notifications', color: '#fff' }}
            />
        <View style={{ paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 0}}>
          <Text style={Styles.box_title} >
            Events
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginHorizontal: -10,
              paddingEnd : 20 , 
              marginRight : 5,
              marginTop: 1 }}
          >
            <ListItem > 
              <ListItem.Content 
                style={{ 
                  backgroundColor: "#341BA9",
                  borderTopLeftRadius: 20, 
                  borderBottomLeftRadius: 20, 
                  height : 100,
                  width : 70 ,
                  paddingStart : 10,
                  color : '#ffffff' , 
                  alignItems : 'center' , 
                  paddingHorizontal : 10
                  }}>
                <View  
                style={{ borderRadius : 8 ,
                 backgroundColor : '#FFFFFF',
                 height : 80 , 
                 width : 55,
                 paddingTop : 15,
                 paddingLeft :6
                 }} >
                   <Text style ={{ fontSize : 14 , 
                    position : 'absolute' ,
                    fontWeight : 'bold',
                    alignItems : 'flex-end',
                    textAlign : 'right',
                    marginTop : 15 , 
                    paddingEnd : 0,
                    color : '#341BA9' ,
                    width : '100%'
                  }}> th </Text>  
                  <ListItem.Title
                    style={{ fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{ color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{ marginHorizontal : -17,  
                backgroundColor: "#3D21B2",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{ color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>


            <ListItem > 
              <ListItem.Content 
                style={{ 
                  backgroundColor: "#6F1A98",
                  borderTopLeftRadius: 20, 
                  borderBottomLeftRadius: 20, 
                  height : 100,
                  width : 70 ,
                  paddingStart : 10,
                  color : '#ffffff' , 
                  alignItems : 'center' , 
                  paddingHorizontal : 10
                  }}>
                <View  
                style={{ borderRadius : 8 ,
                 backgroundColor : '#FFFFFF',
                 height : 80 , 
                 width : 55,
                 paddingTop : 15,
                 paddingLeft :6
                 }} >
                   <Text style ={{ fontSize : 14 , 
                    position : 'absolute' ,
                    fontWeight : 'bold',
                    alignItems : 'flex-end',
                    textAlign : 'right',
                    marginTop : 15 , 
                    paddingEnd : 0,
                    color : '#341BA9' ,
                    width : '100%'
                  }}> th </Text>  
                  <ListItem.Title
                    style={{ fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{ color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{ marginHorizontal : -17,  
                backgroundColor: "#6F1A98",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{ color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>

            <ListItem > 
              <ListItem.Content 
                style={{ 
                  backgroundColor: "#341BA9",
                  borderTopLeftRadius: 20, 
                  borderBottomLeftRadius: 20, 
                  height : 100,
                  width : 70 ,
                  paddingStart : 10,
                  color : '#ffffff' , 
                  alignItems : 'center' , 
                  paddingHorizontal : 10
                  }}>
                <View  
                style={{ borderRadius : 8 ,
                 backgroundColor : '#FFFFFF',
                 height : 80 , 
                 width : 55,
                 paddingTop : 15,
                 paddingLeft :6
                 }} >
                   <Text style ={{ fontSize : 14 , 
                    position : 'absolute' ,
                    fontWeight : 'bold',
                    alignItems : 'flex-end',
                    textAlign : 'right',
                    marginTop : 15 , 
                    paddingEnd : 0,
                    color : '#341BA9' ,
                    width : '100%'
                  }}> th </Text>  
                  <ListItem.Title
                    style={{ fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{ color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{ marginHorizontal : -17,  
                backgroundColor: "#3D21B2",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{ color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>
            <ListItem > 
              <ListItem.Content 
                style={{ 
                  backgroundColor: "#341BA9",
                  borderTopLeftRadius: 20, 
                  borderBottomLeftRadius: 20, 
                  height : 100,
                  width : 70 ,
                  paddingStart : 10,
                  color : '#ffffff' , 
                  alignItems : 'center' , 
                  paddingHorizontal : 10
                  }}>
                <View  
                style={{ borderRadius : 8 ,
                 backgroundColor : '#FFFFFF',
                 height : 80 , 
                 width : 55,
                 paddingTop : 15,
                 paddingLeft :6
                 }} >
                   <Text style ={{ fontSize : 14 , 
                    position : 'absolute' ,
                    fontWeight : 'bold',
                    alignItems : 'flex-end',
                    textAlign : 'right',
                    marginTop : 15 , 
                    paddingEnd : 0,
                    color : '#341BA9' ,
                    width : '100%'
                  }}> th </Text>  
                  <ListItem.Title
                    style={{ fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{ color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{ marginHorizontal : -17,  
                backgroundColor: "#3D21B2",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{ color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>


            <ListItem > 
              <ListItem.Content 
                style={{ 
                  backgroundColor: "#6F1A98",
                  borderTopLeftRadius: 20, 
                  borderBottomLeftRadius: 20, 
                  height : 100,
                  width : 70 ,
                  paddingStart : 10,
                  color : '#ffffff' , 
                  alignItems : 'center' , 
                  paddingHorizontal : 10
                  }}>
                <View  
                style={{ borderRadius : 8 ,
                 backgroundColor : '#FFFFFF',
                 height : 80 , 
                 width : 55,
                 paddingTop : 15,
                 paddingLeft :6
                 }} >
                   <Text style ={{ fontSize : 14 , 
                    position : 'absolute' ,
                    fontWeight : 'bold',
                    alignItems : 'flex-end',
                    textAlign : 'right',
                    marginTop : 15 , 
                    paddingEnd : 0,
                    color : '#341BA9' ,
                    width : '100%'
                  }}> th </Text>  
                  <ListItem.Title
                    style={{ fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{ color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{ marginHorizontal : -17,  
                backgroundColor: "#6F1A98",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{ color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>

            <ListItem > 
              <ListItem.Content 
                style={{ 
                  backgroundColor: "#341BA9",
                  borderTopLeftRadius: 20, 
                  borderBottomLeftRadius: 20, 
                  height : 100,
                  width : 70 ,
                  paddingStart : 10,
                  color : '#ffffff' , 
                  alignItems : 'center' , 
                  paddingHorizontal : 10
                  }}>
                <View  
                style={{ borderRadius : 8 ,
                 backgroundColor : '#FFFFFF',
                 height : 80 , 
                 width : 55,
                 paddingTop : 15,
                 paddingLeft :6
                 }} >
                   <Text style ={{ fontSize : 14 , 
                    position : 'absolute' ,
                    fontWeight : 'bold',
                    alignItems : 'flex-end',
                    textAlign : 'right',
                    marginTop : 15 , 
                    paddingEnd : 0,
                    color : '#341BA9' ,
                    width : '100%'
                  }}> th </Text>  
                  <ListItem.Title
                    style={{ fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{ color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{ marginHorizontal : -17,  
                backgroundColor: "#3D21B2",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{ color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>

         
          </ScrollView>
        </View>
        <View style={{ paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 15 , marginTop : 10}}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false} 
          >
            <ListItem style={{ marginBottom: -10}} > 
                    <ListItem.Content  >
                      <Text  style={Styles.box_title} >
                        Category
                      </Text>
                    </ListItem.Content>
            </ListItem>
        </ScrollView>
            
         
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginRight: -30}}
          >
            <ListItem style={{ padding : 0 , margin : 0}} > 
              <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity
              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#ff5c83", 
              }}
            > 
              <Icon  
                color='#FFFFFF' 
                name='book' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : '100%'}} >All</Text>
              </ListItem.Content>
            </ListItem>

            <ListItem > 
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity
              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#EEEEEE", 
              }}
            > 
              <Icon  
                color='#000000' 
                name='list' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : '100%'}} >Poetry</Text>
              </ListItem.Content>
            </ListItem>

            <ListItem > 
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity
              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#EEEEEE", 
              }}
            > 
              <Icon  
                color='#000000' 
                name='duo' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width :66}} > videos</Text>
              </ListItem.Content>
            </ListItem> 

            <ListItem > 
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity
              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#EEEEEE", 
              }}
            > 
              <Icon  
                color='#000000' 
                name='dvr' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : 66}} >Quotes</Text>
              </ListItem.Content>
            </ListItem>
            <ListItem > 
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity
              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#EEEEEE", 
              }}
            > 
              <Icon  
                color='#000000' 
                name='leaderboard' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : '100%'}} >Support</Text>
              </ListItem.Content>
            </ListItem>
            <ListItem > 
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity
              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#EEEEEE", 
              }}
            > 
              <Icon  
                color='#000000' 
                name='list' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : '100%'}} >Poetry</Text>
              </ListItem.Content>
            </ListItem>

            <ListItem > 
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity
              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#EEEEEE", 
              }}
            > 
              <Icon  
                color='#000000' 
                name='duo' />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width :66}} > videos</Text>
              </ListItem.Content>
            </ListItem> 

            <ListItem > 
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity
              
              style={{ 
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#EEEEEE", 
              }}
            > 
              <Icon  
                color='#000000' 
                name='dvr' />  
            </TouchableOpacity> 
          </ListItem.Content>
          </ListItem> 
          </ScrollView>
        </View>
        <View style={{ marginHorizontal :10 ,
          borderRadius: 10,
          paddingHorizontal: 8 ,
          paddingBottom : 15 ,
          marginTop : 10}} >

          <View
          
            style={{
              backgroundColor: '#fff' ,
              height: 300,
              width: '100%',
              borderRadius: 15,
              padding: 10,
              marginBottom :10
            }}
          >
            <ListItem style={{
              backgroundColor: "#FEFEFE",
              width: '100%',
            }}>
              <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
              <ListItem.Content >
                <ListItem.Title> Chris   </ListItem.Title>
                <ListItem.Subtitle> 54 mins ago</ListItem.Subtitle>
              </ListItem.Content>

              <ListItem.Content >
                <Text  style={Styles.following}>+ Following</Text>
              </ListItem.Content>
            </ListItem>
            <Text 
            onPress={() => navigation.navigate('PostDetails') } 
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                paddingBottom :5 ,
                color: "#0D0E10",
              }}
            >
              Lorem impsum dolor sit amet, consectetuer adipscing elit,  consectetuer adipscing elit,
            </Text>
            <Image
            onPress={() => navigation.navigate('PostDetails') } 
              source={require("../img/images/1.jpg")}
              style={{ width: '100%', borderRadius: 10, height: 130 }}
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
                <Text style={{ color : '#a21919'}}> Like  4.5k </Text>
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
                <Text style={{ color : '#1c81b0'}} > Share 4.5k </Text>
              </View>
            </ScrollView>
          </View>

          {/*end*/}

          <View
            style={{
              backgroundColor: '#fff' ,
              height: 300,
              width: '100%',
              borderRadius: 15,
              padding: 10,
              marginBottom :10
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
            <Text
            onPress={() => navigation.navigate('PostDetails') } 
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                paddingBottom :5 ,
                color: "#0D0E10",
              }}
            >
              Lorem impsum dolor sit amet, consectetuer adipscing elit,  consectetuer adipscing elit,
            </Text>
            <Image
              source={require("../img/images/2.jpg")}
              style={{ width: '100%', borderRadius: 10, height: 130 }}
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
                <Text style={{ color : '#a21919'}}> Like  4.5k </Text>
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
                <Text style={{ color : '#1c81b0'}} > Share 4.5k </Text>
              </View>
            </ScrollView>
          </View>

          {/*end*/}

          <View
            style={{
              backgroundColor: '#fff' ,
              height: 300,
              width: '100%',
              borderRadius: 15,
              padding: 10,
              marginBottom :10
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
            <Text
            onPress={() => navigation.navigate('PostDetails') } 
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                paddingBottom :5 ,
                color: "#0D0E10",
              }}
            >
              Lorem impsum dolor sit amet, consectetuer adipscing elit,  consectetuer adipscing elit,
            </Text>
            <Image
              source={require("../img/images/3.jpg")}
              style={{ width: '100%', borderRadius: 10, height: 130 }}
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
                <Text style={{ color : '#a21919'}}> Like  4.5k </Text>
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
                <Text style={{ color : '#1c81b0'}} > Share 4.5k </Text>
              </View>
            </ScrollView>
          </View>

          {/*end*/}


          <View
            style={{
              backgroundColor: '#fff' ,
              height: 300,
              width: '100%',
              borderRadius: 15,
              padding: 10,
              marginBottom :10
            }}
          >
            <ListItem style={{
              backgroundColor: "#FEFEFE",
              width: '100%',
            }}>
              <Avatar rounded   size="medium" source={require('../img/images/user_2.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <Text
            onPress={() => navigation.navigate('PostDetails') } 
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                paddingBottom :5 ,
                color: "#0D0E10",
              }}
            >
              Lorem impsum dolor sit amet, consectetuer adipscing elit,  consectetuer adipscing elit,
            </Text>
            <Image
              source={require("../img/images/2.jpg")}
              style={{ width: '100%', borderRadius: 10, height: 130 }}
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
                <Text style={{ color : '#a21919'}}> Like  4.5k </Text>
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
                <Text style={{ color : '#1c81b0'}} > Share 4.5k </Text>
              </View>
            </ScrollView>
          </View>

          {/*end*/}

          <View
            style={{
              backgroundColor: '#fff' ,
              height: 300,
              width: '100%',
              borderRadius: 15,
              padding: 10,
              marginBottom :10
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
            <Text
            onPress={() => navigation.navigate('PostDetails') } 
              style={{
                fontFamily: "RobotoRegular",
                fontSize: 12,
                paddingBottom :5 ,
                color: "#0D0E10",
              }}
            >
              Lorem impsum dolor sit amet, consectetuer adipscing elit,  consectetuer adipscing elit,
            </Text>
            <Image
              source={require("../img/images/3.jpg")}
              style={{ width: '100%', borderRadius: 10, height: 130 }}
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
                <Text style={{ color : '#a21919'}}> Like  4.5k </Text>
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
                <Text style={{ color : '#1c81b0'}} > Share 4.5k </Text>
              </View>
            </ScrollView>
          </View>

          {/*end*/}
        </View>
      </ScrollView>
  );
}
export default Home;

