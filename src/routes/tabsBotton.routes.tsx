import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListItems } from '../screens/ListItems';
import colors from '../styles/colors';
import Feather from '@expo/vector-icons/Feather';

const Tab = createBottomTabNavigator();

export function TabBotton() {
    return (
        <Tab.Navigator
            tabBarOptions={
                {
                    activeTintColor: colors.warning,
                    inactiveTintColor: colors.shape,
                    tabStyle: {
                        paddingBottom: 5,
                        paddingTop: 5,
                    },
                    style: {
                        height: 70,
                    },
                    labelStyle: {
                        fontSize: 15
                    }
                }
            }
        >
            <Tab.Screen name="Items" component={ListItems} options={
                {
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="package" size={30} color={colors.warning} />
                    ),
                }

            } />
        </Tab.Navigator>
    );
}