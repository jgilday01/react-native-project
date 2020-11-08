import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Picker, Button } from 'react-native';
import { PieChart } from "react-native-chart-kit";

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

            const data1 = [
                {
                    name: "positive",
                    covidstat: this.state.items.positive,
                    color: "rgba(222, 22, 22, 1)",
                    legendFontColor: "#DDD",
                    legendFontSize: 15
                },
                {
                    name: "negative",
                    covidstat: this.state.items.negative,
                    color: "rgba(99, 200, 99, 1)",
                    legendFontColor: "#DDD",
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
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    }
  });

export default Current;