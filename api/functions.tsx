import TcpSocket from "react-native-tcp-socket";

// Ports
const NODE_PORT = 4866; // GUNN
const EXPLORER_PORT = 48660; // GUNN 0
const CONFIG_PORT = 48661; // GUNN 1

const trusted_nodes = ["45.33.51.145"];

export const sendMessage = async (message: string) => {
  const fetchData = new Promise<object>((resolve, reject) => {
    const socket = TcpSocket.createConnection(
      {
        host: trusted_nodes[Math.floor(Math.random() * trusted_nodes.length)],
        port: EXPLORER_PORT,
      },
      () => {
        socket.write(message);
      }
    );

    socket.on("data", (data) => {
      const parsedData = JSON.parse(data.toString());
      console.log(parsedData);
      socket.destroy();
      resolve(parsedData);
    });

    socket.on("error", (error) => {
      socket.destroy();
      reject();
    });
  });

  return await fetchData;
};

export const convertToUSD = (GUNN: number) => {
  // Placeholder price (my GPA/10)
  return 0.435 * GUNN;
};
