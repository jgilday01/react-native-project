import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Platform, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';
import SafeAreaView from 'react-native-safe-area-view';
import Home from './HomeComponent.js';
import Historical from './HistoricalData';
import Current from './CurrentData';
import HotSpot from './HotSpotsComponent';

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
                name='history' type='font-awesome'
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

const HotSpotNavigator = createStackNavigator(
    {
        HotSpot: { screen: HotSpot }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: { backgroundColor: '#333' },
            headerTintColor: '#ddd',
            headerTitleStyle: { fontWeight: 'bold' },
            headerLeft: <Icon
                name='fire' type='font-awesome'
                iconStyle={styles.stackIcon}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CustomDrawerContentComponent = props => (
    <ScrollView>
        <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('../assets/COVID.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>COVID19</Text>
                    <Text style={styles.drawerHeaderText}>STATS</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
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
        Current: {
            screen: CurrentNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name='list' type='font-awesome' size={24} color={tintColor} />
                )
            },
        },
        Historical: {
            screen: HistoricalNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name='history' type='font-awesome' size={24} color={tintColor} />
                )
            }
        },
        HotSpot: {
            screen: HotSpotNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon name='fire' type='font-awesome' size={24} color={tintColor} />
                )
            },
        }
    },
    {
        contentOptions: {
            activeTintColor: 'rgb(222, 232, 242)',
            inactiveTintColor: 'rgb(171, 181, 191)'
        },
        drawerBackgroundColor: '#222',
        contentComponent: CustomDrawerContentComponent
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
    container: {
        flex: 1,
    },
    drawerHeader: {
        backgroundColor: '#333',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 50,
        width: 50
    },
    stackIcon: {
        marginLeft: 15,
        color: '#ddd',
        fontSize: 25
    } 
});

export default Main;
