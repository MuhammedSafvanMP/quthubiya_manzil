import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs
      labelVisibilityMode="unlabeled"
      backgroundColor="#FFFFFF"
      iconColor={{
        default: "#777777",
        selected: "#000000",
      }}
      indicatorColor="transparent"
      rippleColor="transparent"
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          src={require("../../../assets/images/icons/house.png")}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="audio">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          src={require("../../../assets/images/icons/headphones.png")}
        />
      </NativeTabs.Trigger>

      {/* <NativeTabs.Trigger name="favorite">
        <NativeTabs.Trigger.Label hidden />

        <NativeTabs.Trigger.Icon
          src={require("../../../assets/images/icons/bookmark.png")}
        />
      </NativeTabs.Trigger> */}

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon
          src={require("../../../assets/images/icons/settings.png")}
        />
      </NativeTabs.Trigger>

     
        <NativeTabs.Trigger name="search" role="search">
          <NativeTabs.Trigger.Label hidden />
          <NativeTabs.Trigger.Icon
            src={require("../../../assets/images/icons/search.png")}
          />
        </NativeTabs.Trigger>
   
    </NativeTabs>
  );
}
