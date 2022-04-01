import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, StyleSheet } from "react-native";
import { colors, Icon, Header } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import api from '../../api';
import Styles from "../../styles";
import Textarea from 'react-native-textarea';
import IconAnt from 'react-native-vector-icons/AntDesign';
class Support extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      items: [],
      support_type_id :  5
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
  render() {
    return (
      <ScrollView styles={{ backgroundColor: '#ffffff' }}> 
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
            backgroundColor: '#E4E4E4',
            height : 90
          }} />
        <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: '#FFFFFF' }}>
          <View style={{fontFamily : 'IBMPlexSans-Regular', textAlign: 'center', paddingTop: 30 }}>
            <Image style={{fontFamily : 'IBMPlexSans-Regular', alignSelf: 'center' }} source={require('../../img/bg/support.png')} />
          </View>
          <Text style={{fontFamily : 'IBMPlexSans-Regular', textAlign: 'center', paddingTop: 30, color: '#000000', fontSize: 18, paddingEnd: 25, paddingStart: 25 }}>Did you face any app problem ?
            Feel free to tell us</Text>
        </View>
        <View
          style={{fontFamily : 'IBMPlexSans-Regular',
            backgroundColor: '#FFFFFF',
            paddingStart: 20,
            borderBottomColor: '#CEC7C7',
            borderBottomWidth: 1
          }}
        />
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
          <View
            style={{fontFamily : 'IBMPlexSans-Regular', paddingStart: 25, paddingEnd: 25, backgroundColor: '#ffffff' }}>
            <Textarea
               onChangeText={(details) =>{
                this.setState( {details : details }  ) 
               }}
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
            style={Styles.submit_button}
            activeOpacity={0.5}
            onPress={handleSubmitPress}>
            <Text style={Styles.loginText} >Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  }
});

export default Support;
