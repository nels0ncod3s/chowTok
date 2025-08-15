import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera, Upload, Plus, Check } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadScreen() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    // Request permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Permission to access camera roll is required!"
      );
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateFormData("image", result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Request permission
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Required",
        "Permission to access camera is required!"
      );
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      updateFormData("image", result.assets[0].uri);
    }
  };

  const showImageOptions = () => {
    Alert.alert("Select Image", "Choose how you want to add an image", [
      { text: "Camera", onPress: takePhoto },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert("Validation Error", "Please enter a recipe title");
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert("Validation Error", "Please enter a description");
      return false;
    }
    if (!formData.ingredients.trim()) {
      Alert.alert("Validation Error", "Please enter ingredients");
      return false;
    }
    if (!formData.instructions.trim()) {
      Alert.alert("Validation Error", "Please enter cooking instructions");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log("=== RECIPE SUBMISSION ===");
      console.log("Title:", formData.title);
      console.log("Description:", formData.description);
      console.log("Ingredients:", formData.ingredients);
      console.log("Instructions:", formData.instructions);
      console.log("Image URI:", formData.image);
      console.log("========================");

      Alert.alert(
        "Success!",
        "Recipe uploaded successfully! Check console for details.",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setFormData({
                title: "",
                description: "",
                ingredients: "",
                instructions: "",
                image: null,
              });
            },
          },
        ]
      );

      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Upload Recipe</Text>
            <Text style={styles.headerSubtitle}>
              Share your delicious creation
            </Text>
          </View>

          <View style={styles.form}>
            {/* Recipe Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Recipe Title *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter recipe title..."
                value={formData.title}
                onChangeText={(text) => updateFormData("title", text)}
                maxLength={100}
              />
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Short Description *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Brief description of your recipe..."
                value={formData.description}
                onChangeText={(text) => updateFormData("description", text)}
                maxLength={200}
                multiline
              />
            </View>

            {/* Image Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Recipe Image</Text>
              <TouchableOpacity
                style={styles.imagePicker}
                onPress={showImageOptions}
                activeOpacity={0.8}
              >
                {formData.image ? (
                  <Image
                    source={{ uri: formData.image }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <View style={styles.imagePickerContent}>
                    <Camera size={32} color="#7F8C8D" />
                    <Text style={styles.imagePickerText}>Tap to add image</Text>
                    <Text style={styles.imagePickerSubtext}>
                      Camera or Gallery
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* Ingredients */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Ingredients *</Text>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                placeholder="List all ingredients (one per line)&#10;• 2 cups flour&#10;• 1 tsp salt&#10;• 3 eggs..."
                value={formData.ingredients}
                onChangeText={(text) => updateFormData("ingredients", text)}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            {/* Instructions */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Cooking Instructions *</Text>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                placeholder="Step-by-step cooking instructions...&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients&#10;3. Add wet ingredients..."
                value={formData.instructions}
                onChangeText={(text) => updateFormData("instructions", text)}
                multiline
                numberOfLines={8}
                textAlignVertical="top"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                isSubmitting && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <Text style={styles.submitButtonText}>Uploading...</Text>
              ) : (
                <>
                  <Upload size={20} color="#FFF" />
                  <Text style={styles.submitButtonText}>Upload Recipe</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#7F8C8D",
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2C3E50",
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 120,
    paddingTop: 12,
  },
  imagePicker: {
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#E9ECEF",
    borderStyle: "dashed",
    borderRadius: 12,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  imagePickerContent: {
    alignItems: "center",
  },
  imagePickerText: {
    fontSize: 16,
    color: "#7F8C8D",
    marginTop: 8,
    fontWeight: "500",
  },
  imagePickerSubtext: {
    fontSize: 14,
    color: "#95A5A6",
    marginTop: 4,
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  submitButton: {
    backgroundColor: "#E74C3C",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonDisabled: {
    backgroundColor: "#BDC3C7",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});
