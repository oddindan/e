
import React, {
  Component, 
  ListView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  ToolbarAndroid,
 } from 'react-native'

import styles from './styles.js'
import settings from '../../../settings.js'
import ListItem from '../../Gua/ListItem'

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class Mark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: ds.cloneWithRows(this.props.markSource),
    }
  }

  renderListItem(rowData) {
    return <ListItem rowData={rowData} {...this.props}/>
  }

  render() {
    let dataSource = this.state.dataSource
    return(
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.toolbar}
            title={settings.tips.CN.mark}
            titleColor='#fff'
            navIcon={settings.icons.back}
            onIconClicked={this.props.back} />
          <ListView
            dataSource={dataSource}
            renderRow={this.renderListItem.bind(this)}
           />
        </View>
      )
  }
 }

