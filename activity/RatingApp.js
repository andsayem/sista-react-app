import React, { Component } from "react";
import { Rating, AirbnbRating } from 'react-native-elements';
import { View } from "react-native";
import {colors  , Header} from 'react-native-elements';
import IconIonic from 'react-native-vector-icons/Ionicons';
class RatingApp extends Component {
  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
  //const WATER_IMAGE = require('../img/Screenshot_4.png')

  render() {
    return (
       <View>  
          <Header 
                leftComponent={<IconIonic  name="arrow-back" color={colors.black} size={30} 
                onPress ={ ( ) =>  this.props.navigation.toggleDrawer()  } /> }
                centerComponent={{ text: 'Rate Us', style: { color: '#1E1E1E' , fontSize : 20  , textAlign : 'left' } }}
                containerStyle={{   
                  color : '1E1E1E',
                  backgroundColor: '#E4E4E4' }}
            /> 
         {/* <AirbnbRating
           count={11}
           reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
           defaultRating={11}
           size={20}
         /> */}

         <Rating
           showRating
           onFinishRating={this.ratingCompleted}
           style={{ paddingVertical: 10 }}
         /> 
        
       </View>
    );
  }
}

export default RatingApp;
