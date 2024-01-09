import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SplashScreen = () => {
  return (
    <View>
      <View>
        <Text style={styles.userName}>Okari Nyandika</Text>
      </View>
      <Text>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
