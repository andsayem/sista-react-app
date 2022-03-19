import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Styles from "../styles";
import api from '../api';
import LinearGradient from 'react-native-linear-gradient';
import IconFea from 'react-native-vector-icons/Feather';
import { images, icons, COLORS, FONTS, SIZES } from '../constants';
import AutoHeightImage from 'react-native-auto-height-image';
import helpers from '../helpers';
const win = Dimensions.get('window').width;
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
         super(props);
         this.fatchData = this.fatchData.bind(this);
         this.state = {
            item: [],
            isLoading: false,
            currency:'',
         }
    }
    componentDidMount() { 
    this.fatchData(); 
    }
    componentWillUnmount() { 
    this.fatchData(); 
    }
    fatchData = () => {  
        this.setState({ isLoading: true })
        api.getData('products/' + this.props.route.params.item.id)
          .then(response => {
            this.setState({ item: response.data.data }) 
            //console.log('Product details', response.data.data)
          })
          .finally(() => this.setState({ isLoading: false }))
      }

    // Render
    render() {
        return (
            <SafeAreaView style={styles.container}>
            <ScrollView> 
                {/* <ScrollView style={styles.container} >    */}
                {/* Header */}
                <View style={{ flex: 1, marginTop:20}}>
                <AutoHeightImage
                    width={win}
                    source={{ uri: this.props.route.params.item.file ? this.props.route.params.item.file : '' }}
                />  
                    
                </View>

                {/* Body */}
                <View style={{ paddingEnd: 5 }}>
                    
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
                                <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'right', justifyContent: 'flex-end' }}>
                                {helpers.currency(this.props.route.params.item.price_offer,this.state.currency)}
                                </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: "row", }}>
                            <View style={{ width: '80%' }}>
                                <Text style={{ color: '#8E8E8E', }}>Half Sleeve White Men's Basic t-shirt</Text>
                            </View>
                            <View style={{ width: '20%' }}>
                                <Text style={{ color: '#8E8E8E', textAlign: 'right', justifyContent: 'flex-end', textDecorationLine: 'line-through' }}>
                                {helpers.currency(this.props.route.params.item.price,this.state.currency)}
                                </Text>
                            </View>
                        </View>

                        <Text style={{ marginTop: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }}>
                           {this.state.item.title}
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
                </ScrollView>
            </SafeAreaView>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: 13,
        paddingBottom: 4,
        paddingRight: 1,
        paddingLeft: 1,
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
