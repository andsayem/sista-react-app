import React, { Component } from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet, ToastAndroid, TouchableOpacity, Platform } from "react-native";
import { Avatar, colors, Icon, Image, Header } from "react-native-elements";
import IconEnt from 'react-native-vector-icons/Entypo';
import api from '../../providers/api'; 
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';

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
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.fatchData = this.fatchData.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.state = {
      userData: [],
      post_items: [],
      isLoading: false,
      successtext: '',
      loading: false,
      token: '',
      parent_id: 0,
      isOnline: null,
      pro1: null,
      pro2: null,
      pro3: null,
    };
  }

  componentDidMount() {
    this.fatchData();
  }
  componentWillUnmount() {
    this.fatchData();
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  fatchData = () => {
    this.setState({ isLoading: true })
    api.getData('user_profile/' + this.props.route.params.id)
      .then(response => {
        this.setState({ pro1: response.data.data.photos[0] ? response.data.data.photos[0] : null });
        this.setState({ pro2: response.data.data.photos[1] ? response.data.data.photos[1] : null });
        this.setState({ pro3: response.data.data.photos[2] ? response.data.data.photos[2] : null });
        this.setState({ userData: response.data.data })
      })
      .finally(() => this.setState({ isLoading: false }))
  }
  onPressPostDetails(id) {
    this.props.navigation.navigate('PostDetails', { id: id });
  }
  onPressDrawer() {
    this.props.navigation.toggleDrawer();
  }
  renderFooter = () => {
    //useEffect(() => { this.fatchData()},[]) 
    return (
      <View>
        <SafeAreaView>

        </SafeAreaView>
      </View>
    );
  }

  render() {
    let { items, isLoading } = this.state;
    let props = this.props;
    return (<SafeAreaView>
      <Header
        placement="left"
        leftComponent={<Icon color={colors.black} size={30} name='menu'
          onPress={() => this.props.navigation.toggleDrawer()} ></Icon>}
        centerComponent={{ text: 'Profile', style: { color: '#1E1E1E', fontSize: 25 } }}
        rightComponent={<IconEnt color={colors.black} size={23} name='dots-three-vertical' />}
        containerStyle={{
          color: '1E1E1E',
          backgroundColor: '#F5F5F5'
        }}
      />

      <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: "#fff", width: "100%", padding: 15 }}  >
        <ScrollView horizontal style={{fontFamily : 'IBMPlexSans-Regular', marginRight: 0, width: '100%', marginTop: 10 }} >
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: 120 }} >
            <Avatar rounded size="medium" source={this.state.userData ? { uri: this.state.userData.pro_image } : require('../../assets/img/images/user_1.jpg')} />
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: "#000", fontSize: 16, fontWeight: '600', paddingBottom: 17, paddingTop: 12 }}>{this.state.userData.name}</Text>
          </View>
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: 110 }}  >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chating', {
              receiver_id: this.state.userData.id,
            })}>
              <Text style={styles.message}>Message</Text>
            </TouchableOpacity>
          </View>
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: 100 }} >
            <Text style={styles.follow}>Follow </Text>

          </View>
        </ScrollView>

        <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#535353' }}>
          {this.state.userData.description}
        </Text>
        <View style={{fontFamily : 'IBMPlexSans-Regular', borderTopWidth: 2, borderTopColor: '#F5F5F5', backgroundColor: "#fff", color: '#535353', width: '100%', paddingTop: 15, marginTop: 10, flexDirection: "row", }}  >
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: '33%', alignItems: 'flex-start' }} >
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#535353', paddingBottom: 8, paddingLeft: 5 }}> {this.state.userData.total_potos} </Text>
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#535353' }}> Photos </Text>
          </View>
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: '33%', alignItems: 'center' }} >
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#535353', paddingBottom: 8, textAlign: "justify" }}> {this.state.userData.total_followers} </Text>
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#535353' }}> Followers </Text>
          </View>
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: '33%', alignItems: 'flex-end' }}  >
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#535353', paddingBottom: 8, paddingRight: 5 }}> {this.state.userData.total_post} </Text>
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#535353' }}> Posts </Text>
          </View>
        </View>
      </View>
      <View style={{fontFamily : 'IBMPlexSans-Regular', backgroundColor: "#FEFEFE", width: "100%", padding: 15, marginTop: 10, borderRadius: 10 }}  >
        <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', marginTop: 10, flexDirection: "row", }}  >
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-start' }} >
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#0D0E10' }}> Videos</Text>
          </View>
          {this.state.userData.total_videos > 3 ?
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-end' }}  >
              <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#707070' }}> View all </Text>
            </View>
            : <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-end' }}  >
              <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#707070' }}> View all </Text>
            </View>
          }
        </View>
        {this.state.userData.total_videos > 3 ?
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', marginTop: 10, flexDirection: "row" }}  >
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-start' }} >
              <Image
                source={require('../../assets/img/images/v1.png')}
                style={{fontFamily : 'IBMPlexSans-Regular', height: 100, width: 170, borderRadius: 10 }}
              />
            </View>
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-end' }}  >
              <Image
                source={require('../../assets/img/images/v2.png')}
                style={{fontFamily : 'IBMPlexSans-Regular', height: 100, width: 170, borderRadius: 10 }}
              />
            </View>
          </View>
          :
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', marginTop: 10, flexDirection: "row" }}  >
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-start' }} >
              <Image
                source={require('../../assets/img/images/v1.png')}
                style={{fontFamily : 'IBMPlexSans-Regular', height: 100, width: 170, borderRadius: 10 }}
              />
            </View>
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-end' }}  >
              <Image
                source={require('../../assets/img/images/v2.png')}
                style={{fontFamily : 'IBMPlexSans-Regular', height: 100, width: 170, borderRadius: 10 }}
              />
            </View>
          </View>
        }

        <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', marginTop: 20, flexDirection: "row" }}  >
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-start' }} >
            <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#0D0E10' }}> Photos </Text>
          </View>
          {this.state.userData.total_potos > 3 ?
            <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-end' }}  >
              <Text style={{fontFamily : 'IBMPlexSans-Regular', color: '#707070' }}> View all </Text>
            </View>
            : <View></View>}
        </View>
        <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%', marginTop: 10, flexDirection: "row" }}  >
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-start' }} >
            {this.state.userData.photos ?
              <Image
                onPress={() => { this.state.pro1 ? this.onPressPostDetails(this.state.pro1.id) : '' }}
                source={this.state.pro1 ? { uri: this.state.pro1.file } : null}
                style={{fontFamily : 'IBMPlexSans-Regular', height: 150, width: 170, borderRadius: 10 }}
              />
              :
              <Text style={styles.noimage}>No image found</Text>
            }
          </View>
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: "50%", alignItems: 'flex-end' }}  >
            {this.state.userData.photos ?
              <Image
                onPress={() => { this.state.pro2 ? this.onPressPostDetails(this.state.pro2.id) : '' }}
                source={this.state.pro2 ? { uri: this.state.pro2.file } : null}
                style={{fontFamily : 'IBMPlexSans-Regular', height: 72, width: 165, borderRadius: 10 }}
              />
              :
              <Text style={styles.noimage}>No image found</Text>
            }
            {this.state.userData.photos ?
              <Image
                onPress={() => { this.state.pro3 ? this.onPressPostDetails(this.state.pro3.id) : '' }}
                source={this.state.pro3 ? { uri: this.state.pro3.file } : null}
                style={{fontFamily : 'IBMPlexSans-Regular', height: 72, width: 165, marginTop: 10, borderRadius: 10 }}
              />
              :
              <Text style={styles.noimage}>No image found</Text>
            }
          </View>
        </View>
      </View>
    </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  message: {
    fontFamily: 'IBMPlexSans-Regular',
    borderRadius: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: "#535353",
    borderColor: '#E6E8EA',
    borderWidth: 1,
    marginRight: 20
  },
  follow: {
    fontFamily: 'IBMPlexSans-Regular',
    borderRadius: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: 'center',
    alignItems: 'center',
    backgroundColor: '#934CD5',
    color: "#fff"
  },
  noimage: {
    fontFamily: 'IBMPlexSans-Regular',
    backgroundColor: '#ededed',
    height: 80,
    width: "95%",
    borderRadius: 8,
    textAlign: "center",
    textAlignVertical: 'center',
    alignItems: 'center', //Centered vertically

  },
  MainContainer: {
    fontFamily: 'IBMPlexSans-Regular',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0

  },

  GridViewBlockStyle: {
    fontFamily: 'IBMPlexSans-Regular',

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 100,
    margin: 5,
    backgroundColor: '#00BCD4'

  }
  ,

  GridViewInsideTextItemStyle: {
    fontFamily: 'IBMPlexSans-Regular',
    color: '#fff',
    padding: 10,
    fontSize: 18,
    justifyContent: 'center',

  },

});
export default UserProfile;
