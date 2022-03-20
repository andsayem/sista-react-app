import React, { useEffect, useRef, useState } from "react";
import { Platform, View, Text, ImageBackground, CheckBox, Image, Button, ToastAndroid, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, colors, Icon, Header } from 'react-native-elements';
import Styles from "../styles";
import Loader from '../components/Loader';
import SegmentedControl from '@react-native-community/segmented-control';
import { launchImageLibrary } from 'react-native-image-picker';
//import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import Textarea from 'react-native-textarea';
import RBSheet from "react-native-raw-bottom-sheet";
import api from '../api';
import axios from 'axios';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import DocumentPicker from 'react-native-document-picker';
import FormData from 'form-data';
import helpers from '../helpers';
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
function Newpost(props) {
   // bs =React.createRef();
   // fall  = new Animated.value(1) ;
   const Cats = [
      {label : 'Videos',
      value : 1},
      {label : 'Quotes',
      value : 2},
      {label : 'Support',
      value : 3},
      {label : 'Poetry',
      value : 3},
   ]
   const [post_caption, setCaption] = useState('');
   const [category, setCategories] = useState(null);
   const [categoryName, setCategoriesName] = useState(null);
   const [loading, setLoading] = useState(false);
   const [errortext, setErrortext] = useState(false);
   const [successText, setSuccesstext] = useState(false);
   const [index, setIndex] = useState(0);
   const [photo, setPhoto] = useState([]);  
   const [video, setVideo] = useState([]);
   //const [getCats, setCats] = useState([]);
   const refRBSheet = useRef();
   const [checked, setChecked] = React.useState('');
   const [isSelected, setSelection] = useState(true);
   const [value, setValue] = React.useState('first');
   const [getToken, setToken] = useState(false); 
   useEffect(() => setSuccesstext(false), [successText]);
   useEffect(() => setErrortext(false), [errortext]);
   //useEffect(() => { getCategories() }, []);
   const readData = async () => {
     // getCategories();
      try {
         const token = await AsyncStorage.getItem(TOKEN);
         setToken(token);
      } catch (e) {
      }
   }
   useEffect(() => { readData() }, [])
   useEffect(() => {
      setErrortext(false);
      setSuccesstext(false);
   }, [handleSubmitButton])  
   const handleSubmitButton = async () => {
      setErrortext(false); 
      if (!category) {
         setErrortext({ message: 'Please fill category' });
         return;
      } else {
         setSuccesstext(false); 
         setLoading(true);
         let formData = new FormData(); 
         formData.append("user_id", 1);
         formData.append("caption", post_caption);
         formData.append("cat_id", category);
         formData.append("background_id", 1);
         formData.append("font_style", 'small');
         formData.append("font_size", 12);
         formData.append("post_type", index == 0 ? 1 : index == 1 ? 2 : index == 2 ? 3 : 3); 
         if (photo) { 
            formData.append("files_base", {
               uri: photo.uri,
               name: 'image.png',
               fileName: 'image',
               type: 'image/png'
            })
         }
         if (video) { 
            formData.append("files_base", {
               uri: video.uri,
               cropping: false,
               mediaType: "video",
               type:video.mime,
               name: 'video.mp4',
               fileName: 'video', 
             })
         }
         axios(
            {url : helpers.baseurl()+'api/post_datas', method : 'POST',data  : formData,
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'multipart/form-data',
               //'Access-Control-Allow-Origin' : '*',
               //'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
               'Authorization':"Bearer "+ await AsyncStorage.getItem(TOKEN)
            }
         })
         .then(function (response) {
            console.log('response.............', response);
            setLoading(false); 
         })
         .catch(function (error) {
            setLoading(false); 
            console.log('error............', error )
         }); 
      }
   };
   const handleChoosePhoto = () => {
      ImagePicker.openPicker({
         width: 300,
         height: 400,
         cropping: false
       }).then(image => {
         //console.log("selected Image", image)
         setVideo([]);
         setPhoto({uri: image.path, 
            mime: image.mime});  
       }); 
   } 
   const selectVideo = () => { 
      ImagePicker.openPicker({
         mediaType: "video",
       }).then((video) => {
         //console.log("selected video", video)
         setPhoto([]);
         setVideo({uri: video.path,
            width: video.width,
            height: video.height,
            mime: video.mime}); 
       }); 
   }  
   const categoryChange = async (data) => { 
      setCategories(data.value);
      setCategoriesName(data.label);
      refRBSheet.current.close()
   }
   const ChildViewEliment = () => {
      if (index == 0) {
         return (
            <View>
               
            </View>
         )
      } else if (index == 1) {
         return (
            <View>
               
            </View>
         )
      } else {
         return (
            <View>
               <ListItem >
                  <ListItem.Content>
                     
                     <ImageBackground
                        source={require("../img/text/1.jpg")}
                        style={styles.backgroundImage}
                     >
                        <Text
                           style={styles.checkbox}>
                           <CheckBox
                              style={{ padding: 50 }}
                              value={isSelected}
                              onValueChange={setSelection}
                           />
                        </Text>
                     </ImageBackground>
                     {/* <Image   source={require("../img/text/1.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  />  */}
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
            leftComponent={<Icon color={colors.black} size={30} name='menu'
               onPress={() => this.props.navigation.toggleDrawer()} ></Icon>}
            centerComponent={{ text: 'Add', style: { color: '#1E1E1E', fontSize: 20 } }}
            rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
            containerStyle={{
               color: '1E1E1E',
               backgroundColor: '#E4E4E4'
            }}
         /> 
         <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message}/>
         <Toast visible={successText} message={successText.message} />
         <ListItem>
            <ListItem.Content >
               {photo ? <Image
                  source={photo ? { uri: photo.uri } : null}
                  style={{ width: '100%', height: photo.uri ? 300 : 0 }}
               /> : ''}
               
               {video ?  
                  <Video
                     source={{ uri: video.uri, type: video.mime }}
                     style={{ width: '100%', height: video.uri ? 300 : 0, top: 0, left: 0, bottom: 0, right: 0 }}
                     rate={1}
                     paused={false}
                     volume={5}
                     muted={false}
                     resizeMode={'cover'} 
                     repeat={true}
                  />
               : ""}
            </ListItem.Content>
         </ListItem>
         <ListItem >
            <ListItem.Content  >
               <ListItem.Content >
                  <ListItem.Title style={{ fontWeight: 'bold' }} >
                     Write a caption 
                  </ListItem.Title>
               </ListItem.Content>
            </ListItem.Content>
         </ListItem>
         <View style={styles.textAreaContainer} >
            {index == 2 ?
               <View style={{ width: '100%', }}  >
                  <ImageBackground source={require("../img/text/1.jpg")} resizeMode="cover" style={styles.image_bg}>
                     <Textarea
                        onChangeText={(post_caption) => setCaption(post_caption)}
                        value={post_caption}
                        blurOnSubmit={true}
                        containerStyle={styles.textareaContainerBg}
                        backgroundColor="rgba(0,0,0,0)"
                        maxLength={1000}
                        placeholder={'Type something...'}
                        returnKeyType="next"
                        multiline={true} 
                        underlineColorAndroid={'transparent'}
                     />
                  </ImageBackground>
               </View>
               :
               <Textarea
                  onChangeText={(post_caption) =>
                     setCaption(post_caption)}
                  value={post_caption}
                  blurOnSubmit={true}
                  containerStyle={styles.textareaContainer}
                  style={styles.textarea}
                  maxLength={1000}
                  placeholder={'Type something...'}
                  returnKeyType="next"
                  multiline={true} 
                  underlineColorAndroid={'transparent'}
               />
            }
         </View>
         <View >
         </View>
         <View style={{ flexDirection: 'row', width: '100%' }} >
            <View style={{ flexDirection: 'row', margin: 10, width: '100%' }}  > 
               <Text style={
                  { flexDirection: 'row', color: 'black', width: '92%' }} onPress={() => refRBSheet.current.open()}> Category : {categoryName}
               </Text>
               <Icon style={{ padding: 2, textAlign: 'right', right: 0 }} type='font-awesome' name="angle-right" size={20} />
            </View>
            <RBSheet
               ref={refRBSheet}
               closeOnDragDown={true}
               closeOnPressMask={true}
               height={250}
               openDuration={500} >
               <Text style={{ textAlign: 'center', fontWeight: 'bold' }} >Category   </Text>
               <Text onPress={() => refRBSheet.current.close()} style={{ textAlign: 'right', fontWeight: 'bold' }} >Apply  </Text>
               <View>
                  <RadioForm formHorizontal={false} initial={0} animation={true} >
                     {
                        Cats.map((item, i) => (
                           <RadioButton labelHorizontal={true} key={i} >
                              {/*  You can set RadioButtonLabel before RadioButtonInput */}
                              <RadioButtonInput
                                 obj={item}
                                 index={i}
                                 isSelected={category === item.value}
                                 borderWidth={2}
                                 onPress={() => { categoryChange(item) }}
                                 buttonOuterColor={'#944CD4'}
                                 buttonInnerColor={'#B461FE'} 
                                 buttonSize={18}
                                 buttonOuterSize={25}
                                 buttonStyle={{}}
                                 buttonWrapStyle={{ marginLeft: 25, paddingBottom: 20 }} />
                              <RadioButtonLabel
                                 obj={item}
                                 onPress={() => { categoryChange(item) }}
                                 index={i}
                                 labelHorizontal={false}
                                 labelStyle={{ fontSize: 16, color: '#000000', paddingStart: 10, paddingBottom: 10 }}
                                 labelWrapStyle={{}} />
                           </RadioButton>
                        ))
                     }
                  </RadioForm>
               </View>
            </RBSheet>
         </View>
         <SegmentedControl style={{ backgroundColor : '#efefef'}} selectedIndex={index} values={['Photo', 'Video', 'Text']} onChange={(event) => {
            setCaption('');
            setIndex(event.nativeEvent.selectedSegmentIndex);
         }} />
         {/* <SegmentedControl   selectedIndex={index}  values={['Photo', 'Video' , 'Text']}   onChange={handleTabs(event)}  /> */}
         {index == 0 || index == 1 ?
            index == 0 ?
               <View>
                  <Button title="Choose Photo" onPress={handleChoosePhoto} />
               </View>
               :
               <View>
                  <TouchableOpacity>
                     <Button title="Choose Video" onPress={selectVideo} />
                  </TouchableOpacity>
               </View>
            :
            <View></View>
         }
         {ChildViewEliment()}
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
   container_bg: {
      flex: 1,
   },
   image_bg: {
      flex: 1,
      // width : '30%'
      justifyContent: "center"
   },
   backgroundImage: {
      height: 100,
      width: 100,
      position: 'relative',
      top: 0,
      left: 0,
      marginRight: 5
   },
   checked_bg_image: {
      flex: 1,
      width: '30%',
      justifyContent: "center"
   },
   checkbox: {
      fontWeight: 'bold',
      color: 'white',
      position: 'absolute',
      marginVertical: 32,
      marginHorizontal: 32,
      borderRadius: 15,
      paddingEnd: 5

   },
   text_bg: {
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
   },
   textAreaContainer: {
      borderColor: '#efefef',
      borderWidth: 1,
   },
   textArea: {
      height: 150,
   },
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
   textareaContainerBg: {
      height: 180,
      padding: 5,
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
   },
   textarea: {
      textAlignVertical: 'top',  // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
      backgroundColor: 'rgba(0,0,0,0)'
   },
   cat_title: {
      textAlign: 'left',
      padding: 15,
      width: '100%'
   },
   radio: {
      fontSize: 10
   },
   backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
   },
})
export default Newpost;