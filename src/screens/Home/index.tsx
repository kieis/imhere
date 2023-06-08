import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function Home({}) {
  function handleParticipantAdd() {}

  return (
    <View style={styles.container}>
      <Text style={styles.eventTitle}>Im here</Text>
      <Text style={styles.eventDescription}>Description</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#6B6B6B"
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
