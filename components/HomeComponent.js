import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card } from 'react-native-elements';

class Home extends Component {
    static navigationOptions = { title: 'Home' }
    render() {
        return (
            <Card>
                <Text style={{ margin: 10 }}>
                    Welcome Home!
                </Text>
            </Card>
        );
    }
}
export default Home;