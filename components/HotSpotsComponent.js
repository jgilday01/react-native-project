import React, { Component } from 'react';
import { Text, FlatList, View, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from "react-native-chart-kit";

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
        fetch('https://api.covidtracking.com/v1/states/current.json')
            .then(response => response.json())
            .then(result => {
                this.setState({ loading: false, items: result });
            });
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
                <View style={{ flex: 1, borderRadius: 10, backgroundColor: "#333", padding: 15, margin: 15 }}>
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
                    <Text style={styles.chartHeader}>Highest Positive Increase</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222'
    },
    mainwrap: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#333",
        padding: 15,
        margin: 15
    }, redtext: {
        color: "#e55",
        fontSize: 20,
        textAlign: "center"
    }, whitetext: {
        color: "#eee",
        fontSize: 18,
        textAlign: "center"
    }, simpleline: {
        height: 2,
        margin: 5,
        backgroundColor: 'rgba(222, 222, 222 ,0.5)',
        alignSelf: 'stretch'
    }, chartHeader: {
        color: "#f77",
        textAlign: 'center',
        fontSize: 30,
        marginTop: 10
    }
});

export default Hotspot;
