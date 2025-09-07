import { ConfigContext, ExpoConfig } from "@expo/config";

const EAS_PROJECT_ID = "f9d850a7-dd8c-47b3-a09d-a55af206ab39";
const PROJECT_SLUG = "mchat";
const OWNER = "apex5767";

// Production Config
const APP_NAME = "Mchat";
const BUNDLE_IDENTIFIER = "com.muzztech.mchat";
const PACKAGE_NAME = "com.muzztech.mchat";
const ICON = "./assets/images/app-icon.png";
const SCHEME = "app-scheme";

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, scheme, packageName, bundleIdentifier } = getDynamicAppConfig(
    (process.env.APP_ENV as "development" | "preview" | "production") ||
      "development"
  );

  return {
    ...config,
    name: name,
    slug: PROJECT_SLUG,
    version: "1.0.0",
    icon: ICON,
    android: {
      adaptiveIcon: {
        foregroundImage: ICON,
        backgroundColor: "#ffffff",
      },
      package: packageName,
      edgeToEdgeEnabled: true,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: ICON,
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: ICON,
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    scheme: scheme,
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    owner: OWNER,
  };
};

export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      scheme: SCHEME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    scheme: `${SCHEME}-dev`,
  };
};
