import { StyleSheet } from 'react-native';

const styles  = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
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
        flex: 4,
        backgroundColor: '#555',
        color: "#eee",
        fontWeight: 'bold',
        margin: 5
    },
    mainwrap: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#333",
        padding: 15,
        margin: 15
    },
    redtext: {
        color: "#e55",
        fontSize: 22,
        textAlign: "center"
    },
    whitetext: {
        color: "#eee",
        fontSize: 18,
        textAlign: "center",
        margin: 5
    },
    chartHeader: {
        color: "#f77",
        textAlign: 'center',
        fontSize: 25,
        margin: 5
    },
    simpleline: {
        height: 2,
        margin: 5,
        backgroundColor: 'rgba(222, 222, 222 ,0.5)',
        alignSelf: 'stretch'
    }
});

export { styles }