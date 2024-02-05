
import React, { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { MagicButtonProps } from "./MagicButton.types"

export const MagicButton = ({ children, transformChildren, className, connectArgs, beforeConnect, afterConnect, beforeDisconnect, afterDisconnect }: MagicButtonProps) => {
  const [uiSwitch, setUiSwitch] = useState(false);
  // const { connector, isConnected } = useAccount()
  // const { connect, connectors, error, isLoading, pendingConnector }
  const { data, connectAsync, reset: resetAfterConnect, status: connectStatus } = useConnect(connectArgs)
  const { disconnectAsync, reset: resetAfterDisconnect, status: disconnectStatus } = useDisconnect({ onSettled: () => setUiSwitch(false) });

  useEffect(() => {}, [connectStatus, disconnectStatus])

  const connect = async () => {
    if(!!beforeConnect) {
      beforeConnect()
    }

    await connectAsync(connectArgs);

    if(!!afterConnect) {
      afterConnect()
    }
  }

  const disconnect = async () => {
    if(!!beforeDisconnect) {
      beforeDisconnect()
    }

    await disconnectAsync();

    if(!!afterDisconnect) {
      afterDisconnect()
    }

    resetAfterDisconnect()
  }

  const handleClick = async () => {
    if(['idle', 'success'].includes(connectStatus)) {
      await disconnect()
    }

    await connect()
  }

  return (
    <button id="magic" className={className} onClick={handleClick}>
      {uiSwitch ? transformChildren(children)(data) : children}
    </button>
  );
}