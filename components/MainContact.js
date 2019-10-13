import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import {SearchBar, Icon} from 'react-native-elements';
import {FloatingAction} from 'react-native-floating-action';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

export default class MainContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      contacters: [],
    };
  }
  _updateSearch = search => {
    this.setState({search});
  };
  async componentDidMount() {
    try {
      let keys = await AsyncStorage.getAllKeys();
      keys.forEach(async inKey => {
        let contacter = JSON.parse(await AsyncStorage.getItem(inKey));
        let data = [...this.state.contacters, contacter];
        this.setState({contacters: data});
      });
    } catch (e) {
      console.error(e);
    }
  }
  _dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };
  render() {
    const {search} = this.state;
    return (
      <View style={styles.container}>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={this._updateSearch}
          value={search}
          lightTheme={true}
        />
        <FlatList
          data={this.state.contacters}
          extraData={this.state.contacters}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.contacter}>
                <TouchableOpacity
                  style={styles.contacterInfo}
                  onPress={() => {
                    Actions.editContactScreen({
                      id: item.id,
                      name: item.name,
                      phone: item.phone,
                    });
                  }}>
                  <Icon name="people" color="#3c4db7" />
                  <View style={styles.phone}>
                    <Text style={styles.phoneName}>{item.name}</Text>
                    <Text style={styles.phoneNumber}>{item.phone}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    name="call"
                    color="#89c440"
                    onPress={() => this._dialCall(item.phone)}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <FloatingAction
          animated={false}
          onPressMain={() => {
            Actions.addContactScreen();
          }}
          showBackground={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  search: {
    padding: 0,
  },
  phone: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneName: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 19,
    fontWeight: '500',
    color: '#ec4561',
  },
  contacter: {
    paddingHorizontal: 30,
    flex: 1,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#afb9c4',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dadfe5',
  },
  contacterInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
});
