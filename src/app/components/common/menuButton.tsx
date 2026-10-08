import { router } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type MenuButtonProps = {
  icon: ImageSourcePropType;
  label: string;
};

export const MenuButton = ({ icon, label }: MenuButtonProps) => {
  const handlePress = () => {
    if (label === "Quran") {
      router.push("../components/screen/quran/quran");
    }
    if(label === "Asmaul Husna") {
      router.push("../components/screen/asmaulhusna/asmaulhusnAllah");
    }
    if(label === "Asmaul Nabi"){
       router.push("../components/screen/asmaulhusna/asmaulNabiya");
    }
    if(label === "Dikr") {
      router.push("/components/screen/qibla/qibla")
    }
    if(label === "Shahada") {
      router.push("/components/screen/shahada/shahada")
    }
  };

  return (
    <View style={styles.menuButtonWrapper}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Image
          source={icon}
          style={styles.menuImage}
          resizeMode="contain"
          fadeDuration={0}
          tintColor="#FFFFFF"
          accessible
          accessibilityLabel={label}
        />
      </TouchableOpacity>

      <Text style={styles.menuLabel}>{label}</Text>
    </View>
  );
};

const ICON_SIZE = PixelRatio.roundToNearestPixel(32);

const styles = StyleSheet.create({
  menuButtonWrapper: {
    width: "22%",
    alignItems: "center",
    marginBottom: 24,
  },

  menuButton: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: 8,
    overflow: "hidden",
  },

  menuImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,

    // Prevent unwanted stretching
    maxWidth: ICON_SIZE,
    maxHeight: ICON_SIZE,
  },

  menuLabel: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});