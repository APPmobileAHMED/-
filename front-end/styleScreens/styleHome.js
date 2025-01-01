import { StyleSheet} from 'react-native';
import { COLORS, SIZES } from "../constants/theme";
const styles = StyleSheet.create({
    textStyle: {
        fontFamily: "bold",
        fontSize: 40,
    },
    appBarWrapper: {
        marginHorizontal: 22,
        marginTop: SIZES.small
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    location: {
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color: COLORS.gray
    },
    cartCount: {
        position: "absolute",
        bottom: 16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "green",
        justifyContent: "center",
        zIndex: 9999
    },
    cartnumber: {
        fontFamily: "regular",
        fontWeight: "600",
        fontSize: 10,
        color: COLORS.lightWhite
    },
    dropdown: {
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        zIndex: 9999
    },
    dropdownItem: {
        padding: 10,
        fontSize: 16,
        color: COLORS.gray,
    }
});
export default styles