import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ItemCreate } from '../screens/ItemCreate';
import { BrandCreate } from '../screens/BrandCreate';
import colors from '../styles/colors';

const Tabs = createMaterialTopTabNavigator();

export function TabsTop() {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.warning,
                style: {
                    borderBottomColor: colors.warning
                }
            }}
        >
            <Tabs.Screen name="Items" component={ItemCreate} />
            <Tabs.Screen name="Brands" component={BrandCreate} />
        </Tabs.Navigator>
    );
}