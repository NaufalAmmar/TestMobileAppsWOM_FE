import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, RefreshControl, StatusBar, Text, TextInput, ToastAndroid, View, ActivityIndicator } from 'react-native';
import CustomButton from "../components/CustomButton";
import CustomerCard from "../components/CustomerCard";
import CustomPicker from "../components/CustomPicker";
import styles from '../utilities/styles';
import { uri } from "../utilities/uri";

export default function FormCustomer({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [firstName, onChangeFirstName] = useState("");
    const [lastName, onChangeLastName] = useState("");
    const [phoneNumber, onChangePhoneNumber] = useState("");
    const [branch, onChangeBranch] = useState(null);
    const [product, onChangeProduct] = useState(null);
    const [tenor, onChangeTenor] = useState(null);

    //master data
    const [customers, setCustomers] = useState([]);
    const [branches, setBranches] = useState([]);
    const [products, setProducts] = useState([]);
    const [tenors, setTenors] = useState([]);

    const getNameOf = (id, data) => {
        let name = ""
        if (data != null) {
            name = data.find(x => x.value === id).label
        }
        return name
    }
    const getCustomers = async () => {
        try {
            let data = []
            const response = await fetch(uri + '/api/GetAllDataCust');
            const json = await response.json();
            let result = json.data.result
            if (result != null) {
                result.map(async (item) => {
                    let branchName = getNameOf(item.branch_id, branches)
                    let productName = getNameOf(item.product_id, products)

                    item.branchName = branchName
                    item.productName = productName
                    data.push(item)
                })
                setCustomers(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
            await getCustomers();
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
        const unsubscribe = navigation.addListener('focus', () => {
            fetching()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);


    const fetching = async () => {
        getTenors();
        await getBranches();
        await getProducts();
    }
    const clearForm = () => {
        onChangeFirstName("")
        onChangeLastName("")
        onChangePhoneNumber("")
        onChangeBranch(null)
        onChangeProduct(null)
        onChangeTenor(null)
    }

    const submitForm = async () => {
        try {
            setButtonLoading(true);
            let res = await fetch(uri + '/api/SaveDataCust', {
                method: 'POST',
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
                    avatar: 'https://i.pravatar.cc/50?u=' + (customers.length + 1),
                }),
            });
            const json = await res.json();
            let status = json.status
            if (status == "Success") {
                ToastAndroid.show('Success create data Customer', ToastAndroid.SHORT);
            }
            getCustomers();
        } catch (error) {
            ToastAndroid.show('Failed create data Customer', ToastAndroid.LONG);
            console.error(error);
        } finally {
            clearForm()
            setButtonLoading(false);
        }
    }

    const isDeleteCust = (dataCust) => {
        Alert.alert("Confirmation",
            "Confirm to delete " + dataCust.first_name,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Yes, Delete", onPress: () => {
                        deleteCust(dataCust.cust_id)
                    }
                }
            ]
        );

    }

    const deleteCust = async (cust_id) => {
        try {
            setLoading(true);
            let res = await fetch(uri + '/api/UpdateDataCust', {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cust_id
                }),
            });
            const json = await res.json();
            let status = json.status
            if (status == "Success") {
                ToastAndroid.show('Success delete data Customer', ToastAndroid.SHORT);

            }
            getCustomers();
        } catch (error) {
            ToastAndroid.show('Failed delete data Customer', ToastAndroid.LONG);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, }}>

            <ScrollView style={[styles.container, { paddingTop: StatusBar.currentHeight }]}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={fetching}
                    />
                }

            >
                <View style={styles.center}>
                    <Text style={styles.title}>Form Data Customer</Text>
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
                        {!buttonLoading && (
                            <>
                                <CustomButton label="Clear Form" style={styles.buttonClear} onPress={() => clearForm()} />
                                <CustomButton label="Submit" style={styles.buttonSubmit} onPress={() => submitForm()} />
                            </>
                        )}
                        {buttonLoading && <ActivityIndicator />}

                    </View>
                )}

                {loading && <ActivityIndicator />}
                {!loading &&
                    <>
                        <View style={styles.lineHorizontal} />
                        <View style={{ marginBottom: 40 }}>
                            {customers.map((item, index) => {
                                return (
                                    <CustomerCard key={index} item={item}
                                        onDelete={() => isDeleteCust(item)}
                                        onDetail={() => navigation.navigate('UpdateCustomer', item)} />
                                )
                            })}
                        </View>
                    </>
                }

            </ScrollView>
        </SafeAreaView >
    );
}

