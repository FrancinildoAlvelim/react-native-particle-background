
<h1 align="center">
  <img src="https://res.cloudinary.com/francinildo/image/upload/v1568660959/Grupo_1.png" />
  <br>
  React Native Particle Background
</h1>

Simple particle background written 100% in React Native

# Installation
Run:  `npm install react-native-particle-background` or `yarn add react-native-particle-background`


### Usage

```javascript
import React from "react";
import { View, StyleSheet } from "react-native";
import ParticleBackground from "react-native-particle-background";

const App = () => {
  return (
    <View style={styles.container}>
      <ParticleBackground
        particleColor="#rgba(0, 255, 34,0.2)"
        particleSize={8}
        particleDispersion={32}
        backgroundColor="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  }
});

export default App;
```
### Result

![](https://media.giphy.com/media/eKC4dAEHSEIugGU4g2/giphy.gif)

### Todo

- [x] Publish in npm 🥳
- [ ] Prop validation
- [ ] Enhance documentation
- [ ] Enhance performance (keeping pure react native <3)
