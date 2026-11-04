import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import asmaulHusnaNabi from "../../../../constants/asmaal_nabi_202_names.json";
import AppBar from "../../common/AppBar";
import Asmaulhusna from "./asmaulhusna";
import HomeBannerAd from "../../ads/HomeBannerAd";

export default function asmaulhusnAllah() {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Asmaul Nabi" />
      <Asmaulhusna
        title="Asmaul Nabi"
        data={asmaulHusnaNabi}
        subtitle="201 Names of Nabi"
        name="Nabi"
      />
        <View style={styles.ads}>
        <HomeBannerAd />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    ads: {
    width: "100%",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    marginBottom: 0,
  },
});
