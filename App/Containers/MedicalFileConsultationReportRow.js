import React from 'react'
import { View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { ColorSet } from '../Themes/index'

class MedicalFileConsultationReportRow extends React.Component {

  constructor (props) {
    super(props)

    this._navigateTo = this._navigateTo.bind(this)
  }

  _navigateTo (pageName, params) {
    this.props.navigation.navigate(pageName, params)
  }

  render () {
    return (
      <View>
        <ListItem
          key={this.props.data._id}
          title='rapport de consultation'
          subtitle={'fournie par le docteur ' + this.props.data.fromDoctor.name}
          onPress={() => this._navigateTo('Report', {report: this.props.data})}
          titleStyle={{color: ColorSet.TextLight}}
          subtitleStyle={{fontSize: 12, fontWeight: '300', color: ColorSet.TextLight}}
          containerStyle={{
            paddingVertical: 25,
            marginVertical: 2,
            backgroundColor: ColorSet.Primary,
            borderRadius: 10,
            marginHorizontal: 10
          }}
          avatar={
            <Icon
              color={ColorSet.TextLight}
              name="folder-open"
              type="material-community"
              size={24}
            />
          }
        />
      </View>
    )
  }
}

export default withNavigation(MedicalFileConsultationReportRow)
