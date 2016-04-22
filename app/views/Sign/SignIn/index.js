import React, {
  Component,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native'

import settings from '../../../settings.js'
import styles from './styles.js'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleUsername(value) {
    this.setState({username: value})
  }

  handlePassword(value) {
    this.setState({password: value})
  }

  goSignUp() {
    this.props.nav(settings.routes.signUp)
  }

  goForgot() {
    this.props.nav(settings.routes.forgot)
  }

  signIn() {
    let request = this.props.request
    let url = settings.url.signIn
    let username = this.state.username
    let password = this.state.password
    let body = {username: username, password: password}
    let storage = this.props.storage
    fetch(url, request('post',body))
     .then((res) => {
      if (res.ok) {
        storage.save({
          key: 'currentUser',
          details: res._bodyInit
        })
        this.props.hideSign()
      }
      else
        Alert.alert(settings.tips.CN.failed, JSON.parse(res._bodyInit).error)
     })
  }

  render() {
    let username = this.state.username
    let password = this.state.password
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={settings.icons.e} style={styles.img}/>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            value={username}
            onChangeText={this.handleUsername.bind(this)} 
            placeholder={settings.placeholders.CN.sign.username}/>
        </View>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            value={password}
            secureTextEntry={true} 
            onChangeText={this.handlePassword.bind(this)} 
            placeholder={settings.placeholders.CN.sign.password}/>
        </View>
        <View style={styles.lable}>
          <TouchableOpacity onPress={this.goForgot.bind(this)}>
            <Text style={styles.lableText}>{settings.tips.CN.forgot}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goSignUp.bind(this)}>
            <Text style={styles.lableText}>{settings.tips.CN.toSignUp}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.signIn.bind(this)}>
          <View style={styles.submit}>
            <Text style={styles.submitText}>{settings.tips.CN.signIn}</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    )
  }
}