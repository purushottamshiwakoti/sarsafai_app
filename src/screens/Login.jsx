import { View, Text, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { Appbar, Icon } from "react-native-paper";
import { TextInput, HelperText } from "react-native-paper";
import { Button } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import useAUthStore from "../hooks/useAuh";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();
  const { fullName, setId, setFullName, setRole, setLocationId } =
    useAUthStore();
  const handleLogin = async () => {
    try {
      setError(false);

      setLoading(true);
      const response = await axios.post(
        "https://sarsafai-web.vercel.app/api/signin",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 410) {
        setError(true);
      }
      console.log(response.data);

      const { findUser } = response.data;
      setFullName(findUser.fullName);
      setRole(findUser.role);
      setId(findUser.id);
      setLocationId(findUser.locationId);
      if (findUser.role === "USER") {
        navigation.navigate("User");
        alert("Logged in successfully");
      }
      if (findUser.role === "OFFICER") {
        navigation.navigate("Officer");
        alert("Logged in successfully");
      }
      if (findUser.role === "ADMIN") {
        setError(true);
      }

      // const responseData = response.data; // Get the response data
      // console.log(JSON.stringify(responseData)); // Log the JSON response data
    } catch (error) {
      console.log({ error });
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.Content title="Login" />
      </Appbar.Header>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 125,
        }}
      >
        {/* <Text style={{ fontSize: 40, textAlign: "center" }}>Logo here</Text> */}
        <Image
          source={require("../../assets/clean.jpeg")}
          style={{ width: 200, height: 200, borderRadius: 100 }}
        />
      </View>
      <View style={{ margin: 20 }}>
        <TextInput
          label="Email"
          placeholder="Enter email address here"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          mode="outlined"
          style={{ marginBottom: 20 }}
          autoCapitalize="none"
        />
        <TextInput
          label="password"
          placeholder="Enter password here"
          value={password}
          onChangeText={(text) => setPassword(text)}
          mode="outlined"
          style={{ marginBottom: 20 }}
          secureTextEntry
          autoCapitalize="none"
          right={<TextInput.Icon name="eye" />}
        />
        {error && (
          <Text
            style={{
              marginLeft: 10,
              marginBottom: 10,
              fontSize: 16,
              color: "white",
              backgroundColor: "red",
              padding: 10,
            }}
          >
            {" "}
            Invalid Credentials !
          </Text>
        )}
        <Button
          icon="login"
          mode="contained-tonal"
          disabled={loading}
          onPress={() => handleLogin()}
        >
          Login
        </Button>
      </View>
    </ScrollView>
  );
};

export default Login;
