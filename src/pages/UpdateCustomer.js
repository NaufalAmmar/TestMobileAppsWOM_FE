import React, { useEffect, useState } from "react";
import { SafeAreaView, ActivityIndicator, ScrollView, StatusBar, Text, TextInput, ToastAndroid, View } from 'react-native';
import CustomButton from "../components/CustomButton";
import CustomPicker from "../components/CustomPicker";
import styles from '../utilities/styles';
import { uri } from "../utilities/uri";

export default function UpdateCustomer({ navigation, route }) {
    const [loading, setLoading] = useState(false);
    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");
    const [phoneNumber, onChangePhoneNumber] = useState("");
    const [branch, onChangeBranch] = useState("");
    const [product, onChangeProduct] = useState("");
    const [tenor, onChangeTenor] = useState("");

    const params = route.params

    //master data
    const [branches, setBranches] = useState([]);
    const [products, setProducts] = useState([]);
    const [tenors, setTenors] = useState([]);

    const getCustomer = async () => {
        try {
            const response = await fetch(uri + `/api/GetDataCustomer/${params.cust_id}`);
            const json = await response.json();
            let result = json.data.result
            if (result != null) {
                let data = result[0]
                onChangeFirstName(data.first_name)
                onChangeLastName(data.last_name)
                onChangePhoneNumber(data.phone_no)
                onChangeBranch(data.branch_id)
                onChangeProduct(data.product_id)
                onChangeTenor(data.tenor_id)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const getBranches = async () => {
        try {
            let data = []
            const response = await fetch(uri + '/api/GetMasterBranch');
            const json = await response.json();
            let result = json.data.result
            if (result != null) {
                result.map((item) => {
                    data.push({ label: item.branch_name, value: item.branch_id })
                })
            }
            setBranches(data);
        } catch (error) {
            console.error(error);
        }
    }
    const getProducts = async () => {
        try {
            let data = []
            const response = await fetch(uri + '/api/GetMasterProduct');
            const json = await response.json();
            let result = json.data.result
            if (result != null) {
                result.map((item) => {
                    data.push({ label: item.product_name, value: item.product_id })
                })
            }
            setProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getTenors = () => {
        let data = []
        for (let index = 1; index < 61; index++) {
            data.push({ label: index + "", value: index })
        }
        setTenors(data)
    }
    useEffect(() => {
        fetching()
    }, []);

    const fetching = async () => {
        setLoading(true)
        getTenors();
        await getBranches();
        await getProducts();
        await getCustomer()
    }
    const submitForm = async () => {
        try {
            let res = await fetch(uri + '/api/UpdateDataCust/' + params.cust_id, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    phoneNumber,
                    branch,
                    product,
                    tenor,
                }),
            });
            const json = await res.json();
            let status = json.status
            if (status == "Success") {
                ToastAndroid.show('Success update data Customer', ToastAndroid.SHORT);

            }
            navigation.goBack();
        } catch (error) {
            ToastAndroid.show('Failed update data Customer', ToastAndroid.LONG);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>

            <ScrollView style={styles.container}>
                <View style={styles.center}>
                    <Text style={styles.title}>Update Data Customer</Text>
                </View>
                {!loading && (

                    <View style={styles.wrapper}>
                        <Text style={styles.labelInput}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeFirstName}
                            value={firstName}
                            underlineColorAndroid="#111"
                            placeholder="First Name"
                            maxLength={30}
                        />
                        <Text style={styles.labelInput}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeLastName}
                            value={lastName}
                            underlineColorAndroid="#111"
                            placeholder="Last Name"
                            maxLength={30}
                        />
                        <Text style={styles.labelInput}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangePhoneNumber}
                            value={phoneNumber}
                            underlineColorAndroid="#111"
                            placeholder="Phone Number"
                            keyboardType="numeric"
                            maxLength={13}
                        />

                        <CustomPicker
                            label="Select Branch"
                            data={branches}
                            selectedValue={branch}
                            onValueChange={(itemValue) =>
                                onChangeBranch(itemValue)
                            }
                        />
                        <CustomPicker
                            label="Select Product Name"
                            data={products}
                            selectedValue={product}
                            onValueChange={(itemValue) =>
                                onChangeProduct(itemValue)
                            }
                        />
                        <CustomPicker
                            label="Select Tenor"
                            data={tenors}
                            selectedValue={tenor}
                            onValueChange={(itemValue) =>
                                onChangeTenor(itemValue)
                            }
                        />

                        <CustomButton label="Submit" style={styles.buttonSubmit} onPress={() => submitForm()} />
                        <CustomButton label="Back" style={styles.buttonClear} onPress={() => navigation.goBack()} />
                    </View>
                )}
                {loading && <ActivityIndicator />}
            </ScrollView>
        </SafeAreaView>
    );
}

