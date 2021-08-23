import React, { useEffect, useState} from "react";
import { View, Text, Image, Button , ImageBackground ,TextInput, TouchableOpacity, StyleSheet } from "react-native";
//import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView  } from "react-native-gesture-handler";
import { ListItem, Avatar , Header } from 'react-native-elements'; 
import BottomSheet from 'react-native-simple-bottom-sheet';  
import Styles from "../styles";
import api from '../api'; 
function Journal({navigation}) {
    const [successtext, setSuccesstext] = useState(false);
    const [errortext, setErrortext] = useState(false);
    const [getJournals, setJournals] = useState([]);
    const getJournalss = async => {
        api.getData('journals')
        .then((res)=>{
          setJournals( res.data.data);  
        })
        .catch((error) => {
            console.log(error)
        }) 
    }; 
    useEffect(() => getJournalss(false),[getJournals]); 
    const getData =  (dete) => {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "December"
      ];
      var  d  =  new Date(dete) ;
      var month =  d.getMonth()  ;
     
      var date = d.getDate();
      return  date + ' '+  monthNames[month ];
    }
    return ( 
      
        <ScrollView >
          <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'Journal', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
           { getJournals.map((item, i) => ( 
              
            <ListItem 
            style={{
              padding : 0 ,
              margin : 0 ,
            }}
            > 
        
                <ListItem.Content
                style={{   
                  
                  borderWidth : 1 ,
                  borderRadius : 10  ,
                  height : 120,
                  borderColor : '#efefef',    
                  }} 
                  > 
                  <ListItem.Content style={{  
                    overflow: 'hidden', 
                    color : '#ffffff' , 
                    textAlign :'justify' ,
                    margin : 0 ,
                    height : 100 ,  
                    paddingHorizontal : 10
                    }}>
                    <ListItem.Title style={{ fontSize : 18 , fontWeight : 'bold' , paddingBottom : 8}}>
                     {item.title}
                      </ListItem.Title>
                      <Text>{item.details}</Text>
                      <ListItem.Title style={{ fontSize : 18  , paddingTop : 8}}>
                      { getData(item.created_at)}
                      </ListItem.Title>
                    </ListItem.Content>  
                </ListItem.Content>   
                
            </ListItem> 
                ))
              }
          <ListItem>
            <TouchableOpacity
              style={Styles.journalBtn}
              activeOpacity={0.5} >
              <Text style={Styles.journalText} 
               onPress={() => navigation.navigate('Journal_add') }
              >Create a new Journal</Text>
            </TouchableOpacity>  
          </ListItem>
          
        </ScrollView>
      
    );
}

export default Journal;
