import Header from "../../components/Admin/Header/Header";
import SideBar from "../../components/Admin/Sidebar";
import { Divider } from "@mantine/core";
import { useState, useEffect } from "react";
import { useCart } from "../../Context/CartContext";
import axios from "axios";

interface Message {
  name: string;
  email: string;
  message: string;
  date: string;
}

const Messages = () => {
  const { setLoading } = useCart();
  const token = localStorage.getItem("authToken");
  const [messages, setMessageData] = useState<Message[]>([]);

  const dateFormatter = (messagedate: any) => {
    const date = new Date(messagedate);
    const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit"
  })
    return formattedDate
  }

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const response = await axios.get<{ messages: Message[] }>(
        "http://localhost:3000/adminContact/allMessage",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setMessageData(response.data.messages); // Update state with fetched messages
    } catch (error) {
      console.error("Message Fetching Failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="w-full min-h-[100vh] bg-mine-shaft-950 flex">
      <SideBar />
      <div className="w-full">
        <Header />
        <Divider mx="md" mb="xl" />

        <div className="flex flex-col">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div
                key={index}
                className="flex flex-col gap-8 bg-mine-shaft-900 w-1/3 ml-6 rounded-md p-4 mt-2"
              >
                <div className="flex justify-between">
                  <div className="flex gap-2">
                  <img className="w-12 h-12" src="/Model/user.png" alt="profileImage" />
                  <div>
                    <div className="text-mine-shaft-100">{message.name}</div>
                    <div className="text-mine-shaft-500">{message.email}</div>
                  </div>
                  </div>
                  <div>{dateFormatter(message.date)}</div>
                </div>
                <div className="text-mine-shaft-300">{message.message}</div>
         
              </div>
            ))
          ) : (
            <div className="text-mine-shaft-400 text-center mt-8">No messages found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
