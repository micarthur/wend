import { StyleSheet } from "react-native";

export default StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  searchView: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 50,
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  button: {
    width: 150,
    height: 45,
    backgroundColor: "#0000ff",
    justifyContent: "center",
    alignItems: "center",
  },
});
