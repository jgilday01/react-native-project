import React, { Component } from 'react';
import { Text, FlatList, View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../shared/styles';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true
        };
    }

    static navigationOptions = { title: 'Home' }

    componentDidMount() {
        fetch('https://api.covidtracking.com/v1/us/daily.json')
            .then(response => response.json())
            .then(result => {
                this.setState({ loading: false, items: result });
            });
    }


    render() {

        const points = this.state.items.map(item => item.death / 1000).slice(0, 7).reverse();

        const labels = this.state.items.map(item => item.dateChecked.slice(5, 10)).slice(0, 7).reverse();

        const linedata = {
            labels: labels,
            datasets: [
                {
                    data: points,
                    color: (opacity = 1) => `rgba(250, 88, 88, ${opacity})`,
                    strokeWidth: 5// optional
                }
            ]
        };

        const renderDataItem = ({ item }) => {
            return (
                <View style={styles.mainwrap}>
                    <Text style={styles.redtext}>Deaths: {item.death}</Text>
                    <View style={styles.simpleline} />
                    <Text style={styles.whitetext}>Positive: {item.positive}</Text>
                    <Text style={styles.whitetext}>Hospitalized: {item.hospitalized}</Text>
                    <View style={styles.simpleline} />
                    <Text style={styles.whitetext}>Recovered: {item.recovered}</Text>
                </View>
            )
        }

        if (this.state.loading) {
            return <Text>Loading ... </Text>
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.chartHeader}>US death stats</Text>
                    <LineChart
                        style={{ margin: 15, borderRadius: 5 }}
                        data={linedata}
                        width={Dimensions.get('window').width}
                        verticalLabelRotation={90}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
                            decimalPlaces: 1

                        }}
                        yAxisSuffix="k"
                        height={325}
                    />
                    <FlatList
                        data={this.state.items.slice(0, 1)}
                        renderItem={renderDataItem}
                        keyExtractor={item => item.date.toString()}
                    />
                </View>
            );
        }
    }
}

export default Home;
