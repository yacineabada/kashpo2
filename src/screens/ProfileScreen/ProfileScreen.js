import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
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
} from "native-base";
import format from "date-fns/format";

function ProfileScreen({ user }) {
  const {
    email,
    fullName,
    points,
    id,
    confirmed,
    inscription_date,
    isAdmin,
  } = user;
  return (
    <View>
      <Header />
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

        {isAdmin ? (
          <>
            <CardItem>
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.label}>Admin</Text>
                </View>
              </View>
            </CardItem>
          </>
        ) : (
          <>
            <Row label="ID" value={id} />
            <Row
              label="Date d'inscription"
              value={
                inscription_date
                  ? format(new Date(inscription_date), "dd/MM/yyy (HH:mm)")
                  : "-"
              }
            />
            <Row label="nombre de points" value={points + " points"} />
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
          </>
        )}
      </Card>
      <Card
        style={{
          marginTop: 50,
        }}
      >
        <Button full danger onPress={() => firebase.auth().signOut()}>
          <Text>Deconnecter</Text>
        </Button>
      </Card>
    </View>
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

export default ProfileScreen;
