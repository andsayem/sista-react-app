

import React, { Component, useEffect, useState} from "react";
import { View, FlatList ,Text, Image, Alert , Button ,TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../../theme/styles"; 
import AsyncStorage from '@react-native-community/async-storage';   
import api from '../api';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'; 

const likeSubmitButton = (postid) => {    
  let post_id  = postid ; 
  api.getData('postlike/'+ post_id)
  .then((res)=>{ 
  })
  .catch((error) => { 
  }) 
}; 

 
ChildView=({ ItemData ,Shortcaption})=>{
  return(
    <View  style={{fontFamily : 'IBMPlexSans-Regular',   backgroundColor: '#fff' , height: 310,  width: '100%', borderRadius: 15,   padding: 10,  marginBottom :10  }} >
    <ListItem style={{fontFamily : 'IBMPlexSans-Regular',  backgroundColor: "#FEFEFE", width: '100%',    }}>
      <Avatar rounded   size="medium" source={require('../../assets/img/images/user_3.jpg')} />
      <ListItem.Content >
        <ListItem.Title>  {ItemData.userjoin.name} </ListItem.Title>
        <ListItem.Subtitle> 54 mins ago</ListItem.Subtitle>
      </ListItem.Content> 
      <ListItem.Content >
        <Text  style={Styles.following}>+ Following</Text>
      </ListItem.Content>
    </ListItem>
    <Text  style={{fontFamily : 'IBMPlexSans-Regular',  fontFamily: "RobotoRegular", fontSize: 12,  paddingBottom :5 ,  color: "#0D0E10",  }} >
     {Shortcaption} 
    </Text> 
    <Image onPress={() => navigation.navigate('PostDetails') } source={ItemData ? {uri: ItemData.file } : null}  style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, height: 130 }}   />
    <ScrollView  horizontal   showsHorizontalScrollIndicator={false} style={{fontFamily : 'IBMPlexSans-Regular', marginRight: -40, marginTop: 10 }}  > 
      
      <TouchableOpacity
       
          activeOpacity={0.5} >
          <View style={{fontFamily : 'IBMPlexSans-Regular',   height: 66,  width: 80, }}  >
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color : '#a21919'}} > Like {ItemData.like}  {ItemData.id}  </Text>
          </View>
      </TouchableOpacity>  
      <View  style={{fontFamily : 'IBMPlexSans-Regular',   height: 66, width: 120,    }} >
        <Text> Comment {ItemData.comment} </Text>
      </View>
      <View style={{fontFamily : 'IBMPlexSans-Regular',  height: 66,  width: 100,  }}  >
        <Text style={{fontFamily : 'IBMPlexSans-Regular', color : '#1c81b0'}} > Share {ItemData.share} </Text>
      </View>
    </ScrollView>
  </View> 
  ) 
}
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
 
