import "react-native-gesture-handler";
import React, { useEffect, useState, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View, Button } from "react-native";

import {
  LoginScreen,
  HomeScreen, 
  RegistrationScreen,
  ProfileScreen,
  ConfirmModalScreen,
  SendPointModalScreen,
  UsersListScreen,
  UserProfilScreen,
  UserTypeScreen,
  InfoConfirmScreen,
} from "./src/screens";
import { firebase } from "./src/firebase/config";

import { AppLoading } from "expo";
import { Container, Text, Header } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootStack = createStackNavigator();

function RootStackScreen({ user, setUser }) {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen name="Main" options={{ headerShown: false }}>
        {(props) => (
          <MainStackScreen {...props} user={user} setUser={setUser} />
        )}
      </RootStack.Screen>
      <RootStack.Screen name="confirmuser">
        {(props) => <InfoConfirmScreen {...props} user={user} setUser={setUser} />}
      </RootStack.Screen>
      <RootStack.Screen name="confirmModal">
        {(props) => ( 
          <ConfirmModalScreen {...props} user={user} setUser={setUser} />
        )}
      </RootStack.Screen>
      <RootStack.Screen name="sendPointModal">
        {(props) => (
          <SendPointModalScreen {...props} user={user} setUser={setUser} />
        )}
      </RootStack.Screen>
      <RootStack.Screen name="userProfil">
        {(props) => <UserProfilScreen {...props} user={user} />}

      </RootStack.Screen>
      
    </RootStack.Navigator>
  );
}

function MainStackScreen({ user, setUser }) {
  return user ? (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "Home", 
          tabBarIcon: () => (
            <Image
              style={{ width: 33, height: 33 }}
              source={require("./assets/home.png")}
            />
          ),
        }}
      >
        {(props) =>
          user.isAdmin ? (
            <UsersListScreen {...props} user={user} />
          ) : (
            <HomeScreen {...props} user={user} />
          )
        }
      </Tab.Screen>
      {/* <Tab.Screen
        name="users"
        options={{
          tabBarLabel: "users",
          tabBarIcon: () => (
            <Image
              style={{ width: 33, height: 33 }}
              source={require("./assets/user.png")}
            />
          ),
        }}
      >
        {(props) => <UsersListScreen {...props} user={user} />}
      </Tab.Screen> */}
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: () => (
            <Image
              style={{ width: 33, height: 33 }}
              source={require("./assets/user.png")}
            />
          ),
        }}
      >
        {(props) => <ProfileScreen {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} setUser={setUser} />}
      </Stack.Screen>
       
      <Stack.Screen name="usertype">
        {(props) => <UserTypeScreen {...props} />}
      </Stack.Screen>
      <RootStack.Screen name="registration">
        {(props) => <RegistrationScreen {...props} user={user} setUser={setUser} />}

      </RootStack.Screen>
      
    </Stack.Navigator>
  );
}
export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const userRefrech = useRef();

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setLoading(false);
            setUser(userData);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setUser(null);
        setLoading(false);
      }

      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
    });
  }, []);

  useEffect(() => {
    const usersRef = firebase.firestore().collection("users");
    userRefrech.current = setInterval(() => {
      if (user) {
        usersRef
          .doc(user.id)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
          })
          .catch((error) => {});
      }
    }, 12000);
    return () => clearInterval(userRefrech.current);
  }, []);
  if (loading) {
    return <AppLoading />;
  }

  return (
    <Container>
      <NavigationContainer>
        <RootStackScreen user={user} setUser={setUser} />
      </NavigationContainer>
    </Container>
  );
}
