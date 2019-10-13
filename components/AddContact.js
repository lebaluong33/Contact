import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

const userx = {
  id: '',
  name: '',
  phone: '',
};
export default class EditContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
    };
  }
  _exitHandler = () => {
    Actions.pop();
  };
  addContacter = async () => {
    let user = userx;
    user.id = Date.now().toLocaleString();
    user.name = this.state.name;
    user.phone = this.state.phone;
    let key = user.id;
    if (user.name === '' || user.phone === '') {
      Alert.alert('Null');
    } else {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(user));
        Actions.mainScreen();
      } catch (error) {
        console.error(error);
      }
    }
  };
  _onChangeName = event => {
    this.setState({
      name: event,
    });
  };
  _onChangePhone = event => {
    this.setState({
      phone: event,
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuTop}>
          <Icon
            style={styles.menuIcon}
            name="chevron-left"
            size={50}
            onPress={this._exitHandler}
          />
          <Text style={styles.title}>Add Contact</Text>
          <Icon
            style={styles.menuIcon}
            name="check"
            size={50}
            onPress={this.addContacter}
          />
        </View>
        <View style={styles.phoneInfo}>
          <TextInput
            style={styles.phoneName}
            placeholder="NAME:"
            onChangeText={this._onChangeName}
          />
          <TextInput
            style={styles.phoneNumber}
            keyboardType="numeric"
            placeholder="PHONE:"
            onChangeText={this._onChangePhone}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 100,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    color: '#ec4561',
    fontSize: 23,
    height: 'auto',
  },
  menuTop: {
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneInfo: {
    width: '100%',
    flex: 80,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150,
    overflow: 'hidden',
  },
  menuIcon: {
    width: 100,
    height: 100,
    color: '#ec4561',
  },
  phoneName: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 30,
    fontWeight: '400',
  },
});
