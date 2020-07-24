import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";
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
  Right,
  Spinner,
} from "native-base";
import format from "date-fns/format";
import DialogInput from "react-native-dialog-input";
import { isLoading } from "expo-font";

function UserProfileScreen({ route, navigation }) {
  const [user, setUser] = useState(route.params.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const { setUsers } = route.params;
  const [imageVisible, setImageVisible] = useState(false);
  const {
    email,
    fullName,
    points,
    id,
    confirmed,
    inscription_date,
    confirmationURL,
  } = user;
  useEffect(() => {
    setUser(route.params.user);
  }, [route.params]);

  const handleDeleteUser = () => {
    // add confirmation
    Alert.alert(
      `Supprimer ${fullName}`,
      "",
      [
        {
          text: "Supprimer",
          onPress: async () => {
            await firebase.firestore().collection("users").doc(id).delete();
            navigation.navigate("users");
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };
  const handleNewPoints = async (newPoints) => {
    // add confirmation
    setModalVisible(false);
    setisLoading(true);

    await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        points: +newPoints,
      });
    setUser((c) => ({ ...c, points: +newPoints }));
    setUsers((users) =>
      users.map((c) => (c.id === id ? { ...c, points: +newPoints } : c))
    );
    setisLoading(false);
  };

  const acceptVerification = async () => {
    firebase.firestore().collection("users").doc(id).update({
      confirmed: 1,
    });
    setUser((c) => ({ ...c, confirmed: 1 }));
    setUsers((c) =>
      c.map((user) => (user.id === id ? { ...user, confirmed: 1 } : user))
    );
  };

  const refuseVerification = async () => {
    firebase.firestore().collection("users").doc(id).update({
      confirmed: -1,
    });
    setUser((c) => ({ ...c, confirmed: -1 }));
    setUsers((c) =>
      c.map((user) => (user.id === id ? { ...user, confirmed: -1 } : user))
    );
  };

  if (isLoading) {
    return (
      <View>
        <Spinner />
      </View>
    );
  }
  if (imageVisible)
    return (
      <View style={styles.thumbContainer}>
        <Image
          source={{ uri: confirmationURL }}
          resizeMode="cover"
          style={styles.thumbnail}
        />
        <Right style={StyleSheet.absoluteFillObject}>
          <TouchableHighlight onPress={() => setImageVisible(false)}>
            <Text style={{ margin: 10 }}>
              <AntDesign name="close" size={24} color="black" />{" "}
            </Text>
          </TouchableHighlight>
        </Right>
      </View>
    );
  return (
    <ScrollView>
      <Card>
        <CardItem>
          <View style={styles.container}>
            <View>
              <Image source={require("../../../assets/user.png")} />
            </View>
            <View>
              <View>
                <Text>{fullName}</Text>
              </View>
              <View>
                <Text>{email}</Text>
              </View>
            </View>
          </View>
        </CardItem>
        <Row label="ID" value={id} />
        <Row
          label="Date d'inscription"
          value={
            inscription_date
              ? format(new Date(inscription_date), "dd/MM/yyy (HH:mm)")
              : "-"
          }
        />
        <TouchableHighlight onPress={() => setModalVisible(true)}>
          <Row label="Nombre de points" value={points + " points"} />
        </TouchableHighlight>
        <Row
          label="Etat du compte"
          value={
            confirmed === 1
              ? "Confirmé"
              : confirmed === 0
              ? "En attente de validation"
              : "Non confirmé"
          }
        />
      </Card>

      <Card
        style={{
          marginTop: 50,
          padding: 20,
        }}
      >
        {confirmationURL && confirmed === 0 && (
          <>
            <Text
              style={{
                fontSize: 20,
                margin: 10,
                textAlign: "center",
              }}
            >
              Accepter la piece d'identite ?
            </Text>
            <View
              style={{
                justifyContent: "space-around",
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 20,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <Button
                // style={{
                //   flex: 1,
                // }}
                success
                onPress={acceptVerification}
              >
                <Text>Accepter</Text>
              </Button>
              <Button danger onPress={refuseVerification}>
                <Text>Refuser</Text>
              </Button>
            </View>

            <Button primary full onPress={() => setImageVisible(true)}>
              <Text>Voir la piece d'identite</Text>
            </Button>
          </>
        )}
        <View
          style={
            {
              // marginTop: 20,
              // borderTopColor: "#eee",
              // borderTopWidth: 1,
              // paddingTop: 20,
            }
          }
        >
          <Button danger full onPress={handleDeleteUser}>
            <Text>Supprimer l'utilisateur</Text>
          </Button>
        </View>
      </Card>
      <ModalPoints
        modalVisible={modalVisible}
        newPoints={points}
        handleNewPoints={handleNewPoints}
        setModalVisible={setModalVisible}
      />
    </ScrollView>
  );
}

const Row = ({ label, value }) => (
  <CardItem>
    <View style={styles.infoContainer}>
      <View>
        <Text style={styles.label}>{label}:</Text>
      </View>
      <View>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  </CardItem>
);
const ModalPoints = ({
  newPoints,
  modalVisible,
  handleNewPoints,
  setModalVisible,
}) => {
  return (
    <View style={{ marginTop: 22 }}>
      <DialogInput
        isDialogVisible={modalVisible}
        title={"Nombre de points"}
        // message={"Message for DialogInput #1"}
        initValueTextInput={newPoints + ""}
        submitInput={(inputText) => {
          handleNewPoints(inputText);
        }}
        closeDialog={() => {
          setModalVisible(false);
        }}
        submitText="Enregistrer"
      ></DialogInput>
    </View>
  );
};
export default UserProfileScreen;
