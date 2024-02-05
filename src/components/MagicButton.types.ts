
import type { ReactNode, PropsWithChildren } from "react";
import type { ConnectArgs, ConnectResult, PublicClient } from "@wagmi/core";


export interface TransformChildrenProps extends ConnectResult<PublicClient> {}
export interface MagicButtonProps extends PropsWithChildren {
  transformChildren: (children?: ReactNode) => (data: TransformChildrenProps | undefined) => ReactNode | undefined;
  className?: string;
  connectArgs?: ConnectArgs;
  beforeConnect?: () => void;
  afterConnect?: () => void;
  beforeDisconnect?: () => void;
  afterDisconnect?: () => void;
}
