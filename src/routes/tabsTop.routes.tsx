import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ItemCreate } from '../screens/ItemCreate';
import { BrandCreate } from '../screens/BrandCreate';
import colors from '../styles/colors';
import Constants from 'expo-constants';

const Tabs = createMaterialTopTabNavigator();

export function TabsTop() {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.warning,
                style: {
                    marginTop: Constants.statusBarHeight
                },
                indicatorStyle: {
                    backgroundColor: colors.warning
                },
                labelStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Tabs.Screen name="Items" component={ItemCreate} />
            <Tabs.Screen name="Marcas" component={BrandCreate} />
        </Tabs.Navigator>
    );
}