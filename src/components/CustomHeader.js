import { useAppTheme } from "@/theme/AppTheme";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function CustomHeader() {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const [searchIconClicked, setSearchIconClicked] = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={32} color="#6a4c93" />
        </TouchableOpacity> 
      </View>
       
      <View style={[styles.textInputAndSearchContainer, {borderWidth: 4, borderColor: theme.backgroundPrimary}]}>
        {
          searchIconClicked ?
          <View style={{flex: 1}}>
            <TextInput autoFocus={true} onBlur={() => setSearchIconClicked(false)} style={{height: Platform.OS === 'ios' ? 32 : 36}}></TextInput>
          </View> : 

          <View style={styles.searchIconContainer}>
            <TouchableOpacity onPress={() => setSearchIconClicked(true)}>
              <MaterialIcons name="search" size={28} color="#6a4c93" />
            </TouchableOpacity> 
          </View>
        }
      </View>
    
      <View style={styles.profileIconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <MaterialCommunityIcons name="face-woman-outline" size={28} color="#6a4c93" />
        </TouchableOpacity> 
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  textInputAndSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 30,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  searchIconContainer: {
    flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center"
  },
  profileIconContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
});