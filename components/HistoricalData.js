import React, { Component } from 'react';
import { ActivityIndicator, View, Text, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

class Historical extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            isLoading: true
        };
    }
    static navigationOptions = { title: 'Historical' }
    componentDidMount() {
        fetch('https://api.covidtracking.com/v1/us/daily.json')
        .then(response => response.json())
        .then(json => {this.setState({data: json})})
        .catch((error) => console.error(error))
        .finally(() => {this.setState({ isLoading: false})});
        
    }

    render() {
        const data = this.state.data.slice(0,7)
        const date = (data.map(a => a.dateChecked)).map(a => a.slice(0,10))
        const death = data.map(a => a.death)
        // const death = strdeath.map(function (x) {
        //     return parseInt(x,10);
        // });
        


        // console.log(data.slice(0,5))
        console.log(date)
        console.log(death)
        
        return (
            <View>
                {/* <FlatList
                    data={data}
                    keyExtractor={item => item.date}
                    renderItem={({item }) => (
                        <Text>{item.date},{item.death}</Text>
                    )}
                /> */}
                {this.state.isLoading ? <ActivityIndicator/> : (
                    <>
                    <Text>Trailing Daily Datat</Text>
                    <LineChart
                        data={{
                            labels: date,
                            datasets: [
                                {
                                    data: death
                                }
                            ]
                        }}
                        width={Dimensions.get('window').width}
                        height={220}
                        yAxisLabel="#"
                        yAxisSuffix="Date"
                        yAxisInterval={10000} // optional, defaults to 1
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 16
                        }}
                    />
                    </>
                )
                }
            </View>
        );
    }
}
export default Historical;
