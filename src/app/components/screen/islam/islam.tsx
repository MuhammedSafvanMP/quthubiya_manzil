import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import islamData from "../../../../constants/islam.json";
import HomeBannerAd from "../../ads/HomeBannerAd";
import AppBar from "../../common/AppBar";

export default function IslamScreen() {
  return (
    <SafeAreaView>
      <AppBar title={islamData.data.title_english} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerArabic}>{islamData.data.title}</Text>

        <Text style={styles.headerMalayalam}>
          {islamData.data.title_malayalam}
        </Text>

        {islamData.data.islam.map((item, index) => (
          <View key={item.arabic_title} style={styles.card}>
            <Text style={styles.number}>{index + 1}</Text>

            <Text style={styles.arabic}>{item.arabic_title}</Text>

            <Text style={styles.english}>{item.enlish_title}</Text>

            <Text style={styles.malayalam}>{item.malayalam_title}</Text>
          </View>
        ))}
      </ScrollView>
      <HomeBannerAd />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    // backgroundColor: "#F7F9F5",
  },
  headerArabic: {
    fontSize: 30,
    textAlign: "center",
    color: "#176B45",
    marginTop: 12,
    fontWeight: "bold",
  },
  headerEnglish: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 8,
    color: "#222",
  },
  headerMalayalam: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    color: "#555",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E0E9E1",
  },
  number: {
    fontSize: 14,
    color: "#176B45",
    fontWeight: "bold",
    marginBottom: 10,
  },
  arabic: {
    fontSize: 26,
    textAlign: "right",
    writingDirection: "rtl",
    color: "#176B45",
    marginBottom: 12,
    lineHeight: 42,
  },
  english: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  malayalam: {
    fontSize: 16,
    lineHeight: 28,
    color: "#555",
  },
});
