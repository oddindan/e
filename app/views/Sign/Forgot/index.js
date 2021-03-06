import React, {
  Component,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native'

import settings from '../../../settings.js'
import styles from './styles.js'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
    }
  }

  handleEmail(value) {
    this.setState({email: value})
  }

  goSignUp() {
    this.props.nav(settings.routes.signUp)
  }

  goSignIn() {
    this.props.nav(settings.routes.signIn)
  }

  handleSubmit() {
    let email = this.state.email
    let valid = this.props.valid
    if (!valid.isEmail(email)) {
      ToastAndroid.show(settings.valid.CN.invalidEmail, ToastAndroid.SHORT)
      return
    }
    this.forgot(email)
  }

  forgot(email) {
    let url = settings.url.reset
    let request = this.props.request
    let body = {email: email}
    fetch(url, request('post', body))
    .then(res => res.json())
    .then(json => {
      if (!json.code) {
        Alert.alert(settings.tips.CN.success, settings.tips.CN.reset)
        this.setState({email: ''})
      }
      else
        Alert.alert(settings.tips.CN.failed, json.error)
    })
  }

  render() {
    let email = this.state.email
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={settings.icons.e} style={styles.img}/>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholderTextColor='#ccc'
            value={email}
            onChangeText={this.handleEmail.bind(this)} 
            placeholder={settings.placeholders.CN.sign.email}/>
        </View>
        <View style={styles.lable}>
          <TouchableOpacity onPress={this.goSignIn.bind(this)}>
            <Text style={styles.lableText}>{settings.tips.CN.toSignIn}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.goSignUp.bind(this)}>
            <Text style={styles.lableText}>{settings.tips.CN.toSignUp}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleSubmit.bind(this)}>
          <View style={styles.submit}>
            <Text style={styles.submitText}>{settings.tips.CN.send}</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    )
  }
}