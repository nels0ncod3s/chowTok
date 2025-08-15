import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Heart, BookOpen, Clock, Users } from "lucide-react-native";

const { width } = Dimensions.get("window");

// Brand colors for consistency
const COLORS = {
  primary: "#ffd700", // Your brand gold
  primaryDark: "#e6c200", // Darker gold for interactions
  text: "#1a1a1a", // Rich black for text
  textSecondary: "#666666", // Gray for secondary text
  textLight: "#999999", // Light gray for meta info
  background: "#ffffff", // Pure white background
  surface: "#ffffff", // Card background
  border: "#f0f0f0", // Subtle borders
  shadow: "#000000", // Shadow color
  success: "#10b981", // Green for easy
  warning: "#f59e0b", // Amber for medium
  error: "#ef4444", // Red for hard
};

const nigerianRecipes = [
  {
    id: "1",
    title: "Jollof Rice",
    description:
      "The king of West African cuisine - perfectly spiced rice cooked in a rich tomato base with aromatic herbs",
    category: "Nigerian",
    image:
      "https://www.allrecipes.com/thmb/EJn9SMTzr4QRkdiWdi3ZBgC0Clw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/7499757JollofriceChefJohn4x3-d601da10d7e845d1ad4c8656a5b87ed4.jpg",
    cookTime: "45 min",
    servings: 6,
    difficulty: "Medium",
  },
  {
    id: "2",
    title: "Fried Rice",
    description:
      "Colorful and flavorful rice dish loaded with vegetables, chicken, and authentic Nigerian spices",
    category: "Nigerian",
    image: "https://www.mydiasporakitchen.com/wp-content/uploads/2020/12/img_8675.jpg",
    cookTime: "40 min",
    servings: 5,
    difficulty: "Easy",
  },
  {
    id: "3",
    title: "Moimoi (Bean Pudding)",
    description:
      "Traditional Nigerian steamed bean pudding made with black-eyed peas, peppers, and spices",
    category: "Nigerian",
    image:
      "https://cdn.guardian.ng/wp-content/uploads/2024/08/Moimoi-with-corned-beef-recipe-by-Pinterest.jpg",
    cookTime: "60 min",
    servings: 4,
    difficulty: "Hard",
  },
];

export default function HomeScreen() {
  const [favoriteRecipes, setFavoriteRecipes] = useState(new Set());

  const toggleFavorite = (recipeId) => {
    setFavoriteRecipes((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(recipeId)) {
        newFavorites.delete(recipeId);
      } else {
        newFavorites.add(recipeId);
      }
      return newFavorites;
    });
  };

  const handleViewRecipe = (recipe) => {
    // Navigation logic would go here with expo-router
    console.log("Viewing recipe:", recipe.title);
  };

  const handleCardPress = (recipe) => {
    // Card tap logic would go here
    console.log("Card pressed:", recipe.title);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return COLORS.success;
      case "Medium":
        return COLORS.warning;
      case "Hard":
        return COLORS.error;
      default:
        return COLORS.textLight;
    }
  };

  const renderRecipeCard = ({ item }) => {
    const isFavorite = favoriteRecipes.has(item.id);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress(item)}
        activeOpacity={0.95}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.cardImage} />

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
            activeOpacity={0.8}
          >
            <Heart
              size={20}
              color={isFavorite ? "#ff4757" : COLORS.background}
              fill={isFavorite ? "#ff4757" : "transparent"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: getDifficultyColor(item.difficulty) },
              ]}
            >
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>

          <Text style={styles.cardDescription} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.cardMeta}>
            <View style={styles.metaItem}>
              <Clock size={14} color={COLORS.textLight} strokeWidth={2} />
              <Text style={styles.metaText}>{item.cookTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Users size={14} color={COLORS.textLight} strokeWidth={2} />
              <Text style={styles.metaText}>{item.servings} servings</Text>
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleViewRecipe(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.viewButtonText}>View Recipe</Text>
              <BookOpen size={14} color={COLORS.text} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Back!</Text>
        <Text style={styles.headerSubtitle}>
          What are we cooking today?
        </Text>
      </View>

      <FlatList
        data={nigerianRecipes}
        renderItem={renderRecipeCard}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

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
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: "400",
  },
  listContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  separator: {
    height: 24,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  imageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 180,
    backgroundColor: COLORS.border,
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.background,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardMeta: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 20,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 6,
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 11,
    color: COLORS.text,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  viewButtonText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "600",
  },
});
