

import React, { Component, useEffect, useState} from "react";
import { View, FlatList ,Text, Image, Alert , Button ,TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../styles"; 
import AsyncStorage from '@react-native-community/async-storage';   
import api from '../api';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'; 


const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};

const likeSubmitButton = (postid) => {    
  console.log('tes===========================' ,postid);   
  api.getData('postlike/'+ postid)
  .then((res)=>{
    alert(res.data.message);
      console.log(res.data);  
  })
  .catch((error) => {
      console.log(error)
  }) 
}; 
const Item = ({ ItemData, Shortcaption }) => (
  <View  style={{   backgroundColor: '#fff' , height: 310,  width: '100%', borderRadius: 15,   padding: 10,  marginBottom :10  }} >
    <ListItem style={{  backgroundColor: "#FEFEFE", width: '100%',    }}>
      <Avatar rounded   size="medium" source={require('../img/images/user_3.jpg')} />
      <ListItem.Content >
        <ListItem.Title>  {ItemData.userjoin.name} </ListItem.Title>
        <ListItem.Subtitle> 54 mins ago</ListItem.Subtitle>
      </ListItem.Content> 
      <ListItem.Content >
        <Text  style={Styles.following}>+ Following</Text>
      </ListItem.Content>
    </ListItem>
    <Text  style={{  fontFamily: "RobotoRegular", fontSize: 12,  paddingBottom :5 ,  color: "#0D0E10",  }} >
     {Shortcaption} 
    </Text> 
    <Image onPress={() => navigation.navigate('PostDetails') } source={ItemData ? {uri: ItemData.file } : null}  style={{ width: '100%', borderRadius: 10, height: 130 }}   />
   
    <View  horizontal   showsHorizontalScrollIndicator={false} style={{ marginRight: -40, marginTop: 10 }}  > 
      
      <TouchableOpacity
       
          activeOpacity={0.5} >
          <View style={{   height: 66,  width: 80, }}  >
            <Text style={{ color : '#a21919'}}  onPress={() => likeSubmitButton(ItemData.id)} >Like {ItemData.like}  {ItemData.id}  </Text>
          </View>
      </TouchableOpacity>  
      <View  style={{   height: 66, width: 120,    }} >
        <Text> <Icon  style={{paddingTop : 10}}  type='font-awesome' name="comment-o" size={12}  /> {ItemData.comment} </Text>
      </View>
      <View style={{  height: 66,  width: 100,  }}  >
        <Text style={{ color : '#1c81b0'}} > <Icon  style={{paddingTop : 10}}  type='font-awesome' name="upload" size={12}  /> {ItemData.share} </Text>
      </View>
    </View>
  </View> 
);
 
function Home ({navigation}){ 
  const [PostItems, setItems] = useState([]);  
  const [users, setUser] = useState('');
  const [successtext, setSuccesstext] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [getCats, setCats] = useState([]);
   
  const getCategories = async => {
    api.getData('post_categories')
    .then((res)=>{
      setCats( res.data.data);  
    })
    .catch((error) => {
        console.log(error)
    }) 
  };  

  const getPosts = () =>{
    api.getData('post_datas')
      .then((res)=>{
          setItems( res.data.data);  
          console.log('posts=====',res.data.data)
      })
      .catch((error) => {
          console.log(error)
      }) 
  }
 
  useEffect(() => setSuccesstext(false), [successtext]); 
  useEffect(() => setErrortext(false), [errortext]);
  useEffect(() => getCategories(false),[getCats]); 
  useEffect(() => getPosts(false),[PostItems]); 
 

  const renderItem = ({ item }) => { 
    return (
      <Item
        ItemData={item}  
        keyExtractor={(item) => item.id} 
      />
    );
  };

  return (
      <ScrollView>
        <Header
            style={{ backgroundColor : 'red'}}
              leftComponent={<Icon color={colors.white} size={30} name='menu' onPress={() => navigation.toggleDrawer()} />}
              centerComponent={{ text: 'Inspire me', style: { color: '#fff' , fontSize : 20 } }}
              rightComponent={{ icon: 'notifications', color: '#fff' }}
                /> 
        <View style={{ paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 0}}>
        <Toast visible={errortext} message={errortext.message} />
        <Toast visible={successtext} message={successtext.message} /> 
          <Text style={Styles.box_title} >
            Events Alert
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
                }} > <Icon color="#fff" style={{padding : 2 }}  type='font-awesome' name="clock-o" size={12}  /> 4:00 Pm</Text>
                <Text  style={{
                  color : '#ffffff' , 
                }} > <Icon color="#fff" style={{padding : 2 }}  type='font-awesome' name="map-marker" size={12}  /> Los Angeles,
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
            { getCats.map((item, i) => (
            <ListItem.Content style={{ padding : 0 , margin : 0 , marginRight : 4  , marginLeft  : 3}} > 
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
                name={item.cat_image} />  
            </TouchableOpacity> 
            <Text style={{ textAlign : 'center' , width : '100%'}} >{item.cat_name}</Text>
              </ListItem.Content>
            ))
            }
            </ListItem>
          </ScrollView>
        </View>
        <View style={{ marginHorizontal :10 , borderRadius: 10,   paddingHorizontal: 8 , paddingBottom : 15 ,   marginTop : 10}} > 
        <FlatList
          data={PostItems}
          renderItem={renderItem}
          keyExtractor={(PostItems) => PostItems.id} 
        />
        </View>
      </ScrollView>
  );
}
export default Home;

