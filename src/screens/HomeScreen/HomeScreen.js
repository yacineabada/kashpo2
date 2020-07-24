import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { QRCode } from "react-native-custom-qr-codes-expo";
import Modal, { ModalContent } from 'react-native-modals';


import {

  Card,
  CardItem,
  Body,
  Text,
  Button,
  Label,
} from "native-base";
import styles from "./styles";
import { firebase } from "../../firebase/config";

export default function HomeScreen({ user, navigation }) {
  const { email, fullName, points, id, confirmed } = user;
  const [visibale,setvisibale] = useState(false);

  console.log(user);

  const sendPoints = async () => {};
  return (
    <View style={styles.container}>
      <Card style={{ width: "100%", paddingTop: 50 }}>
        <CardItem>
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Image source={require("../../../assets/user.png")} />
            </View>
            <View>
              <View>
                <Text>Bienvenue,</Text>
              </View>
              <View>
                <Text>{fullName}</Text>
              </View>
              <View>
                <Text>ID: {id}</Text>
              </View>
              
          </View>
        <View style={{marginLeft:'auto'}}>
            <Button>
              <Image source={require("../../../assets/qr-code.png")} alt="my image" onClick={() => setvisibale(true)} />
              
            
            </Button>
            <Modal
            visible={visibale}
            onTouchOutside={() => {
              setvisibale(false)
            }}
          >
            <ModalContent>
            <QRCode content={id} size={200} />      
            </ModalContent>
          </Modal>
          </View>
      </View>
        </CardItem>
        {confirmed === -1 ? (
          <CardItem>
            <Body>
              <View style={{ width: "100%" }}>
                <Text style={{ textAlign: "center", color: "red" }}>
                  Status: Votre compte n'est pas confirmer !
                </Text>
              </View>
            </Body>
          </CardItem>
        ) : confirmed === 0 ? (
          <CardItem>
            <Body>
              <View style={{ width: "100%" }}>
                <Text style={{ textAlign: "center", color: "orange" }}>
                  Status: En attente de validation
                </Text>
              </View>
            </Body>
          </CardItem>
        ) : (
          <CardItem>
            <Body>
              <View style={{ width: "100%" }}>
                <Text style={{ textAlign: "center", color: "green" }}>
                  Status: Confirmé
                </Text>
              </View>
            </Body>
          </CardItem>
        )}
      </Card>
      <View style={{ marginTop: 20 }}>
        
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.pointsText}>Points : </Text>
        <Text style={styles.pointsText}>{user.points}</Text>
      </View>
      {confirmed === 1 ? (
        <View
          style={{
            width: "100%",
            padding: 10,
          }}
        >
          <Button full onPress={() => navigation.navigate("sendPointModal")}>
            <Text>Envoyer des points</Text>
          </Button>
        </View>
      ) : confirmed === -1 ? (
        <>
          <View
            style={{
              width: "100%",
              padding: 10,
            }}
          >
            <Button full onPress={() => navigation.navigate("confirmuser")}>
              <Text>Confirmer votre compte!</Text>
            </Button>
          </View>
          <Card style={{ width: "100%" }}>
            <CardItem>
              <Body>
                <View style={{ width: "100%" }}>
                  <Text style={{ color: "red" }}>
                    Votre pouvez pas faire des transfer avec un compte non
                    confirme
                  </Text>
                </View>
              </Body>
            </CardItem>
          </Card>
        </>
      ) : null}
    </View>
  );
}
