import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import asmaulHusna from "../../../../constants/asmaul_husna.json";
import HomeBannerAd from "../../ads/HomeBannerAd";
import AppBar from "../../common/AppBar";
import Asmaulhusna from "./asmaulhusna";

export default function asmaulhusnAllah() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Asmaul Husna" />
      <Asmaulhusna
        title="Asmaul Husna"
        data={asmaulHusna}
        subtitle="99 Names of Allah"
        name="Allah"
      />
      <HomeBannerAd />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
