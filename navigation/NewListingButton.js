import React from 'react' ;
import { View , StyleSheet , TouchableOpacity} from  'react-native' ;
import { colors } from 'react-native-elements';
import { Icon } from "react-native-elements"; 
import Chats from "../activity/Chats"; 
function NewListingButton(onPress) {
    return (
        <TouchableOpacity  onPress={Chats}>
            <View style={styles.container}>
                <Icon name='add' color={colors.white} size={30} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : { 
        alignItems : 'center',
        backgroundColor : '#FF5D8E' ,
        borderColor :  colors.white ,
        color : colors.white,
        borderWidth : 10,
        borderRadius : 40 , 
        height : 80 ,
        bottom :22,
        justifyContent : 'center',
        width : 80  
    }
})

export default NewListingButton ;