import { StyleSheet } from "react-native";

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
    backgroundColor:"#FF5D8E",
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
    backgroundColor:"#FF5D8E",
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
}
