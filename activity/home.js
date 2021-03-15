

import React, { Component, useEffect, useState} from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar  } from 'react-native-elements'; 
import Styles from "../styles";
import AsyncStorage from '@react-native-community/async-storage';
function Home ({navigation}){
  // useEffect(()=>{
  //   let sdfsdf = AsyncStorage.getItem('user_id');
  //     console.log('home_page ',sdfsdf.status);      
  // })
  
  return (
      <ScrollView >
        <View style={{ paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 15}}>
          <Text style={Styles.box_title} >
            Events
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginHorizontal: -0,
              marginTop: 10 }}
          >
            <View
              style={{
                width: 190,
                borderRadius: 15,
                padding : 5,
              }}
            >
              <Image
                source={require("../img/images/1.jpg")}
                style={{ width: 180, borderRadius: 10, height: 90 }}
              />
            </View>
            <View
              style={{
                width: 190,
                borderRadius: 15,
                padding : 5,
              }}
            >
              <Image
                source={require("../img/images/2.jpg")}
                style={{ width: 180, borderRadius: 10, height: 90 }}
              />
            </View>
            <View
              style={{
                width: 190,
                borderRadius: 15,
                padding : 5,
              }}
            >
              <Image
                source={require("../img/images/3.jpg")}
                style={{ width: 180, borderRadius: 10, height: 90 }}
              />
            </View>
          </ScrollView>
        </View>
        <View style={{ paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 15 , marginTop : 10}}>
          <Text  style={Styles.box_title} >
            Category
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginRight: -40, marginTop: 30 }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Detail")}
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#5facdb",
              }}
            >
              <Image
                source={require("../img/images/p.png")}
                style={{ height: 24, width: 24 }}
              />
            </TouchableOpacity>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#ff5c83",
                marginHorizontal: 22,
              }}
            >
              <Image
                source={require("../img/images/p.png")}
                style={{ height: 24, width: 24 }}
              />
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#ffa06c",
              }}
            >
              <Image
                source={require("../img/images/p.png")}
                style={{ height: 24, width: 24 }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#bb32fe",
                marginLeft: 22,
              }}
            >
              <Image
                source={require("../img/images/p.png")}
                style={{ height: 24, width: 24 }}
              />
            </View>

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 66,
                width: 66,
                borderRadius: 50,
                backgroundColor: "#ffa06c",
                marginLeft: 22,
              }}
            >
              <Image
                source={require("../img/images/p.png")}
                style={{ height: 24, width: 24 }}
              />
            </View>
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
              <Avatar rounded   size="medium" source={require('../img/images/2.jpg')} />
              <ListItem.Content >
                <ListItem.Title> Chris   </ListItem.Title>
                <ListItem.Subtitle> 54 mins ago</ListItem.Subtitle>
              </ListItem.Content>

              <ListItem.Content >
                <Text style={Styles.following}>+ Following</Text>
              </ListItem.Content>
            </ListItem>
            <Text
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
              <Avatar rounded   size="medium" source={require('../img/images/2.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <Text
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
              <Avatar rounded   size="medium" source={require('../img/images/2.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <Text
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
              <Avatar rounded   size="medium" source={require('../img/images/2.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <Text
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
              <Avatar rounded   size="medium" source={require('../img/images/2.jpg')} />
              <ListItem.Content>
                <ListItem.Title> Chris Jackson </ListItem.Title>
                <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            <Text
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

