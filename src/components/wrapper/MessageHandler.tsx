/**
 * Dependencies: StoreProvider
 */
import { useEffect } from "react";
import { useAppSelector } from "../../store";
import { message as _message } from "antd";

export interface MessageHandlerProps {
  children?: React.ReactNode;
}

function MessageHandler(props: MessageHandlerProps) {
  const { message, status, logs } = useAppSelector((state) => state.app.alert);

  const messageOptions = {
    error: _message.error,
    warn: _message.warning,
    info: _message.info,
  };

  useEffect(() => {
    if (message !== "N/A") {
      messageOptions[status](message, 0.5);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);

  return <>{props.children}</>;
}

export default MessageHandler;
