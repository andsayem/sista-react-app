import React, { Component } from "react";
import { Platform, StyleSheet, FlatList, Text, View, Alert } from "react-native";
import { ListItem, Avatar, SearchBar, colors, Icon, Header } from 'react-native-elements';
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
                <Header
                    leftComponent={<View>
                        <Icon color={colors.black} size={30} name='menu'
                            onPress={() => props.navigation.toggleDrawer()} ></Icon>
                    </View>}
                    centerComponent={{ text: 'Events', style: { color: '#1E1E1E', fontSize: 20  , textAlign : 'left'} }} 
                    containerStyle={{ color: '1E1E1E', backgroundColor: '#E4E4E4' }}

                />
                <FlatList
                    style={{ margin: 10 }}
                    data={this.state.GridListItems}
                    renderItem={({ item }) =>
                        <View style={styles.GridViewContainer}>
                            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }} onPress={this.GetGridViewItem.bind(this, item.key)} > Poetry With Sista </Text>
                            <Text style={{
                                color: '#ffffff',
                            }} > <Icon color="#fff" style={{ padding: 2 }} type='font-awesome' name="clock-o" size={12} />  4:00 Pm</Text>
                            <Text style={{
                                color: '#ffffff',
                            }} > <Icon color="#fff" style={{ padding: 2 }} type='font-awesome' name="map-marker" size={12} />  Los Angeles, Calefornia</Text>

                            <Text style={{ color: '#FFFFFF' }} >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of</Text>

                        </View>}
                    numColumns={1}
                />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    },
    GridViewContainer: {
        flex: 1,
        padding: 10,
        //    justifyContent: 'center',
        //    alignItems: 'center',
        height: 150,
        margin: 15,
        borderRadius: 10,
        backgroundColor: '#6C63FF'
    },
    GridViewTextLayout: {
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: 'center',
        color: '#fff',
        padding: 10,
    }
});