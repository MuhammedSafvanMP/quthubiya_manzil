
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
      {/* Home */}
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon sf="house" md="home" />
      </NativeTabs.Trigger>

      {/* Audio */}
      <NativeTabs.Trigger name="audio">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon sf="headphones" md="headphones" />
      </NativeTabs.Trigger>

      {/* Settings */}
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon sf="gearshape" md="settings" />
      </NativeTabs.Trigger>

      {/* Search */}
      <NativeTabs.Trigger name="search" role="search">
        <NativeTabs.Trigger.Label hidden />
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
