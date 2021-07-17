import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListItems } from '../screens/ListItems';
import colors from '../styles/colors';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import { ListYales } from '../screens/ListYales';
import { Records } from '../screens/Records';
import { ItemCreate } from '../screens/ItemCreate';

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

                    },
                    labelStyle: {
                        fontSize: 10,
                        fontWeight: 'bold'
                    }
                }
            }
        >
            <Tab.Screen
                name="Automotivos"
                component={ListItems}
                options={{
                    tabBarLabel: "Automotivos",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="ios-car-outline" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Yales"
                component={ListYales}
                options={{
                    tabBarLabel: "Yales",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="key-outline" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Registros"
                component={Records}
                options={{
                    tabBarLabel: "Registros",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="newspaper-outline" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Inserir"
                component={ItemCreate}
                options={{
                    tabBarLabel: "Inserir",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-outline" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}