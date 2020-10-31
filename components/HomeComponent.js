import React, { Component } from 'react';
import { Text, FlatList, View, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import { LineChart } from "react-native-chart-kit";

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

        const labels = this.state.items.map(item => {
            var displayDate = item.dateChecked.slice(5, 10);
            return displayDate;
        }).slice(0, 7).reverse();

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
                <Card>
                    <Text>Date: {item.date}</Text>
                    <Text>Positive: {item.positive}</Text>
                    <Text>Deaths: {item.death}</Text>
                </Card>
            )
        }

        if (this.state.loading) {
            return <Text>Loading ... </Text>
        } else {
            return (
                <View>
                    <FlatList
                        data={this.state.items.slice(0, 2)}
                        renderItem={renderDataItem}
                        keyExtractor={item => item.date.toString()}
                    />
                    <LineChart
                        style={{ margin: 15, borderRadius: 5 }}
                        data={linedata}
                        width={Dimensions.get('window').width}
                        verticalLabelRotation={90}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            decimalPlaces: 1

                        }}
                        yAxisSuffix="k"
                        height={325}
                    />
                </View>
            );
        }
    }
}

export default Home;
