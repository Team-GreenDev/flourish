import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../icons/TabBarIcon';
import UploadRouteScreen from '../screens/Upload/UploadRouteScreen'
import ProfileScreen from '../screens/ProfileScreen';
import MessageRouteScreen from '../screens/Messages/MessageRouteScreen';
import SearchRouteScreen from '../screens/Search/SearchRouteScreen';
import HomeRouteScreen from '../screens/Home/HomeRouteScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name=" "
        component={HomeRouteScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="  "
        component={SearchRouteScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
      <BottomTab.Screen
        name="   "
        component={UploadRouteScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add-circle" />,
        }}
      />
      <BottomTab.Screen
        name="     "
        component={MessageRouteScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-text" />,
        }}
      />
      <BottomTab.Screen
        name="    "
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case ' ':
      return 'Flourish';
    case '  ':
      return 'Search';
    case '   ':
      return 'Upload';
    case 'Notification':
      return 'What\'s happening!';
    case '    ':
      return '';
    case '     ':
      return 'Messages';
  }
}