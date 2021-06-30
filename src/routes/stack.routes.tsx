import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ItemDetail } from '../screens/ItemDetail';
import { TabBotton } from './tabsBotton.routes';

const Stack = createStackNavigator();

export function StackRoutes() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="ListItems"
                component={TabBotton}
            />
            <Stack.Screen
                name="ItemDetail"
                component={ItemDetail}
            />
        </Stack.Navigator>
    );
}