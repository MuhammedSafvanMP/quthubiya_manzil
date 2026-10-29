import { router } from "expo-router";
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

export default function MenuButton({ icon, label }: MenuButtonProps) {
  const LARGE_ICON_LABELS = [
    "Iman karyam",
    "Islam karyam",
    "Majlisunoor",
    "Nombu",
  ];

  const ICON_SIZE = PixelRatio.roundToNearestPixel(
    LARGE_ICON_LABELS.includes(label) ? 60 : 32,
  );

  const handlePress = () => {
    if (label === "Quran") {
      router.push("/components/screen/quran/surah/quran");
    } else if (label === "Asmaul Husna") {
      router.push("../components/screen/asmaulhusna/asmaulhusnAllah");
    } else if (label === "Asmaul Nabi") {
      router.push("../components/screen/asmaulhusna/asmaulNabiya");
    } else if (label === "Qibla Finder") {
      router.push("../components/screen/qibla/qibla");
    } else if (label === "Shahada") {
      router.push("../components/screen/shahada/shahada");
    } else if (label === "Counter") {
      router.push("../components/screen/counter/counter");
    } else if (label === "Prayer Time") {
      router.push("../components/screen/prayer/prayer");
    } else if (label === "Meelad Nabi") {
      router.push("../components/screen/meelad/meelads");
    } else if (label === "Niskaram") {
      router.push("../components/screen/niskaram/niskaram");
    } else if (label === "Iman karyam") {
      router.push("../components/screen/iman/iman");
    } else if (label === "Islam karyam") {
      router.push("../components/screen/islam/islam");
    } else if (label === "Majlisunoor") {
      router.push("../components/screen/majlisnoor/majlisnoor");
    } else if (label === "Calendar") {
      router.push("../components/screen/calendar/calendar");
    } else if (label === "Nombu") {
      router.push("../components/screen/nombu/nombu");
    } else if (label === "Swalath") {
      router.push("../components/screen/swalath/swalath");
    } else if (label === "Hajju & Umra") {
      router.push("../components/screen/umra");
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
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            maxWidth: ICON_SIZE,
            maxHeight: ICON_SIZE,
          }}
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
}

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

  menuLabel: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
