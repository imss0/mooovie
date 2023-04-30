import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "react-native";
import Movies from "../screens/Movies";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import Stack from "./Stack";
import * as colors from "../colors";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? colors.BLACK : colors.DARK_WHITE,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: isDark ? colors.HOT_PINK : colors.HOT_PINK,
        tabBarInactiveTintColor: isDark ? colors.LIGHT_GRAY : colors.DARK_GRAY,
        headerStyle: {
          backgroundColor: isDark ? colors.BLACK : colors.DARK_WHITE,
        },
        headerTitleStyle: {
          color: isDark ? colors.HOT_PINK : colors.BLACK,
        },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome5 name="film" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome5 name="tv" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <FontAwesome5 name="search" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
