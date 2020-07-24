import React, { useEffect, useState } from "react";
import { Image, View, Alert } from "react-native";
import { StyleSheet, TouchableHighlight } from "react-native";
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
  Input,
  Right,
} from "native-base";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AntDesign } from "@expo/vector-icons";
export default function ModalScreen({
  navigation,
  user: { id, points },
  setUser,
}) {
  const [uploadDone, setUploadDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const [userID, setUserID] = useState("");
  const [pointsToSend, setPoints] = useState(0);
  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const scanQrCode = async () => {
    setIsScanning(true);
  };

  const sendPoints = async () => {
    setLoading(true);
    if (!pointsToSend) {
      setLoading(false);

      return alert("credit a envoyer pas valide");
    }
    if (+points - +pointsToSend < 0) {
      setLoading(false);

      return alert("credit insuffisant");
    }

    try {
      const recipientRef = firebase.firestore().collection("users").doc(userID);
      const recipient = await recipientRef.get();

      if (!recipient.exists) {
        setLoading(false);
        return alert("destinataire inexistant");
      }
      if (userID==id){
        setLoading(false);

      return alert("you can't send points to yourself");
      }

      const recipientData = recipient.data();
      await recipientRef.update({
        points: +recipientData.points + +pointsToSend,
      });
      await firebase
        .firestore()
        .collection("users")
        .doc(id)
        .update({
          points: +points - +pointsToSend,
        });
      setUser((c) => ({ ...c, points: +points - +pointsToSend }));
      setUploadDone(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return alert("destinataire inexistant");
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIsScanning(false);
    setUserID(data);
  };
  if (loading)
    return (
      <View>
        <Spinner />
      </View>
    );
  if (isScanning)
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <Right style={StyleSheet.absoluteFillObject}>
          <TouchableHighlight onPress={() => setIsScanning(false)}>
            <Text style={{ margin: 10 }}>
              <AntDesign name="close" size={24} color="black" />{" "}
            </Text>
          </TouchableHighlight>
        </Right>
      </View>
    );
  return uploadDone ? (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 30, color: "green" }}>
        Credit envoyer avec succès !
      </Text>
    </View>
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>Envoyer des points</Text>
      <View style={{ width: "100%", padding: 5 }}>
        <Form>
          <Item inlineLabel>
            <Label>ID du destinataire</Label>
            <Input onChangeText={(text) => setUserID(text)} value={userID} />
          </Item>
          <Item inlineLabel>
            <Label>Points a envoyer</Label>
            <Input
              keyboardType="numeric"
              onChangeText={(text) => setPoints(text)}
              value={pointsToSend}
            />
          </Item>
        </Form>
      </View>

      <Button
        onPress={scanQrCode}
        style={{
          margin: 10,
        }}
      >
        <Text>Scan QRCode</Text>
      </Button>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          margin: 20,
        }}
      >
        <Button
          onPress={sendPoints}
          style={{
            margin: 10,
          }}
        >
          <Text>Envoyer</Text>
        </Button>
      </View>
    </View>
  );
}
