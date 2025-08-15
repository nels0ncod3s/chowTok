import { useClerk } from '@clerk/clerk-expo';
import { Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter

export default function SignOutButton() {
  const { signOut } = useClerk();
  const router = useRouter(); // Initialize useRouter

  const handleSignOut = async () => {
    try {
      await signOut();
      // Use router.replace for consistent navigation within Expo Router
      router.replace("/(auth)/sign-in");
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Sign out</Text>
    </TouchableOpacity>
  );
};
