import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableHighlight,
  View,
  Image,
  Modal,
  Alert,
} from "react-native";
// import styles from "./styles";
import { firebase } from "../../firebase/config";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Form,
  Item,
  Button,
  Label,
  Spinner,
  Icon,
  Right,
} from "native-base";

function UserListScreen({ navigation, user: { id } }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((res) => {
        const users = res.docs.map((doc) => doc.data());

        setUsers(users || []);
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <View>
        <Header />
        <Spinner />
      </View>
    );
  return (
    <View>
      <Header />
      <Card>
        {users
          .filter((u) => u.id !== id)
          .map((user) => (
            <TouchableHighlight
              onPress={() =>
                navigation.navigate("userProfil", { user, setUsers })
              }
            >
              <Client user={user} />
            </TouchableHighlight>
          ))}
      </Card>
    </View>
  );
}

const Client = ({ user: { fullName, email, points, confirmed, id ,type } }) => (
  <CardItem>
    <View
      style={{
        flexDirection: "row",

        alignItems: "center",
      }}
    >
      <View>
      { //Check if message failed
        (type === 'person')
          ?  <Image
          style={{ width: 40, height: 40, marginRight: 15 }}
          source={require("../../../assets/user.png")}
        />
          :  <Image
          style={{ width: 40, height: 40, marginRight: 15 }}
          source={require("../../../assets/shop.png")}
        /> 
      
      }
       
      </View>
      <View>
        <View>
          <Text>{fullName}</Text>
        </View>
        <View>
          <Text>{points} points</Text>
          <Text
            style={{
              color:
                confirmed === 1 ? "green" : confirmed === 0 ? "orange" : "red",
            }}
          >
            {confirmed === 1
              ? "Confirmé"
              : confirmed === 0
              ? "En attente de validation"
              : "Non confirmé"}
          </Text>
        </View>
      </View>
    </View>
    <Right>
      <Icon name="arrow-forward" />
    </Right>
  </CardItem>
);

export default UserListScreen;
