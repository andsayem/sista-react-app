import React, { useEffect, useRef , useState } from "react";
import {Platform, View , Text , ImageBackground , CheckBox , Image, Button , ToastAndroid , TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler"; 
import { ListItem, colors , Icon , Header } from 'react-native-elements';   
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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-community/async-storage';
import FormData from 'form-data'; 
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
const [category, setCategories] = useState(1); 
const [loading, setLoading] = useState(false);
const [errortext, setErrortext] = useState(false);
const [successText, setSuccesstext] = useState(false);   
const [index, setIndex] = useState(0);
const [photo, setPhoto] = useState([]);
const [video, setVideo] = useState([]);
const [getCats, setCats] = useState([]);
const refRBSheet = useRef();
const [checked, setChecked] = React.useState(''); 
const [isSelected, setSelection] = useState(true);
const [value, setValue] = React.useState('first');
const [getToken, setToken] = useState(false);
useEffect(() => setSuccesstext(false), [successText]);  
useEffect(() => setErrortext(false), [errortext]);
useEffect(() => {getCategories()},[]);  
const readData = async () => {
try { 
const token = await AsyncStorage.getItem(TOKEN);          
setToken(token);       
} catch (e) {   
}
} 
useEffect(() => { readData() },[])  
useEffect(()=>{
setErrortext(false);
setSuccesstext(false);
},[handleSubmitButton])
const handleSubmitButton2 = async () => {    
setErrortext(false);
if (!post_caption) { 
setErrortext({message : 'Please fill caption'});  
return;
}else if(!category){
setErrortext({message : 'Please fill category'});  
return;
}else{
setSuccesstext(false); 
setLoading(true); 
let formData = new FormData();
if (video) {
console.log('video=====',video);
// formData.append('files_base', {
//   name: video.fileName,
//   uri: Platform.OS === 'android' ? video.uri : video.uri.replace('file://', ''),
//   type: 'video/mov',
// });
// formData.append("files_base", {
//   name: "name.mp4",
//     uri: video.uri,
//     type: 'video/mp4'
// });
}
formData.append("user_id", 1);
formData.append("caption", post_caption);
formData.append("cat_id", category);
formData.append("background_id", 1);
formData.append("font_style", 'small');
formData.append("font_size", 12);
formData.append("post_type", index == 0  ?  1 : index == 1 ? 2 : index == 2 ? 3 : 3);   
if (photo) {
//console.log('photos=====',photo.fileName);
//formData.append("files_base", 'photo.base64');
formData.append("files_base", "data:"+photo.type+";base64,"+ photo.base64 );
}  
console.log('formData',formData);
axios.post('https://sista.bdmobilepoint.com/api/post_datas', formData,
{
headers: { 
'Accept': 'application/json',  
'Content-Type': 'multipart/form-data', 
Authorization :"Bearer "+getToken,
}
})  
fetch('https://sista.bdmobilepoint.com/api/post_datas',{
method: 'POST',
headers: {
'Accept': 'application/json',  
'Content-Type': 'multipart/form-data',
Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN), 
},
body: formData
})
.then((response) => {
console.log('ddres',response.json());
//console.log('formData ==',formData) 
}).then((responseJson) => { 
setLoading(false);  
//console.log('formData ============',formData) 
console.log('dataToSend ======', responseJson)
if (responseJson.success === true) { 
setSuccesstext({message:'Post Submit Successful'}); 
setCaption(''); 
setPhoto('');
setCategories(''); 
} else { 
}
})
.catch((error) => {  
console.log('error ============',error)  
setLoading(false); 
});
}
};  
const handleSubmitButton = async () => {    
setErrortext(false);
if (!post_caption) { 
setErrortext({message : 'Please fill caption'});  
return;
}else if(!category){
setErrortext({message : 'Please fill category'});  
return;
}else{
setSuccesstext(false);
//console.log( video.uri );
setLoading(true); 
var dataToSend = { 
user_id: 1,
post_type:  index == 0  ?  1 : index == 1 ? 2 : index == 2 ? 3 : 3 ,
caption: post_caption,
cat_id: category,
background_id : 1,
font_style: 'small',
font_size: 12, 
files_base: index == 0 ||  index == 1? 
index == 0 ? 
["data:"+photo.type+";base64,"+ photo.base64 ]
: ["data:"+video.type+";base64,"+ video.base64 ]
: null        
};  
console.log('dataToSend--==',dataToSend);
fetch('http://sista.bdmobilepoint.com/api/post_datas', {
method: 'POST', 
headers: {  
'Accept': 'application/json',  
'Content-Type':'application/json',
Authorization :"Bearer "+ await AsyncStorage.getItem(TOKEN)
},
body: JSON.stringify(dataToSend) 
})
.then((response) => response.json())
.then((responseJson) => { 
setLoading(false);   
console.log('responseJson============',responseJson)
if (responseJson.success === true) { 
setSuccesstext({message:'Post Submit Successful'});  
} else { 
}
})
.catch((error) => { 
console.log('error===',error);
setLoading(false); 
});
}
};  
const handleChoosePhoto = () => {
ImagePicker.launchImageLibrary({
mediaType: 'photo', 
includeBase64: true,
maxHeight: 200,
maxWidth: 200,
},
(response) => {
console.log(response);
setPhoto(response); 
});
}
const handleChoosePhoto2 = () => {
let options = {
title: 'Select Image',
noData: true,
includeBase64: true
};
launchImageLibrary(options, (response) => { 
console.log(response);
if (response) {
setPhoto(response); 
}
});
};
const selectVideo = () => {  
ImagePicker.launchImageLibrary({ mediaType: 'video', includeBase64: true }, (response) => {
console.log('launchImageLibrary',response);
setVideo(response);
})
// let options = {
//   title: 'Select Image',
//   noData: true,
//   mediaType: 'video',
//   includeBase64: true
// };
// launchImageLibrary(options, (response) => {  
//   //console.log(response);
//   //setPhoto(response); 
//   setVideo(response);  
//   if (response) {
//     setVideo(response); 
//   }
// });
// launchImageLibrary({ mediaType: 'video', includeBase64: true , noData: true}, (response) => { 
//   setVideo(response);  
//   console.log('launchImageLibrary',response)
// })
}
const getCategories = async => {
api.getData('post_categories')
.then((res)=>{  
let data = [] ;
for (let index = 0; index < res.data.data.length; index++) {
let d  = {label: res.data.data[index].cat_name, value: res.data.data[index].id };
data.push(d);
}
setCats( data);
})
.catch((error) => {
console.log(error)
}) 
};
const ChildViewEliment=()=>{
if(index == 0){
return(
<View>
   {/* <ListItem >
      <ListItem.Content>
         <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
      <ListItem.Content>
         <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
      <ListItem.Content>
         <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
   </ListItem> */}
   {/* <ListItem >
      <ListItem.Content>
         <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
      <ListItem.Content>
         <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
      <ListItem.Content>
         <Image   source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
   </ListItem> */}
</View>
) 
} else if(index == 1){
return(
<View>
   {/* <ListItem >
      <ListItem.Content>
         <Image  source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
      <ListItem.Content>
         <Image  source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
      <ListItem.Content>
         <Image  source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
   </ListItem> */}
</View>
) 
}else {
return(
<View style={{ width : '100%'}}>
   <ListItem >
      <ListItem.Content style={{ width : '100%' , flexDirection : 'row'}}>
        
         <ImageBackground 
            source={require("../img/text/1.jpg")} 
            style={ styles.backgroundImage }
            >
            <Text
               style={styles.checkbox}>
                 <CheckBox 
                  style={{ padding :50  }}
                  value={isSelected}
                  onValueChange={setSelection}  
                  />
            </Text>
         </ImageBackground>

         {/* <ImageBackground 
            source={require("../img/text/1.jpg")} 
            style={ styles.backgroundImage }
            >
            <Text
               style={styles.checkbox}>
                 <CheckBox 
                  style={{ padding :50  }}
                  value={ false }
                  onValueChange={setSelection}  
                  />
            </Text>
         </ImageBackground>
         <ImageBackground 
            source={require("../img/text/1.jpg")} 
            style={ styles.backgroundImage }
            >
            <Text
               style={styles.checkbox}>
                 <CheckBox 
                  style={{ padding :50  }}
                  value={ false }
                  onValueChange={setSelection}  
                  />
            </Text>
         </ImageBackground> */}
         {/* <Image   source={require("../img/text/1.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  />  */}
      </ListItem.Content>
      {/*          
      <ListItem.Content>
         <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
      <ListItem.Content>
         <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
      </ListItem.Content>
      */}
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
   onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } ></Icon> }
   centerComponent={{ text: 'Add', style: { color: '#1E1E1E' , fontSize : 20 } }}
   rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
   containerStyle={{   
   color : '1E1E1E',
   backgroundColor: '#E4E4E4' }}
   />
   <Toast style={Styles.errorTextStyle} visible={errortext} message={errortext.message} ref={(ref) =>
   Toast.setRef(ref)}/>
   <Toast visible={successText} message ={successText.message} />
   <ListItem>
      <ListItem.Content >
         { photo ? <Image 
         source={photo ? {uri: photo.uri } : null}  
         style={{  width: '100%', height: photo.uri  ? 300 : 0 }}
         /> :''}
         {/* <Video 
         source={{uri: 'https://youtu.be/oEFEGcsjk1A'}}   // Can be a URL or a local file.
         ref={(ref) => {
         this.player = ref
         }}                                      // Store reference
         onBuffer={this.onBuffer}                // Callback when remote video is buffering
         onError={this.videoError}               // Callback when video cannot be loaded
         style={styles.backgroundVideo} />  */}
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
      {index == 2  ?
      <View   style={{ width: '100%',  }}  > 
      <ImageBackground  source={require("../img/text/1.jpg")}  resizeMode="cover" style={styles.image_bg}>
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
   <View >
      <View>
         <Text  style={styles.cat_title}  itemStyle={{ justifyContent: 'flex-start'}}   onPress={() => refRBSheet.current.open()}> Category  
         <Icon   style={{padding : 2 , textAlign : 'right' , right : 0 }}  type='font-awesome' name="angle-right" size={20}  />
         </Text>
      </View>
      <RBSheet 
         ref={refRBSheet}
         closeOnDragDown={true}
         closeOnPressMask={true} 
         height={250}
         openDuration={500} >
         <Text style={{ textAlign : 'center' , fontWeight : 'bold'}} >Category  </Text> 
         <Text onPress={() => refRBSheet.current.close()} style={{ textAlign : 'right' , fontWeight : 'bold'}} >Apply  </Text>
         <View>
            <RadioForm
               formHorizontal={false}
               initial={0}
               animation={true}
               >
               {/* To create radio buttons, loop through your array of options */}
               {
               getCats.map((item, i) => (
               <RadioButton labelHorizontal={true} key={i} >
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                     obj={item}
                     index={i}   
                     isSelected={ category === item.value}
                     borderWidth={2}
                     buttonOuterColor ={'#944CD4'}
                     buttonInnerColor={'#B461FE'} 
                     onPress = {() =>
                  { setCategories(item.value)}}
                  buttonSize={18}
                  buttonOuterSize={25}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: 25 , paddingBottom : 20}}
                  />
                  <RadioButtonLabel
                  obj={item}
                  index={i}
                  labelHorizontal={false} 
                  labelStyle={{fontSize: 16, color: '#000000' ,paddingStart :10 , paddingBottom :10}}
                  labelWrapStyle={{}}
                  />
               </RadioButton>
               ))
               }  
            </RadioForm>
         </View>
      </RBSheet>
   </View>
   <SegmentedControl   selectedIndex={index}  values={['Photo', 'Video' , 'Text']}   onChange={(event) =>  { 
   setIndex(event.nativeEvent.selectedSegmentIndex);  
   }}  />  
   {/* <SegmentedControl   selectedIndex={index}  values={['Photo', 'Video' , 'Text']}   onChange={handleTabs(event)}  /> */}
   { index == 0 ||  index == 1?  
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
container_bg: {
flex: 1,
},
image_bg: {
flex: 1,
// width : '30%'
justifyContent: "center"
},
backgroundImage : {
   height: 100,
   width: 100,
   position: 'relative', 
   top: 0,
   left: 0 ,
   marginRight :5
},
checked_bg_image : {
   flex: 1,
   width : '30%',
   justifyContent: "center"
},
checkbox : {
   fontWeight: 'bold',
   color: 'white',
   position: 'absolute',
   marginVertical : 32,
   marginHorizontal : 32,
   borderRadius : 15,
   paddingEnd :  5 
   
},
text_bg: {
   color: "black", 
   fontWeight: "bold",
   textAlign: "center", 
},
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
textareaContainerBg: {
height: 180,
padding: 5,
justifyContent : 'center',
textAlign : 'center', 
backgroundColor: 'rgba(0,0,0,0)',
},
textarea: {
textAlignVertical: 'top',  // hack android
height: 170,
fontSize: 14,
color: '#333',
backgroundColor: 'rgba(0,0,0,0)'
}, 
cat_title : {
textAlign: 'left', 
padding : 15,  
width : '100%'
},
radio : {
fontSize : 10
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

