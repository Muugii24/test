import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";
import CallLog from "./components/CallLog";

export default function App() {
  let pic = {
    uri:
      "https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2560%2Cc_limit/phonepicutres-TA.jpg",
  };

  const [num, setNum] = useState("");
  const [history, setHistory] = useState([]);
  const [toggle, setToggle] = useState(false);

  const Item = ({ title }) => (
    <View>
      <Text style={styles.list}>{title}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item title={item.phoneNum} key={item[0]} />;

  const changeNum = (e) => {
    setNum(e);
  };

  const saveHistory = (num) => {
    history.push({ phoneNum: num });
    setNum("");
  };

  const clear = () => {
    setHistory([]);
  };

  const callLog = () => {
    setToggle((pre) => !pre);
  };

  return (
    <SafeAreaView style={styles.container}>
      {toggle ? (
        <View>
          <Text style={{ color: "blue", flex: 1 }}>Call Log</Text>
          <FlatList inverted data={history} renderItem={renderItem} />
          <Button onPress={clear} title="   Clear   " color="red" key="0" />
          <Button onPress={callLog} title="    Back    " color="gray" key="4" />
        </View>
      ) : (
        <View style={styles.home}>
          <TextInput
            style={styles.input}
            placeholder="Enter number..."
            onChangeText={(e) => changeNum(e)}
          />
          <Button
            onPress={() => saveHistory(num)}
            title="    Call    "
            color="green"
            key="2"
          />

          <Button
            onPress={() => setToggle(true)}
            title="Call log"
            color="blue"
            key="1"
          />
        </View>
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
  },
  list: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  home: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
