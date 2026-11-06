import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import asmaulHusnaNabi from "../../../../constants/asmaal_nabi_202_names.json";
import AppBar from "../../common/AppBar";
import Asmaulhusna from "./asmaulhusna";
import { useEffect, useRef } from "react";
import { preloadInterstitial, showInterstitial } from "../../ads/InterstitialAdManager";

export default function asmaulhusnAllah() {

  /// ads
  
    const hasShownAd = useRef(false);
  
    useEffect(() => {
      // Preload the next interstitial ad.
      preloadInterstitial();
  
      // Show the ad once when this screen opens, if it's ready.
      if (!hasShownAd.current) {
        hasShownAd.current = true;
        showInterstitial();
      }
  
      return () => {
        hasShownAd.current = false;
      };
    }, []);


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
