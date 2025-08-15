import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Search as SearchIcon, X, Filter, Clock, Star, Heart } from 'lucide-react-native';

// Consistent color system matching HomeScreen
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
  inputBg: '#f8f9fa',     // Input background
  success: '#10b981',     // Green for easy
  warning: '#f59e0b',     // Amber for medium  
  error: '#ef4444',       // Red for hard
};

const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'Chicken curry',
    'Pasta carbonara',
    'Chocolate cake',
    'Vegetarian tacos',
  ]);
  const [popularRecipes, setPopularRecipes] = useState([
    {
      id: 1,
      title: 'Oha Soup',
      image: 'https://www.fitnigerian.com/wp-content/uploads/2020/10/ofe-oha-soup-recipe.jpg',
      cookTime: '30 min',
      difficulty: 'Easy',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Agoyin Beans',
      image: 'https://myotbukka.com/wp-content/uploads/2024/10/ewa-agoin.webp',
      cookTime: '45 min',
      difficulty: 'Medium',
      rating: 4.7,
    },
    {
      id: 3,
      title: 'Efo Elegusi',
      image: 'https://lowcarbafrica.com/wp-content/uploads/2018/06/Egusi-Soup-IG-1.jpg',
      cookTime: '15 min',
      difficulty: 'Easy',
      rating: 4.3,
    },
  ]);
  const [categories] = useState([
    { id: 1, name: 'Breakfast', icon: '🥞' },
    { id: 2, name: 'Lunch', icon: '🥗' },
    { id: 3, name: 'Dinner', icon: '🍽️' },
    { id: 4, name: 'Dessert', icon: '🍰' },
    { id: 5, name: 'Snacks', icon: '🥨' },
    { id: 6, name: 'Drinks', icon: '🥤' },
  ]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Mock search function - replace with your actual search logic
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          title: `Delicious ${query} Recipe`,
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
          cookTime: '25 min',
          difficulty: 'Easy',
          rating: 4.2,
          ingredients: ['Fresh herbs', 'Olive oil', 'Garlic'],
        },
        {
          id: 2,
          title: `Traditional ${query} Dish`,
          image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300',
          cookTime: '40 min',
          difficulty: 'Medium',
          rating: 4.6,
          ingredients: ['Tomatoes', 'Cheese', 'Basil'],
        },
        {
          id: 3,
          title: `Modern ${query} Creation`,
          image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=300',
          cookTime: '20 min',
          difficulty: 'Easy',
          rating: 4.1,
          ingredients: ['Spices', 'Coconut milk', 'Vegetables'],
        },
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  const handleRecentSearch = (query) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const addToRecentSearches = (query) => {
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  };

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
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

  const renderSearchResult = ({ item }) => (
    <TouchableOpacity
      style={styles.searchResultItem}
      onPress={() => navigation?.navigate('RecipeDetail', { recipe: item })}
      activeOpacity={0.95}
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.resultMeta}>
          <View style={styles.metaItem}>
            <Clock size={12} color={COLORS.textLight} strokeWidth={2} />
            <Text style={styles.metaText}>{item.cookTime}</Text>
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
            <Text style={styles.difficultyText}>{item.difficulty}</Text>
          </View>
          <View style={styles.metaItem}>
            <Star size={12} color={COLORS.primary} strokeWidth={2} fill={COLORS.primary} />
            <Text style={styles.metaText}>{item.rating}</Text>
          </View>
        </View>
        <Text style={styles.resultIngredients} numberOfLines={1}>
          {item.ingredients?.join(' • ')}
        </Text>
      </View>
      <TouchableOpacity style={styles.favoriteBtn} activeOpacity={0.7}>
        <Heart size={20} color={COLORS.textLight} strokeWidth={2} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderPopularRecipe = ({ item }) => (
    <TouchableOpacity
      style={styles.popularRecipeItem}
      onPress={() => navigation?.navigate('RecipeDetail', { recipe: item })}
      activeOpacity={0.95}
    >
      <Image source={{ uri: item.image }} style={styles.popularImage} />
      <Text style={styles.popularTitle} numberOfLines={2}>{item.title}</Text>
      <View style={styles.popularMeta}>
        <Clock size={10} color={COLORS.textLight} strokeWidth={2} />
        <Text style={styles.popularMetaText}>{item.cookTime}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation?.navigate('CategoryRecipes', { category: item })}
      activeOpacity={0.8}
    >
      <Text style={styles.categoryIcon}>{item.icon}</Text>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Header */}
        <View style={styles.searchHeader}>
          <Text style={styles.headerTitle}>Search Recipes</Text>
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <SearchIcon size={18} color={COLORS.textLight} strokeWidth={2} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search recipes, ingredients..."
                placeholderTextColor={COLORS.textLight}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={() => {
                  handleSearch(searchQuery);
                  addToRecentSearches(searchQuery);
                }}
              />
              {searchQuery ? (
                <TouchableOpacity onPress={clearSearch} activeOpacity={0.7}>
                  <X size={18} color={COLORS.textLight} strokeWidth={2} />
                </TouchableOpacity>
              ) : null}
            </View>
            
            <TouchableOpacity 
              style={[styles.filterBtn, showFilters && styles.filterBtnActive]}
              onPress={() => setShowFilters(!showFilters)}
              activeOpacity={0.8}
            >
              <Filter size={18} color={showFilters ? COLORS.text : COLORS.background} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
            {activeFilters.map(filter => (
              <TouchableOpacity
                key={filter}
                style={styles.activeFilter}
                onPress={() => toggleFilter(filter)}
                activeOpacity={0.8}
              >
                <Text style={styles.activeFilterText}>{filter}</Text>
                <X size={12} color={COLORS.text} strokeWidth={2} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Search Results */}
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Finding delicious recipes...</Text>
          </View>
        ) : searchResults.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            <FlatList
              data={searchResults}
              renderItem={renderSearchResult}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.resultSeparator} />}
            />
          </View>
        ) : searchQuery ? (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsIcon}>🔍</Text>
            <Text style={styles.noResultsText}>No recipes found</Text>
            <Text style={styles.noResultsSubtext}>Try searching for something else or browse categories below</Text>
          </View>
        ) : null}

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentSearchItem}
                  onPress={() => handleRecentSearch(search)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.recentSearchText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Categories */}
        {!searchQuery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={item => item.id.toString()}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              columnWrapperStyle={styles.categoryRow}
            />
          </View>
        )}

        {/* Popular Recipes */}
        {!searchQuery && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular This Week</Text>
            <FlatList
              data={popularRecipes}
              renderItem={renderPopularRecipe}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchHeader: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '400',
  },
  filterBtn: {
    backgroundColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
  },
  filterBtnActive: {
    backgroundColor: COLORS.primary,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  activeFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    gap: 6,
  },
  activeFilterText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 16,
    fontWeight: '500',
  },
  searchResultItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  resultSeparator: {
    height: 12,
  },
  resultImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: COLORS.border,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
    lineHeight: 22,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.background,
    textTransform: 'uppercase',
  },
  resultIngredients: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  favoriteBtn: {
    padding: 8,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  noResultsIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  horizontalScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  recentSearchItem: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
  recentSearchText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 16,
    paddingVertical: 20,
    marginHorizontal: 6,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  horizontalList: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  popularRecipeItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
    width: 140,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  popularImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: COLORS.border,
  },
  popularTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
    lineHeight: 18,
  },
  popularMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  popularMetaText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: '500',
  },
});

export default Search;