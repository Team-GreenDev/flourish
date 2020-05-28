import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from './constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={35}
      style={{ marginBottom: -3, marginVertical: 5 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
