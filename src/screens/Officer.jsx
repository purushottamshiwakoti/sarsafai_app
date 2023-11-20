import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  Appbar,
  Button,
  Dialog,
  Portal,
  PaperProvider,
} from "react-native-paper";

import React, { useEffect, useState } from "react";
import useAUthStore from "../hooks/useAuh";
import SelectDropdown from "react-native-select-dropdown";
import RNPickerSelect from "react-native-picker-select";
import { WebView } from "react-native-webview";

import axios from "axios";

const Officer = () => {
  const { logout, fullName } = useAUthStore();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  console.log({ selectedLocation });
  console.log({ locations });
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  useEffect(() => {
    const fetchLocations = async () => {
      const response = await axios.get(
        "https://sarsafai-web.vercel.app/api/location"
      );
      console.log(response);
      const { locations } = response.data;
      setLocations(locations);
    };
    fetchLocations();
  }, []);
  console.log(locations);
  const items = locations.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const notifyUsers = async () => {
    try {
      const response = await axios.post(
        "https://sarsafai-web.vercel.app/api/fohorCollection",
        { locationId: selectedLocation }
      );
      if (response.statusCode === 200) {
        setSelectedLocation("");
        alert("Successfully sended Notifications");
      }
    } catch (error) {
      console.log(error);
    }
    alert("Successfully sended Notifications");
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <SafeAreaView>
        <PaperProvider>
          <Appbar.Header>
            <Appbar.Content title={`Hello ${fullName}`} />
            <Appbar.Action
              icon={"logout"}
              onPress={() => {
                logout(), alert("Logged out Successfully");
              }}
            />
          </Appbar.Header>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={{ marginTop: 10 }}>Select Location</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedLocation(value)}
              items={items}
              //   placeholder="snnsns"
            />
            <View>
              <Button
                mode="outlined"
                style={{ marginTop: 10, marginBottom: 10 }}
                onPress={() => notifyUsers()}
              >
                Send Alert
              </Button>
              <Button onPress={showDialog}>View Map</Button>
              <Portal>
                <Dialog
                  visible={visible}
                  onDismiss={hideDialog}
                  style={styles.dialog}
                >
                  <Dialog.Title>Map will be intregrated asap..</Dialog.Title>
                  <Dialog.Actions>
                    <Button onPress={hideDialog}>Done</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </View>
        </PaperProvider>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  dialog: {
    alignItems: "center",
    justifyContent: "center",
  },
  dialogContent: {
    width: "80%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Officer;
