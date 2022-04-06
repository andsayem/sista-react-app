import React, { Component } from "react";
import { Rating } from 'react-native-elements';
import { View } from "react-native";
import {colors  , Header} from 'react-native-elements';
import IconIonic from 'react-native-vector-icons/Ionicons';
class RatingApp extends Component {
  ratingCompleted(rating) { 
  } 
  render() {
    return (
       <View>  
          <Header 
                leftComponent={<IconIonic  name="arrow-back" color={colors.black} size={30} 
                onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } /> }
                centerComponent={{ text: 'Rate Us', style: { color: '#1E1E1E' , fontSize : 20  , textAlign : 'left' } }}
                containerStyle={{   
                  color : '1E1E1E',
                  backgroundColor: '#F5F5F5' }}
            />  
         <Rating
           showRating
           onFinishRating={this.ratingCompleted}
           style={{fontFamily : 'IBMPlexSans-Regular', paddingVertical: 10 }}
         /> 
        
       </View>
    );
  }
}

export default RatingApp;
