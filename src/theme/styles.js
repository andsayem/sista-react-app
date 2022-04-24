import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

module.exports = {

  container: {
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    fontFamily: 'IBMPlexSans-Regular',
    width: 300,
    height: 230,
    resizeMode: 'stretch'
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "black",
    textAlign: "center",
    width: "80%",
    backgroundColor: "#f8f8f8",
    borderRadius: 25,
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
  forgot: {
    color: "white",
    fontSize: 11,

  },
  lebel: {
    width: "80%",
    color: "#383838",
    paddingLeft: 15,
    textAlign: "left"
  },
  title: {
    width: "80%",
    paddingLeft: 15,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "left"
  },
  sub_title: {
    fontFamily: 'IBMPlexSans-Regular',
    width: "80%",
    paddingLeft: 15,
    color: "#929292",
    fontSize: 12,
    textAlign: "left"
  },
  signup: {
    textAlign: "center",
    color: "#383838",
    fontSize: 11,
    paddingTop: 25,

  },
  lebel_right: {
    width: "80%",
    paddingRight: 15,
    textAlign: "right"
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#9253C1",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,


  },
  submit_button: {
    width: "80%",
    backgroundColor: "#9253C1",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,


  },
  loginText: {
    fontFamily: 'IBMPlexSans-Regular',
    color: 'white',
    fontWeight: 'bold'
  },
  sub_title_center: {
    width: "80%",
    paddingLeft: 15,
    color: "#929292",
    fontSize: 12,
    textAlign: "center"
  },
  title_center: {
    width: "80%",
    paddingLeft: 15,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center"
  },
  gridView: {
    fontFamily: 'IBMPlexSans-Regular',
    marginTop: 10,
    flex: 1,
  },
  container_tutorial: {
    backgroundColor: '#fff',
    height: '100%',
    alignContent: 'center',
  },
  itemContainer: {
    fontFamily: 'IBMPlexSans-Regular',
    textAlign: 'center',
    paddingTop: 45,
    height: 150,
  },
  itemContainerSlider: {
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    paddingLeft: 60,
    paddingRight: 60
  },
  sub_subtitle: {
    fontFamily: 'IBMPlexSans-Regular',
    textAlign: 'center',
    fontSize: 11,
  },

  lodin_button: {
    fontFamily: 'IBMPlexSans-Regular',
    width: "40%",
    fontSize: 17,
    backgroundColor: "#944CD4",
    borderRadius: 25,
    height: 50,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: '30%',
    paddingTop: 13,
    color: 'white',
    overflow: "hidden"
  },
  box_title: {
    fontFamily: 'IBMPlexSans-Regular',
    color: "#535353",
    fontFamily: "RobotoRegular",
    marginTop: 10,
    fontSize: 17,
  },
  categories_icon: {
    fontFamily: 'IBMPlexSans-Regular',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingBottom: 15,
    marginTop: 10
  },
  cat_icon: {
    fontFamily: 'IBMPlexSans-Regular',
    alignItems: "center",
    justifyContent: "center",
    height: 66,
    width: 66,
    borderRadius: 50,
    backgroundColor: "#ff5c83",
    marginHorizontal: 22,
  },
  following: {
    borderRadius: 25,
    borderColor: '#ff5c83',
    color: '#ff5c83',
    overflow : 'hidden'
  },
  event_title: {
    fontFamily: 'IBMPlexSans-Regular',
    borderColor: '#ff5c83',
    color: '#ff5c83'
  },
  event_date_box: {
    fontFamily: 'IBMPlexSans-Regular',
    padding: 25,
    backgroundColor: "#374485",
    borderTopLeftRadius: 20,
    marginHorizontal: 0,
    borderBottomLeftRadius: 20,
  },
  event_text_box: {
    fontFamily: 'IBMPlexSans-Regular',
    backgroundColor: "#3D21B2",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 0,
  },
  event_date_section: {
    fontFamily: 'IBMPlexSans-Regular',
    backgroundColor: '#FFFFFF',
  },
  journalBtn: {
    width: "100%",
    backgroundColor: "#944CD4",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,


  },
  journalText: {
    fontFamily: 'IBMPlexSans-Regular',
    color: 'white',
    fontWeight: 'bold'
  },

  loginPassword: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#efefef',
    height: 50,
    borderRadius: 25,
    margin: 10
  },
  loginEmail: {

  },
  footer_item: {
    // marginLeft :30,
    marginTop: 8,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#F5EBFE',
    textAlign: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#DCB4FF',
    color: '#ABABAB'
  },
  share_item: {
    paddingBottom: 30,
    color: '#000000',
    marginLeft: 30
  },
  footer_item_shear: {
    // marginLeft :30,
    marginTop: 8,
    marginHorizontal: 20,
    padding: 10,
    backgroundColor: '#F5EBFE',
    textAlign: 'center',
    color: '#000000'
  },
  footer_item_active: {
    backgroundColor: '#944CD4',
    color: '#fff'
  },
  footer_item_view: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
  },
  selectSheet: {
    fontFamily: 'IBMPlexSans-Regular',
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    textAlign: 'center',
    backgroundColor: '#F8F8F8',
    marginHorizontal: 30,
  },
  cat_icon_style: {
    justifyContent: "center",
    height: 55,
    width: 55,
    borderRadius: 50,
    padding: 0,
    backgroundColor: "#EEEEEE",
  },
  cat_icon_active_style: {
    justifyContent: "center",
    height: 55,
    width: 55,
    borderRadius: 50,
    padding: 0,
    backgroundColor: "#944CD4",
  },
  icon_active_color: {
    color: '#FFFFFF'
  },
  icon_color: {
    color: '#000000'
  }
  // event 
  ,
  event_scroll_view: {
    marginHorizontal: -10,
    marginRight: -8,
    marginTop: 1
  },
  event_date: {
    backgroundColor: "#341BA9",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 100,
    width: 80,
    paddingVertical: 20,
    color: '#ffffff',
    alignItems: 'center'
  },
  event_date_view: {
    fontFamily: 'IBMPlexSans-Regular',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    height: 80,
    width: 55,
    paddingTop: 15,
    paddingLeft: 6
  },
  event_date_day_month: {
    fontFamily: 'IBMPlexSans-Bold',
    fontSize: 14,
    position: 'absolute',
    alignItems: 'flex-end',
    textAlign: 'right',
    marginTop: 15,
    marginLeft: 1,
    paddingEnd: 0,
    color: '#341BA9',
    width: '100%'
  },
  event_date_title: {
    fontFamily: 'IBMPlexSans-Bold',
    color: '#341BA9',
    fontSize: 22
  },
  event_date_month_name:
  {
    fontFamily: 'IBMPlexSans-Light',
    color: '#000000', fontSize: 12,
    textAlign: 'center'
  },
  event_info: {
    fontFamily: 'IBMPlexSans-Regular',
    marginHorizontal: -17,
    backgroundColor: "#3D21B2",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 100,
    width: 140,
    paddingStart: 5,
    color: '#ffffff'
  },
  event_title: {
    fontFamily: 'IBMPlexSans-SemiBold',
    color: '#FFFFFF',
    marginTop: -10,
    paddingTop: 0,
    paddingBottom: 5,
    fontSize: 14
  },
  event_time: {
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 5,
    color: '#ffffff',
    fontSize: 10,
  },
  event_icon: {
    fontFamily: 'IBMPlexSans-Regular', flexDirection: 'row', justifyContent: 'flex-start'
  },
  event_address: {
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 5,
    fontSize: 10,
    color: '#ffffff',
  },
  // Category 
  cat_section: {
    fontFamily: 'IBMPlexSans-Regular', paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 0, marginBottom: 1, height: 160
  },
  cat_view: {
    flexDirection: 'row', paddingTop: 10
  },
  cat_section_title: {
    fontFamily: 'IBMPlexSans-SemiBold', paddingLeft: 5, width: '100%', fontSize: 14, color: '#535353'
  },
  cat_scrollview: {
    fontFamily: 'IBMPlexSans-Regular',
    marginHorizontal: -15,
    marginRight: 5,
    marginTop: 1
  },
  cat_list_item: {
    padding: 0, height: 100
  },
  cat_all: {
    padding: -10, margin: 0
  },
  cat_all_listItem: {
    padding: 0, margin: 0, marginRight: -10, marginLeft: -10
  },
  cat_all_title: {
    paddingTop: 10, textAlign: 'center', width: '100%', color: '#535353'
  },
  cat_name: {
    paddingTop: 10, textAlign: 'center', width: '100%', color: '#535353'
  },
  // Heater 
  leftComponent: {
    lex: 1, flexDirection: 'row', flexWrap: 'nowrap', minWidth: 120
  },
  heater_title: {
    textAlign: 'right', fontFamily: 'IBMPlexSans-SemiBold', color: '#000000', fontSize: 18
  },
  containerStyle: {
    fontFamily: 'IBMPlexSans-Regular', color: '1E1E1E', backgroundColor: '#F5F5F5'
  },
  // Posts
  loadert: {
    fontFamily: 'IBMPlexSans-Regular', height: 60, marginBottom: 100
  },
  loading_title: {
    fontFamily: 'IBMPlexSans-Regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  posts_section: {
    fontFamily: 'IBMPlexSans-Regular', backgroundColor: "#F5F5F5", paddingBottom: 5, marginTop: 10
  },
  // post Item 
  post_item: {
    fontFamily: 'IBMPlexSans-Regular', backgroundColor: '#fff', minHeight: 190, width: '100%', borderRadius: 15, paddingBottom: 10
  },
  post_item_view: {
    fontFamily: 'IBMPlexSans-Regular', backgroundColor: "#FEFEFE", width: '100%'
  },
  post_item_user_name: {
    fontFamily: 'IBMPlexSans-SemiBold', fontSize: 15, color: '#0D0E10'
  },
  post_item_cat_name: {
    fontFamily: 'IBMPlexSans-Medium', fontSize: 13, color: '#000000'
  },
  post_date: {
    fontFamily: 'IBMPlexSans-Light', fontSize: 13, color: '#000000'
  },
  activityIndicator: {
    fontFamily: 'IBMPlexSans-Regular',
    top: '50%',
    justifyContent: 'center',
    marginTop: '50%',
    alignItems: 'center',
  },
  following: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 13,
    paddingLeft: 10,
    color: '#0D0E10',
    borderRadius: 16,
    borderWidth: 1,
    height: 35,
    width: 90,
    paddingTop: 8,
    borderColor: '#E6E8EA',
    overflow : 'hidden'
  },
  follow: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 13,
    paddingLeft: 10,
    color: '#0D0E10',
    borderRadius: 16,
    borderWidth: 1,
    height: 35,
    width: 72,
    paddingTop: 8,
    borderColor: '#E6E8EA',
    overflow : 'hidden'
  },
  post_image_bg: {
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: "center"
  },
  post_text_bg: {
    fontFamily: 'IBMPlexSans-Regular',
    color: '#000000',
    fontSize: 13,
    textAlign: "center",
  },
  post_text_view: {
    width: '100%', borderRadius: 10, height: 160, paddingBottom: 5, paddingLeft: 20, paddingRight: 20
  },
  post_rb_sheet: {
    fontFamily: 'IBMPlexSans-Regular', width: '100%'
  },
  text_ReadMore_view: {
    fontFamily: 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, paddingLeft: 20, paddingRight: 20
  },
  text_ReadMore: {
    fontFamily: 'IBMPlexSans-Regular', fontSize: 13, paddingBottom: 9, color: "#707070",
  },
  VideoPlayer: {
    fontFamily: 'IBMPlexSans-Regular', width: '100%', height: 175
  },
  post_image: {
    fontFamily: 'IBMPlexSans-Regular', width: '100%', borderRadius: 10, minHeight: 175
  },
  post_like_section: {
    fontFamily: 'IBMPlexSans-Regular', paddingTop: 10, paddingLeft: 20, paddingRight: 20, flexDirection: "row", width: '100%'
  },
  post_like_view: {
    fontFamily: 'IBMPlexSans-Regular', marginStart: 2, flexDirection: "row", width: '25%'
  },
  like: {
    fontFamily: 'IBMPlexSans-Regular', paddingLeft: 10, color: "#929292"
  },
  post_comment_section: {
    fontFamily: 'IBMPlexSans-Regular', flexDirection: "row", left: 0, width: '25%'
  },
  post_comment_section_icon: {
    fontFamily: 'IBMPlexSans-Regular', alignSelf: 'flex-start'
  },
  post_comment_text: {
    fontFamily: 'IBMPlexSans-Regular', paddingLeft: 12, color: "#929292"
  },
  post_share_icon: {
    fontFamily: 'IBMPlexSans-Regular', alignSelf: 'flex-end'
  },
  post_share_text: {
    fontFamily: 'IBMPlexSans-Regular', alignSelf: 'flex-end'
  },
  // chart 
  chart_live_user: {
    width: 50, textAlign: 'center'
  },
  avatarBorder2: {
    borderWidth: 1.2, borderColor: "#fff", borderRadius: 50,
  },
  avatarBorder: {
    borderWidth: 2, borderColor: "#B16DE4", borderRadius: 50,
  },
  useAvater: {
    backgroundColor: '#fff', padding: 5
  },
  requestsCircle: {
    backgroundColor: '#0287FA', padding: 9, borderRadius: 9
  },
  avaterCircle: {
    backgroundColor: '#B16DE4', padding: 6, borderRadius: 9, marginTop: 29, marginLeft: -29,
  },
  chartListItem: {
    backgroundColor: "#FEFEFE",
    width: '100%',
  },
  chartListFooterComponent: {
    backgroundColor: "#efefef", height: 2
  },
  //charting 
  charting_message: {
    color: "#0D0E10", backgroundColor: '#F5F5F5', borderRadius: 7, padding: 15, textAlign: 'left', marginLeft: 10
  },
  charting_message_sende: {
    backgroundColor: '#944CD4', color: '#fff',
    borderRadius: 7, padding: 15,
  },
  messageitem : {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row', 
    borderRadius:300,
    padding:5,
  },
  messageitemIn : {
    alignSelf: 'flex-end',
  },
  messageitemOut : {
    alignSelf: 'flex-start'
  },
  messageTime : {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#ABABAB",
  },
  messagefooter : {
    flexDirection: 'row',
    height:60,
    backgroundColor: '#fff',
    paddingHorizontal:10,
    padding:5,
  },
  textAreaContainer: {  
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#fff', 
    padding:3,
    width: '100%', 
    fontFamily: 'IBMPlexSans-Regular',
    borderColor: '#efefef',
    borderWidth: 1,
  },
  messageAreaView : {
    flex:1, 
  },
  avaterCircle:{
    backgroundColor: '#0DD452', padding: 6, borderRadius:9, marginTop:37, marginLeft:-28,
  }, 
