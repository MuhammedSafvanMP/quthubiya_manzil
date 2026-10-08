import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface AppBarProps {
  title: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
}

export default function AppBar({
  title,
  showBack = true,
  rightComponent,
}: AppBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>

        {/* Left */}
        <View style={styles.leftContainer}>
          {showBack && (
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              hitSlop={10}
            >
              <ChevronLeft
                size={28}
                color="#111827"
                strokeWidth={2.2}
              />
            </Pressable>
          )}
        </View>

        {/* Center */}
        <View
          pointerEvents="none"
          style={styles.centerContainer}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.title}
          >
            {title}
          </Text>
        </View>

        {/* Right */}
        <View style={styles.rightContainer}>
          {rightComponent}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 64,
  },

  header: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    position: "relative",
  },

  leftContainer: {
    width: 48,
    height: 48,
    alignItems: "flex-start",
    justifyContent: "center",
    zIndex: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },

  centerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 70,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  rightContainer: {
    marginLeft: "auto",
    minWidth: 48,
    height: 48,
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 10,
  },
});