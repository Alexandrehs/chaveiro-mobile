import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItems } from '../screens/ListItems';
import { ItemDetail } from '../screens/ItemDetail';

const Stack = createStackNavigator();

export function StackRoutes() {
    return (
        <Stack.Navigator
            headerMode="none"
        >
            <Stack.Screen
                name="ListItems"
                component={ListItems}
            />
            <Stack.Screen
                name="ItemDetail"
                component={ItemDetail}
            />
        </Stack.Navigator>
    );
}