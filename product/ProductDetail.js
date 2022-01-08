
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import Styles from "../styles";
import LinearGradient from 'react-native-linear-gradient';
import IconFea from 'react-native-vector-icons/Feather';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
const STORAGE_KEY = 'save_user';
const TOKEN = 'token';
const StarReview = ({ rate }) => {
    var starComponents = [];
    var fullStar = Math.floor(rate)
    var noStar = Math.floor(5 - rate)
    var halfStar = 5 - fullStar - noStar

    // Full Star
    for (var i = 0; i < fullStar; i++) {
        starComponents.push(
            <Image
                key={`full-${i}`}
                source={icons.starFull}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    // Half Star
    for (var i = 0; i < halfStar; i++) {
        starComponents.push(
            <Image
                key={`half-${i}`}
                source={icons.starHalf}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    // No Star
    for (var i = 0; i < noStar; i++) {
        starComponents.push(
            <Image
                key={`empty-${i}`}
                source={icons.starEmpty}
                resizeMode="cover"
                style={{
                    width: 20,
                    height: 20,
                }}
            />
        )
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {starComponents}
            <Text style={{ marginLeft: SIZES.base, color: COLORS.gray, ...FONTS.body3 }}>{rate}</Text>
        </View>
    )
}

const IconLabel = ({ icon, label }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image
                source={icon}
                resizeMode="cover"
                style={{
                    width: 50,
                    height: 50,
                }}
            />
            <Text style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}>{label}</Text>
        </View>
    )
}

class ProductDetail extends Component {
    constructor(props) {

    }

    // Render
    render() {
        return (
            <View style={styles.container}>
                {/* <ScrollView style={styles.container} >    */}
                {/* Header */}
                <View style={{ flex: 1 }}>
                    <Image
                        source={images.skiVillaBanner}
                        resizeMode="cover"
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                    />
                    {/* <View
                    style={[{
                        position: 'absolute',
                        bottom: "5%",
                        left: "5%",
                        right: "5%",
                        borderRadius: 15,
                        padding: SIZES.padding,
                        backgroundColor: COLORS.white
                    }, styles.shadow]}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.shadow}>
                            <Image
                                source={images.skiVilla}
                                resizeMode="cover"
                                style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 15,
                                }}
                            />
                        </View>

                        <View style={{ marginHorizontal: SIZES.radius, justifyContent: 'space-around' }}>
                            <Text style={{ ...FONTS.h3 }}>Ski Villa</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>France</Text>

                            <StarReview
                                rate={4.5}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: SIZES.radius }}>
                        <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                            Ski Villa offers simple rooms with mountain views in front of the ski lift to the Ski Resort
                        </Text>
                    </View>
                </View> */}

                    {/* Header Buttons */}
                    {/* <View
                    style={{
                        position: 'absolute',
                        top: 50,
                        left: 20,
                        right: 20,
                        //height: 50,
                        flexDirection: 'row',
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Home') }}
                        >
                            <Image
                                source={icons.back}
                                resizeMode="cover"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { console.log("Menu on pressed") }}
                        >
                            <Image
                                source={icons.menu}
                                resizeMode="cover"
                                style={{
                                    width: 30,
                                    height: 30,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View> */}
                </View>

                {/* Body */}
                <View style={{ paddingEnd: 5 }}>
                    {/* Icons */}
                    {/* <View style={{ flexDirection: 'row', marginTop: SIZES.base, paddingHorizontal: SIZES.padding * 2, justifyContent: 'space-between' }}>
                    <IconLabel
                        icon={icons.villa}
                        label="Villa"
                    />

                    <IconLabel
                        icon={icons.parking}
                        label="Parking"
                    />

                    <IconLabel
                        icon={icons.wind}
                        label="4 °C"
                    />
                </View> */}

                    {/* About */}
                    <View style={{ paddingHorizontal: SIZES.padding, paddingTop: 10 }}>
                        <View style={{ marginHorizontal: SIZES.radius, justifyContent: 'space-around' }}>
                            {/* <Text style={{ ...FONTS.h3 }}>Ski Villa</Text>
                            <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>France</Text> */}

                            <StarReview
                                rate={4.5}
                            />
                        </View>
                        <View style={{ width: '100%', flexDirection: "row", }}>
                            <View style={{ width: '80%' }}>
                                <Text style={{ color: '#000', ...FONTS.h2 }}>Man T-Shirt</Text>
                            </View>
                            <View style={{ width: '20%' }}>
                                <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'right', justifyContent: 'flex-end' }}>15$</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: "row", }}>
                            <View style={{ width: '80%' }}>
                                <Text style={{ color: '#8E8E8E', }}>Half Sleeve White Men's Basic t-shirt</Text>
                            </View>
                            <View style={{ width: '20%' }}>
                                <Text style={{ color: '#8E8E8E', textAlign: 'right', justifyContent: 'flex-end' }}>22$</Text>
                            </View>
                        </View>

                        <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: SIZES.padding, paddingTop: 15, paddingEnd: 5, width: '100%' }}>
                        <Text style={{ fontWeight: 'bold', color: '#000' }}>Location</Text>
                        <Text style={{ paddingVertical: 5, fontWeight: 'bold', color: '#000' }}>In New York City , USA</Text>
                    </View>

                </View>
                <View style={{
                    borderRightColor: '#efefef',
                    borderTopWidth: 0.3,
                    marginHorizontal: 25
                }}></View>
                <View style={{ paddingHorizontal: SIZES.padding, paddingTop: 10 }}>
                    <Text style={{ color: '#707070' }}>
                        <IconFea name="message-circle" size={18} paddingEnd={10} color="#9253C1" />
                        Send a message to " My Sista's KeepHer "
                    </Text>
                    <Text style={{
                        color: '#000', width: '100%',
                        borderWidth: 2,
                        padding: 3,
                        marginTop: 10,
                        borderColor: '#efefef',
                        paddingLeft: 10,
                    }}>
                        Hello, is this still available ?
                    </Text>
                </View>

                {/* Footer */}
                {/* <View style={{ flex: 0.5, paddingHorizontal: SIZES.padding }}>
                <LinearGradient
                    style={[{ height: 70, width: '100%', borderRadius: 15 }]}
                    colors={['#edf0fc', '#d6dfff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, marginHorizontal: SIZES.padding, justifyContent: 'center' }}>
                            <Text style={{ ...FONTS.h1 }}>$1000</Text>
                        </View>

                        <TouchableOpacity
                            style={{ width: 130, height: '80%', marginHorizontal: SIZES.radius }}
                            onPress={() => { console.log("Booking on pressed") }}
                        >
                            <LinearGradient
                                style={[{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }]}
                                colors={['#46aeff', '#5884ff']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Text style={{ color: COLORS.white, ...FONTS.h2 }}>BOOKING</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View> */}
                {/* </ScrollView> */}
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 90
                    }}   >
                    <View style={{
                        backgroundColor: '#9253C1',
                        textAlign: 'center',
                        justifyContent: 'center',
                        width: 200,
                        marginVertical: 10,
                        paddingVertical: 10,
                        borderRadius: 30
                    }}>
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 20, marginHorizontal: 10 }}   >Send</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
});

export default ProductDetail;
