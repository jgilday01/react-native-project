import React, { Component } from 'react';
import { ActivityIndicator, View, Text, FlatList, SafeAreaView, Dimensions, ScrollView, Picker, StyleSheet, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import STATES from '../shared/states';
import DateTimePicker from '@react-native-community/datetimepicker';
import { subDays } from 'date-fns';

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


    formatDate = (date) => {
        // const startDate = date.toISOString().split('T')[0].replace(/[^0-9]/g,'')
        // const trailingDays = subDays(date,1).toISOString().split('T')[0].replace(/[^0-9]/g,'')
        const trailingDays=subDays(date,7).toISOString()
        // this.setState ({
        //     // startDate: startDate,
        //     endDate: trailingDays
        // })
        console.log(this.state.date)
        console.log('end date is ' + trailingDays)
        console.log(Date.parse(this.state.date))
    };

    updateData = () => {
        fetch(`https://api.covidtracking.com/v1/states/${this.state.selectedState}/daily.json`)
        .then(response => response.json())
        // .then(json => {this.setState({data: json})})
        .then(json => {this.setState({data: json.filter(state => Date.parse(state.dateChecked) <= Date.parse(this.state.date)) })})
        .catch((error) => console.error(error))
        .finally(() => {this.setState({isLoading: false})});
    };

    render() {

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#222222' }}>
                <>
                <Text style={{ color: "#F77", textAlign: "center", fontSize: 33, marginTop: 10 }}>State Trailing Data</Text>
                <View>
                    <View style={{ flex: 1, borderRadius: 10, backgroundColor: "#333", padding: 15, margin: 15 }}>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>State</Text>
                            <Picker
                                selectedValue={this.state.selectedState}
                                style={styles.formItem}
                                onValueChange={ itemValue => { 
                                    this.setState({selectedState: itemValue})}
                                }
                            >
                                <Picker.Item label='---' value='empty' />
                                {STATES.map((state,index) => {
                                    return <Picker.Item label={state.name} value={state.abbreviation.toLowerCase()} key={index} />
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
                    </View>
                    <View>
                        {this.state.isLoading ? <ActivityIndicator /> : (
                            <>
                                <LineChart
                                    style={{ margin: 15, borderRadius: 5 }}
                                    data={{
                                        labels: (((this.state.data.slice(0,7)).map(a => a.dateChecked)).map(a => a.slice(0,10)).map(a => a.slice(5,10))).reverse(),
                                        datasets: [
                                            {
                                                data: ((this.state.data.slice(0,7)).map(a => a.death)).reverse(),
                                                color: (opacity = 1) => `rgba(250, 88, 88, ${opacity})`,
                                                strokeWidth: 5// optional
                                            }
                                        ]
                                    }}
                                    width={Dimensions.get('window').width}
                                    verticalLabelRotation={90}
                                    chartConfig={{          
                                        color: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
                                        decimalPlaces: 1

                                    }}
                                    // yAxisSuffix="k"
                                    height={325}
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
        color: "#eee",
        flex: 1, 
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        color: "#eee",
        flex: 2
    },
    formItem: {
        justifyContent: 'center',
        flexDirection: 'row',
        color: "#eee",
        flex: 1
    }
  });

export default Historical;
