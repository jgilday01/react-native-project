import React, { Component } from 'react';
import { Text, ScrollView, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import * as Animatable from 'react-native-animatable';
import { styles } from '../shared/styles';
import Loading from './LoadingComponent';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true
        };
    }

    static navigationOptions = { title: 'Home' }

    updateData = () => {
        fetch('https://api.covidtracking.com/v1/us/daily.json')
            .then(response => response.json())
            .then(result => {
                this.setState({ loading: false, items: result });
            });
    }

    componentDidMount() {
        this.updateData();
    }


    render() {

        const points = this.state.items.map(item => item.death / 1000).slice(0, 7).reverse();

        const points2 = this.state.items.map(item => item.positive / 1000000).slice(0, 7).reverse();

        const labels = this.state.items.map(item => item.dateChecked.slice(5, 10)).slice(0, 7).reverse();

        const linedata = {
            labels: labels,
            datasets: [
                {
                    data: points,
                    color: (opacity = 1) => `rgba(250, 88, 88, ${opacity})`,
                    strokeWidth: 5 // optional
                }
            ]
        };

        const linedata2 = {
            labels: labels,
            datasets: [
                {
                    data: points2,
                    color: (opacity = 1) => `rgba(250, 88, 88, ${opacity})`,
                    strokeWidth: 5 // optional
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
            return (
                <Loading />
            )
        } else {
            return (
                <View style={styles.container}>
                    <ScrollView>

                        <Animatable.View animation='bounceInUp' duration={2000} delay={1000}>
                            <Text style={styles.chartHeader}>US positive stats</Text>
                            <LineChart
                                style={{ margin: 15, borderRadius: 5 }}
                                data={linedata2}
                                width={Dimensions.get('window').width}
                                verticalLabelRotation={0}
                                chartConfig={{
                                    color: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
                                    decimalPlaces: 1

                                }}
                                yAxisSuffix="m"
                                height={240}
                            />
                        </Animatable.View>

                        <Animatable.View animation='bounceInDown' duration={2000} delay={1000}>
                            <Text style={styles.chartHeader}>US death stats</Text>
                            <LineChart
                                style={{ margin: 15, borderRadius: 5 }}
                                data={linedata}
                                width={Dimensions.get('window').width}
                                verticalLabelRotation={0}
                                chartConfig={{
                                    color: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
                                    decimalPlaces: 1

                                }}
                                yAxisSuffix="k"
                                height={240}
                            />
                        </Animatable.View>

                    </ScrollView>

                    {/* <Animatable.View animation='bounceInUp' duration={2000} delay={1000}>
                        <FlatList
                            data={this.state.items.slice(0, 1)}
                            renderItem={renderDataItem}
                            keyExtractor={item => item.date.toString()}
                        />
                    </Animatable.View> */}

                </View>
            );
        }
    }
}

export default Home;
