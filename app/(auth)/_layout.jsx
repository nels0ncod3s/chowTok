import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Text, View, ActivityIndicator} from 'react-native'
import React from "react"; // Added React import for consistency

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth(); // Added isLoaded check

  // Wait for Clerk to load before making decisions
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If signed in, redirect to the main app
  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  // If not signed in, show the authentication stack
  return <Stack />;
}
