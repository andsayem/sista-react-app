import React, { Component, useEffect } from 'react';
import {StyleSheet,  FlatList, Text, View, SafeAreaView   } from 'react-native';
import api from '../../providers/api';
import {colors, Icon, Header } from 'react-native-elements';
import Events from '../components/Events';
import Categories from '../components/Categories';
import Post from './Post'; 
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator } from 'react-native-paper';
import Pusher from 'pusher-js/react-native';
import helpers from '../../providers/helpers';
import Styles from "../../theme/styles";
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
class Posts extends Component {
  _isMounted = false;
  constructor(props) {
    super(props); 
    this.fatchData = this.fatchData.bind(this);
    this.fatchUserData = this.fatchUserData.bind(this);
    this.state = {
      items: [],
      isLoading: true,
      cat_id: '',
      cat_active: '',
      userData: [],
      moreLoding: true,
      refreshing: false,
      page: 1
    };
  }

  componentDidMount() {
    this._isMounted = true; 
    this.focusListener = this.props.navigation.addListener('focus',
      () => {  
        this.handleResetParam()         
      });
    var pusher = new Pusher(helpers.pusherConfig().app_key, {
      cluster: helpers.pusherConfig().app_key
    });
    var channel = pusher.subscribe('blog-channel');
    channel.bind('blog-event', function (data) {
    });

  } 
  /* React get method.  */ 
  fatchData = async () => { 
    api.getData('post_datas?cat_id=' + this.state.cat_id + '&page=' + this.state.page)
      .then(response => response.data.data)
      .then((json) => {
        if (json.length > 1) {
          this.setState({ items: this.state.items.concat(json) })
          this.setState({ moreLoding: true })
          this.setState({ page: this.state.page + 1 })
        } else {
          this.setState({ moreLoding: false })
        }
      })
      .finally(() => {
        this.setState({ isLoading: false, refreshing: false, moreLoding: false })
      })
  }
  handleLoadMore = () => {
    if (this.state.moreLoding) {
      this.setState({ page: this.state.page, isLoading: true }, () => { this.fatchData() });
    }

  }
  renderFooter = () => {
    useEffect(() => {
      let isMounted = true;
      this.fatchData().then(data => {
        isMounted = false
      }) 
    }, []) 
    return (
      <View style={ Styles.loadert }>
        {this.state.moreLoding ? (
          <View>
            <ActivityIndicator />
            <Text style={Styles.loading_title}>Loading Data..</Text>
          </View>
        ) : (
          <View>
            <Text style={Styles.loading_title}>Loading Data..</Text>
          </View>
        )}
      </View>
    );
  }
  handleOnRefresh = () => {
    this.setState({ page: 1, items: [] })
    this.setState({ page: 1, refreshing: false, seed: this.state.seed }, () => {
      this.fatchData();
    })
  }

  fatchUserData = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY);
    let user_data = JSON.parse(userData)
    this.setState({ userData: user_data })
  }
  renderRow = ({ item, index }) => {
    const { liked, like, props } = item
    return (
      <View style={{ fontFamily: 'IBMPlexSans-Regular', padding: 5 }}>
        <Post
          item={item}
          index={index.toString()}
          liked={liked}
          like={like}
          user={this.state.userData}
          onPressLike={this.handleLikePost}
          onPressFollow={this.handleFollowPost}
          onPressPostDetails={this.handlePostDetails}
          onPressUserProfile={this.handleUserProfile}
        />
      </View>
    )
  }
  handlePostDetails = (id) => {
    this.props.navigation.navigate('PostDetails', { id: id });
  }
  handleUserProfile = (id) => {
    this.props.navigation.navigate('UserProfile', { id: id });
  }
  handlePostCateWise = (id) => {
    this.handleResetParam()
    this.setState({ cat_id: id }, function () {
      this.fatchData();
    });
  }
  handlePostCates = () => {
    this.handleResetParam()
    this.setState({ cat_id: '' }, function () {
      this.fatchData();
    });
  }
  handleLikePost = index => {
    let post = this.state.items[index]
    const { liked, like } = post
    const newPost = {
      ...post,
      liked: !liked,
      like: liked ? post.like - 1 : post.like + 1
    }
    api.getData('postlike/' + post.id)
    this.setState({
      items: {
        ...this.state.items,
        [index]: newPost
      }
    })
  }
  handleFollowPost = index => {
    let post = this.state.items[index]
    api.getData('following/' + post.user_id).then((res) => {
      this.fatchData();
    })

  }
  handleResetParam = () => {
    this.setState({ items: [], page: 0, cat_id: '' }, function () {
      this.fatchData();
    }); 
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.focusListener;
    this.handlePostCates();
    this.fatchUserData();
    this.renderFooter();
  }
  render() {
    let { isLoading } = this.state;
    let props = this.props;
    return (
      <View>
        <Header
          leftComponent={<View style={ Styles.leftComponent }>
            <Icon style={{ textAlign: 'left' }} color={colors.black} size={24} name='menu'
              onPress={() => props.navigation.toggleDrawer()} ></Icon>
            <Text style={Styles.heater_title}> Inspire me</Text>
          </View>
          }
          rightComponent={<View style={{ flexDirection: 'row', flexWrap: 'nowrap', minWidth: 60 }}>
            <Icon style={{ textAlign: 'left', paddingRight:12 }} color={colors.black} size={24} name='search' ></Icon>
            <Icon style={{ textAlign: 'left' }} color={colors.black} size={24} name='notifications' ></Icon>
          </View>
          } 
          containerStyle={Styles.containerStyle}
        />
        <View style={Styles.posts_section}>
          <SafeAreaView>
            <FlatList
              data={Object.values(this.state.items)}
              keyExtractor={(item) => new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}

              onEndReached={this.handleLoadMore}
              renderItem={this.renderRow}
              ListFooterComponent={this.renderFooter}
              onEndReachedThreshold={200}
              refreshing={this.state.refreshing}
              onRefresh={this.handleOnRefresh}
              ListHeaderComponent={
                <View>
                  <Events  style={{marginHorizontal:-10}}/> 
                    <Categories
                      cat_id={this.state.cat_id}
                      handleAllPost={this.handlePostCates}
                      handlePostCate={this.handlePostCateWise} />
                </View>}
            />
          </SafeAreaView>
        </View>
      </View>
    )
  } 
}
 
export default Posts;