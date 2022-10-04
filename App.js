import React, { useState } from 'react';
import * as Contacts from'expo-contacts';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';


export default function App() {

  const [contactData, setContactData] = useState();

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(      
        { fields: [Contacts.Fields.PhoneNumbers] }    
      );   
      setContactData(data);
      console.log(data)
    }
  }


  return (
    
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={contactData}
        renderItem={({ item }) =>
          <Text>{item.name} {item.phoneNumbers[0].number}</Text>
        }
      />
      <Button title="Get Contacts"onPress={getContacts} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
