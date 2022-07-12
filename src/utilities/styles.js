import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 4
    },

    wrapper: {
        padding: 16
    },
    row: {
        flexDirection: 'row'
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontWeight: '600'
    },

    labelInput: {
        fontSize: 12,
        fontWeight: '700'
    },

    input: {
        flex: 1,
        padding: 8,
        marginVertical: 8,
    },

    dropdown: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#111',
        borderRadius: 8,
        marginVertical: 8
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    labelButton: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff'
    },
    buttonClear: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: '#C0D835',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8
    },
    buttonSubmit: {
        flex: 1,
        borderRadius: 4,
        backgroundColor: '#399975',
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8
    },
    lineHorizontal: {
        height: 1.5,
        width: '100%',
        backgroundColor: '#111'
    },
    customerCard: {
        flex: 1,
        paddingVertical: 8,
        marginBottom: 4
    },
    fullName: {
        fontSize: 16,
        color: 'blue'
    },
    avatar: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    deleteIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
});

export default styles