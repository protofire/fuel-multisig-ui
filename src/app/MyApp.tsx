"use client";
import { CacheProvider } from "@emotion/react";

import { BreadcrumbProvider } from "@/context/BreadcrumbContext";
import { FormatAccountWalletItemProvider } from "@/context/FormatAccountWalletItem";
import { InteractionErrorProvider } from "@/context/InteractionErrorContext";
import { LocalDbProvider } from "@/context/LocalDbContext";
import { NetworkConnectionConfig } from "@/context/NetworkConnectionConfig";
import {
  SettingsThemeConsumer,
  SettingsThemeProvider,
} from "@/context/SettingsThemeConsumer";
import ThemeCustomization from "@/themes";
import createEmotionCache from "@/utils/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <NetworkConnectionConfig>
        <LocalDbProvider>
          <InteractionErrorProvider>
            <FormatAccountWalletItemProvider>
              <SettingsThemeConsumer>
                {({ settings }) => (
                  <SettingsThemeProvider>
                    <ThemeCustomization settings={settings}>
                      <BreadcrumbProvider>{children}</BreadcrumbProvider>
                    </ThemeCustomization>
                  </SettingsThemeProvider>
                )}
              </SettingsThemeConsumer>
            </FormatAccountWalletItemProvider>
          </InteractionErrorProvider>
        </LocalDbProvider>
      </NetworkConnectionConfig>
    </CacheProvider>
  );
}
