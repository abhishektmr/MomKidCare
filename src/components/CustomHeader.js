import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomHeader() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>  
      <Text style={{marginLeft: 20}}>MomKidCare</Text>
      <View style={{position: 'absolute', right: 50}}>
        <Text>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "yellow",
    padding: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
});