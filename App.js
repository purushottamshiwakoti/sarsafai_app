import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Login from "./src/screens/Login";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import User from "./src/screens/User";
import Officer from "./src/screens/Officer";
import useAUthStore from "./src/hooks/useAuh";

const Stack = createNativeStackNavigator();

export default function App() {
  const { role } = useAUthStore();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {role == "" && <Stack.Screen name="Login" component={Login} />}
          {role === "USER" && <Stack.Screen name="User" component={User} />}
          {role === "OFFICER" && (
            <Stack.Screen name="Officer" component={Officer} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
