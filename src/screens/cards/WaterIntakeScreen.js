import PieChart from "@/src/components/charts/PieChart";
import CustomHeader from "@/src/components/CustomHeader";
import { useAppSelector } from "@/src/redux/hooks";
import CustomReminders from "@/src/screens/cards/CustomReminders";
import { useAppTheme } from "@/theme/AppTheme";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { LinearGradient } from "expo-linear-gradient";
import { Bell } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Animated, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WaterIntakeScreen() {
  const theme = useAppTheme();
  const { width } = useWindowDimensions();
  const { currentWeek } = useAppSelector((state) => state.pregnancyTracker);

  const [readMoreClicked, setReadMoreClicked] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim2 = useRef(new Animated.Value(1)).current;
  const glassInputTranslateX = useRef(new Animated.Value(0)).current;
  const pieChartTranslateX = useRef(new Animated.Value(0)).current;
  const [glasses, setGlasses] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  // All days enabled by default
  const [notificationDays, setNotificationDays] = useState([true, true, true, true, true, true, true]);

  useEffect(() => {
    (() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim2, {
            toValue: 0.2,
            duration: 1000,
            useNativeDriver: true
          }),
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          })
        ])
      ).start();
    })();
  })
  
  // Reminders state
  const [reminders, setReminders] = useState([
    { id: 1, glasses: 2, time: "Till 8:00 AM" },
    { id: 2, glasses: 2, time: "Till 12:00 noon" },
    { id: 3, glasses: 2, time: "Till 4:00 PM" },
    { id: 4, glasses: 2, time: "Till 8:00 PM" },
  ]);

  const handleReadMore = () => {
    console.log("inside handleReadMore");
    setReadMoreClicked(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start(() => {
      // 👇 Reset value after animation ends
      // fadeAnim.setValue(0);
    });
  }

  const handleInputGlassChange = (value) => {
    setGlasses(value);

    if (value > 0) {
      Animated.parallel([
        Animated.timing(glassInputTranslateX, {
          toValue: -(width / 10),
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(pieChartTranslateX, {
          toValue: (width / 10),
          duration: 1000,
          useNativeDriver: true
        })
      ]).start();
    } else {
      console.log("inside else");
      Animated.timing(glassInputTranslateX, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start();
      pieChartTranslateX.setValue(0);
    };
  }

  const trimester = currentWeek / 12 <= 1 ? 'first' : currentWeek / 12 <= 2 ? 'second' : 'third';
  const trimesterWaterIntake = {
    first: 10,
    second: 11,
    third: 12
  }
  const glassStr = glasses > 1 ? 'glasses' : 'glass';

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleDay = (index) => {
    const updatedDays = [...notificationDays];
    updatedDays[index] = !updatedDays[index];
    setNotificationDays(updatedDays);
  };

  const saveWaterIntake = () => {
    if (!glasses || isNaN(Number(glasses)) || Number(glasses) <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid number of glasses");
      return;
    }

    // In a real app, this would save to a database or state management system
    console.log(`Water intake logged: ${glasses} glasses`);
    if (notificationsEnabled) {
      console.log(`Notification set for ${notificationTime} on selected days`);
    }

    Alert.alert(
      "Water Intake Logged!",
      `You've logged ${glasses} glasses of water for today.`,
      [{ text: "OK" }]
    );

    // Reset form
    setGlasses("");
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <CustomHeader icon="chevron-left" text="Stay Hydrated, Mama!" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: theme.secondaryColor }}>

        <LinearGradient
          colors={[theme.primaryColor, theme.secondaryColor]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ paddingTop: 20 }}
        >

          {
            readMoreClicked ?
              <Animated.View style={{ position: "relative", borderWidth: 4, borderRadius: 20, borderColor: theme.borderColor, opacity: fadeAnim, justifyContent: "center", alignItems: "center", paddingVertical: 20, paddingHorizontal: 40, margin: 10 }}>
                <Text style={{ fontSize: 16, color: theme.textColor, fontWeight: 400, marginBottom: 10 }}>Why Stay Hydrated?</Text>
                <Text style={{ fontSize: 14, textAlign: "justify", color: theme.textColor }}>
                  Drinking enough water supports your baby's healthy development. During pregnancy, your water needs increase to support your baby's development and your increased blood volume.
                  Proper hydration can help prevent constipation, reduce swelling, and support amniotic fluid levels.
                </Text>
                <Text style={{ marginTop: 6, fontSize: 16, fontStyle: "italic", fontWeight: 500, textAlign: "justify", color: theme.textColor }}>
                  Ideal water intake in the {trimester} trimester is {trimesterWaterIntake[trimester]}
                </Text>
                <TouchableOpacity style={{ position: "absolute", right: 15, top: 10 }} onPress={() => { setReadMoreClicked(false); fadeAnim.setValue(0) }}>
                  <EvilIcons name="close-o" size={26} color={theme.iconColor} />
                </TouchableOpacity>
              </Animated.View>
              :
              <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingTop: 20 }}>
                <Text style={{ fontSize: 14 }}>Drinking enough water supports your ...</Text>
                <TouchableOpacity onPress={handleReadMore}>
                  <Animated.Text style={{ color: "red", opacity: fadeAnim2 }}> READ MORE</Animated.Text>
                </TouchableOpacity>
              </View>
          }
        </LinearGradient>

        <View style={{ paddingTop: 20 }}>
          <View style={[styles.inputContainer, { borderWidth: 1, borderColor: theme.borderColor }]}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <Text style={{ fontWeight: 500, fontSize: 16, color: theme.textColor }}>How many glasses today?</Text>
              <Text style={{ alignSelf: "center", fontWeight: 400, fontSize: 14, color: theme.textLightColor }}> 1 glass = 250ml </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", paddingTop: 15, paddingBottom: 8 }}>
              <Animated.View style={[styles.inputNumberContainer, { transform: [{ translateX: glassInputTranslateX }] }]}>
                <TextInput style={[styles.numberContainer, { color: theme.textColor, borderColor: isFocused ? theme.primaryColor : theme.borderColor }]}
                  value={glasses}
                  onChangeText={handleInputGlassChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor={theme.borderColor}
                  maxLength={2}
                />
                <Text style={{ fontWeight: 500, fontSize: 14, color: theme.textColor }}>{glassStr}</Text>
              </Animated.View>

              {/* pie chart */}
              {glasses > 0 &&
                <Animated.View style={[{transform: [{ translateX: pieChartTranslateX }]}]}>
                  <PieChart
                    current={parseInt(glasses) || 0}
                    target={8} // Adjust target glasses as needed
                    size={50}
                  />
                </Animated.View>}
            </View>
          </View>

          {/* Notification Settings */}
          <View style={[styles.inputContainer, { borderWidth: 1, borderColor: theme.borderColor }]}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Bell size={20} color={theme.textLightColor} />
                <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "500", color: theme.textColor }}>Reminders</Text>
              </View>
              <Switch
                trackColor={{ false: theme.borderColor, true: theme.primaryColor }}
                thumbColor={theme.textColor}
                onValueChange={setNotificationsEnabled}
                value={notificationsEnabled}
              />
            </View>

            {notificationsEnabled && (
              <View>
                <CustomReminders />

                <Text style={{ color: theme.textColor, fontSize: 16, fontWeight: 500, marginTop: 20, paddingHorizontal: 10 }}>Repeat on:</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                  {dayNames.map((day, index) => (
                    <TouchableOpacity key={index}
                      onPress={() => toggleDay(index)}
                      style={{ width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: notificationDays[index] ? theme.primaryColor : theme.borderColor }}
                    >
                      <Text style={{ color: notificationDays[index] ? theme.textColor : "gray" }}>{day}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // background set from theme at usage site
  },
  benefitInfoContainer: {
    padding: 40,
    paddingBottom: 20,
    alignItems: "center"
  },
  benefitInfoTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  inputContainer: {
    borderRadius: 12,
    margin: 20,
    marginTop: 0,
    padding: 10,
    backgroundColor: "#fff"
  },
  inputNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  numberContainer: {
    borderRadius: 8,
    borderWidth: 2,
    marginRight: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: 22,
    fontWeight: "600"
  }
})
