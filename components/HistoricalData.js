import React, { Component } from 'react';
import { ActivityIndicator, View, Text, FlatList, SafeAreaView, Dimensions, ScrollView, Picker, StyleSheet, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import STATES from '../shared/states';
import DateTimePicker from '@react-native-community/datetimepicker';

class Historical extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:[],
            selectedState: '',
            date: new Date(),
            showCalendar: false,
            isLoading: true
        };
    }
    static navigationOptions = { title: 'Historical' };


    updateData = () => {
        fetch(`https://api.covidtracking.com/v1/states/${this.state.selectedState}/daily.json`)
        .then(response => response.json())
        .then(json => {this.setState({data: json})})
        .catch((error) => console.error(error))
        .finally(() => {this.setState({isLoading: false})});
    };

    render() {

        return (
            <ScrollView>
                <>
                <View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>State</Text>
                        <Picker
                            selectedValue={this.state.selectedState}
                            style={styles.formItem}
                            onValueChange={ itemValue => { 
                                // this.updateData(itemValue);
                                this.setState({selectedState: itemValue})}
                            }
                        >
                            <Picker.Item label='---' value='empty' />
                            {STATES.map((state,index) => {
                                return <Picker.Item label={state.name} value={state.abbreviation.toLowerCase()} />
                            })}
                            
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Last Date</Text>
                        <Button 
                            onPress={() => this.setState({showCalendar: !this.state.showCalendar})}
                            title={this.state.date.toLocaleDateString('en-us')}
                            color='#5637DD'
                            accessibilityLabel='Tap me to select a date'
                        />
                    </View>
                    {this.state.showCalendar && (
                        <DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            display='calendar'
                            maximumDate={new Date()} //sets a maximum date
                            onChange={(event,selectedDate) => {
                                selectedDate && this.setState({date: selectedDate, showCalendar: false});
                                console.log(this.state.date)
                            }}
                            style={styles.formItem}
                        />
                    )}
                    <View style={styles.formRow}>
                        <Button
                            onPress={() => this.updateData()}
                            title='Update'
                            color='#5637DD'
                            accessibilityLabel='Tap me to update data for the last 7 days'
                        />
                    </View>
                    <View>
                        {this.state.isLoading ? <ActivityIndicator /> : (
                            <>
                                <Text>Trailing weekly Data</Text>
                                <LineChart
                                    data={{
                                        labels: (((this.state.data.slice(0,7)).map(a => a.dateChecked)).map(a => a.slice(0,10)).map(a => a.slice(5,10))).reverse(),
                                        datasets: [
                                            {
                                                data: ((this.state.data.slice(0,7)).map(a => a.death)).reverse()
                                            }
                                        ]
                                    }}
                                    width={Dimensions.get('window').width}
                                    height={220}
                                    yAxisInterval={10000} 
                                    chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: "#fb8c00",
                                    backgroundGradientTo: "#ffa726",
                                    decimalPlaces: 0, 
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
                        )}
                    </View>
                </View>
                </> 
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      alignItems: "center"
    }, 
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1, 
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1
    }
  });

export default Historical;
