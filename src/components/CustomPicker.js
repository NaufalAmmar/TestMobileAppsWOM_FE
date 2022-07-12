import { Picker } from '@react-native-picker/picker';
import React, { Component } from 'react';

import { Text, View } from 'react-native';
import styles from '../utilities/styles';

export default class CustomPicker extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <>
                <Text style={styles.labelInput}>{this.props.label}</Text>
                <View style={styles.dropdown}>
                    <Picker
                        placeholder={this.props.label}
                        selectedValue={this.props.selectedValue}
                        onValueChange={(itemValue, itemIndex) =>
                            this.props.onValueChange(itemValue)
                        }>
                        {this.props.data.length > 0 && this.props.data.map((item, index) => {
                            return (
                                <Picker.Item key={index} label={item.label} value={item.value} />
                            )
                        })}
                    </Picker>
                </View>
            </>
        )
    }
}