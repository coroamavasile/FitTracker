import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Pedometer } from 'expo-sensors';
import { useEffect, useState } from 'react';

const DashboardScreen = (props) => {
  const { navigate } = useNavigation();

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const logoutHandler = () => {
    navigate('LoginScreen');
  };

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription.remove && subscription.remove();
  }, []);

  return (
    <View style={{ marginTop: 100, marginLeft: 50 }}>
      <Text>Hello, Vasi!</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Your training lasted 1h and 30 minutes</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity style={styles.button} onPress={logoutHandler}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: 250,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

DashboardScreen.navigationOptions = {
  headerTitle: 'DashboardScreen',
};
