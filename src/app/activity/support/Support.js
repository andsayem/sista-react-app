import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView , TouchableOpacity, Image, ActivityIndicator, FlatList, ScrollView, StyleSheet,ToastAndroid } from "react-native";
import { colors, Icon, Header } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import api from '../../../providers/api';
import Styles from "../../../theme/styles";
import Textarea from 'react-native-textarea';
import IconAnt from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import helpers from '../../../providers/helpers';
import AsyncStorage from '@react-native-community/async-storage';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token'; 
const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    );
    return null;
  }
  return null;
};
class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      items: [],
      support_type_id :  5,
      details:'',
      isLoading: false,
      errortext: '',
      sending: false,
      successtext: ''
    };
    this.getSupport();
    //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  getSupport = async => {
    api.getData('support_types')
      .then((res) => {
        this.setState({ items: res.data.data });
      })
      .catch((error) => {
      })
  };
  handleSubmitButton = async () => {
    if (!this.state.details) {
      this.setState({ errortext: 'Please fill field' });
      return;
    } else {
      let formData = new FormData();
      this.setState({ sending: true });
      formData.append("support_type_id", this.state.support_type_id);
      formData.append("details", this.state.details);  
      axios.post(helpers.baseurl() + 'api/supports', formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: "Bearer " + await AsyncStorage.getItem(TOKEN)
          }
        }).then((res) => {
          this.setState({ sending: false })
          this.setState({ details: '' })
          this.setState({ successtext: 'Support send successfull!' });
       })
       .finally(() => this.setState({ isLoading: false }));
      }
    }
  render() {
    return (
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"}  > 
      <ScrollView styles={{ backgroundColor: '#ffffff' }}> 
        <Toast visible={this.state.errortext} message={this.state.errortext} />
        <Toast visible={this.state.successtext} message={this.state.successtext} />
         <Header 
          leftComponent={<View style={{ flex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 300 , minHeight  : 30}}> 
            <IconAnt name="left" size={18} color="#000" onPress={() => this.props.navigation.goBack()} />
            <Text style={{ paddingTop : 0 , paddingLeft: 10, marginTop : -5 , textAlign: 'right', fontFamily: 'IBMPlexSans-SemiBold', color: '#000000', fontSize: 18 }}>Suppot</Text>
          </View>
          } 
          rightComponent={{}}
          containerStyle={{
            fontFamily: 'IBMPlexSans-Regular',
            color: '1E1E1E',
            backgroundColor: '#F5F5F5',
            height : 90
          }} />
        <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: '#FFFFFF' }}>
          <View style={{fontFamily : 'IBMPlexSans-Regular', textAlign: 'center', paddingTop: 30 }}>
            <Image style={{fontFamily : 'IBMPlexSans-Regular', alignSelf: 'center' }} source={require('../../../assets/img/bg/support.png')} />
          </View>
          <Text style={styles.text }>Did you face any app problem ?
            Feel free to tell us</Text>
        </View>
        <View style={{   
            backgroundColor:'#fff'
          }}>
          <Text style={{  
            borderBottomColor: '#ABABAB',
            borderBottomWidth: 1,
            marginLeft:40,
            marginRight:40 
          }}></Text></View>
        <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: '#FFFFFF' }}>
          <FlatList
            style={{fontFamily : 'IBMPlexSans-Regular', margin: 10 }}
            data={this.state.items}
            renderItem={({ item, index }) => {
              return (
                <View style={{fontFamily : 'IBMPlexSans-Regular', flexDirection: "row", alignItems: 'center' }}>
                  <View style={{fontFamily : 'IBMPlexSans-Regular', textAlign: 'right' }}>
                    <RadioButton
                      value="{item.id}"
                      status={this.state.support_type_id == item.id ? 'checked' : 5}
                      onPress={() =>{
                       this.setState( {support_type_id : item.id  }  )
                      }
                    }
                    />
                  </View>
                  <View style={{fontFamily : 'IBMPlexSans-Regular', flex: 4 }}>
                    <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#000000' }}>{item.title} </Text>
                  </View>
                </View>
              )
            }
            }
            ListFooterComponent={this.renderFooter}
            onEndReachedThreshold={200}
            refreshing={this.state.refreshing}
            onRefresh={this.handleOnRefresh}
          />  
          <Text style={{  
            borderBottomColor: '#ABABAB',
            borderBottomWidth: 1,
            marginLeft:40,
            marginRight:40,
            marginBottom:30
          }}></Text>              
          <View
            style={{fontFamily : 'IBMPlexSans-Regular', paddingStart: 25, paddingEnd: 25, backgroundColor: '#ffffff' }}>
            <View style={{   
            backgroundColor:'#fff'
          }}>
          </View>
            
            <Textarea 
              onChangeText={(test) => this.setState({ details: test }, this.setState({ errortext: false }))}
              value={this.state.details}
              blurOnSubmit={true}
              containerStyle={styles.textareaContainerBg}
              backgroundColor="rgba(0,0,0,0)"
              maxLength={1000}
              placeholder={'Submit your review'}
              returnKeyType="next"
              multiline={true}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <TouchableOpacity 
            style={styles.submit_button} 
            onPress={this.handleSubmitButton}>
              {this.state.sending ? <ActivityIndicator size="small" color="#0000ff" /> :
                  <Text style={Styles.loginText} >Submit</Text>
                } 
            
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator: {
    fontFamily: 'IBMPlexSans-Regular',
    marginBottom: 20
  },
  textareaContainerBg:{ 
    borderWidth:1,
    borderColor:'#ABABAB', 
    borderRadius:6,
    marginRight:30,
    paddingRight:40
  },
  submit_button:{ 
    backgroundColor:"#9253C1",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    textAlign : "center",
    marginTop:20,
    marginBottom:10,
    margin:40
  },
  text:{
    fontFamily : 'IBMPlexSans-Regular', 
    textAlign: 'center',  
    color: '#000000',
    fontSize: 18, 
    paddingTop:19,
    paddingLeft:50,
    paddingRight:50
  }
});

export default Support;
