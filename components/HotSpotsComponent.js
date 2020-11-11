import React, { Component } from 'react';
import { Text, FlatList, View, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import * as Animatable from 'react-native-animatable';
import { styles } from '../shared/styles';

class Hotspot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true
        };
    }

    static navigationOptions = { title: 'HotSpot' }

    componentDidMount() {
        this.updateData();
    }

    updateData = () => {
        fetch('https://api.covidtracking.com/v1/states/current.json')
            .then(response => response.json())
            .then(result => { this.setState({ items: result }) })
            .catch((error) => console.error(error))
            .finally(() => { this.setState({ loading: false }) });
    }

    render() {

        const sortItems = this.state.items.sort((a, b) => (a.positiveIncrease > b.positiveIncrease)
            ? 1 : (a.positiveIncrease === b.positiveIncrease) ? ((a.positiveIncrease > b.positiveIncrease) ? 1 : -1) : -1);

        sortItems.reverse();

        const points = sortItems.map(item => item.positiveIncrease).slice(0, 5).reverse();

        const labels = sortItems.map(item => item.state).slice(0, 5).reverse();

        const linedata = {
            labels: labels,
            datasets: [
                {
                    data: points
                }
            ]
        };

        const renderDataItem = ({ item }) => {
            return (
                <View style={styles.formWrap}>
                    <Text style={styles.redtext}>Highest State: {item.state}</Text>
                    <View style={{
                        height: 2, margin: 5,
                        backgroundColor: 'rgba(222, 222, 222 ,0.5)',
                        alignSelf: 'stretch'
                    }} />
                    <Text style={styles.whitetext}>Positive Increase: {item.positiveIncrease}</Text>
                    <View style={{
                        height: 2, margin: 5,
                        backgroundColor: 'rgba(222, 222, 222 ,0.5)',
                        alignSelf: 'stretch'
                    }} />
                    <Text style={styles.whitetext}>Positive: {item.positive}</Text>
                    <Text style={styles.whitetext}>Negative: {item.negative}</Text>
                </View>
            )
        }

        if (this.state.loading) {
            return <Text>Loading ... </Text>
        } else {
            return (
                <View style={styles.container}>
                    <Animatable.View animation='flipInX' duration={2000} delay={1000}>
                        <Text style={styles.chartHeader}>Top 5 Positive Increases</Text>
                        <BarChart
                            style={{ margin: 15, borderRadius: 5 }}
                            data={linedata}
                            height={325}
                            width={Dimensions.get('window').width - 30}
                            chartConfig={{

                                backgroundGradientFrom: '#A00',
                                backgroundGradientTo: '#A55',
                                color: (opacity = 1) => `rgba(250, 250, 131, ${opacity})`,
                                decimalPlaces: 0

                            }}
                        />
                    </Animatable.View>

                    <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
                        <FlatList
                            data={this.state.items.slice(0, 1)}
                            renderItem={renderDataItem}
                            keyExtractor={item => item.date.toString()}
                        />
                    </Animatable.View>
                </View>
            );
        }
    }
}

export default Hotspot;
