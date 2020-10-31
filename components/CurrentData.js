import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Current extends Component {

    static navigationOptions = {
        title: 'Current'
    }
    
    render() {
        return (
            <View>
                <Text>Hello</Text>
                <Text>World</Text>
            </View>
        )
    }
}

export default Current;
