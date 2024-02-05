
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { MagicButton } from "./components";

export const useMagicButton = () => {
  const { address, connector, status } = useAccount()

  return { address };
}