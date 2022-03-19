/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import {
  ColorSchemeName,
  ImageSourcePropType,
  Pressable,
  TouchableOpacity,
} from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ContractsScreen from "../screens/ContractsScreen";
import MinerScreen from "../screens/MinerScreen";
import SettingScreen from "../screens/SettingScreen";
import LoginScreen from "../screens/LoginScreen";
import SendInitial from "../screens/SendInitialScreen";
import SendFinal from "../screens/SendFinalScreen";
import RecieveScreen from "../screens/RecieveScreen";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import { icons } from "../constants";
import { Box, Center, Text, Image } from "native-base";
import { useSelector } from "react-redux";
import { selectLoggedIn } from "../redux/slices/usersSlice";
import { selectIsLoading } from "../redux/slices/uiSlice";
import useStartupChecks from "../hooks/useStartupChecks";

const MyDarkTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(255, 255, 255)",
    background: "#000",
  },
};

const MyLightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(252, 43, 43)",
    background: "#dbdbdb",
  },
};

export default function Navigation() {
  const startupChecks = useStartupChecks();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={true ? MyDarkTheme : MyLightTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const loggedIn = useSelector(selectLoggedIn);

  return (
    <Stack.Navigator>
      <Stack.Group>
        {loggedIn ? (
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Group>
          <Stack.Screen
            name="SendInitial"
            component={SendInitial}
            options={{ title: "Send" }}
          />
          <Stack.Screen
            name="SendFinal"
            component={SendFinal}
            options={{ title: "Send" }}
          />
        </Stack.Group>
        <Stack.Screen name="Recieve" component={RecieveScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        //tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          borderTopColor: "transparent",
          height: 100,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} iconName="home" label="Home" />
          ),
        })}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="search" color={color} label="Search" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Contracts"
        component={ContractsScreen}
        options={{
          title: "Contracts",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              iconName="newspaper-o"
              color={color}
              label="Contracts"
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Miner"
        component={MinerScreen}
        options={{
          title: "Miner",
          tabBarIcon: ({ color }) => (
            <TabBarIcon iconName="server" color={color} label="Miner" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon color={color} icon={icons.profile} label="Settings" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = (props: {
  label: string;
  color: string;
  icon?: ImageSourcePropType;
  iconName?: React.ComponentProps<typeof FontAwesome>["name"];
}) => {
  return (
    <Center>
      {props.icon ? (
        <Image
          source={props.icon}
          resizeMode="contain"
          style={{ width: 25, height: 25, tintColor: props.color }}
          alt={props.label}
        />
      ) : (
        <FontAwesome name={props.iconName} color={props.color} size={25} />
      )}
      <Text color={props.color}>{props.label}</Text>
    </Center>
  );
};
