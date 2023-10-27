// Import the necessary modules and components
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the Header_SectionA component
const Header_SectionA = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Assignment 2</Text>
    </View>
  );
};

// Define the styles for the Header_SectionA component using StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1/14,  // Use flexbox sizing for the height (Note: 1/14 is not a valid value, consider using a fraction like 1/14)
    backgroundColor: '#87ceea', // Set the background color to a light blue
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',  // Center the content horizontally
    padding: 24,  // Add padding of 24 units
    width: '100%',  // Set the width to 100% of the parent container
  },
  text: {
    fontSize: 20,  // Set the font size to 20 units
    fontWeight: 'bold',  // Apply bold font weight
    marginTop: 0,  // Set the top margin to 0 (no margin)
    textAlign: 'center',  // Center-align the text
  },
});

// Export the Header_SectionA component for use in other parts of the application
export default Header_SectionA;
