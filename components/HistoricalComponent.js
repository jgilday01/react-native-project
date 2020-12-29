import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, Picker, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import STATES from '../shared/states';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Animatable from 'react-native-animatable';
import { styles } from '../shared/styles';
import Loading from './LoadingComponent';

class Historical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            selectedState: 'al',
            date: new Date(),
            showCalendar: false,
            loading: true
        };
    }
    static navigationOptions = { title: 'Historical' };

    componentDidMount() {
        this.updateData();
    }

    updateData = () => {
        fetch(`https://api.covidtracking.com/v1/states/${this.state.selectedState}/daily.json`)
            .then(response => response.json())
            .then(json => { this.setState({ data: json.filter(state => Date.parse(state.dateChecked) <= Date.parse(this.state.date)) }) })
            .catch((error) => console.error(error))
            .finally(() => { this.setState({ loading: false }) });
    };

    render() {

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#222222' }}>

                <Animatable.View animation='shake' duration={2000} delay={1000}>
                    <View style={styles.formWrap}>
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
                                {STATES.map((state, index) => {
                                    return <Picker.Item label={state.name} value={state.abbreviation.toLowerCase()} key={index} />
                                })}

                            </Picker>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Last Date</Text>
                            <Button
                                onPress={() => this.setState({ showCalendar: !this.state.showCalendar })}
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
                                onChange={(event, selectedDate) => {
                                    selectedDate && this.setState({ date: selectedDate, showCalendar: false });
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
                </Animatable.View>

                {this.state.loading ? <Loading /> : (
                    <Animatable.View animation='fadeInUp' duration={3000} delay={1000}>
                        <View>

                            <Text style={styles.chartHeader}>{`${this.state.data[0].state} Trailing Death Data`}</Text>

                            <LineChart
                                style={{ margin: 15, borderRadius: 5 }}
                                data={{
                                    labels: (((this.state.data.slice(0, 7)).map(a => a.dateChecked)).map(a => a.slice(0, 10)).map(a => a.slice(5, 10))).reverse(),
                                    datasets: [
                                        {
                                            data: ((this.state.data.slice(0, 7)).map(a => a.death)).reverse(),
                                            color: (opacity = 1) => `rgba(250, 88, 88, ${opacity})`,
                                            strokeWidth: 5// optional
                                        }
                                    ]
                                }}
                                width={Dimensions.get('window').width}
                                verticalLabelRotation={90}
                                chartConfig={{
                                    color: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
                                    decimalPlaces: 0

                                }}
                                height={325}
                            />
                        </View>
                    </Animatable.View>
                )}
                
            </ScrollView>
        );
    }
};

export default Historical;
