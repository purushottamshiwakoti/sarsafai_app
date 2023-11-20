import { View } from "react-native";
import useAUthStore from "../hooks/useAuh";
import { Avatar, Button, Card, Text, Appbar } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [message, setMessage] = useState();
  const { logout, fullName, locationId, id } = useAUthStore();
  let formattedDate = ""; // Initialize formattedDate variable

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await axios.get(
          `https://sarsafai-web.vercel.app/api/info/${id}`
        );
        const data = res.data;
        const { notifications } = data;
        const lastIndex = notifications.length - 1;
        setMessage(notifications[lastIndex]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, []);
  console.log({ message });

  const timestamp =
    message && message.notification ? message.notification.createdAt : null;

  // Check if timestamp is valid before further processing
  if (timestamp) {
    const date = new Date(timestamp);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[date.getMonth()];
    formattedDate = `${monthName} ${date.getDate()}, ${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    // Use formattedDate in your component
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title={`Hello ${fullName}`} />
        <Appbar.Action
          icon={"logout"}
          onPress={() => {
            logout(), alert("Logged out Successfully");
          }}
        />
      </Appbar.Header>
      {message ? (
        <Card>
          <Card.Content>
            <Text variant="titleLarge">Fohor aayo </Text>
            <Text variant="bodyMedium">{message.notification.message}</Text>
            <Text>{timestamp && formattedDate}</Text>
          </Card.Content>
          <Card.Cover
            source={{
              uri: "https://img.freepik.com/premium-vector/whistle-vector-isolated-icon-emoji-illustration-whistle-vector-emoticon_603823-1047.jpg?w=2000",
            }}
          />
          <Card.Actions>
            {/* <Button>Cancel</Button>
          <Button>Ok</Button> */}
          </Card.Actions>
        </Card>
      ) : (
        <Text>Hold On..</Text>
      )}
    </View>
  );
};

export default User;
