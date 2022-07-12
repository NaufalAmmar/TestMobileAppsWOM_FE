import React, { Component } from 'react';

import { View, Image, Text, TouchableOpacity, } from 'react-native';
import styles from '../utilities/styles';

export default class CustomerCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let item = this.props.item
        return (
            <View key={this.props.index} style={[styles.rowBetween, styles.customerCard]}>
                <View style={styles.row}>
                    <Image source={{ uri: item.avatar }} style={styles.avatar} />
                    <View style={{ paddingHorizontal: 8 }}>
                        <TouchableOpacity onPress={() => this.props.onDetail()}>
                            <Text style={styles.fullName}>{item.first_name + " " + item.last_name}</Text>
                        </TouchableOpacity>
                        <Text>{"Branch Name : " + item.branchName}</Text>
                        <Text>{"Product Name : " + item.productName}</Text>
                        <Text>{"Tenor : " + item.tenor_id}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.props.onDelete()}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/216/216658.png' }} style={styles.deleteIcon} />
                </TouchableOpacity>
            </View>
        )
    }
}