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
    paddingTop: 15,
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
    color: '#ff5c83'
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
    { fontFamily: 'IBMPlexSans-Light', 
    color: '#000000', fontSize: 12, 
    textAlign: 'center' },
  event_info : {
    fontFamily: 'IBMPlexSans-Regular',
    marginHorizontal: -17,
    backgroundColor: "#3D21B2",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 100,
    width: 140,
    paddingStart: 5,
    color: '#ffffff'
  } ,
  event_title :{
    fontFamily: 'IBMPlexSans-SemiBold',
    color: '#FFFFFF',
    marginTop:-10,
    paddingTop: 0,
    paddingBottom: 5,
    fontSize: 14
  },
  event_time : {
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 5,
    color: '#ffffff',
    fontSize:10,
  } ,
  event_icon :{
    fontFamily: 'IBMPlexSans-Regular', flexDirection: 'row', justifyContent: 'flex-start' 
  } ,
  event_address :{
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 5,
    fontSize:10,
    color: '#ffffff',
  }
}
