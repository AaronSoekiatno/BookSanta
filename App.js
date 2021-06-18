import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import WelcomeScreen from './screens/WelcomeScreen';
import {AppDrawerNavigator} from './components/AppDrawerNavigator';

export default class App extends React.Component {
  render() {
    return(
      <SafeAreaProvider>
        <AppContainer/>
      </SafeAreaProvider>
    )
  }
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator)