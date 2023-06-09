import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "./styles";
import { Participant } from "../../components/Participant";

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
      console.log("Enter a valid name");
      return;
    }

    if (participantExist) {
      console.log("Participant already added");
      return;
    }

    setParticipants([...participants, participantName]);
    setParticipantName("");
  }

  function handleParticipantRemove(name: string): void {
    const participantExist = isParticipantAlreadyAdded(name);
    if (!participantExist) {
      console.log("Participant not exists");
      return;
    }

    const updatedParticipants = participants.filter(
      (participant) => participant !== name
    );
    setParticipants(updatedParticipants);
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
