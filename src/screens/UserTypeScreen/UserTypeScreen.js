import React, { useState } from "react";
import { Image, Text, TouchableOpacity , View } from "react-native";
import styles from "./styles";


 export default function UserTypeScreen  ({ navigation}){

    const [type, settype] = useState("");
    
    
    const onFooterLinkPress = () => {
      navigation.navigate("Login"); 
    };
  
    const onPersonPress = () => {
        settype("person");
        navigation.navigate("registration",{type});
    };

    const onCompanyPress = () => {
        settype("company");
        navigation.navigate("registration",{type});
    };
  
    return (
      <View style={styles.container}>
        
          <Image
            style={styles.logo}
            source={require("../../../assets/icon.png")}
          />
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => onPersonPress()}
          >
            <Text style={styles.buttonTitle}>person</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onCompanyPress()}
          >
            <Text style={styles.buttonTitle}>company</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Already got an account?{" "}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Log in
              </Text>
            </Text>
          </View>
      </View>
    );
  }
  