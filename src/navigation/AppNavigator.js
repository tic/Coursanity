import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/SignIn';



const AuthStack = createStackNavigator({ auth : SignIn});
export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    auth: AuthStack,
    Main: MainTabNavigator,
  },
  {
    initialRoute: "auth"
  }
    
  )
  
);
