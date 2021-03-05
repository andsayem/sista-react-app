import React, { Component } from "react";
import { Rating, AirbnbRating } from 'react-native-elements';
import { View } from "react-native";


class Rateus extends Component {
  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
  //const WATER_IMAGE = require('../img/Screenshot_4.png')

  render() {
    return (
       <View>  
         <AirbnbRating
           count={11}
           reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
           defaultRating={11}
           size={20}
         />

         <Rating
           showRating
           onFinishRating={this.ratingCompleted}
           style={{ paddingVertical: 10 }}
         />

         <Rating
           type='heart'
           ratingCount={3}
           imageSize={60}
           showRating
           onFinishRating={this.ratingCompleted}
         />

         <Rating
           type='custom'
           ratingColor='#3498db'
           ratingBackgroundColor='#c8c7c8'
           ratingCount={10}
           imageSize={30}
           onFinishRating={this.ratingCompleted}
           style={{ paddingVertical: 10 }}
         />
       </View>
    );
  }
}

export default Rateus;