// New Post 
  post_submit_Button :{
    fontFamily: 'IBMPlexSans-Regular',
      marginRight: 40,
      marginLeft: 40,
      marginTop: 10,
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#efefef'
  },
  checkbox: {
    fontFamily: 'IBMPlexSans-Regular',
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginVertical: 32,
    marginHorizontal: 32,
    borderRadius: 15,
    paddingEnd: 5 
 },
 backgroundImage: {
  fontFamily: 'IBMPlexSans-Regular',
  height: 100,
  width: 100,
  position: 'relative',
  top: 0,
  left: 0,
  marginRight: 5,
  padding: 0,
  margin: 0
},
buttonText: {
  fontFamily: 'IBMPlexSans-Regular',
  color: '#000000',
  textAlign: 'center',
  paddingLeft: 10,
  paddingRight: 10
},
backgroundVideo: {
  fontFamily: 'IBMPlexSans-Regular',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
},
textArea: {
  fontFamily: 'IBMPlexSans-Regular',
  paddingLeft: 10,
  paddingRight: 10,
  height: 150,
},
textareaContainerBg: {
  fontFamily: 'IBMPlexSans-Regular',
  height: 180,
  padding: 5,
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: 'rgba(0,0,0,0)',
},
textarea: {
  fontFamily: 'IBMPlexSans-Regular',
  textAlignVertical: 'top',  // hack android
  height: 170,
  fontSize: 14,
  color: '#333',
  backgroundColor: 'rgba(0,0,0,0)'
},
image_bg: {
  fontFamily: 'IBMPlexSans-Regular',
  flex: 1,
  // width : '30%'
  justifyContent: "center"
},
container_bg: {
  fontFamily: 'IBMPlexSans-Regular',
  flex: 1,
},
loginScrollView : { 
    fontFamily: 'IBMPlexSans-Regular',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
    height : '100%'
  } ,
  loginPageTitle : { 
      fontFamily: 'IBMPlexSans-Regular',
      width: "80%",
      paddingLeft: 15,
      fontSize: 24,
      paddingTop : 30,
      // fontWeight: 'bold',
      textAlign: "left" 
  },
  login_massage : {
    fontFamily: 'IBMPlexSans-Light',
    width: "80%",
    paddingLeft: 15,
    paddingTop: 15,
    color: "#929292",
    fontSize: 14,
    textAlign: "left"
  },
  message_button : {
    fontFamily: 'IBMPlexSans-Regular',
    borderRadius: 16,
    height: 30,
    textAlign: "center",
    textAlignVertical: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    color: "#535353",
    borderColor: '#E6E8EA',
    overflow : 'hidden',
    borderWidth: 1,
    marginRight: 20
  },
   
  follow_button: {
    fontFamily: 'IBMPlexSans-Regular',
    borderRadius:  16,
    height: 30,
    textAlign: "center",
    overflow : 'hidden',
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
  submitButton_news: {
    fontFamily: 'IBMPlexSans-Regular',
    width: '100%',
    position: 'absolute',
    bottom: 65,
    paddingBottom:10,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center',
    flex: 1,
    margin: 'auto',
    paddingLeft: '20%',
    paddingRight: '20%'
  },
  news_Touchable :{
    fontFamily: 'IBMPlexSans-Regular',
    width: "100%",
    backgroundColor: "#944CD4",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15

  }
}
