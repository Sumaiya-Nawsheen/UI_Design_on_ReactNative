// Import the necessary modules and components
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the Footer_SectionD component
const Footer_SectionD = () => {
  return (
    <View style={styles.footer}>
      <Text>Name: Last Name, First Name</Text>
      <Text>ID: 200496599</Text>
    </View>
  );
};

// Define the styles for the Footer_SectionD component using StyleSheet
const styles = StyleSheet.create({
  footer: {
    flex: 2/14,  // Use flexbox sizing for the height (Note: Consider using a valid fraction like 2/14)
    backgroundColor: '#ffbfcd',  // Set the background color to a unique color
    justifyContent: 'center',  // Center the content vertically
    alignItems: 'center',  // Center the content horizontally
    width: '100%',  // Set the width to 100% of the parent container
  },
});

// Export the Footer_SectionD component for use in other parts of the application
export default Footer_SectionD;
