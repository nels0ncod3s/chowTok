import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function UploadModalScreen() {
  const router = useRouter();

  const closeModal = () => {
    router.back(); // Or router.push('/') to go back to the home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload New Content</Text>
      <Text style={styles.description}>This is your modal for uploading content.</Text>
      {/* Add your upload form/components here */}
      <TouchableOpacity style={styles.button} onPress={closeModal}>
        <Text style={styles.buttonText}>Close Modal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)', // Semi-transparent background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FF6347', // Tomato color for a nice button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
