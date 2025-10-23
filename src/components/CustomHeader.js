import { useAppTheme } from "@/theme/AppTheme";
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomHeader({ icon, text }) {

    const theme = useAppTheme();
    const navigation = useNavigation();

    return (
        <View style={[styles.container]}>

        {/* {/* //   <View style={styles.iconContainer}>
        //     <TouchableOpacity onPress={() => navigation.openDrawer()}>
        //         <Feather name={icon} size={30} color={theme.icon} />
        //     </TouchableOpacity> 
        //   </View>

        //   <View style={styles.textContainer}>
        //     <Text style={[styles.text, {color: theme.text}]}>{text}</Text>
        //   </View>

        // </View>
        // ); 

        // <LinearGradient
        // colors={[theme.primaryColor, theme.secondaryColor]}
        // start={{ x: 0.5, y: 0 }}
        // end={{ x: 0.5, y: 1 }}
        //     style={[styles.container]}> */}

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Feather name={icon} size={30} color={theme.iconColor} />
                </TouchableOpacity>
            </View>

            <View style={styles.textContainer}>
                <Text style={[styles.text, { color: theme.textColor }]}>{text}</Text>
            </View>

        {/* // </LinearGradient> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 5,

    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    textContainer: {
        marginLeft: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontWeight: "700",
        fontSize: 18
    }
});