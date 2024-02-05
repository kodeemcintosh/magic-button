
import React, { PropsWithChildren } from "react";
import { WagmiConfig } from 'wagmi';
import { Provider } from "./config";
import { initConfig } from './config';

export interface MBProviderProps extends PropsWithChildren {
  backupProvider: Provider;
}
export const MBProvider = ({ children, backupProvider }: MBProviderProps) => <WagmiConfig config={initConfig({ backupProvider })}>{children}</WagmiConfig>
