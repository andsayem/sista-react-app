import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert } from "react-native";

export default class EventsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      GridListItems: [
        { key: "Item1" },
        { key: "Item2" },
        { key: "Item3" },
        { key: "Item4" },
        { key: "Item5" },
        { key: "Item6" },
        { key: "Item7" },
        { key: "Item8" },
        { key: "Item9" },
        { key: "Item10" },
        { key: "Item11" },
        { key: "Item12" },
        { key: "Item13" },
        { key: "Item14" },
      ]
    };
  }

  GetGridViewItem(item) {
    Alert.alert(item);
  }

  render() {
     return (
       <View style={styles.container}>
         <FlatList
            data={ this.state.GridListItems }
            renderItem={ ({item}) =>
              <View style={styles.GridViewContainer}>
               <Text style={styles.GridViewTextLayout} onPress={this.GetGridViewItem.bind(this, item.key)} > {item.key} </Text>
              </View> }
            numColumns={2}
         />
       </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   height: 100,
   margin: 5,
   backgroundColor: '#7B1FA2'
},
GridViewTextLayout: {
   fontSize: 20,
   fontWeight: 'bold',
   justifyContent: 'center',
   color: '#fff',
   padding: 10,
 }
});