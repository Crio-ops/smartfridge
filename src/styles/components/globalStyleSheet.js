import { StyleSheet } from "react-native";
import Colors from "../colors/colors.js";

 const globalStyleSheet = StyleSheet.create({
    container: {
        flex: 1,
      },
      title :{
        color : Colors.darkBlue,
        fontWeight:"800",
        fontSize:16
      },
    subtitle :{
        color : Colors.darkBlue,
        fontWeight:"800",
      },
})

export default globalStyleSheet