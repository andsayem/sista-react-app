import React from 'react';
import {Button, View, Text, ScrollView, Image, StyleSheet, SafeAreaView, RefreshControl} from 'react-native' 
function Post({navigation,route}){
  const { item } = route.params;
  const stripedHtml = item.description.replace(/<[^>]+>/g, '');
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

    return(
      <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{flexDirection:'row', backgroundColor:'white', margin:5, flex:100}}>  
          <View style={{flex:100,padding:5}}> 
          <Image style={{height:200,width:"100%"}} 
            source={{uri:'https://speechbd.com/public/img/post/large_thumbnail/'+item.featured_img}}/>
            <Text style={styles.title}>{item.title}</Text>
            <Text note >{item.excerpts}</Text> 
            <Text note >{stripedHtml}</Text> 
            <View style={styles.hr}></View> 
            <Button
              title="Go Back"
              onPress={() => 
                navigation.goBack()
              }
            />
          </View>
        </View>  
      </ScrollView>  
      </SafeAreaView>
    )
}
export default Post;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
}); 
 