import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import Dashboard from "../adminScreens/Dashboard";
import Home from "../userScreens/Home";
import Splash from "../components/Splash";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Admin Tab Navigator
const AdminTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#333",
      tabBarStyle: { backgroundColor: "#000" },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="dashboard" color={color} size={size} />,
        title: "Dashboard",
      }}
    />
  </Tab.Navigator>
);

// User Tab Navigator
const UserTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#333",
      tabBarStyle: { backgroundColor: "#000" },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
);

const AppHome = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen
          name="UserTabs"
          component={UserTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminTabs"
          component={AdminTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppHome;
