import React, { Component } from 'react';

import { Text, TouchableOpacity } from 'react-native';
import styles from '../utilities/styles';

export default class CustomButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableOpacity style={this.props.style} onPress={() => this.props.onPress()}>
                <Text style={styles.labelButton}>{this.props.label}</Text>
            </TouchableOpacity>
        )
    }
}