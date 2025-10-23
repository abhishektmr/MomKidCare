import { useAppTheme } from '@/theme/AppTheme';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const PieChart = ({ current, target, size = 50 }) => {
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const progress = Math.min((current / target) * 100, 100);
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (progress / 100) * circumference;

    const animatedProgress = useRef(new Animated.Value(circumference)).current;

    const theme = useAppTheme();

    useEffect(() => {
        Animated.timing(animatedProgress, {
            toValue: progressOffset,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [progressOffset]);

    return (
        <View style={{ width: size, height: size }}>
            <Svg width={size} height={size}>
                {/* Background circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={theme.btnColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Progress circle */}
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={theme.primaryColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={animatedProgress}
                    strokeLinecap="round"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>
            {/* Center text showing percentage */}
            <View style={styles.pieChartCenter}>
                <Text style={[styles.pieChartText, {color: theme.textColor}]}>{Math.round(progress)}%</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pieChartCenter: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pieChartText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default PieChart;