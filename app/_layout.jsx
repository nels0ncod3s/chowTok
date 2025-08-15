import { Stack, Redirect } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Helper component to manage initial routing based on authentication state
function RootNavigator() {
  const { isLoaded, isSignedIn } = useAuth();

  // Display a loading indicator while Clerk is determining the authentication status
  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading authentication...</Text>
      </View>
    );
  }

  // Once Clerk is loaded, decide where to redirect initially
  // If not signed in, redirect to the authentication group
  if (!isSignedIn) {
    return (
      <Stack>
        {/* Only show the auth routes if not signed in */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/* Any other public routes can go here, e.g., an index landing page */}
        {/* If you have an index.jsx at the root (APP/index.jsx), define it here. */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    );
  }

  // If signed in, render the main application tabs
  return (
    <Stack>
      {/* Only show the tabs group if signed in */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Ensure the auth group is still defined but won't be navigated to directly by this logic */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      {/* If you have an index.jsx at the root (APP/index.jsx), define it here. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Define a group for modals outside the main flow (for upload modal) */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="modals/upload-modal" options={{ headerShown: false }} />
      </Stack.Group>
    </Stack>
  );
}

// The main RootLayout component that wraps the entire application with ClerkProvider
export default function RootLayout() {
  if (!CLERK_PUBLISHABLE_KEY) {
    console.error('Clerk Publishable Key is missing! Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file.');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }}>
        <Text style={{ color: 'white' }}>Configuration Error: Clerk Key Missing</Text>
      </View>
    );
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
      <RootNavigator />
    </ClerkProvider>
  );
}
