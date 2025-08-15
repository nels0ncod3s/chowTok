import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import { 
  BookmarkX, 
  Heart, 
  Clock, 
  Users, 
  ChefHat,
  Trash2,
  Search
} from 'lucide-react-native';

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
  success: '#10b981',     // Green for easy
  warning: '#f59e0b',     // Amber for medium  
  error: '#ef4444',       // Red for hard
  danger: '#dc2626',      // Red for delete
};

const BookmarkPage = ({ navigation }) => {
  // Mock bookmarked recipes - replace with your actual state management
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState([
    {
      id: '1',
      title: 'Grilled Salmon with Lemon',
      description: 'Fresh Atlantic salmon grilled to perfection with herbs and lemon',
      category: 'Seafood',
      image: 'https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=600',
      cookTime: '25 min',
      servings: 4,
      difficulty: 'Medium',
      bookmarkedAt: '2 days ago',
    },
    {
      id: '2',
      title: 'Creamy Mushroom Risotto',
      description: 'Rich and creamy Arborio rice with wild mushrooms and parmesan',
      category: 'Italian',
      image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=600',
      cookTime: '35 min',
      servings: 6,
      difficulty: 'Hard',
      bookmarkedAt: '1 week ago',
    },
    {
      id: '3',
      title: 'Mediterranean Quinoa Bowl',
      description: 'Healthy quinoa bowl with fresh vegetables, olives, and feta cheese',
      category: 'Healthy',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
      cookTime: '15 min',
      servings: 2,
      difficulty: 'Easy',
      bookmarkedAt: '3 days ago',
    },
  ]);

  // Toggle this to test empty state
  const [showEmptyState] = useState(false);

  const handleExploreRecipes = () => {
    // Handle navigation to recipes/search screen
    navigation?.navigate('Search') || console.log('Navigate to search screen');
  };

  const handleRemoveBookmark = (recipeId) => {
    setBookmarkedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const handleViewRecipe = (recipe) => {
    // Handle navigation to recipe detail
    navigation?.navigate('RecipeDetail', { recipe }) || console.log('View recipe:', recipe.title);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return COLORS.success;
      case 'Medium':
        return COLORS.warning;
      case 'Hard':
        return COLORS.error;
      default:
        return COLORS.textLight;
    }
  };

  const renderBookmarkedRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => handleViewRecipe(item)}
      activeOpacity={0.95}
    >
      <Image source={{ uri: item.image }} style={styles.recipeImage} />
      
      <View style={styles.recipeContent}>
        <View style={styles.recipeHeader}>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.recipeDescription} numberOfLines={2}>{item.description}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveBookmark(item.id)}
            activeOpacity={0.7}
          >
            <Trash2 size={18} color={COLORS.danger} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <View style={styles.recipeMeta}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Clock size={14} color={COLORS.textLight} strokeWidth={2} />
              <Text style={styles.metaText}>{item.cookTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Users size={14} color={COLORS.textLight} strokeWidth={2} />
              <Text style={styles.metaText}>{item.servings} servings</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
              <Text style={styles.difficultyText}>{item.difficulty}</Text>
            </View>
          </View>
          
          <View style={styles.recipeFooter}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={styles.bookmarkedTime}>Saved {item.bookmarkedAt}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <View style={styles.emptyIconContainer}>
        <BookmarkX size={64} color={COLORS.border} strokeWidth={1.5} />
      </View>
      <Text style={styles.emptyStateTitle}>No Saved Recipes Yet</Text>
      <Text style={styles.emptyStateMessage}>
        Start building your personal cookbook!{'\n'}
        Bookmark recipes you love and find them here anytime.
      </Text>
      <TouchableOpacity 
        style={styles.exploreButton} 
        onPress={handleExploreRecipes}
        activeOpacity={0.9}
      >
        <Search size={16} color={COLORS.text} strokeWidth={2} />
        <Text style={styles.exploreButtonText}>Discover Recipes</Text>
      </TouchableOpacity>
    </View>
  );

  const displayRecipes = showEmptyState ? [] : bookmarkedRecipes;

  return (
    <SafeAreaView style={styles.container}>
      {displayRecipes.length === 0 ? (
        renderEmptyState()
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Saved Recipes</Text>
                <Text style={styles.headerSubtitle}>
                  {displayRecipes.length} recipe{displayRecipes.length !== 1 ? 's' : ''} saved
                </Text>
              </View>
              <View style={styles.headerIcon}>
                <Heart size={24} color={COLORS.primary} fill={COLORS.primary} strokeWidth={2} />
              </View>
            </View>
          </View>

          <View style={styles.recipesList}>
            <FlatList
              data={displayRecipes}
              renderItem={renderBookmarkedRecipe}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>

          <View style={styles.bottomAction}>
            <TouchableOpacity 
              style={styles.findMoreButton}
              onPress={handleExploreRecipes}
              activeOpacity={0.9}
            >
              <ChefHat size={16} color={COLORS.background} strokeWidth={2} />
              <Text style={styles.findMoreText}>Find More Recipes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: COLORS.background,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipesList: {
    paddingHorizontal: 24,
  },
  separator: {
    height: 16,
  },
  recipeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  recipeImage: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.border,
  },
  recipeContent: {
    padding: 20,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  recipeInfo: {
    flex: 1,
    marginRight: 12,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
    lineHeight: 24,
  },
  recipeDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.danger + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeMeta: {
    gap: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.background,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  recipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bookmarkedTime: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  bottomAction: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  findMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.text,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  findMoreText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
  // Empty State Styles
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.border + '40',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  emptyStateMessage: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  exploreButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookmarkPage;