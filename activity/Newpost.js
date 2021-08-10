import React, { Component, useEffect, useRef , useState, createRef } from "react";
import { View , Text , SafeAreaView , SectionList , Image, Button , ToastAndroid ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler"; 
import { ListItem, Avatar, colors , Icon , Header } from 'react-native-elements';   
import Styles from "../styles";
import PostNextButton from "../navigation/PostNextButton";
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from '../components/Loader'; 
import SegmentedControl from '@react-native-community/segmented-control';
import { launchImageLibrary } from 'react-native-image-picker';
import Textarea from 'react-native-textarea';
import RBSheet from "react-native-raw-bottom-sheet";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import RadioButton from "react-native-animated-radio-button";
import api from '../api';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'; 
//import renderIf from './renderIf'
const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
}; 
function Newpost({navigation}) { 
  // bs =React.createRef();
  // fall  = new Animated.value(1) ;
  const [post_caption, setCaption] = useState(false);
  const [category, setCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState(false);
  const [successText, setSuccesstext] = useState(false);   
  const [index, setIndex] = useState(0);
  const [photo, setPhoto] = useState([]);
  const [getCats, setCats] = useState([]);
  const refRBSheet = useRef();
  const [checked, setChecked] = React.useState(''); 
  const [value, setValue] = React.useState('first');
  useEffect(() => setSuccesstext(false), [successText]);  
  useEffect(() => setErrortext(false), [errortext]);
  useEffect(() => getCategories(false));  
  
  useEffect(()=>{
    setErrortext(false);
    setSuccesstext(false);
  },[handleSubmitButton])
  const handleSubmitButton = async () => {    
    setErrortext(false);
    if (!post_caption) { 
      setErrortext({message : 'Please fill caption'});  
      return;
    }else{
      setSuccesstext(false);
    }
    setLoading(true); 
    var dataToSend = { 
      user_id: 1,
      post_type: 1,
      caption: post_caption,
      cat_id: category,
      background_id : 1,
      font_style: 'small',
      font_size: 12,
      files_base: ["data:"+photo.type+";base64,"+ photo.base64 ]
    }; 
    console.log('caption Data',dataToSend);
    fetch('http://sista.abdulmazidcse.com/api/post_datas', {
      method: 'POST', 
      headers: { 
       // Authorization :"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MmU5Njg1Ny00ZmQ4LTQ0N2ItYjEyZC05MGRjMzBlMTU2MTYiLCJqdGkiOiI2MDQwOGNlMmQ4MzkzM2MxNWI1N2VlOWM0ZGZmYTJlZmQyZjFlMTliM2YzOGIwMDkxNjRhOTkwNThkNTEyNzlhNGE0MGU0NWUwNDRhNzMzMiIsImlhdCI6IjE2MjIxNDAwNjkuMzYxMTMxIiwibmJmIjoiMTYyMjE0MDA2OS4zNjExMzQiLCJleHAiOiIxNjUzNjc2MDY5LjM1ODUyMCIsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.A0w81TgcNg-dRAWmxM1dxYgGsgjwjuMnv2oRPbXsZfzqUqawH7uJl9P9iWKQSYIx2uO8SUxdTE2Ky9zray-fHFKW_TF0MPllEyeg6uh0GWDEveHjz8UV3e1W8TzCj9OYcSDjG40ORuKNZrPK2WgrPOzjjyr0w-vhmn4tyBL1XEHlW4gRxRYBjdXBay5LBjSHF_k_7cv_DagK4bscjWYTC5sJpjjYOVIKBj1vyQo6z13s6tAK6DPS899bM89E7AqW_JdUuwI95R6UwVnl1OqFvc0j2DArrHl1XLWa0-iRMseM1k4zibQA10-mzBftuJ-ivfH0zxRQAMg_9U4wIlSkFtNpGF3r93pmdvgvhhoShyEwwvsG8UGr_a3hIq23v2xXBID8flW7239AI__Ss8eDOPoq0A-_B3FFDu2TPVnej7cYl1PS29zi6EtXMVVM2o2hSHKCcY2m5OornonklaUZLrJwWShNG2SchxuLqhAVZsZFoHUjqH6R_451Keke2wyZXNkfprb7MIqiogBkkUWUQtyl5O9qducahbnWwY6CkSNNiLo0rxPhxYYsgQ_oUWUYiYZNhm8FUOIFWMaGQOH56dJVrKAZ-UIU-0Bqt6Zi4FuE6uxjGMHFzbRFT_CYlmC3xE3-F8y_WswE0nqqqYkEe1qnLOGG400I5XQ05mtWXik",
        'Content-Type': 'application/json',
        Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN)
      },
      body: JSON.stringify(dataToSend) 
      })
      .then((response) => response.json())
      .then((responseJson) => { 
        setLoading(false); 
        if (responseJson.success === true) { 
          setSuccesstext({message:'Post Submit Successful'}); 
          setCaption('');
          setCategories(''); 
        } else { 
        }
      })
      .catch((error) => { 
        setLoading(false); 
      });
  };  
  const handleChoosePhoto = () => {
    let options = {
      title: 'Select Image',
      noData: true,
      includeBase64: true
    };
    launchImageLibrary(options, (response) => { 
      if (response) {
        setPhoto(response); 
      }
    });
  };
  const getCategories = async => {
    api.getData('post_categories')
    .then((res)=>{  
        setCats( res.data.data);
    })
    .catch((error) => {
        console.log(error)
    }) 
  };
  ChildViewEliment=()=>{
    if(index == 0){
      return(
        <View> 
            <ListItem >
              <ListItem.Content>
                <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
              <ListItem.Content>
                <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
              <ListItem.Content>
                <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content>  
            </ListItem>
            <ListItem >
            <ListItem.Content>
                <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
              <ListItem.Content>
                <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content>  
              <ListItem.Content>
                <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
              </ListItem.Content> 
             
            </ListItem>
        </View> 
      ) 
    } else if(index == 1){
      return(
        <View> 
        <ListItem >
          
          <ListItem.Content>
            <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
        </ListItem>
    </View> 
      ) 
    }else {
      return(
        <View> 
        <ListItem >
          <ListItem.Content>
            <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
         
          <ListItem.Content>
            <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
        </ListItem>
    </View>
      ) 
    }
  }
    return (       
        <ScrollView >
          <Loader loading={loading} />
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Add', style: { color: '#fff' } }}
            rightComponent={<PostNextButton onPress={()=> navigation.navigate("Newpost_text")  }/>}
          /> 
          <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) => Toast.setRef(ref)}/>
          <Toast visible={successText} message ={successText.message} />
          
            
              <ListItem>
                <ListItem.Content > 
                <Image 
                   source={photo ? {uri: photo.uri } : null}  
                   style={{  width: '100%', height: photo.uri  ? 300 : 0 }}
                />
                </ListItem.Content> 
              </ListItem>  
          <ListItem > 
              <ListItem.Content  > 
                  <ListItem.Content >
                
                    <ListItem.Title style={{ fontWeight : 'bold'}} >
                      Write a caption    
                    </ListItem.Title> 
                  </ListItem.Content>  
              </ListItem.Content>  
          </ListItem>     
             <View style={styles.textAreaContainer} >
                
                <Textarea
                  onChangeText={(post_caption) => setCaption(post_caption)} 
                  value={post_caption}
                  blurOnSubmit={true}
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  maxLength={1000}
                  placeholder={'Type something...'}  
                  returnKeyType="next"
                  multiline={true}
                  underlineColorAndroid="transparent"
                  underlineColorAndroid={'transparent'}
                />
                </View> 
                <View > 
                </View> 
                <View >
                {/* <DropDownPicker
                  items={getCats.map(item=> ({label:item.cat_name,value:item.id}))}  
                    placeholder="Select category"
                    containerStyle={{height: 50, width:'100%'}}
                    style={Styles.DropDown} 
                    itemStyle={{ justifyContent: 'flex-start'}}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => setCategories(item.value)}  
                    value={setCategories}
              />  */}

              <View>
                <Text  style={styles.cat_title}  itemStyle={{ justifyContent: 'flex-start'}}   onPress={() => refRBSheet.current.open()}> Category  
                <Icon   style={{padding : 2 , textAlign : 'right' , right : 0 }}  type='font-awesome' name="angle-right" size={20}  />
                </Text>
              </View>
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={400}
                openDuration={150} >
                  <Text style={styles.item}>Category</Text> 
                  { getCats.map((item, i) => ( 
                    <View> 
                      <ListItem >
                          <ListItem.Content>
                            <Text> 
                              <RadioButton
                                style={styles.radio}
                                value={item.id} 
                                status={ checked === item.id  ? 'checked' : 'unchecked' }
                                onPress={() => setCategories(item.id)} /> 
                                
                                { item.cat_name }
                            </Text>
                          </ListItem.Content>
                      </ListItem>
                      {/* <View style={{ width : 50}}>
                        <RadioButton
                          value={item.id}
                          animation={"bounceIn"}
                          status={ checked === item.id  ? 'checked' : 'unchecked' }
                          onPress={() => setCategories(item.id)}
                        />  
                      </View>
                      <View style={{ width : 100}}>
                        <Text>{ item.cat_name }</Text>
                      </View>  */}
                    </View>
                  ))
                  }   
            
              </RBSheet>
              </View>      
         
     
            <SegmentedControl   selectedIndex={index}  values={['Photo', 'Video' , 'Text']}   onChange={(event) =>  { 
               setIndex(event.nativeEvent.selectedSegmentIndex);  
            }}  />  
            {/* <SegmentedControl   selectedIndex={index}  values={['Photo', 'Video' , 'Text']}   onChange={handleTabs(event)}  /> */}
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
            { ChildViewEliment() } 
            <ListItem>
            <TouchableOpacity
             onPress={handleSubmitButton} 
              style={Styles.journalBtn}
              activeOpacity={0.5} >
              <Text style={Styles.journalText}               
              >Submit</Text>
            </TouchableOpacity>  
          </ListItem>
          
        </ScrollView>
      
    );
}
const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor:  '#efefef',
    borderWidth: 1,  
  },
  textArea: {
    height: 150, 
    
  } ,
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
 
  cat_title : {
    textAlign: 'left', 
    padding : 15,  
    width : '100%'
    },
  radio : {
    fontSize : 10
  }
})

export default Newpost;
