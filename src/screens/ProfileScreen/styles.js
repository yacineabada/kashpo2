import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    // justifyContent: "center",
    textTransform: "capitalize",
  },
  formContainer: {
    flexDirection: "row",
    height: 80,
    marginTop: 40,
    marginBottom: 20,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  pointsText: {
    color: "black",
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  value: { fontWeight: "200", textAlign: "right" },
});
