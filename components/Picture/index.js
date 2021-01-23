import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

const Bich = () => {
  const [name, setName] = useState("Text...");

  const changeName = (e) => {
    setName(e.target.value);
  };
  return (
    <View>
      <Text>{name}</Text>
      <TextInput placeholder="End hussen zuilee bich" onChange={changeName} />
    </View>
  );
};
export default Bich;
