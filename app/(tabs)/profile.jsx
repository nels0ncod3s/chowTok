import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import {
  User,
  Settings,
  Heart,
  Clock,
  ChefHat,
  Bookmark,
  Edit3,
  Bell,
  Shield,
  HelpCircle,
  Share2,
  LogOut,
  ChevronRight,
  Award,
  TrendingUp,
} from "lucide-react-native";

// Consistent color system
const COLORS = {
  primary: '#ffd700',      // Your brand gold
  primaryDark: '#e6c200',  // Darker gold for interactions
  text: '#1a1a1a',        // Rich black for text
  textSecondary: '#666666', // Gray for secondary text
  textLight: '#999999',    // Light gray for meta info
  background: '#ffffff',   // Pure white background
  surface: '#ffffff',      // Card background
  border: '#f0f0f0',      // Subtle borders
  shadow: '#000000',      // Shadow color
  danger: '#dc2626',      // Red for danger actions
  success: '#10b981',     // Green for success
  warning: '#f59e0b',     // Amber for warning
};

const ProfilePage = ({ navigation }) => {
  const [savedRecipes] = useState(47);
  const [favoriteRecipes] = useState(23);
  const [cookingTime] = useState(156);
  const [recipesCreated] = useState(12);

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: () => {
            // Handle sign out logic here
            console.log("User signed out");
          }
        }
      ]
    );
  };

  const handleMenuPress = (item) => {
    console.log(`Navigate to ${item}`);
    // Add navigation logic here
  };

  const handleEditProfile = () => {
    console.log("Edit profile");
    // Add edit profile logic
  };

  const menuItems = [
    {
      id: 1,
      title: "My Recipes",
      subtitle: "Recipes you've created",
      icon: ChefHat,
      color: COLORS.primary,
      value: recipesCreated,
      onPress: () => handleMenuPress("MyRecipes")
    },
    {
      id: 2,
      title: "Favorite Recipes",
      subtitle: "Your most loved dishes",
      icon: Heart,
      color: '#ff4757',
      value: favoriteRecipes,
      onPress: () => handleMenuPress("Favorites")
    },
    {
      id: 3,
      title: "Cooking Achievements",
      subtitle: "Your culinary milestones",
      icon: Award,
      color: COLORS.success,
      onPress: () => handleMenuPress("Achievements")
    },
  ];

  const settingsItems = [
    {
      id: 1,
      title: "Notifications",
      subtitle: "Manage your preferences",
      icon: Bell,
      onPress: () => handleMenuPress("Notifications")
    },
    {
      id: 2,
      title: "Privacy & Security",
      subtitle: "Control your data",
      icon: Shield,
      onPress: () => handleMenuPress("Privacy")
    },
    {
      id: 3,
      title: "Help & Support",
      subtitle: "Get assistance",
      icon: HelpCircle,
      onPress: () => handleMenuPress("Help")
    },
    {
      id: 4,
      title: "Share the App",
      subtitle: "Tell your friends",
      icon: Share2,
      onPress: () => handleMenuPress("Share")
    },
  ];

  const renderStatItem = (icon, value, label, color = COLORS.primary) => (
    <View style={styles.statItem}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
        {React.createElement(icon, { size: 20, color: color, strokeWidth: 2 })}
      </View>
      <Text style={styles.statNumber}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderMenuItem = (item, showBorder = true) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, !showBorder && styles.menuItemNoBorder]}
      onPress={item.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuLeft}>
        <View style={[styles.menuIconContainer, { backgroundColor: (item.color || COLORS.textLight) + '15' }]}>
          <item.icon size={20} color={item.color || COLORS.text} strokeWidth={2} />
        </View>
        <View style={styles.menuTextContainer}>
          <Text style={styles.menuTitle}>{item.title}</Text>
          {item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
        </View>
      </View>
      <View style={styles.menuRight}>
        {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
        <ChevronRight size={16} color={COLORS.textLight} strokeWidth={2} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108755-2616b612b602?w=150&h=150&fit=crop&crop=face",
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editImageButton} activeOpacity={0.8}>
                <Edit3 size={14} color={COLORS.text} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.name}>BIG PUFFS</Text>
              <Text style={styles.email}>default123@email.com</Text>
              <View style={styles.membershipBadge}>
                <TrendingUp size={12} color={COLORS.primary} strokeWidth={2} />
                <Text style={styles.membershipText}>Home Chef</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.editProfileButton} onPress={handleEditProfile} activeOpacity={0.9}>
            <Edit3 size={16} color={COLORS.text} strokeWidth={2} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {renderStatItem(Bookmark, savedRecipes, "Saved\nRecipes", COLORS.primary)}
          {renderStatItem(Heart, favoriteRecipes, "Favorite\nRecipes", '#ff4757')}
          {renderStatItem(Clock, `${cookingTime}h`, "Total Cooking\nTime", COLORS.success)}
          {renderStatItem(ChefHat, recipesCreated, "Recipes\nCreated", COLORS.warning)}
        </View>

        {/* My Kitchen Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Kitchen</Text>
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => 
              renderMenuItem(item, index < menuItems.length - 1)
            )}
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuContainer}>
            {settingsItems.map((item, index) => 
              renderMenuItem(item, index < settingsItems.length - 1)
            )}
          </View>
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutSection}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.9}>
            <LogOut size={18} color={COLORS.danger} strokeWidth={2} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Recipe App v1.0.0</Text>
          <Text style={styles.copyrightText}>Made with ❤️ for food lovers</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: COLORS.background,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.border,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.background,
  },
  profileInfo: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  membershipText: {
    fontSize: 11,
    color: COLORS.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.border,
    paddingVertical: 12,
    borderRadius: 16,
    gap: 8,
  },
  editProfileText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 14,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemNoBorder: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  signOutSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.danger + '10',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.danger + '20',
  },
  signOutText: {
    color: COLORS.danger,
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 4,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  copyrightText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
});

export default ProfilePage;