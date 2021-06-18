import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import BookRequestScreen from '../screens/BookRequestScreen'
import BookDonateScreen from '../screens/BookDonateScreen'

export const AppTabNavigator = createBottomTabNavigator({
    BookDonate:{
        screen:BookDonateScreen,
        navigationOptions:{
            tabBarIcon:
            <Image
            source={require("../assets/donate.png")}
            style={{width:20,height:20}}
            />
        }
    },
    BookRequest:{
        screen:BookRequestScreen,
        navigationOptions:{
            tabBarIcon:
            <Image
            source={require("../assets/request.png")}
            style={{width:20,height:20}}
            />
        }
    },
    
})