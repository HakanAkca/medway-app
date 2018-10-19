import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'

import HomeScreen from '../Containers/HomeScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import AppointmentDetailsScreen from '../Containers/AppointmentDetailsScreen'
import AppointmentBookingScreen from '../Containers/AppointmentBookingScreen'
import DoctorListScreen from '../Containers/DoctorListScreen'
import MedicalFile from '../Containers/MedicalFileScreen'
import ReportScreen from '../Containers/ReportScreen'
import AppointmentComingScreen from '../Containers/AppointmentScreen'
import OrdonnanceViewerScreen from '../Containers/OrdonnanceViewerScreen'
import CallAcceptedWaitingScreen from '../Containers/CallAcceptedWaitingScreen'
import Test from '../Containers/MedwayTwilio'

const HomeStack = createStackNavigator({
    Home: {screen: HomeScreen},
    CallAcceptedWaiting: {
      screen: CallAcceptedWaitingScreen,
      navigationOptions: () => ({
        tabBarIcon: () => (
          <Icon
            name="account-settings-variant"
            type="material-community"
            size={24}
          />
        ),
        title: 'Connexion à l\'appel'
      })
    },
    Test: {
      screen: Test
    }
  },
  {
    headerMode: 'none',
  })

const ProfileStack = createStackNavigator({
  Profile: {screen: ProfileScreen},
}, {
  headerMode: 'none',
})

const DoctorStack = createStackNavigator({
  Doctor: {screen: DoctorListScreen},
  AppointmentBooking: {screen: AppointmentBookingScreen}
}, {
  headerMode: 'none',
})

const OrderStack = createStackNavigator({
  Medical: {screen: MedicalFile},
  Report: {screen: ReportScreen},
  Ordonnance: {screen: OrdonnanceViewerScreen}
}, {
  headerMode: 'none',
})

const AppointmentStack = createStackNavigator({
  Appointment: {
    screen: AppointmentComingScreen,
    navigationOptions: {
      title: 'Mes rendez-vous',
      headerStyle: {
        backgroundColor: '#19A0D8'
      },
      headerTitleStyle: {
        alignSelf: 'center'

      }
    },
  },
  AppointmentDetails: {screen: AppointmentDetailsScreen}
})

export default AppStack = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: () => ({
      tabBarLabel: 'Accueil',
      tabBarIcon: () => (
        <Icon
          name="home-circle"
          type="material-community"
          size={24}
        />
      ),
      title: 'Accueil'
    }),
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: () => ({
      tabBarIcon: () => (
        <Icon
          name="account-settings-variant"
          type="material-community"
          size={24}
        />
      ),
      title: 'Profil'
    })
  },
  Doctor: {
    screen: DoctorStack,
    navigationOptions: () => ({
      tabBarIcon: () => (
        <Icon
          name="account-settings-variant"
          type="material-community"
          size={24}
        />
      ),
      title: 'Docteurs'
    }),
  },
  Order: {
    screen: OrderStack,
    navigationOptions: () => ({
      tabBarIcon: () => (
        <Icon
          name="account-settings-variant"
          type="material-community"
          size={24}
        />
      ),
      title: 'Dossier Medical'
    }),
  },
  Appointment: {
    screen: AppointmentStack,
    navigationOptions: () => ({
      tabBarIcon: () => (
        <Icon
          name="account-settings-variant"
          type="material-community"
          size={24}
        />
      ),
      title: 'Rendez-vous'
    })
  },
})