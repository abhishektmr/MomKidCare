import { useAppTheme } from "@/theme/AppTheme";
import { Ionicons } from "@expo/vector-icons";
import { Bell } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomReminders = () => {
    const theme = useAppTheme();

    const [reminders, setReminders] = useState([
        { id: 1, glasses: 2, hours: 8, minutes: 0, gradient: "AM" },
        { id: 2, glasses: 3, hours: 12, minutes: 0, gradient: "PM" },
        { id: 3, glasses: 4, hours: 8, minutes: 30, gradient: "PM" },
    ]);

    const handleDelete = (id) => {
        setReminders(reminders.filter((reminder) => reminder.id !== id));
    };

    const handleGlassChange = (id, change) => {
        setReminders((prev) =>
            prev.map((r) =>
                r.id === id ? { ...r, glasses: Math.max(0, r.glasses + change) } : r
            )
        );
    };

    const handleTimeChange = (id, field, change) => {
        setReminders((prev) =>
            prev.map((r) => {
                if (r.id !== id) return r;
                if (field === "hours") {
                    let newHour = r.hours + change;
                    if (newHour > 12) newHour = 1;
                    if (newHour < 1) newHour = 12;
                    return { ...r, hours: newHour };
                } else if (field === "minutes") {
                    let newMinute = r.minutes + change * 5;
                    if (newMinute >= 60) newMinute = 0;
                    if (newMinute < 0) newMinute = 55;
                    return { ...r, minutes: newMinute };
                }
                return r;
            })
        );
    };

    const toggleGradient = (id) => {
        setReminders((prev) =>
            prev.map((r) =>
                r.id === id
                    ? { ...r, gradient: r.gradient === "AM" ? "PM" : "AM" }
                    : r
            )
        );
    };

    const renderReminder = ({ item }) => (
        <View style={[styles.card, {borderColor: theme.borderColor, borderWidth: 1}]}>
            {/* --- Glass Counter --- */}
            <View style={styles.glassContainer}>

                <TouchableOpacity onPress={() => handleGlassChange(item.id, -1)}>
                    <View style={[styles.circleButton, {borderWidth: 1, borderColor: theme.borderColor}]}>
                        <Text style={[styles.btnText, {color: theme.textColor}]}>-</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.glassText}>{item.glasses} 💧</Text>

                <TouchableOpacity onPress={() => handleGlassChange(item.id, 1)}>
                    <View style={[styles.circleButton, {borderWidth: 1, borderColor: theme.borderColor}]}>
                        <Text style={[styles.btnText, {color: theme.textColor}]}>+</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 90, alignItems: "center", justifyContent: "center" }}>
                {/* --- Time Picker --- */}
                <View style={[styles.timeContainer]}>
                    {/* Hours */}
                    <View style={styles.timeSection}>
                        <TouchableOpacity onPress={() => handleTimeChange(item.id, "hours", -1)} style={[styles.upDownButtons, {borderWidth: 1, borderColor: theme.borderColor}]}>
                            <Ionicons name="chevron-down" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                        <Text style={[styles.timeValue, {backgroundColor: theme.btnColor, color: theme.textColor, borderWidth: 1, borderColor: theme.borderColor}]}>{item.hours}</Text>
                        {/* AM / PM toggle */}
                        <TouchableOpacity onPress={() => toggleGradient(item.id)} style={[styles.gradientBox, {backgroundColor: theme.btnColor, borderWidth: 1, borderColor: theme.borderColor}]}>
                            <Text style={[styles.gradientText, {color: theme.textColor}]}>{item.gradient}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTimeChange(item.id, "hours", 1)} style={[styles.upDownButtons, {borderWidth: 1, borderColor: theme.borderColor}]}>
                            <Ionicons name="chevron-up" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                    </View>

                    {/* <Text style={styles.colon}>:</Text> */}

                    {/* Minutes */}
                    {/* <View style={styles.timeSection}>
                        <TouchableOpacity onPress={() => handleTimeChange(item.id, "minutes", 1)} style={styles.upDownButtons}>
                            <Ionicons name="chevron-up" size={24} color="#007AFF" />
                        </TouchableOpacity>
                        <Text style={styles.timeValue}>{item.minutes.toString().padStart(2, "0")}</Text>
                        <TouchableOpacity onPress={() => handleTimeChange(item.id, "minutes", -1)} style={styles.upDownButtons}>
                            <Ionicons name="chevron-down" size={24} color="#007AFF" />
                        </TouchableOpacity>
                    </View> */}

                </View>

                {/* --- Delete Button --- */}
                <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
                    <Ionicons name="trash-outline" size={22} color={theme.iconColor} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, {backgroundColor: theme.secondaryColor}]}>
            <Text style={[styles.title, {color: theme.textColor}]}>Your Reminders</Text>

            {reminders.length === 0 ? <><Text style={{color: theme.textColor, marginBottom: 10}}>You can create up to 5 reminders </Text></> : 
        
            <View>
                <FlatList
                    data={reminders}
                    renderItem={renderReminder}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    scrollEnabled={false}
                />
            </View>
            }

            <TouchableOpacity
                style={[styles.addButton, {backgroundColor: theme.btnColor}]}
                onPress={() =>
                    reminders.length === 5 ? 
                        Alert.alert("Reminders", "Not more than 5 reminders can be set.", [{ text: "OK" }], { cancelable: false })
                    : 
                    setReminders([
                        ...reminders,
                        { id: Date.now(), glasses: 1, hours: 8, minutes: 0, gradient: "AM" },
                    ])
                }
            >
                <Bell size={20} color={theme.textLightColor} />
                <Text style={[styles.addText, { color: theme.textColor}]}>Add New Reminder</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CustomReminders;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderRadius: 12
    },
    title: {
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 6,
        paddingBottom: 0,
        marginBottom: 8,
        position: "relative"
    },
    glassContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,
    },
    circleButton: {
        borderRadius: 25,
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center"
    },
    btnText: {
        fontSize: 20,
        fontWeight: 500,
    },
    glassText: {
        fontSize: 16,
        fontWeight: "600",
        marginHorizontal: 12,
        color: "#333",
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    timeSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
    },
    timeValue: {
        fontSize: 14,
        fontWeight: "700",
        color: "#007AFF",
        borderRadius: 10,
        marginLeft: 6,
        paddingVertical: 5,
        paddingHorizontal: 12,
        minWidth: 30,
        textAlign: "center",
    },
    upDownButtons: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6
    },
    colon: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#007AFF",
        marginHorizontal: 4,
    },
    gradientBox: {
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 12,
        margin: 6,
    },
    gradientText: {
        fontSize: 14,
        fontWeight: "600",
    },
    deleteButton: {
        position: "absolute",
        bottom: 10,
        right: 15,
    },
    addButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        borderRadius: 15,
        marginTop: 20,
    },
    addText: {
        fontWeight: "600",
        marginLeft: 6,
    },
    listContent: {
        paddingBottom: 20,
    },
});