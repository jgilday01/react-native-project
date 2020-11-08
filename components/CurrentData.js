import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Picker, Button } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';

class Current extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            selectedState: '',
        };
    }

    static navigationOptions = { title: 'Current' }

    componentDidMount() {
        fetch(`https://api.covidtracking.com/v1/states/al/current.json`)
            .then(response => response.json())
            .then(result => {
                this.setState({ loading: false, items: result });
            });
    }

    updateData = () => {
        fetch(`https://api.covidtracking.com/v1/states/${this.state.selectedState}/current.json`)
            .then(response => response.json())
            .then(result => {
                this.setState({ loading: false, items: result });
            });
    };

    render() {

        if (this.state.loading) {
            return <Text>Loading ... </Text>
        } else {

            const pos = (this.state.items.positive / this.state.items.totalTestResults).toFixed(2) * 100;
            const neg = (this.state.items.negative / this.state.items.totalTestResults).toFixed(2) * 100;

            const data1 = [
                {
                    name: "% positive",
                    covidstat: pos,
                    color: "rgba(222, 44, 44, 1)",
                    legendFontColor: "#eee",
                    legendFontSize: 15
                },
                {
                    name: "% negative",
                    covidstat: neg,
                    color: "rgba(99, 222, 99, 1)",
                    legendFontColor: "#eee",
                    legendFontSize: 15
                }
            ];

            return (
                <>
                <View style={{ flex: 1, borderRadius: 10, backgroundColor: "#333", padding: 15, margin: 15 }}>
                      
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>State</Text>
                        <Picker
                            selectedValue={this.state.selectedState}
                            style={styles.formItem}
                            onValueChange={ itemValue => { 
                                this.setState({selectedState: itemValue})}
                            }
                            mode='dropdown'
                        >
                            <Picker.Item label='---' value='empty' />
                            {STATES.map((state,index) => {
                                return <Picker.Item label={state.name} value={state.abbreviation.toLowerCase()} key={index} />
                            })}
                            
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.updateData()}
                            title='Update'
                            color='#5637DD'
                            accessibilityLabel='Tap me to update data for selected state'
                        />
                    </View>
                    
                </View>
                
                <View style={{ flex: 1, backgroundColor: '#222222' }}>
                    <PieChart 
                        style={{  margin: 10 }}
                        data={data1}
                        width={Dimensions.get('window').width -20}
                        height={200}
                        hasLegend={true}
                        chartConfig={{
                            backgroundGradientToOpacity: 0.5,
                            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                            strokeWidth: 2,
                            decimalPlaces: 1
                        }}
                        accessor="covidstat"
                        backgroundColor="#444"
                        paddingLeft="15"
                        absolute
                    />
                    <Text style={{ color: "#eee", textAlign: 'center', fontSize:20 }}>
                        {`Total Test Results: ${this.state.items.totalTestResults}`}
                    </Text>
                </View>
                </>
                <ScrollView style={styles.container}>
                    <View style={styles.container}>
                        <Text style={styles.chartHeader}>
                            {`Total Test Results: ${this.state.items.totalTestResults}`}
                        </Text>
                        <PieChart
                            style={{ margin: 15, borderRadius: 5 }}
                            data={data1}
                            width={Dimensions.get('window').width - 30}
                            height={200}
                            hasLegend={true}
                            chartConfig={{
                                backgroundGradientToOpacity: 0.5,
                                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                                strokeWidth: 2,
                                decimalPlaces: 1
                            }}
                            accessor="covidstat"
                            backgroundColor="#444"
                            paddingLeft="15"
                            absolute
                        />
                    </View>
                    <View style={styles.mainwrap}>
                        <Text style={styles.whitetext}>Hospitalized: {this.state.items.hospitalizedCurrently}</Text>
                        <Text style={styles.whitetext}>In the ICU: {this.state.items.inIcuCurrently}</Text>
                        <Text style={styles.redtext}>Death Increrase: {this.state.items.deathIncrease}</Text>
                    </View>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#222'
      paddingTop: 40,
      alignItems: "center"
    }, 
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        color: "#eee",
        flex: 1, 
        flexDirection: 'row',
        margin: 7
    },
    formLabel: {
        fontSize: 18,
        color: "#eee",
        flex: 1
    },
    formItem: {
        justifyContent: 'center',
        flexDirection: 'row',
        color: "#eee",
        flex: 2
    },
    mainwrap: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#333",
        padding: 15,
        margin: 15
    }, 
    redtext: {
        color: "#e55",
        fontSize: 20,
        textAlign: "center"
    },
    whitetext: {
        color: "#eee",
        fontSize: 18,
        textAlign: "center",
        margin: 5
    }, 
    chartHeader: {
        color: "#eee",
        textAlign: 'center',
        fontSize: 20,
        margin: 10
    }
});


export default Current;