import React from 'react' ;
import { View , StyleSheet , TouchableOpacity} from  'react-native' ;
import { colors } from 'react-native-elements';
import { Icon } from "react-native-elements"; 
import { DrawerActions } from '@react-navigation/native';
function MyCustomLeftComponent() {
    return (
        <TouchableOpacity onPress={() => DrawerActions.openDrawer()} >
            <View style={styles.container}>
                <Icon name='menu' color={colors.white} size={30} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container : { 
        
        
    }
})

export default MyCustomLeftComponent ;