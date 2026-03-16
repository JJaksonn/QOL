import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../utils/supabase";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 6;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [allInterests, setAllInterests] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "",
    bio: "",
    avatar_url: "",
    gender: "",
    dateOfBirth: "",
    nativeLanguage: "",
    learningLanguage: "",
    proficiencyLevel: "",
    level: 1,
    interests: [],
  });

  const { register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchInterests = async () => {
      const { data, error: interestError } = await supabase
        .from("interests")
        .select("*");
      if (interestError) {
        console.error(interestError);
        return;
      }
      setAllInterests(
        (data || []).map((i) => ({
          label: i.interest,
          value: i.id,
          emoji: i.emoji || "⭐",
        })),
      );
    };
    fetchInterests();
  }, []);

  const goalOptions = [
    { label: "Casual Conversation", value: "casual", emoji: "💬" },
    { label: "Academic", value: "academic", emoji: "📚" },
    { label: "Travel", value: "travel", emoji: "✈️" },
    { label: "Business", value: "business", emoji: "💼" },
    { label: "Cultural Understanding", value: "cultural", emoji: "🌍" },
  ];

  const languageOptions = [
    { label: "Arabic", value: "arabic" },
    { label: "Hebrew", value: "hebrew" },
  ];

  const profLevel = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const nextStep = () => {
    setError(null);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleLanguageStep = () => {
    if (!profileData.nativeLanguage || !profileData.learningLanguage) {
      setError("Please select both native and learning languages.");
      return;
    }
    if (profileData.nativeLanguage === profileData.learningLanguage) {
      setError("Native and learning languages cannot be the same.");
      return;
    }
    if (!profileData.proficiencyLevel) {
      setError("Please select your proficiency level.");
      return;
    }
    nextStep();
  };

  const handleLearningGoalStep = () => {
    if (!selectedGoal) {
      setError("Please select a learning goal.");
      return;
    }
    nextStep();
  };

  const handleInterestsStep = () => {
    if (selectedInterests.length === 0) {
      setError("Please select at least one interest.");
      return;
    }
    nextStep();
  };

  const handleInfoStep = () => {
    if (!profileData.gender) {
      setError("Please select your gender.");
      return;
    }
    if (!profileData.dateOfBirth) {
      setError("Please enter your date of birth.");
      return;
    }

    nextStep();
  };

  const handleUserDataStep = async () => {
    if (!profileData.displayName || !profileData.bio) {
      setError("Please fill in all required fields.");
      return;
    }
    const { data, error: checkError } = await supabase
      .from("users")
      .select("id")
      .eq("displayName", profileData.displayName)
      .maybeSingle();

    if (checkError) {
      setError("Something went wrong. Please try again.");
      return;
    }
    if (data) {
      setError("Username already taken. Please choose another.");
      return;
    }
    nextStep();
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: authError } = await register(email, password, {
      ...profileData,
      learningGoal: selectedGoal,
      interests: selectedInterests,
    });
    setLoading(false);

    if (authError) {
      if (authError.message === "User already registered") {
        setError("An account with this email already exists.");
      } else if (authError.code === "23505") {
        setError("Username already taken.");
      } else {
        setError(authError.message);
      }
      return;
    }
    router.replace("/");
  };

  const stepHandlers = {
    1: handleLanguageStep,
    2: handleLearningGoalStep,
    3: handleInterestsStep,
    4: handleInfoStep,
    5: handleUserDataStep,
    6: handleRegister,
  };

  return (
    <ScrollView
      contentContainerStyle={styles.page}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <View style={styles.progressBubbleRow}>
          {[...Array(TOTAL_STEPS)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.bubble,
                i < step ? styles.bubbleActive : styles.bubbleInactive,
              ]}
            />
          ))}
        </View>
        <Text style={styles.stepLabel}>
          Step {step} of {TOTAL_STEPS}
        </Text>

        {step === 1 && (
          <View>
            <Text style={styles.title}>Language Skills</Text>
            <Text style={styles.subtitle}>
              Select your native and learning languages
            </Text>
            <Text style={styles.label}>Native Language</Text>
            <Dropdown
              style={styles.dropdown}
              data={languageOptions}
              labelField="label"
              valueField="value"
              placeholder="Select native language"
              value={profileData.nativeLanguage}
              onChange={(item) => {
                setProfileData((prev) => ({
                  ...prev,
                  nativeLanguage: item.value,
                }));
                setError(null);
              }}
            />
            <Text style={styles.label}>Learning Language</Text>
            <Dropdown
              style={styles.dropdown}
              data={languageOptions}
              labelField="label"
              valueField="value"
              placeholder="Select learning language"
              value={profileData.learningLanguage}
              onChange={(item) => {
                setProfileData((prev) => ({
                  ...prev,
                  learningLanguage: item.value,
                }));
                setError(null);
              }}
            />
            <Text style={styles.label}>Proficiency Level</Text>
            <Dropdown
              style={styles.dropdown}
              data={profLevel}
              labelField="label"
              valueField="value"
              placeholder="Select proficiency level"
              value={profileData.proficiencyLevel}
              onChange={(item) => {
                setProfileData((prev) => ({
                  ...prev,
                  proficiencyLevel: item.value,
                }));
                setError(null);
              }}
            />
          </View>
        )}

        {step === 2 && (
          <View>
            <Text style={styles.title}>Learning Goal</Text>
            <Text style={styles.subtitle}>What do you want to focus on?</Text>
            {goalOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  setSelectedGoal(option.value);
                  setError(null);
                }}
                style={[
                  styles.optionCard,
                  selectedGoal === option.value && styles.optionCardSelected,
                ]}
              >
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <Text
                  style={[
                    styles.optionLabel,
                    selectedGoal === option.value && styles.optionLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {step === 3 && (
          <View>
            <Text style={styles.title}>Your Interests</Text>
            <Text style={styles.subtitle}>Select everything that applies</Text>
            {allInterests.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => {
                  setSelectedInterests((prev) =>
                    prev.includes(option.value)
                      ? prev.filter((v) => v !== option.value)
                      : [...prev, option.value],
                  );
                  setError(null);
                }}
                style={[
                  styles.optionCard,
                  selectedInterests.includes(option.value) &&
                    styles.optionCardSelected,
                ]}
              >
                <Text style={styles.optionEmoji}>{option.emoji}</Text>
                <Text
                  style={[
                    styles.optionLabel,
                    selectedInterests.includes(option.value) &&
                      styles.optionLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {step === 4 && (
          <View>
            <Text style={styles.title}>About You</Text>
            <Text style={styles.subtitle}>
              This helps us match you with better partners
            </Text>
            <Text style={styles.label}>Gender</Text>
            <Dropdown
              style={styles.dropdown}
              labelField="label"
              valueField="value"
              placeholder="Select your gender"
              value={profileData.gender}
              data={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
                { label: "Prefer not to say", value: "preferNotToSay" },
              ]}
              onChange={(item) => {
                setProfileData((prev) => ({ ...prev, gender: item.value }));
                setError(null);
              }}
            />
            <Text style={styles.label}>Date of Birth</Text>
            <Pressable
              style={styles.input}
              onPress={() => setShowDatePicker(true)}
            >
              <Text
                style={{
                  color: profileData.dateOfBirth ? "#2C2C2C" : "#999",
                  fontSize: 15,
                }}
              >
                {profileData.dateOfBirth
                  ? new Date(profileData.dateOfBirth).toLocaleDateString()
                  : "Select date of birth"}
              </Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={
                  profileData.dateOfBirth
                    ? new Date(profileData.dateOfBirth)
                    : new Date()
                }
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (event.type === "dismissed") return;
                  if (selectedDate) {
                    setProfileData((prev) => ({
                      ...prev,
                      dateOfBirth: selectedDate.toISOString().split("T")[0],
                    }));
                    setError(null);
                  }
                }}
              />
            )}
          </View>
        )}

        {step === 5 && (
          <View>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subtitle}>How others will see you</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#999"
              value={profileData.displayName}
              onChangeText={(text) => {
                setProfileData((prev) => ({ ...prev, displayName: text }));
                setError(null);
              }}
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="A short bio about you"
              placeholderTextColor="#999"
              value={profileData.bio}
              onChangeText={(text) => {
                setProfileData((prev) => ({ ...prev, bio: text }));
                setError(null);
              }}
              multiline
            />
          </View>
        )}

        {step === 6 && (
          <View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Almost there!</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(null);
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(null);
              }}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setError(null);
              }}
            />
          </View>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.navRow}>
          {step > 1 ? (
            <Pressable onPress={prevStep} style={styles.navButton}>
              <Text style={styles.navButtonText}>← Back</Text>
            </Pressable>
          ) : (
            <View />
          )}
          {step < TOTAL_STEPS ? (
            <Pressable onPress={stepHandlers[step]} style={styles.button}>
              <Text style={styles.buttonText}>Next →</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={handleRegister}
              style={[styles.button, loading && { opacity: 0.6 }]}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Creating..." : "Create Account"}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: "#F5F0E8",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  progressBubbleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
  },
  bubble: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  bubbleActive: {
    backgroundColor: "#4A90D9",
  },
  bubbleInactive: {
    backgroundColor: "#E0D8CC",
  },
  stepLabel: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C2C2C",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#555",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F5F0E8",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#2C2C2C",
    borderWidth: 1,
    borderColor: "#E0D8CC",
  },
  bioInput: {
    height: 80,
    textAlignVertical: "top",
  },
  dropdown: {
    backgroundColor: "#F5F0E8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E0D8CC",
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E0D8CC",
    backgroundColor: "#F5F0E8",
    marginBottom: 10,
  },
  optionCardSelected: {
    borderColor: "#4A90D9",
    backgroundColor: "#EBF3FB",
  },
  optionEmoji: {
    fontSize: 22,
  },
  optionLabel: {
    fontSize: 15,
    color: "#555",
    marginLeft: 12,
  },
  optionLabelSelected: {
    color: "#4A90D9",
    fontWeight: "600",
  },
  error: {
    color: "#D64045",
    fontSize: 13,
    marginTop: 12,
    paddingHorizontal: 4,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
  },
  button: {
    backgroundColor: "#4A90D9",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  navButtonText: {
    color: "#4A90D9",
    fontWeight: "600",
    fontSize: 15,
  },
});
