import React, { useEffect, useRef, useState } from "react";
import { Platform, View, Text, ImageBackground, CheckBox, Image, Button, ToastAndroid, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, colors, Icon, Header } from 'react-native-elements';
import Styles from "../styles";
import Loader from '../components/Loader';
import SegmentedControl from '@react-native-community/segmented-control';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
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
   Cats = [
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
   const [singleFile, setSingleFile] = useState(null);
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
      if (!post_caption) {
         setErrortext({ message: 'Please fill caption' });
         return;
      } else if (!category) {
         setErrortext({ message: 'Please fill category' });
         return;
      } else {
         setSuccesstext(false);
         setLoading(true);
         let formData = new FormData();
         if (video) { 
            // formData.append('files_base', {
            //    name: video.fileName,
            //    uri: Platform.OS === 'android' ? video.uri : video.uri.replace('file://', ''),
            //    type: 'video/mov',
            // });
            // formData.append("files_base", {
            //    name: "name.mp4",
            //    uri: video.uri,
            //    type: 'video/mp4'
            // });
         }
         formData.append("user_id", 1);
         formData.append("caption", post_caption);
         formData.append("cat_id", category);
         formData.append("background_id", 1);
         formData.append("font_style", 'small');
         formData.append("font_size", 12);
         formData.append("post_type", index == 0 ? 1 : index == 1 ? 2 : index == 2 ? 3 : 3);
         if (photo) { 
            const fileToUpload = singleFile; 
            data.append('name', 'Image Upload');
            //data.append('files_base', fileToUpload);
            //formData.append("files_base", "data:" + photo.type + ";base64," + photo.base64);
            formData.append("files_base", fileToUpload);
         }
         console.log(formData)
         fetch(helpers.baseurl()+'api/post_datas', {
            method: 'POST',
            headers: { 
               Accept: 'application/json',
               'Content-Type': 'multipart/form-data; ',
               Authorization: "Bearer " + await AsyncStorage.getItem(TOKEN),
            },
            body: formData
         })
            .then((response) => {
               console.log('response', response)
            }).then((responseJson) => {
               console.log('responseJson', responseJson)
               setLoading(false); 
               if (responseJson.success === true) {
                  setSuccesstext({ message: 'Post Submit Successful' });
                  setCaption('');
                  setPhoto('');
                  setCategories('');
               } else {
               }
            })
            .catch((error) => { 
               console.log('erro',error)
               //console.log('erro',helpers.baseurl())
               setLoading(false);
            });
      }
   };
   const handleChoosePhoto = async () => {
      // Opening Document Picker to select one file
      try {
        const res = await DocumentPicker.pick({ 
          type: [DocumentPicker.types.allFiles], 
        }); 
        console.log('res : ' + JSON.stringify(res)); 
        setPhoto(res);
        setSingleFile(res);
      } catch (err) {
         setSingleFile(null);
         setPhoto(null); 
        if (DocumentPicker.isCancel(err)) {  
        } else { 
          throw err;
        }
      }
    };

    const selectFile = async () => { 
      try {
        const res = await DocumentPicker.pick({ 
          type: [DocumentPicker.types.allFiles], 
        });  
        setSingleFile(res);
      } catch (err) {
        setSingleFile(null); 
        if (DocumentPicker.isCancel(err)) { 
        } else { 
          throw err;
        }
      }
    };
   const handleSubmitButton2 = async () => {
      setErrortext(false); 
      if (!category) {
         setErrortext({ message: 'Please fill category' });
         return;
      } else {
         setSuccesstext(false); 
         setLoading(true);
         var dataToSend = {
            user_id: 1,
            post_type: index == 0 ? 1 : index == 1 ? 2 : index == 2 ? 3 : 3,
            caption: post_caption,
            cat_id: category,
            background_id: 1,
            font_style: 'small',
            font_size: 12,
            files_base: index == 0 || index == 1 ?
               index == 0 ?
                  ["data:" + photo.type + ";base64," + photo.base64]
                  : ["data:" + video.type + ";base64," + video.base64]
               : null
         };
         fetch(helpers.baseurl()+'api/post_datas', {
            method: 'POST',
            headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               Authorization: "Bearer " + await AsyncStorage.getItem(TOKEN)
            },
            body: JSON.stringify(dataToSend)
         })
            .then((response) => response.json())
            .then((responseJson) => {
               console.log('New post error->',responseJson)
               setLoading(false);
               if (responseJson.success === true) {
                  setCaption('');
                  setPhoto([]);
                  setSuccesstext({ message: 'Post Submit Successful' });
                  props.navigation.navigate("Home");
               } else {
               }
            })
            .catch((error) => {
               console.log('New post error->',helpers.baseurl())
               console.log('New post error->',error)
               setLoading(false);
            });
      }
   };
   const handleChoosePhoto2 = () => {
      ImagePicker.launchImageLibrary({
         mediaType: 'photo',
         includeBase64: true,
      },
         (response) => { 
            setPhoto(response);
         });
   }
   const handleChoosePhoto3 = () => {
      let options = {
         title: 'Select Image',
         quality: 1.0,
         maxWidth: 500,
         maxHeight: 500,
         storageOptions: {
            skipBackup: true,
            path: 'images',
            cameraRoll: true,
            waitUntilSaved: true,
         },
      };
      launchImageLibrary(options, (response) => { 
         if (response) {
            setPhoto(response);
         }
      });
   };
   const selectVideo = () => {
      ImagePicker.launchImageLibrary({ mediaType: 'video', includeBase64: true }, (response) => { 
         setVideo(response);
      })
   }
   // const getCategories = async => {
   //    api.getData('post_categories')
   //       .then((res) => {
   //          let data = [];
   //          for (let index = 0; index < res.data.data.length; index++) {
   //             let d = { label: res.data.data[index].cat_name, value: res.data.data[index].id };
   //             data.push(d);
   //          }
   //          setCats(data);
   //       })
   //       .catch((error) => { 
   //          console.log('category-error',error)
   //       })
   // };
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
                              style={{fontFamily : 'IBMPlexSans-Regular', padding: 50 }}
                              value={isSelected}
                              onValueChange={setSelection}
                           />
                        </Text>
                     </ImageBackground>
                     {/* <Image   source={require("../img/text/1.jpg")}  style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, height: 100 }}  />  */}
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
                  style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', height: photo.uri ? 300 : 0 }}
               /> : ''}
               
            </ListItem.Content>
         </ListItem>
         <ListItem >
            <ListItem.Content  >
               <ListItem.Content >
                  <ListItem.Title style={{fontFamily : 'IBMPlexSans-Regular', fontWeight: 'bold' }} >
                     Write a caption 
                  </ListItem.Title>
               </ListItem.Content>
            </ListItem.Content>
         </ListItem>
         <View style={styles.textAreaContainer} >
            {index == 2 ?
               <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', }}  >
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
                        underlineColorAndroid="transparent"
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
                  underlineColorAndroid="transparent"
                  underlineColorAndroid={'transparent'}
               />
            }
         </View>
         <View >
         </View>
         <View style={{fontFamily : 'IBMPlexSans-Regular', flexDirection: 'row', width: '100%' }} >
            <View style={{fontFamily : 'IBMPlexSans-Regular', flexDirection: 'row', margin: 10, width: '100%' }}  >
            {singleFile != null ? (
            <Text style={styles.textStyle}>
               File Name: {singleFile.name ? singleFile.name : ''}
               {'\n'}
               Type: {singleFile.type ? singleFile.type : ''}
               {'\n'}
               File Size: {singleFile.size ? singleFile.size : ''}
               {'\n'}
               URI: {singleFile.uri ? singleFile.uri : ''}
               {'\n'}
            </Text>
            ) : null}
            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={selectFile}>
            {/* <Text style={styles.buttonTextStyle}>Select File</Text> */}
            </TouchableOpacity>
            
               <Text style={
                  { flexDirection: 'row', color: 'black', width: '92%' }} onPress={() => refRBSheet.current.open()}> Category : {categoryName}
               </Text>
               <Icon style={{fontFamily : 'IBMPlexSans-Regular', padding: 2, textAlign: 'right', right: 0 }} type='font-awesome' name="angle-right" size={20} />
            </View>
            <RBSheet
               ref={refRBSheet}
               closeOnDragDown={true}
               closeOnPressMask={true}
               height={250}
               openDuration={500} >
               <Text style={{fontFamily : 'IBMPlexSans-Regular', textAlign: 'center', fontWeight: 'bold' }} >Category   </Text>
               <Text onPress={() => refRBSheet.current.close()} style={{fontFamily : 'IBMPlexSans-Regular', textAlign: 'right', fontWeight: 'bold' }} >Apply  </Text>
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
         <SegmentedControl style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor : '#efefef'}} selectedIndex={index} values={['Photo', 'Video', 'Text']} onChange={(event) => {
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
      fontFamily : 'IBMPlexSans-Regular',
      flex: 1,
   },
   image_bg: {
      fontFamily : 'IBMPlexSans-Regular',
      flex: 1,
      // width : '30%'
      justifyContent: "center"
   },
   backgroundImage: {
      fontFamily : 'IBMPlexSans-Regular',
      height: 100,
      width: 100,
      position: 'relative',
      top: 0,
      left: 0,
      marginRight: 5
   },
   checked_bg_image: {
      fontFamily : 'IBMPlexSans-Regular',
      flex: 1,
      width: '30%',
      justifyContent: "center"
   },
   checkbox: {
      fontFamily : 'IBMPlexSans-Regular',
      fontWeight: 'bold',
      color: 'white',
      position: 'absolute',
      marginVertical: 32,
      marginHorizontal: 32,
      borderRadius: 15,
      paddingEnd: 5

   },
   text_bg: {
      fontFamily : 'IBMPlexSans-Regular',
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
   },
   textAreaContainer: {
      fontFamily : 'IBMPlexSans-Regular',
      borderColor: '#efefef',
      borderWidth: 1,
   },
   textArea: {
      fontFamily : 'IBMPlexSans-Regular',
      height: 150,
   },
   input: {
      fontFamily : 'IBMPlexSans-Regular',
      height: 40,
      margin: 12,
      borderWidth: 1,
   },
   container: {
      fontFamily : 'IBMPlexSans-Regular',
      flex: 1,
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
   },
   textareaContainer: {
      fontFamily : 'IBMPlexSans-Regular',
      height: 180,
      padding: 5,
      backgroundColor: '#F5FCFF',
   },
   textareaContainerBg: {
      fontFamily : 'IBMPlexSans-Regular',
      height: 180,
      padding: 5,
      justifyContent: 'center',
      textAlign: 'center',
      backgroundColor: 'rgba(0,0,0,0)',
   },
   textarea: {
      fontFamily : 'IBMPlexSans-Regular',
      textAlignVertical: 'top',  // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
      backgroundColor: 'rgba(0,0,0,0)'
   },
   cat_title: {
      fontFamily : 'IBMPlexSans-Regular',
      textAlign: 'left',
      padding: 15,
      width: '100%'
   },
   radio: {
      fontFamily : 'IBMPlexSans-Regular',
      fontSize: 10
   },
   backgroundVideo: {
      fontFamily : 'IBMPlexSans-Regular',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
   },
})
export default Newpost;