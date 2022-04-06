import React, { useEffect, useState} from "react";
import { View, FlatList ,Text, Image, LogBox, refreshControl, SafeAreaView, Alert , Button ,TextInput, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements'; 
import Styles from "../../theme/styles"; 
import AsyncStorage from '@react-native-community/async-storage';   
import api from '../api';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';   
//LogBox.ignoreAllLogs();
 
const Home = ({navigation}) => { 
  const [PostItems, setItems] = useState([]);  
  const [users, setUser] = useState('');
  const [successtext, setSuccesstext] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [getCats, setCats] = useState([]);
  //
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedId, setSelectedId] = useState(null);
  //useEffect(() => getPosts(), []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setItems(true);
    getPosts();
    setOffset(offset + 1); 
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
      setItems(false);
      getPosts();
      setOffset(offset + 1); 
    });
  }
  //

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
  
  const likeSubmitButton = (ItemData) => {   

    api.getData('postlike/'+ ItemData.id)
    .then((res)=>{
      alert(res.data.message); 
    })
    .catch((error) => { 
    }) 
  }; 
  
  const readData = async () => {
    try {
      const user = await AsyncStorage.getItem(STORAGE_KEY);
      let jsonuser = JSON.parse(user)
      const token = await AsyncStorage.getItem(TOKEN);    
      if((token) && (user)) {
        setSuccesstext({ message:'read successfully saved' });  
        this.navigation.navigate("Tabs", {
            screen: "TabsScreen",
        }); 
      }
    } catch (e) {
      setErrortext({ message: 'Failed to save the data to the storage readdata' });  
    }
  } 
   
  const getCategories = async => {
    api.getData('post_categories')
    .then((res)=>{
      setCats( res.data.data);  
    })
    .catch((error) => { 
    }) 
  };  

  const getPosts = () =>{
    api.getData('post_datas')
      .then((res)=>{
          setItems( res.data.data);   
      })
      .catch((error) => { 
      }) 
  }
  useEffect(() => readData(false), []); 
  useEffect(() => setSuccesstext(false), [successtext]); 
  useEffect(() => setErrortext(false), [errortext]);
  useEffect(() => getCategories(false),[getCats]); 
  useEffect(() => getPosts(),[PostItems]); 
 
  const Item = ({ ItemData, onPress, likecount }) => (
    <View key={ItemData.id}
     style={{fontFamily : 'IBMPlexSans-Regular',   backgroundColor: '#fff' , height: 310,  width: '100%', borderRadius: 15,   padding: 10,  marginBottom :10  }} >
      <ListItem key={ItemData.id+'avt'} style={{fontFamily : 'IBMPlexSans-Regular',  backgroundColor: "#FEFEFE", width: '100%',    }}>
        <Avatar rounded   size="medium" source={require('../../assets/img/images/user_3.jpg')} />
        <ListItem.Content key={ItemData.id}>
          <ListItem.Title>  {ItemData.userjoin.name}</ListItem.Title>
          <ListItem.Subtitle> 54 mins ago</ListItem.Subtitle>
        </ListItem.Content> 
        <ListItem.Content onPress={()=>{navigation.navigate('PostDetails')}}>
          <Text  style={Styles.following}>+ Following Test</Text>
        </ListItem.Content>
      </ListItem>
      <Text onPress={() => this.navigation.navigate('PostDetails', {id: 69 }) } key={ItemData.id+'dsc'} style={{fontFamily : 'IBMPlexSans-Regular',  fontFamily: "RobotoRegular", fontSize: 12,  paddingBottom :5 ,  color: "#0D0E10",  }} >
       Post details
      </Text>  
      <Image  source={ItemData.file ? {uri: ItemData.file } : null}  
      style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, height: 130 }}   />
     
      <View key={ItemData.id+'like-comment'} horizontal showsHorizontalScrollIndicator={false} style={{fontFamily : 'IBMPlexSans-Regular', marginRight: -40, marginTop: 10 }}  > 
        {/* 
          onPress={() => likeSubmitButton(ItemData)}  */}
        <TouchableOpacity     
          onPress={onPress}   
            activeOpacity={0.5} >
            <View style={{fontFamily : 'IBMPlexSans-Regular',   height: 66,  width: 80, }} 
            >
            {ItemData.like ?
              <Text style={{fontFamily : 'IBMPlexSans-Regular', color : '#a21919'}}  
               >Unlike 
              {ItemData.like}</Text>
              : 
              <Text style={{fontFamily : 'IBMPlexSans-Regular', color : '#a21919'}} >Like
              {ItemData.like}</Text> }
            </View>
        </TouchableOpacity>   
        <View  style={{fontFamily : 'IBMPlexSans-Regular',   height: 66, width: 120}} >
          <Text> Comment <Icon  style={{fontFamily : 'IBMPlexSans-Regular',paddingTop : 10}}  type='font-awesome' name="comment-o" size={12}  /> {ItemData.comment} </Text>
        </View>
        <View style={{fontFamily : 'IBMPlexSans-Regular',  height: 66,  width: 100}}  >
          <Text style={{fontFamily : 'IBMPlexSans-Regular', color : '#1c81b0'}} > <Icon  style={{fontFamily : 'IBMPlexSans-Regular',paddingTop : 10}}  type='font-awesome' name="upload" size={12}  /> {ItemData.share} </Text>
        </View>
      </View>
    </View> 
  );
  const renderItem = ({ item }) => {  
    const likeCount = item.id === selectedId ? item.like+1 : item.like; 
    return (
      <Item ItemData={item}
        onPress={() => setSelectedId(item.id)}
        keyExtractor = {'itm'+item.id.toString()}
        likecount={ likeCount.toString() }
       />
    );
  };

  return (
      <SafeAreaView>
        <ScrollView>
        <Header
            style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor : 'red'}}
              leftComponent={<Icon color={colors.white} size={30} name='menu' 
              onPress={() => navigation.toggleDrawer()} />}
              centerComponent={{ text: 'Inspire me', style: { color: '#fff' , fontSize : 20 } }}
              rightComponent={{ icon: 'notifications', color: '#fff' }}
                /> 
        <View style={{fontFamily : 'IBMPlexSans-Regular', paddingHorizontal: 10 , backgroundColor: '#fff' , paddingBottom : 0}}>
        <Toast visible={errortext} message={errortext.message} />
        <Toast visible={successtext} message={successtext.message} /> 
          <Text  onPress={() => navigation.navigate('PostDetails', {id: 69 }) } style={Styles.box_title} >
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
                }} > <Icon color="#fff" style={{fontFamily : 'IBMPlexSans-Regular',padding : 2 }}  type='font-awesome' name="clock-o" size={12}  /> 4:00 Pm</Text>
                <Text  style={{fontFamily : 'IBMPlexSans-Regular',
                  color : '#ffffff' , 
                }} > <Icon color="#fff" style={{fontFamily : 'IBMPlexSans-Regular',padding : 2 }}  type='font-awesome' name="map-marker" size={12}  /> Los Angeles,
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
        <View style={{fontFamily : 'IBMPlexSans-Regular', marginHorizontal :10 , borderRadius: 10, paddingHorizontal: 8 , paddingBottom : 15 ,   marginTop : 10}} > 
        <FlatList
          data={PostItems} 
          keyExtractor={(PostItems, index) => PostItems.id+'flt'+index.toString()} 
          renderItem={renderItem}
          onEndReached={getPosts}
          onEndReachedThreshold={.55} 
          extraData={selectedId}
        />  
        </View>
        </ScrollView>
      </SafeAreaView>
  );
}
export default React.memo(Home);

