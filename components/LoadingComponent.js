import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { styles } from '../shared/styles';

class Loading extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator style={{ margin: 20 }} />
                <Text style={{ color: '#EEE' }}>Loading</Text>
            </View>
        )
    }

}

export default Loading;