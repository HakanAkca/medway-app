import React from 'react'
import { View } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { get } from "../Api/Util";
import { withNavigation } from "react-navigation"
import { ColorSet } from '../Themes/index'


class MedicalFileAppointmentRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this._navigateTo = this._navigateTo.bind(this);
    }

    _navigateTo(pageName, params) {
        this.props.navigation.navigate(pageName, params)
    }

    async componentWillMount () {
        this.setState({
            userId: await get("USER_ID")
        })
    }

    render() {
        const otherUser = this.props.data.toUser._id === this.state.userId ? this.props.data.fromUser : this.props.data.toUser;

        return (
            <View>
                <ListItem
                    key={this.props.data._id}
                    title='Rendez vous'
                    subtitle={'avec ' + otherUser.name}
                    onPress={() => this._navigateTo('AppointmentDetails', {appointment: this.props.data})}
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
                            name="calendar"
                            type="material-community"
                            size={24}
                        />
                    }
                />
            </View>
        );
    }
}


export default withNavigation(MedicalFileAppointmentRow)
