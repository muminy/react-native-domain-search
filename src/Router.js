import React from 'react';
import {
    StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './pages/Main';
import { SearchIcon, BookmarkIcon, SettingIcon } from './constant/Icons';
import Follow from './pages/Follow';
import Settings from './pages/Settings';
import DomainFilters from './pages/settings/DomainFilters';
import { AppRoute } from './constant/appRoute';
import Bildirimler from './pages/settings/Bildirimler';

const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();

const SettingStack = () => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen name={AppRoute.SETTINGS.MAIN} component={Settings} />
        <Stack.Screen name={AppRoute.SETTINGS.D_FILTER} component={DomainFilters} />
        <Stack.Screen name={AppRoute.SETTINGS.NOTIFY} component={Bildirimler} />
    </Stack.Navigator>
)

const Router = () => {


    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <Bottom.Navigator
                tabBarOptions={{
                    style: {
                        elevation: 0,
                        borderTopWidth: 0,
                        paddingTop: 5,
                        height: 55
                    },
                    labelStyle: {
                        marginBottom: 5
                    },
                    keyboardHidesTabBar: true
                }}
            >
                <Bottom.Screen 
                    name={AppRoute.HOME.MAIN}
                    component={Main} 
                    options={{
                        tabBarIcon: ({size, color}) => <SearchIcon size={size} color={color} />,
                        title: 'Ara'
                    }}
                />
                <Bottom.Screen 
                    name={AppRoute.FOLLOW.MAIN}
                    component={Follow} 
                    options={{
                        tabBarIcon: ({size, color}) => <BookmarkIcon size={size} color={color} />,
                        title: 'Takipler'
                    }}
                />
                <Bottom.Screen 
                    name={AppRoute.SETTINGS.MAIN}
                    component={SettingStack} 
                    options={{
                        tabBarIcon: ({size, color}) => <SettingIcon size={size} color={color} />,
                        title: 'Ayarlar'
                    }}
                />
            </Bottom.Navigator>
        </NavigationContainer>
    )
}

export default Router;