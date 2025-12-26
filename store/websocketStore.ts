import { create } from "zustand";

interface WebsocketStore {
  ws: null | WebSocket;
  isConnected: boolean;
  onlineUsers: string[] | [];
  connectToWebsocketServer: (userId: string) => void;
  disconnectWebsocketServer: (userId: string) => void;
}

const useWebsocketStore = create<WebsocketStore>((set, get) => ({
  // states
  ws: null,
  isConnected: false,
  onlineUsers: [],

  // actions
  connectToWebsocketServer: (userId) => {
    //   check if already connected
    const { ws } = get();
    if (ws) {
      if (ws.readyState === WebSocket.OPEN) return;

      console.log("already connected...");
      return;
    }

    // create new connection
    const websocket = new WebSocket("ws://localhost:8000/ws");

    websocket.onopen = () => {
      set({ ws: websocket, isConnected: true });
      // send user_connected event with userId
      websocket.send(
        JSON.stringify({ type: "user_connected", userId: userId })
      );
    };

    websocket.onmessage = (event) => {
      // event is a MessageEvent object
      // Browser's WebSocket API gives you a MessageEvent object
      // This event object has multiple properties: data, type, origin, etc.
      // The actual message content is inside event.data
      const data = JSON.parse(event.data);

      // check messages events
      if (data.type === "user_online") {
        // set online users
        const userId = data.userId;
        const { onlineUsers } = get();

        // remove duplicate id if there
        const filterUsers = onlineUsers.filter((id) => id !== userId);

        set({ onlineUsers: [...filterUsers, userId] });

        console.log(`${data.userId} is Online`);
      } else if (data.type === "user_offline") {
        //   set online users
        console.log(`${data.userId} is Offline`);

        const { onlineUsers } = get();
        const updatedOnlineUsers = onlineUsers.filter(
          (id) => id !== data.userId
        );
        set({ onlineUsers: updatedOnlineUsers });
      } else if (data.type === "online_users_list") {
        set({ onlineUsers: data.onlineUserIds });
      }
    };

    websocket.onclose = () => {
      set({ ws: null, isConnected: false });
      set({ onlineUsers: [] });
    };

    websocket.onerror = () => {
      set({ ws: null, isConnected: false });
    };
  },
  disconnectWebsocketServer: (userId) => {
    const { ws } = get();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close(1000, userId);
      set({ ws: null, isConnected: false });
    }
  },
}));

export default useWebsocketStore;
