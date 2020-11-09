import React, { Component } from 'react';
import { View, Text, Dimensions, Picker, Button } from 'react-native';
import { PieChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
import { styles } from '../shared/styles';

class Current extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            loading: true,
            selectedState: 'al',
        };
    }

    static navigationOptions = { title: 'Current' }


    componentDidMount() {
        /*
        fetch(`https://api.covidtracking.com/v1/states/al/current.json`)
            .then(response => response.json())
            .then(result => {
                this.setState({ loading: false, items: result });
            });
            */
        this.updateData();
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

            const tot = this.state.items.positive + this.state.items.negative
            const pos = (this.state.items.positive / tot * 100).toFixed(1) * 1;
            const neg = (this.state.items.negative / tot * 100).toFixed(1) * 1;;

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
                <ScrollView style={{ flex: 1, backgroundColor: '#222222' }}>
                    <View style={{ flex: 1, borderRadius: 10, backgroundColor: "#333", padding: 15, margin: 15 }}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>State</Text>
                            <Picker
                                selectedValue={this.state.selectedState}
                                style={styles.formItem}
                                onValueChange={itemValue => {
                                    this.setState({ selectedState: itemValue })
                                }
                                }
                                mode='dropdown'
                            >
                                {/* <Picker.Item label='---' value='empty' /> */}
                                {STATES.map((state, index) => {
                                    return <Picker.Item label={state.name} value={state.abbreviation.toLowerCase()} key={index} />
                                })}

                            </Picker>
                        </View>
                        <View style={styles.formRow}>
                            <Button
                                style={{width:200}}
                                onPress={() => this.updateData()}
                                title='Update'
                                color='#5637DD'
                                accessibilityLabel='Tap me to update data for selected state'
                            />
                        </View>
                    </View>

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

export default Current;