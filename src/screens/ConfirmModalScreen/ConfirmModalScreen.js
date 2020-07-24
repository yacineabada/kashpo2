import React, { useEffect, useState } from "react";
import { Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
// import ImagePicker from "react-native-image-picker";

import {
  
  Text,
  Button,
  Spinner,
} from "native-base";
import styles from "./styles";
import { firebase } from "../../firebase/config";



export default function ModalScreen(props) {
  if(props.type=="person"){
    return(
      <PersonModalScreen  {...props}/>
    );
  }
  else{
    return(
    <CompanyModalScreen {...props}/>
    )}
  
  
}


function PersonModalScreen({ navigation, user: { id }, }) {
  const [uploadDone, setUploadDone] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const uploadToFirebase = async (uri) => { 
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("confirmation_" + id);
    setLoading(true);
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({ confirmed : 0 , confirmationURL: url });

    setLoading(false);
    setUploadDone(true);
    

    setTimeout(() => navigation.goBack(), 500);
  };

  const uploadImage = async () => {
    Alert.alert(
      "Uploader une image",
      "choisire la source de votre image",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
              uploadToFirebase(result.uri);
            }
          },
        },

        {
          text: "Choose from library",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
              uploadToFirebase(result.uri);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  if (loading)
    return (
      <View>
        <Spinner />
      </View>
    );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {uploadDone ? (
        <Text style={{ fontSize: 30 }}>Le fichier a été transmis</Text>
      ) : (
        <>
          <Text style={{ fontSize: 30 }}>
            veuillez envoyer votre piece d'identité
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              margin: 20,
            }}
          >
            <Button
              onPress={() => navigation.goBack()}
              style={{
                margin: 10,
              }}
              light
            >
              <Text>retourner</Text>
            </Button>
            <Button
              onPress={uploadImage}
              style={{
                margin: 10,
              }}
            >
              <Text>Uploader</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
}


 function CompanyModalScreen({ navigation, user: { id }, setUser }) {
  const [uploadDoneRC, setUploadDoneRC] = React.useState(false);
  const [loadingRC, setLoadingRC] = React.useState(false);
  const [uploadDoneGC, setUploadDoneGC] = React.useState(false);
  const [loadingGC, setLoadingGC] = React.useState(false);

  
  const uploadToFirebase = async (uri , papertype) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase
      .storage()
      .ref()
      .child("confirmation_" + papertype + id);
    setLoading(true);
    await ref.put(blob);
    const url = await ref.getDownloadURL();
    if(papertype=="RC"){
      await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({ confirmationURLRC: url });
      setLoadingRC(false);
    setUploadDoneRC(true);
    }
    else{
      await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({ confirmationURLCG: url });
    }
    
    
    setUser((user) => ({ ...user, confirmed: 0 }));

    setTimeout(() => navigation.goBack(), 500);
  };

  const uploadImage = async (papertype) => {
    Alert.alert(
      "Uploader une image",
      "choisire la source de votre image",
      [
        {
          text: "Take Photo",
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
              uploadToFirebase(result.uri,papertype);
            }
          },
        },

        {
          text: "Choose from library",
          onPress: async () => {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
              uploadToFirebase(result.uri,papertype);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  if (loading)
    return (
      <View>
        <Spinner />
      </View>
    );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {uploadDoneRC ? (
        <Text style={{ fontSize: 30 }}>Le fichier a été transmis</Text>
      ) : (
        <>
          <Text style={{ fontSize: 30 }}>
            Scan :
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              margin: 20,
            }}
          >
            
            <Button
              onPress={() => uploadImage("RC")}
              style={{
                margin: 10,
              }}
            >
              <Text>RC</Text>
            </Button>
            <Button
              onPress={() => uploadImage("CG")}
              style={{
                margin: 10,
              }}
              light
            >
              <Text>Carte Gerant</Text>
            </Button>
            <Button
              onPress={() => navigation.goBack()}
              style={{
                margin: 10,
              }}
              light
            >
              <Text>retourner</Text>
            </Button>
          </View>
        </>
      )}
    </View>
  );
}

