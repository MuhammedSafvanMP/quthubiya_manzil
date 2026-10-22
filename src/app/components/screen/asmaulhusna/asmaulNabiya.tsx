import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import asmaulHusnaNabi from "../../../../constants/asmaal_nabi_202_names.json";
import AppBar from "../../common/AppBar";
import Asmaulhusna from "./asmaulhusna";

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
