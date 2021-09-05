import React, { useEffect, useRef , useState } from "react";
import { View , Text , ImageBackground , CheckBox , Image, Button , ToastAndroid , TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler"; 
import { ListItem, colors , Icon , Header } from 'react-native-elements';   
import Styles from "../styles"; 
import Loader from '../components/Loader'; 
import SegmentedControl from '@react-native-community/segmented-control';
import { launchImageLibrary } from 'react-native-image-picker';
import Textarea from 'react-native-textarea';
import RBSheet from "react-native-raw-bottom-sheet";  
import api from '../api'; 
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
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
  useEffect(() => setSuccesstext(false), [successText]);  
  useEffect(() => setErrortext(false), [errortext]);
  useEffect(() => {getCategories()},[]);  
  
  useEffect(()=>{
    setErrortext(false);
    setSuccesstext(false);
  },[handleSubmitButton])
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
    console.log( video.uri );
    setLoading(true); 
    var dataToSend = { 
      user_id: 1,
      post_type:  index == 0  ?  1 : index == 1 ? 2 : index == 2 ? 3 : 3 ,
      caption: post_caption,
      cat_id: category,
      background_id : 1,
      font_style: 'small',
      font_size: 12,
      videoFile : index == 0  ? {  name: "name.mp4", uri: video.uri, type: 'video/mp4' } : null ,
      files_base: index == 0  ? ["data:"+photo.type+";base64,"+ photo.base64 ] : null
    }; 

 

    fetch('http://sista.bdmobilepoint.com/api/post_datas', {
      method: 'POST', 
      headers: {  
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
    }
  };  
  
  const handleChoosePhoto = () => {

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
  let options = {
    title: 'Select Image',
    noData: true,
    mediaType: 'video',
    includeBase64: true
  };
  launchImageLibrary(options, (response) => {  
    //console.log(response);
    //setPhoto(response); 
    setVideo(response);  
    // if (response) {
    //   setPhoto(response); 
    // }
  });

    // launchImageLibrary({ mediaType: 'video', includeBase64: true , noData: true}, (response) => { 
    //   setPhoto(response);  
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
            <Image  source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image  source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image  source={require("../img/images/img1.png")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
        </ListItem>
    </View> 
      ) 
    }else {
      return(
        <View> 
            
        <ListItem >
          <ListItem.Content>
          <ImageBackground  source={require("../img/text/1.jpg")}  resizeMode="cover" style={styles.image_bg}>
          <CheckBox 
                    value={isSelected}
                    onValueChange={setSelection}  
                  />
            </ImageBackground>
         
            {/* <Image   source={require("../img/text/1.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  />  */}
          </ListItem.Content> 
{/*          
          <ListItem.Content>
            <Image   source={require("../img/images/3.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content> 
          <ListItem.Content>
            <Image   source={require("../img/images/2.jpg")}  style={{ width: '100%', borderRadius: 10, height: 100 }}  /> 
          </ListItem.Content>  */}
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
                onPress = {() => { setCategories(item.value)}}
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
           <View> 
            <Button title="Choose Photo" onPress={handleChoosePhoto} />
           </View>
           :
           <View></View>
          }
            <TouchableOpacity onPress={ selectVideo } ><Text>Video</Text></TouchableOpacity>
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
  }
})

export default Newpost;
