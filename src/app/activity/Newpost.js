import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, CheckBox, Image, ToastAndroid ,
      Platform,
      AlertIOS, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ListItem, colors, Icon, Header } from 'react-native-elements';
import Styles from "../../theme/styles";
import SegmentedControl from '@react-native-community/segmented-control'
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import Textarea from 'react-native-textarea';
import RBSheet from "react-native-raw-bottom-sheet";
import axios from 'axios';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import FormData from 'form-data';
import helpers from '../../providers/helpers';
import { launchImageLibrary } from 'react-native-image-picker';

const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
//import renderIf from './renderIf'



const Toast = ({ visible, message }) => {
   if (visible) {

      if (Platform.OS === 'android') {
         ToastAndroid.showWithGravityAndOffset(
            message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
         );
       } else {
         alert(message);
       }
      
      return null;
   }
   return null;
};
function Newpost(props) {
   const Cats = [
      {
         label: 'Videos',
         value: 1
      },
      {
         label: 'Quotes',
         value: 2
      },
      {
         label: 'Support',
         value: 3
      },
      {
         label: 'Poetry',
         value: 4
      },
   ]
   const [post_caption, setCaption] = useState('');
   const [category, setCategories] = useState(null);
   const [categoryName, setCategoriesName] = useState(null);
   const [loading, setLoading] = useState(false);
   const [errortext, setErrortext] = useState(false);
   const [successtext, setSuccesstext] = useState(false);
   const [index, setIndex] = useState(0);
   const [photo, setPhoto] = useState([]);
   const [video, setVideo] = useState([]);
   const refRBSheet = useRef();
   const [checked, setChecked] = React.useState('');
   const [isSelected, setSelection] = useState(true);
   const [value, setValue] = React.useState('first');
   const [getToken, setToken] = useState(false);
   useEffect(() => setSuccesstext(false), [successtext]);
   useEffect(() => setErrortext(false), [errortext]);
   const readData = async () => {
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
               //uri: photo.uri,
               uri:  Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
               name: 'image.png',
               fileName: 'image',
               type: 'image/png'
            })
         }

         // formData.append('photo', {
         //    name: photo.fileName,
         //    type: photo.type,
         //    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
         //  });

         if (video) {
            formData.append("files_base", {
               uri: video.uri,
               cropping: false,
               mediaType: "video",
               type: video.mime,
               name: 'video.mp4',
               fileName: 'video',
            })
         }
         axios(
            {
               url: helpers.baseurl() + 'api/post_datas', method: 'POST', data: formData,
               headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                  'Authorization': "Bearer " + await AsyncStorage.getItem(TOKEN)
               }
            })
            .then(function (response) {
               setCaption('');
               setCategories('');
               setCategoriesName('');
               setSuccesstext({ message: 'Data Saved Successfully' });
               setLoading(false);
               setPhoto([]);
               props.navigation.navigate("Home");
            })
            .catch(function (error) {
               setCaption('');
               setCategories('');
               setCategoriesName('');
               setSuccesstext({ message: 'Data Saved Successfully' });
               setLoading(false);
               setPhoto([]);
               props.navigation.navigate("Home");
            });
      }
   };



   const handleUploadPhoto = () => {
      fetch(helpers.baseurl() + 'api/post_datas', {
        method: 'POST',
        body: createFormData(photo, { userId: '123' }),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    };

   // const handleChoosePhoto = () => {
   //    launchImageLibrary({ noData: true }, (response) => {
   //      // console.log(response);
   //      if (response) {
   //        setPhoto(response);
   //      }
   //    });
   //  };
   const handleChoosePhoto = () => {
      ImagePicker.openPicker({
         width: 300,
         height: 400,
         cropping: false
      }).then(image => {
         setVideo([]);
         setPhoto({
            uri: image.path,
            mime: image.mime
         });
      });
   }
   const selectVideo = () => {
      ImagePicker.openPicker({
         mediaType: "video",
      }).then((video) => {
         setPhoto([]);
         setVideo({
            uri: video.path,
            width: video.width,
            height: video.height,
            mime: video.mime
         });
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
               <ImageBackground
                  source={require("../../assets/img/text/1.jpg")}
                  style={Styles.backgroundImage}
               >
                  <Text
                     style={Styles.checkbox}>
                     <CheckBox
                        style={{ fontFamily: 'IBMPlexSans-Regular', padding: 50 }}
                        value={isSelected}
                        onValueChange={setSelection}
                     />
                  </Text>
               </ImageBackground>
            </View>
         )
      }
   }

   return (
      <View>

         <Header
            leftComponent={<View style={Styles.leftComponent}>
               <Icon style={{ textAlign: 'left' }} color={colors.black} size={24} name='menu'
                  onPress={() => props.navigation.toggleDrawer()} ></Icon>
               <Text style={Styles.heater_title}>Add</Text>
            </View>
            }
            rightComponent={{}}
            containerStyle={Styles.containerStyle}
         />

         <ScrollView>
            <View style={{ fontFamily: 'IBMPlexSans-Regular', backgroundColor: "#F5F5F5", height: '100%' }}>
               <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} />
               <Toast style={Styles.errorTextStyle} visible={successtext} message={successtext.message} />
               <View style={{ fontFamily: 'IBMPlexSans-Regular', padding: 20, padding: 0 }}>
                  {photo ? <Image
                     source={photo ? { uri: photo.uri } : null}
                     style={{ fontFamily: 'IBMPlexSans-Regular', width: '100%', height: photo.uri ? 300 : 0 }}
                  /> : ''}

                  {video ?
                     <Video
                        source={{ uri: video.uri, type: video.mime }}
                        style={{ fontFamily: 'IBMPlexSans-Regular', width: '100%', height: video.uri ? 300 : 0, top: 0, left: 0, bottom: 0, right: 0 }}
                        rate={1}
                        paused={false}
                        volume={5}
                        muted={false}
                        resizeMode={'cover'}
                        repeat={true}
                     />
                     : ""}

               </View>
               <ListItem >
                  <ListItem.Content  >
                     <ListItem.Content >
                        <ListItem.Title style={{ fontFamily: 'IBMPlexSans-Regular', fontWeight: 'bold' }} >
                           Write a caption
                        </ListItem.Title>
                     </ListItem.Content>
                  </ListItem.Content>
               </ListItem>
               <View style={Styles.textAreaContainer} >
                  {index == 2 ?
                     <View style={{ fontFamily: 'IBMPlexSans-Regular', width: '100%', paddingLeft: 10, paddingRight: 10 }}  >
                        <ImageBackground source={require("../../assets/img/text/1.jpg")} resizeMode="cover" style={Styles.image_bg}>
                           <Textarea
                              onChangeText={(post_caption) => setCaption(post_caption)}
                              value={post_caption}
                              blurOnSubmit={true}
                              containerStyle={Styles.textareaContainerBg}
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
                        containerStyle={Styles.textareaContainer}
                        style={Styles.textarea}
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
               <View style={{ fontFamily: 'IBMPlexSans-Regular', flexDirection: 'row', width: '100%', backgroundColor: '#F5F5F5' }} >
                  <View style={{ fontFamily: 'IBMPlexSans-Regular', flexDirection: 'row', margin: 10, width: '100%', backgroundColor: '#F5F5F5' }}  >
                     <Text style={
                        { flexDirection: 'row', color: 'black', width: '92%', backgroundColor: '#F5F5F5' }} onPress={() => refRBSheet.current.open()}> Category : {categoryName}
                     </Text>
                     <Icon style={{ fontFamily: 'IBMPlexSans-Regular', padding: 2, textAlign: 'right', right: 0 }} type='font-awesome' name="angle-right" size={20} />
                  </View>
                  <RBSheet
                     ref={refRBSheet}
                     closeOnDragDown={true}
                     closeOnPressMask={true}
                     height={250}
                     openDuration={500} >
                     <Text style={{ fontFamily: 'IBMPlexSans-Regular', textAlign: 'center', fontWeight: 'bold' }} >Category   </Text>
                     <Text onPress={() => refRBSheet.current.close()} style={{ fontFamily: 'IBMPlexSans-Regular', textAlign: 'right', fontWeight: 'bold' }} >Apply  </Text>
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
               <View style={{ fontFamily: 'IBMPlexSans-Regular', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#F5F5F5' }} >
                  <SegmentedControl appearance='light' backgroundColor="#F5F5F5" selectedIndex={index} values={['Photo', 'Video', 'Text']} onChange={(event) => {
                     setCaption('');
                     setIndex(event.nativeEvent.selectedSegmentIndex);
                  }} />
                  {/* <SegmentedControl   selectedIndex={index}  values={['Photo', 'Video' , 'Text']}   onChange={handleTabs(event)}  /> */}
                  {index == 0 || index == 1 ?
                     index == 0 ?
                        <TouchableOpacity
                           style={Styles.post_submit_Button}
                           onPress={handleChoosePhoto}
                           underlayColor='#fff'>
                           <Text style={Styles.buttonText}>Choose Photo</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                           style={Styles.post_submit_Button}
                           onPress={selectVideo}
                           underlayColor='#fff'>
                           <Text style={Styles.buttonText}>Choose Video</Text>
                        </TouchableOpacity>
                     :
                     <View></View>
                  }
                  {/* {ChildViewEliment()} */}
                  <View style={{ fontFamily: 'IBMPlexSans-Regular', marginRight: 40, marginLeft: 40, }}>
                     <TouchableOpacity
                        onPress={handleSubmitButton}
                        style={Styles.journalBtn}
                        activeOpacity={0.5} >
                        <Text style={Styles.journalText}
                        >Submit</Text>
                     </TouchableOpacity>
                  </View>
                  <View style={{ fontFamily: 'IBMPlexSans-Regular', height: 200, backgroundColor: '#F5F5F5' }} ></View>
               </View>

            </View>
         </ScrollView>
      </View>
   );
}

export default Newpost;