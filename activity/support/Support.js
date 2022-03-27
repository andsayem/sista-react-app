import React, { Component } from "react";
import { View, Text, Image, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { colors, Icon, Header } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import api from '../../api';
import Textarea from 'react-native-textarea';
//function About({navigation}) {
class Support extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      items: []
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
      <SafeAreaView styles={{ backgroundColor : '#ffffff'}}>
        <Header
          leftComponent={<Icon color={colors.black} size={30} name='menu'
            onPress={() => this.props.navigation.toggleDrawer()} ></Icon>}
          centerComponent={{ text: 'Support', style: { color: '#1E1E1E', fontSize: 20 } }}
          rightComponent={{ icon: 'notifications', color: '#1E1E1E' }}
          containerStyle={{
            color: '1E1E1E',
            backgroundColor: '#E4E4E4'
          }}
        />
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <View style={{ textAlign: 'center', paddingTop: 30 }}>
            <Image style={{ alignSelf: 'center' }} source={require('../../img/bg/support.png')} />
          </View>
          <Text style={{ textAlign: 'center', paddingTop: 30, color: '#000000', fontSize: 18, paddingEnd: 25, paddingStart: 25 }}>Did you face any app problem ?
            Feel free to tell us</Text>
        </View>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingStart: 20,
            borderBottomColor: '#CEC7C7',
            borderBottomWidth: 1
          }}
        />
        <View style={{ backgroundColor: '#FFFFFF' }}>
          <FlatList
            style={{ margin: 10 }}
            data={this.state.items}
            renderItem={({ item, index }) => {
              return (
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                  <View style={{ textAlign: 'right' }}>
                    <RadioButton
                      value="first"
                    //status={checked === 'first' ? 'checked' : 'unchecked'}
                    // onPress={() => setChecked('first')}
                    />
                  </View>
                  <View style={{ flex: 4 }}>
                    <Text style={{ color: '#000000' }}>{item.title}</Text>
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
           style={{ paddingStart: 25, paddingEnd: 25  , backgroundColor : '#ffffff'}}>
            <Textarea
              //onChangeText={(post_caption) => setCaption(post_caption)}
              // value={post_caption}
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
        </View>
      </SafeAreaView>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  seperator: {
    marginBottom: 20
  }
});

export default Support;
