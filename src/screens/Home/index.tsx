import { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Participant } from "../../components/Participant";
import styles from "./styles";

export default function Home({}) {
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState(["Dirlan Ferreira"]);

  const isParticipantAlreadyAdded = (participantName: string) => {
    return !!participants.find(
      (participant) => participant === participantName
    );
  };

  function handleParticipantAdd(): void {
    const participantExist = isParticipantAlreadyAdded(participantName);

    if (participantName.trim().length <= 0) {
      return Alert.alert("Invalid name", "Enter a valid name");
    }

    if (participantExist) {
      return Alert.alert("Can't add", "Participant already added");
    }

    setParticipants((prevState) => [...prevState, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string): void {
    Alert.alert("Remove", `Are you sure you want to remove ${name}?`, [
      {
        text: "Yes",
        onPress: () => {
          const participantExist = isParticipantAlreadyAdded(name);
          if (!participantExist) {
            return Alert.alert("Can't remove", "Participant not exists");
          }

          setParticipants((prevState) =>
            prevState.filter((participant) => participant !== name)
          );
        },
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventTitle}>Im here</Text>
      <Text style={styles.eventDescription}>Description</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#6B6B6B"
          onChangeText={(changedText) => setParticipantName(changedText)}
          defaultValue={participantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={handleParticipantRemove}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>Empty</Text>
        )}
      />
    </View>
  );
}
