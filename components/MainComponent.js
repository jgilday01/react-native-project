import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Home from './HomeComponent.js';
import Historical from './HistoricalData';
import Current from './CurrentData';

const HomeNavigator = createStackNavigator(
    {
        Home: { screen: Home }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#333' },
            headerTintColor: '#ddd',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: <Icon
                name='home' type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const HistoricalNavigator = createStackNavigator(
    {
        Historical: { screen: Historical }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#333' },
            headerTintColor: '#ddd',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: <Icon
                name='info' type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CurrentNavigator = createStackNavigator(
    {
        Current: { screen: Current }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#333' },
            headerTintColor: '#ddd',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: <Icon
                name='list' type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name='home' type='font-awesome' size={24} color={tintColor} />
                )
            }
        },
        Historical: {
            screen: HistoricalNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name='info' type='font-awesome' size={24} color={tintColor} />
                )
            }
        },
        Current: {
            screen: CurrentNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name='list' type='font-awesome' size={24} color={tintColor} />
                )
            },
        }
    },
    {
        contentOptions: {
            activeTintColor: 'rgb(222, 232, 242)',
            inactiveTintColor: 'rgb(171, 181, 191)'
        },
        drawerBackgroundColor: '#222'
    }
);

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <AppNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    stackIcon: {
        marginLeft: 15,
        color: '#ddd',
        fontSize: 25
    }
});

export default Main;
