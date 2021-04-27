import React from 'react' ;
import { View , StyleSheet , Text,  TouchableOpacity} from  'react-native' ;
import { colors } from 'react-native-elements';
import { Icon } from "react-native-elements";  
function PostNextButton({onPress}) {
    return (
        <TouchableOpacity  onPress={onPress}>
            <View style={styles.container}>
                <Text>Next</Text> 
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : {   
    }
})

export default PostNextButton ;