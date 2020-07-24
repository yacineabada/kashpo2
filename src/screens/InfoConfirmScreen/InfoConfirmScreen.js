import React, { useState, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { firebase } from "../../firebase/config";
import DatePicker from 'react-native-datepicker'


export default function InfoConfirmScreen({ navigation , user :{type}, setUser}) {

 
   if(type=="person"){
     <Infopersonconfirm navigation={navigation} user={user} setuser={setUser}/>
   }
   else {
     <Infocompanyconfirm navigation={navigation} user={user} setuser={setUser}/>
   }

  }  




function Infopersonconfirm ({ navigation , user :{id}, setUser})  {


    const [Nom, setNom] = useState("");
    const [Prenom, setPrenom] = useState("");
    const [ADRESS, setADRESS] = useState("");
    const [identitynumber,setidentitynumber ] = useState("");
    const [date,setdate ] = useState("1998-12-30");


    const  onConfirmPress = async () => {
     
          const confirmeddata = {
              Nom,
              Prenom,
              ADRESS,
              identitynumber,
              date,
              confirmed:0
            };
            await firebase
            .firestore()
            .collection("users")
            .doc(id)
            .update({ confirmeddata });
            setUser((u) => ({ ...u, confirmed: 0 }));
            
      } 
  

  return (
    
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
       
        <TextInput
          style={styles.input}
          placeholder="Nom"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setNom(text)}
          value={Nom}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Prenom"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setPrenom(text)}
          value={Prenom}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <DatePicker
      style={styles.date}
      date={date}
      mode="date"
      placeholder="select date"
      format="YYYY-MM-DD"
      minDate="1940-01-01"
      maxDate="2020-01-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          marginLeft: 36
        }
      }}
      onDateChange={(date) => setdate(date)}
    />
       
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="ADRESSE"
          onChangeText={(text) => setADRESS(text)}
          value={ADRESS}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="NUMERO D'IDENTITE"
          onChangeText={(text) => setidentitynumber(text)}
          value={identitynumber}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("confirmModal")}
        >
          <Text style={styles.buttonTitle}>SCAN CARTE NATIONAL OU PASSPORT</Text>
        </TouchableOpacity>

        <TouchableOpacity
              style={styles.button}
              onPress={() => onConfirmPress()}
            >
              <Text style={styles.buttonTitle}>valider</Text>
            </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
);

}


function Infocompanyconfirm ({ navigation , user :{id}, setUser}) {
    
    const [formejuredique,setformejuredique]=useState("");
    const [companyname, setcompanyname] = useState("");
    const [creationdate, setcreationdate] = useState("2020-01-01");
    const [ADRESS, setADRESS] = useState("");
    const [registernumber,setregisternumber ] = useState("");
    const [NIS, setNIS] = useState("");
    const [NIF, setNIF] = useState("");
    const [AI, setAI] = useState("");
    const [articalnumber,setarticalnumber ] = useState("");
   
    const onConfirmPress = async () => {
             
            const confirmeddata = {
                companyname,
                formejuredique,
                ADRESS,
                registernumber,
                creationdate,
                NIS,
                NIF,
                AI,
                articalnumber,
                confirmed:0,
              };
              await firebase
              .firestore()
              .collection("users")
              .doc(id)
              .update({confirmeddata})
              setUser((u) => ({ ...u, confirmed: 0 }));
              
    }
    
    
    return (
    
        <View style={styles.container}>
          <KeyboardAwareScrollView
            style={{ flex: 1, width: "100%" }}
            keyboardShouldPersistTaps="always"
          >
            <Text style={styles.title}>
             Note: this will only be submited once 
              
            </Text>
            <TextInput
              style={styles.input}
              placeholder="forme juredique"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setformejuredique(text)}
              value={formejuredique}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="company name"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setcompanyname(text)}
              value={companyname}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
           <DatePicker
            style={styles.date}
            date={creationdate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="1940-01-01"
            maxDate="2020-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
                },
                dateInput: {
                marginLeft: 36
                }
            }}
            onDateChange={(date) => setcreationdate(date)}
            />

            <TextInput
              style={styles.input}
              placeholder="ADRESS"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setADRESS(text)}
              value={ADRESS}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="registernumber"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setregisternumber(text)}
              value={registernumber}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="NIF"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setNIF(text)}
              value={NIF}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="NIS"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setNIS(text)}
              value={NIS}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="AI"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setAI(text)} 
              value={AI}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="AI"
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setarticalnumber(text)} 
              value={articalnumber}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("confirmModal")}
        >
          <Text style={styles.buttonTitle}>Scan RC et carte gerant </Text>
        </TouchableOpacity>
       
            <TouchableOpacity
              style={styles.button}
              onPress={() => onConfirmPress()}
            >
              <Text style={styles.buttonTitle}>valider</Text>
            </TouchableOpacity>
            
          </KeyboardAwareScrollView>
        </View>
        
      );
}