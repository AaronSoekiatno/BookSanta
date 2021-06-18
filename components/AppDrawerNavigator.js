import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator';
import CustomSideBarMenu  from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import MyDonationScreen from '../screens/MyDonationScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MyReceivedBookScreen from '../screens/MyReceivedBookScreen';
import {Icon} from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
  Home : {
    screen : AppTabNavigator,
    navigationOptions:{drawerIcon:<Icon name="home" type='font-awesome5'/>}
    },
    MyDonations:{
      screen: MyDonationScreen,
      navigationOptions:{
        drawerIcon:<Icon name="gift" type="font-awesome"/>,
        drawerLabel:"My Donations"
      }
    },
    Notification:{
      screen: NotificationScreen,
      navigationOptions:{
        drawerIcon:<Icon name="bell" type="font-awesome"/>,
        drawerLabel : "Notifications"
      }
    },
    MyReceivedBooks:{
      screen: MyReceivedBookScreen,
      navigationOptions:{
        draweIcon: <Icon name="gift" type="font-awesome"/>,
        drawerLabel : "My Received Books"
      }
    },
    Setting:{
      screen:SettingScreen,
      navigationOptions:{
        draweIcon: <Icon name="settings" type="font-awesome5"/>,
        drawerLabel : "Settings"
      }
    }
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName : 'Home'
  })