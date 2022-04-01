import React, { Component } from "react";
import { View, FlatList, Text, ActivityIndicator, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem, colors, Icon, Header } from 'react-native-elements';
import Styles from "../styles";
import api from '../api';
import IconEnt from 'react-native-vector-icons/Entypo';
import RBSheet from "react-native-raw-bottom-sheet";
class Journal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      numLines: 3,
      numColumns: 2,
      isLoading: false,
      gridView: true, btnText: 'Show List'
    };
  }
  componentDidMount() {
    this.fatchData();
  }
  componentwillmount() {
    this.fatchData();
  }
  fatchData = () => {
    this.setState({ isLoading: true })
    api.getData('journals')
      .then(response => response.data.data)
      .then(json => this.setState({ items: json }))
      .finally(() => this.setState({ isLoading: false }))
  }
  changeView = () => {
    this.setState({ gridView: !this.state.gridView }, () => {
      if (this.state.gridView) {
        this.setState({ btnText: 'Show List' });
      }
      else {
        this.setState({ btnText: 'Show Grid' });
      }
    });
  }

  getData = (dete) => {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "December"
    ];
    var d = new Date(dete);
    var month = d.getMonth();

    var date = d.getDate();
    return date + ' ' + monthNames[month];
  }
  onPressJournalDetails = (id) => {
    this.props.navigation.navigate('JournalDetails', { id: id });
  }

  handlePressAddJurnal = () => {
    this.props.navigation.navigate('Journal_add');
  }
  journalSettings = () => {
    this.props.navigation.navigate("JournalSettings");
  }
  handleOnRefresh = () => {
    this.setState({ page: 1, data: [] })
    this.setState({ page: 1, refreshing: true, seed: this.state.seed + 1 }, () => {
      this.fatchData();
    })
  }
  state = {
    items: {
    }
  }
  renderRow = ({ item, index }) => {
    const { liked, like, props } = item
    return (
      <ListItem
        style={{fontFamily : 'IBMPlexSans-Regular',
          flex: 1,
          flexDirection: 'column',
          margin: 6,
          //borderStyle: 'solid', 
          // borderWidth: 1,
          borderColor: '#ABABAB',
          borderRadius: 7,
          borderWidth: 1,
          overflow: 'hidden',
          shadowColor: '#efefefe',
          shadowRadius: 10,
          shadowOpacity: 1,

        }}>
        <ListItem.Content
          style={{fontFamily : 'IBMPlexSans-Regular',
          }}>
          <ListItem.Title style={{fontFamily : 'IBMPlexSans-Regular', fontSize: 18, fontWeight: 'bold', paddingBottom: 8 }}
            onPress={() => this.onPressJournalDetails(item.id)} >
            {item.title}
          </ListItem.Title>
          <Text numberOfLines={this.state.numLines} style={{fontFamily : 'IBMPlexSans-Regular', color: '#707070' }} > {item.details}</Text>
          <ListItem.Title style={{fontFamily : 'IBMPlexSans-Regular', fontSize: 18, paddingTop: 8 }}>
            {this.getData(item.created_at)}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
    )
  }
  renderFooter = () => {
    return (
      <View>
        {this.state.isLoading ? (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.title}>Loading Data..</Text>
          </View>
        ) : (
          <View>
            {this.state.refreshing ? (<Text style={styles.title}>Please wait a moment</Text>) : (<Text style={styles.title}>No more Data...</Text>)}
          </View>
        )}
      </View>
    );
  }
  render() {
    let { items, isLoading } = this.state;
    return (
      <SafeAreaView>
        <Header
          leftComponent={<Icon color={colors.black} size={30} name='menu'
            onPress={() => this.props.navigation.toggleDrawer()} ></Icon>}
          centerComponent={{ text: 'Journal', style: { color: '#1E1E1E', fontSize: 20 } }}
          rightComponent={
            <IconEnt name="dots-three-vertical" size={25} color="#1E1E1E"
              onPress={() => this.RBSheet.open()} />
          }
          containerStyle={{
            color: '1E1E1E',
            backgroundColor: '#E4E4E4'
          }}
        />
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={100}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
        >
          <View style={{fontFamily : 'IBMPlexSans-Regular', width: '100%' }}>
            <Text onPress={this.changeView} style={Styles.share_item}>{this.state.btnText}</Text>
            {/* <Text onPress={this.journalSettings} style={Styles.share_item}>Settings</Text> */}

          </View>
        </RBSheet>
        <FlatList
          keyExtractor={(item) => item.id}
          style={{fontFamily : 'IBMPlexSans-Regular',
            backgroundColor: '#ffffff'
          }}
          data={Object.values(this.state.items)}
          renderItem={this.renderRow}
          key={(this.state.gridView) ? 1 : 0}
          numColumns={this.state.gridView ? 2 : 1}
          refreshing={isLoading}
          extraData={this.state}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onRefresh={this.fatchData}
        />
       
        <View style={styles.submitButton}>
          <TouchableOpacity

            style={{fontFamily : 'IBMPlexSans-Regular',
              width: "100%",
              backgroundColor: "#944CD4",
              borderRadius: 25,
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              marginTop: 20,
              marginBottom: 20,
              paddingLeft : 15,
              paddingRight :  15  

            }}
            activeOpacity={0.5}
            onPress={this.handlePressAddJurnal} >
            <Text style={Styles.journalText}
            >Create a new Journal</Text>
          </TouchableOpacity>
        </View> 
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  submitButton: {
    fontFamily : 'IBMPlexSans-Regular',
    width :'100%',
    position: 'absolute',
    bottom: 65,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    alignItems: 'center', 
    flex: 1,
    margin : 'auto',
    paddingLeft : '20%',
    paddingRight : '20%'
  },

  container: {
    fontFamily : 'IBMPlexSans-Regular',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    fontFamily : 'IBMPlexSans-Regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  fixToText: {
    fontFamily : 'IBMPlexSans-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    fontFamily : 'IBMPlexSans-Regular',
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  horizontal: {
    fontFamily : 'IBMPlexSans-Regular',
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  activityIndicator: {
    fontFamily : 'IBMPlexSans-Regular',
    top: '50%',
    justifyContent: 'center',
    marginTop: '50%',
    alignItems: 'center',
  }
});

export default Journal;
