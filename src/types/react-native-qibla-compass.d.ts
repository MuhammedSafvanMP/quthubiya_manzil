declare module "react-native-qibla-compass" {
  import type { ComponentType } from "react";
  import type { ViewProps } from "react-native";

  interface QiblaCompassProps extends ViewProps {
    color?: string;
    backgroundColor?: string;
  }

  const QiblaCompass: ComponentType<QiblaCompassProps>;

  export default QiblaCompass;
}