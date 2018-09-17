import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddTankScreen from '../screens/AddTankScreen';
import ReminderScreen from '../screens/ReminderScreen';
import AddReminderScreen from '../screens/AddReminderScreen';
import CalcScreen from '../screens/CalcScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  AddTank: AddTankScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const ReminderStack = createStackNavigator({
  Reminder: ReminderScreen,
  AddReminder: AddReminderScreen,
});

ReminderStack.navigationOptions = {
  tabBarLabel: 'Reminder',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-notifications${focused ? '' : '-outline'}` : 'md-notifications'}
    />
  ),
};

const CalcStack = createStackNavigator({
  Calc: CalcScreen,
});

CalcStack.navigationOptions = {
  tabBarLabel: 'Calculate',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ReminderStack,
  CalcStack,
});
