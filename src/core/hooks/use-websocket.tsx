import useTableState from "./use-table";

const useWebSocket = () => {
  const { setTableState, setWebsocketStatus, resetTableState } = useTableState();

  const connectWebsocket = (socket: WebSocket) => {
    socket.onopen = () => {
      console.log("WebSocket connection opened");
      setWebsocketStatus("connected");
    };

    socket.onmessage = (event) => {
      try {
        const data: IWebsocketMessage = JSON.parse(event.data);
        console.log(data);
        if (data.status === "success") {
          setTableState(data.table_state);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message", error);
      }
    };
    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setWebsocketStatus("disconnected");
      resetTableState();
    };
    socket.onerror = (error) => {
      console.error("WebSocket error", error);
      setWebsocketStatus("error");
    };
  };

  const join = (ws: WebSocket, amount: string, rpc?: number) => {
    console.log(amount);
    console.log(typeof amount);
    const msg = {
      "id": rpc || 1,
      "json_rpc_version": 2,
      "method": "join",
      "params": {
          "amount": amount,
          "cards": ""
      }
  };
    try {
      ws.send(JSON.stringify(msg));
    } catch (error) {
      console.error("WebSocket error:", error);
    }
  }

  return { connectWebsocket, join };
};

export default useWebSocket;
