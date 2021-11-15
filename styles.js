import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";

module.exports={
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },

  logo: {
    width: 300,
    height: 230,
    resizeMode: 'stretch'
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black",
    textAlign : "center",
    width:"80%",
    backgroundColor:"#f8f8f8",
    borderRadius:25,
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
  forgot:{
    color:"white",
    fontSize:11,

  },
  lebel :{
    width:"80%",
    color : "#383838" ,
    paddingLeft: 15,
    textAlign: "left"
  },
  title :{
    width:"80%",
    paddingLeft: 15,
    fontSize: 22 ,
    fontWeight : 'bold',
    textAlign: "left"
  },
  sub_title : {
    width:"80%",
    paddingLeft: 15,
    color : "#929292",
    fontSize: 12 ,
    textAlign: "left"
  },
  signup :{
    textAlign : "center" ,
    color : "#383838" ,
    fontSize:11,
    paddingTop :25 ,

  },
  lebel_right:{
    width:"80%",
    paddingRight: 15,
    textAlign: "right"
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#9253C1",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    textAlign : "center",
    marginTop:20,
    marginBottom:10,


  },
  loginText : {
    color : 'white',
    fontWeight: 'bold'
  },
  sub_title_center:{
    width:"80%",
    paddingLeft: 15,
    color : "#929292",
    fontSize: 12 ,
    textAlign: "center"
  } ,
  title_center :{
    width:"80%",
    paddingLeft: 15,
    fontSize: 22 ,
    fontWeight : 'bold',
    textAlign: "center"
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  container_tutorial :{
    backgroundColor : '#fff',
    height : '100%',
    alignContent : 'center',
  },
  itemContainer: {
    textAlign: 'center',
    paddingTop: 15 ,
    height: 150,
  },
  itemContainerSlider :{
    textAlign: 'center',
  },
  subtitle : {
    fontSize :18 ,
    fontWeight :'bold',
    textAlign: 'center',
    alignItems: 'center',
    paddingLeft : 60 ,
    paddingRight : 60
  },
  sub_subtitle : {
    textAlign: 'center',
    fontSize :11 ,
  },

  lodin_button: {
    width:"40%",
    fontSize: 17 ,
    backgroundColor:"#944CD4",
    borderRadius:25,
    height:50,
    textAlign : "center",
    marginTop:20,
    marginBottom:10,
    alignContent: 'center',
    alignItems : 'center',
    marginLeft : '30%',
    paddingTop: 13,
    color : 'white',
  },
  box_title : {
    color: "#535353",
    fontFamily: "RobotoRegular",
    marginTop: 10,
    fontSize: 17,
  },
  categories_icon : {
    paddingHorizontal: 10 ,
    backgroundColor: '#fff' ,
    paddingBottom : 15 ,
    marginTop : 10
  },
  cat_icon : {
    alignItems: "center",
    justifyContent: "center",
    height: 66,
    width: 66,
    borderRadius: 50,
    backgroundColor: "#ff5c83",
    marginHorizontal: 22,
  },
  following :{
    borderRadius:25 ,
    borderColor : '#ff5c83',
    color : '#ff5c83'
  },
  event_title : {  
      borderColor : '#ff5c83',
      color : '#ff5c83'
  },
  event_date_box : { 
    padding : 25, 
    backgroundColor: "#374485", 
    borderTopLeftRadius: 20, 
    marginHorizontal : 0 ,
    borderBottomLeftRadius: 20,
  },
  event_text_box : {  
    backgroundColor: "#3D21B2", 
    borderTopRightRadius: 20, 
    borderBottomRightRadius: 20,
    marginLeft : 0 ,
  },
  event_date_section : {
    backgroundColor :  '#FFFFFF' , 
  },
  journalBtn:{
    width:"100%",
    backgroundColor:"#944CD4",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    textAlign : "center",
    marginTop:20,
    marginBottom:10,


  },
  journalText : {
    color : 'white',
    fontWeight: 'bold'
  },

  loginPassword:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#efefef',
    height:50,
    borderRadius:25, 
    margin: 10
  },
  loginEmail:{

  },
  footer_item :{
   // marginLeft :30,
    marginTop :8,
    marginHorizontal :20 ,
    padding : 10,     
    backgroundColor : '#F5EBFE', 
    textAlign : 'center',
    borderRadius : 50,
    borderWidth :1 , 
    borderColor : '#DCB4FF',
    color : '#ABABAB'
  },
  share_item :{
    paddingBottom : 30,
    color : '#000000' ,
    marginLeft : 30
  },
  footer_item_shear :{
   // marginLeft :30,
    marginTop :8,
    marginHorizontal :20 ,
    padding : 10,     
    backgroundColor : '#F5EBFE', 
    textAlign : 'center', 
    color : '#000000'
  },
  footer_item_active :{ 
     backgroundColor : '#944CD4',
     color : '#fff'
   },
  footer_item_view :{
    flexDirection: 'row',
    width : '100%',
    justifyContent: "center",
    alignItems: "center",
    textAlign : 'center', 
  },
  selectSheet : {
    width : '100%',
    justifyContent: "center",
    alignItems: "center",
    textAlign : 'center', 
    backgroundColor : '#F8F8F8',
    marginHorizontal :30 ,
  },
  cat_icon_style:{
    justifyContent: "center",
    height: 66,
    width: 66,
    borderRadius: 50,
    backgroundColor: "#EEEEEE",
  },
  cat_icon_active_style:{
    justifyContent: "center", 
    height: 66, 
    width: 66, 
    borderRadius: 50, 
    backgroundColor: "#944CD4", 
  },
  icon_active_color :{
    color : '#FFFFFF'
  },
  icon_color :{
    color : '#000000'
  }


}
