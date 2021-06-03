//Example of Infinite Loading Listview in React Native using FlatList
//https://aboutreact.com/infinite-list-view/

//import React in our code
import React, { useState, useEffect } from 'react';

//import all the components we are going to use
import {SafeAreaView, View, Text, RefreshControl, StyleSheet, FlatList, ActivityIndicator,ScrollView} from 'react-native';

const Articles = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => getData(), []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setDataSource(true);
    getData();
    setOffset(offset + 1); 
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
      setDataSource(false);
      getData();
      setOffset(offset + 1); 
    });
  }

  const getData = () => {
    console.log(offset);
    if (!loading && !isListEnd) { 
      setLoading(true);
      //Service to get the data from the server to render
      fetch('http://speechbd.com/api/v1/fontend/posts?column=id&direction=desc&per_page=5&page=' + offset)
        //Sending the currect offset with get request
        .then((response) => response.json())
        .then((responseJson) => {
          //Successful response from the API Call
          console.log(responseJson);
          if (responseJson.model.data.length > 0) {
            setOffset(offset + 1); 
            setDataSource([...dataSource, ...responseJson.model.data]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderFooter = () => {
    return (
      //Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <View style={[styles.activityIndicator]}>  
          <ActivityIndicator size="large" color="#0000ff" /> 
          <Text style={styles.title}>Loading Data...</Text>
        </View>
        ) : null}
      </View>
    );
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}> 
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={.05}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      /> 
    </SafeAreaView>
  );
};

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
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  activityIndicator:{  
    top: '50%',
    justifyContent: 'center',
    marginTop: '50%',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  }
});

export default Articles;
