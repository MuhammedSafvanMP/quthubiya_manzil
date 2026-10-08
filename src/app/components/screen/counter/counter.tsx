import React, { useState } from "react";
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../common/AppBar";

const DEFAULT_TARGET = 33;

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(DEFAULT_TARGET);

  const progress = Math.min(count / target, 1);

  const increment = () => {
    setCount((previous) => previous + 1);
  };

  const decrement = () => {
    setCount((previous) => Math.max(0, previous - 1));
  };

  const resetCounter = () => {
    Alert.alert("Reset Counter", "Do you want to reset your zikr count?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        style: "destructive",
        onPress: () => setCount(0),
      },
    ]);
  };

  const changeTarget = () => {
    Alert.alert("Choose Target", "Select your zikr target.", [
      {
        text: "33",
        onPress: () => setTarget(33),
      },
      {
        text: "100",
        onPress: () => setTarget(100),
      },
      {
        text: "1000",
        onPress: () => setTarget(1000),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <AppBar title="Zikr Counter" />
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
           
          </View>

          <Pressable
            style={styles.headerIcon}
            onPress={changeTarget}
            accessibilityRole="button"
            accessibilityLabel="Change target"
          >
            <Ionicons name="settings-outline" size={23} color="#111111" />
          </Pressable>
        </View>

        {/* Main Counter Card */}
        <View style={styles.counterCard}>
          <Text style={styles.cardLabel}>YOUR DAILY ZIKR</Text>

       

          {/* Circular Counter */}
          <View style={styles.circleOuter}>
            <View style={styles.circleInner}>
              <Text
                style={styles.countText}
                adjustsFontSizeToFit
                numberOfLines={1}
              >
                {count}
              </Text>

              <View style={styles.countDivider} />

              <Text style={styles.targetText}>of {target}</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.progressSection}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>

            <Text style={styles.progressText}>
              {Math.round(progress * 100)}% completed
            </Text>
          </View>

          {/* Reset and +/- Controls */}
          <View style={styles.controlsRow}>
            <Pressable
              onPress={resetCounter}
              style={({ pressed }) => [
                styles.resetButton,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
            >
              <Ionicons
                name="refresh-outline"
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.resetText}>RESET</Text>
            </Pressable>

            <Pressable
              onPress={decrement}
              style={({ pressed }) => [
                styles.smallButton,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Decrease count"
            >
              <Ionicons name="remove" size={25} color="#FFFFFF" />
            </Pressable>

            <Pressable
              onPress={increment}
              style={({ pressed }) => [
                styles.smallButton,
                pressed && styles.pressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Increase count"
            >
              <Ionicons name="add" size={25} color="#FFFFFF" />
            </Pressable>
          </View>

          {/* Main Tap Button */}
          <Pressable
            onPress={increment}
            style={({ pressed }) => [
              styles.tapButton,
              pressed && styles.tapButtonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Tap to count zikr"
          >
            <Ionicons name="finger-print-outline" size={23} color="#111111" />

            <Text style={styles.tapButtonText}>
              {count >= target ? "CONTINUE ZIKR" : "TAP TO COUNT"}
            </Text>
          </Pressable>

          {/* Target completed message */}
          {count >= target && (
            <View style={styles.completedBadge}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.completedText}>
                Target completed. MashaAllah!
              </Text>
            </View>
          )}
        </View>

        {/* Bottom Info Cards */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="flag-outline" size={21} color="#111111" />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Target</Text>
              <Text style={styles.infoValue}>{target} times</Text>
            </View>

            <Pressable
              onPress={changeTarget}
              style={styles.editButton}
              accessibilityRole="button"
              accessibilityLabel="Edit target"
            >
              <Ionicons name="pencil-outline" size={17} color="#111111" />
            </Pressable>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="checkmark-done-outline"
                size={22}
                color="#111111"
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Completed</Text>
              <Text style={styles.infoValue}>
                {Math.floor(count / target)} rounds
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLine} />
          <Text style={styles.footerText}>QUTHUBIYA MANZIL</Text>
          <View style={styles.footerLine} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 18,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  heading: {
    fontSize: 25,
    fontWeight: "800",
    color: "#111111",
    letterSpacing: 0.3,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: "#777777",
  },

  headerIcon: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  counterCard: {
    backgroundColor: "#080808",
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 27,
    paddingBottom: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#222222",
  },

  cardLabel: {
    fontSize: 10,
    color: "#AAAAAA",
    fontWeight: "700",
    letterSpacing: 3,
  },

  arabicText: {
    color: "#FFFFFF",
    fontSize: 32,
    marginTop: 17,
    textAlign: "center",
    lineHeight: 55,
  },

  zikrName: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "700",
    marginTop: 2,
  },

  zikrMeaning: {
    color: "#AFAFAF",
    fontSize: 13,
    marginTop: 5,
  },

  circleOuter: {
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    padding: 5,
    marginTop: 28,
    marginBottom: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  circleInner: {
    flex: 1,
    width: "100%",
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },

  countText: {
    color: "#080808",
    fontSize: 55,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },

  countDivider: {
    width: 35,
    height: 2,
    backgroundColor: "#DCDCDC",
    marginTop: 3,
    marginBottom: 8,
  },

  targetText: {
    color: "#777777",
    fontSize: 14,
    fontWeight: "500",
  },

  progressSection: {
    width: "100%",
    marginBottom: 23,
    paddingHorizontal: 2,
  },

  progressTrack: {
    height: 5,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#333333",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },

  progressText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 11,
    color: "#B5B5B5",
    letterSpacing: 0.5,
  },

  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
    marginBottom: 15,
  },

  resetButton: {
    flex: 1,
    height: 47,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#BDBDBD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  resetText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.3,
  },

  smallButton: {
    width: 48,
    height: 47,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  tapButton: {
    width: "100%",
    minHeight: 57,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 11,
    paddingHorizontal: 10,
  },

  tapButtonPressed: {
    backgroundColor: "#E8E8E8",
    transform: [{ scale: 0.98 }],
  },

  tapButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 17,
  },

  completedText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },

  infoCard: {
    flex: 1,
    minHeight: 86,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderRadius: 18,
    backgroundColor: "#F7F7F7",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    color: "#777777",
    fontSize: 11,
  },

  infoValue: {
    color: "#111111",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
  },

  editButton: {
    padding: 3,
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 25,
  },

  footerLine: {
    height: 1,
    width: 27,
    backgroundColor: "#DDDDDD",
  },

  footerText: {
    color: "#999999",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
  },
});