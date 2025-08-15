import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true, tabBarActiveTintColor: 'orange' }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Feather size={24} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          tabBarIcon: ({ color }) => <Feather size={24} name="upload" color={color} />,
          listeners: {
            tabPress: (e) => {
              e.preventDefault(); // Prevent default navigation to the 'upload' screen
              router.push('/modals/upload-modal'); // Open your modal route
            },
          },
        }}
      />
      <Tabs.Screen
        name="bookmarked"
        options={{
          title: 'Liked',
          tabBarIcon: ({ color }) => <Feather name="bookmark" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