function Home ({navigation}){ 
  const [PostItems, setItems] = useState([]);  
      api.getData('post_datas')
      .then((res)=>{
          setItems( res.data.data);  
      })
      .catch((error) => { 
      })  
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
    }) 
  }; 
  
  useEffect(() => setSuccesstext(false), [successtext]); 
  useEffect(() => setErrortext(false), [errortext]);
  useEffect(() => getCategories(false)); 

  const likeSubmitButton = (postid) => {    
    Alert.alert(postid); 
  }; 

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel"
        },
        { text: "OK", onPress: () => {}}
      ]
    );

  return (
      <ScrollView>
        <Header
            style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor : 'red'}}
              leftComponent={<Icon color={colors.white} size={30} name='menu' onPress={() => navigation.toggleDrawer()} />}
              centerComponent={{ text: 'Inspire me', style: { color: '#fff' , fontSize : 20 } }}
              rightComponent={{ icon: 'notifications', color: '#fff' }}
                /> 
        <View style={{fontFamily : 'IBMPlexSans-Regular', paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 0}}>
        <Toast visible={errortext} message={errortext.message} />
        <Toast visible={successtext} message={successtext.message} />
        <Button title={"2-Button Alert"} onPress={likeSubmitButton('2')} />
          <Text style={Styles.box_title} onPress={likeSubmitButton.bind('2')}>
            Events Alert
          </Text> 
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{fontFamily : 'IBMPlexSans-Regular',
              marginHorizontal: -10,
              paddingEnd : 20 , 
              marginRight : 5,
              marginTop: 1 }}
              >
            <ListItem > 
              <ListItem.Content 
                style={{fontFamily : 'IBMPlexSans-Regular', 
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
                style={{fontFamily : 'IBMPlexSans-Regular', borderRadius : 8 ,
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
                    style={{fontFamily : 'IBMPlexSans-Regular', fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{fontFamily : 'IBMPlexSans-Regular', color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{fontFamily : 'IBMPlexSans-Regular', marginHorizontal : -17,  
                backgroundColor: "#3D21B2",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{fontFamily : 'IBMPlexSans-Regular', color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>
            <ListItem > 
              <ListItem.Content 
                style={{fontFamily : 'IBMPlexSans-Regular', 
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
                style={{fontFamily : 'IBMPlexSans-Regular', borderRadius : 8 ,
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
                    style={{fontFamily : 'IBMPlexSans-Regular', fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{fontFamily : 'IBMPlexSans-Regular', color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{fontFamily : 'IBMPlexSans-Regular', marginHorizontal : -17,  
                backgroundColor: "#6F1A98",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{fontFamily : 'IBMPlexSans-Regular', color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>
            <ListItem > 
              <ListItem.Content 
                style={{fontFamily : 'IBMPlexSans-Regular', 
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
                style={{fontFamily : 'IBMPlexSans-Regular', borderRadius : 8 ,
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
                    style={{fontFamily : 'IBMPlexSans-Regular', fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{fontFamily : 'IBMPlexSans-Regular', color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{fontFamily : 'IBMPlexSans-Regular', marginHorizontal : -17,  
                backgroundColor: "#3D21B2",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{fontFamily : 'IBMPlexSans-Regular', color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>
            <ListItem > 
              <ListItem.Content 
                style={{fontFamily : 'IBMPlexSans-Regular', 
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
                style={{fontFamily : 'IBMPlexSans-Regular', borderRadius : 8 ,
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
                    style={{fontFamily : 'IBMPlexSans-Regular', fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{fontFamily : 'IBMPlexSans-Regular', color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{fontFamily : 'IBMPlexSans-Regular', marginHorizontal : -17,  
                backgroundColor: "#3D21B2",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{fontFamily : 'IBMPlexSans-Regular', color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>
            <ListItem > 
              <ListItem.Content 
                style={{fontFamily : 'IBMPlexSans-Regular', 
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
                style={{fontFamily : 'IBMPlexSans-Regular', borderRadius : 8 ,
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
                    style={{fontFamily : 'IBMPlexSans-Regular', fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{fontFamily : 'IBMPlexSans-Regular', color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{fontFamily : 'IBMPlexSans-Regular', marginHorizontal : -17,  
                backgroundColor: "#6F1A98",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{fontFamily : 'IBMPlexSans-Regular', color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>
            <ListItem > 
              <ListItem.Content 
                style={{fontFamily : 'IBMPlexSans-Regular', 
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
                style={{fontFamily : 'IBMPlexSans-Regular', borderRadius : 8 ,
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
                    style={{fontFamily : 'IBMPlexSans-Regular', fontWeight : 'bold' , 
                    color : '#341BA9' ,
                  fontSize : 20 }}
                  > 24
                  </ListItem.Title> 
                  <ListItem.Subtitle
                  style={{fontFamily : 'IBMPlexSans-Regular', color : '#341BA9' , paddingLeft : 5}}
                  >July</ListItem.Subtitle>
                </View> 
              </ListItem.Content> 
              <ListItem.Content 
              style={{fontFamily : 'IBMPlexSans-Regular', marginHorizontal : -17,  
                backgroundColor: "#3D21B2",
                borderTopRightRadius: 22, 
                borderBottomRightRadius: 22, 
                height : 100,
                width : 150 ,
                paddingStart : 10,
                color : '#ffffff'
                }} >
                <Text 
                style={{fontFamily : 'IBMPlexSans-Regular', color : '#ffffff' , 
                fontWeight : 'bold' , 
                paddingTop: 0,
                paddingBottom: 3,
                fontSize : 16}} >Poetry With Sista</Text>
                <Text style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} > 4:00 Pm</Text>
                <Text  style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} >Los Angeles,
                Calefornia</Text>

              </ListItem.Content>
            </ListItem>         
          </ScrollView>
        </View>
        <View style={{fontFamily : 'IBMPlexSans-Regular', paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 15 , marginTop : 10}}>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false} 
            >
            <ListItem style={{fontFamily : 'IBMPlexSans-Regular', marginBottom: -10}} > 
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
          style={{fontFamily : 'IBMPlexSans-Regular', marginRight: -30}}
          >
            <ListItem style={{fontFamily : 'IBMPlexSans-Regular', padding : 0 , margin : 0}} > 
              <ListItem.Content style={{fontFamily : 'IBMPlexSans-Regular', padding : 0 , margin : 0 , marginRight : -10  , marginLeft  : -10}} > 
              <TouchableOpacity              
              style={{fontFamily : 'IBMPlexSans-Regular', 
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
            <Text style={{fontFamily : 'IBMPlexSans-Regular', textAlign : 'center' , width : '100%'}} >All</Text>
              </ListItem.Content>
            </ListItem>

            <ListItem >  
            { getCats.map((item, i) => (
            <ListItem.Content style={{fontFamily : 'IBMPlexSans-Regular', padding : 0 , margin : 0 , marginRight : 4  , marginLeft  : 3}} > 
              <TouchableOpacity              
                style={{fontFamily : 'IBMPlexSans-Regular', 
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
            <Text style={{fontFamily : 'IBMPlexSans-Regular', textAlign : 'center' , width : '100%'}} >{item.cat_name}</Text>
              </ListItem.Content>
            ))
            }
            </ListItem>
          </ScrollView>
        </View>
        <View style={{fontFamily : 'IBMPlexSans-Regular', marginHorizontal :10 , borderRadius: 10,   paddingHorizontal: 8 , paddingBottom : 15 ,   marginTop : 10}} > 
          {/* Item start  */}
              <FlatList data={PostItems} renderItem={({item})=><ChildView Shortcaption={item.short_caption} ItemData={item} />} />
          {/*Item end*/} 
        </View>
      </ScrollView>
  );
}
export default Home;

