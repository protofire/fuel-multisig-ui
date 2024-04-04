"use client";
import { CacheProvider } from "@emotion/react";

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
            <SettingsThemeConsumer>
              {({ settings }) => (
                <SettingsThemeProvider>
                  <ThemeCustomization settings={settings}>
                    {children}
                  </ThemeCustomization>
                </SettingsThemeProvider>
              )}
            </SettingsThemeConsumer>
          </InteractionErrorProvider>
        </LocalDbProvider>
      </NetworkConnectionConfig>
    </CacheProvider>
  );
}
