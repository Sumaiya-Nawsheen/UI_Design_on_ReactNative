import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header_SectionA from './Components/Header_SectionA';
import Body_SectionB from './Components/Body_SectionB';
import Body_SectionC from './Components/Body_SectionC';
import Footer_SectionD from './Components/Footer_SectionD';

export default function App() {
  return (
    <View style={styles.container}>
      <Header_SectionA />
      <Body_SectionB/>
      <Body_SectionC/>
      <Footer_SectionD/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
