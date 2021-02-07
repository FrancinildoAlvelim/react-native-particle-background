import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated, Easing } from "react-native";
import { randomIntFromInterval } from "../../utils";

const Particle = ({
  initialX,
  initialY,
  parentHeight,
  parentWidth,
  size,
  color
}) => {
  const animatedOpacity = useRef(
    new Animated.Value(randomIntFromInterval(0, 1))
  ).current;
  const animatedPosition = useRef(new Animated.Value(0)).current;

  const animationTiming = randomIntFromInterval(800, 1800);

  const loopBouncingAnimate = (reversed = false) => {
    Animated.parallel([
      Animated.timing(animatedPosition, {
        toValue: reversed ? 0 : 1,
        duration: 20000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }),
      Animated.timing(animatedOpacity, {
        toValue: reversed ? 0 : 1,
        duration: animationTiming,
        useNativeDriver: true
      })
    ]).start( ()=>{ 
      loopBouncingAnimate(!reversed)
    } );
  };

  useEffect(() => {
    loopBouncingAnimate(loopBouncingAnimate);
  }, []);

  const topOffSet = parentHeight - initialY;
  const leftOffSet = parentWidth - initialX;

  let yOffset = topOffSet * Math.cos(randomIntFromInterval(0, 360));
  let xOffset = leftOffSet * Math.sin(randomIntFromInterval(0, 360));
  let translateY = animatedPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, yOffset]
  });
  let translateX = animatedPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, xOffset]
  });

  let opacity = animatedOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1]
  });

  return (
    <Animated.View
      style={[
        {
          opacity,
          transform: [
            {
              translateY
            },
            { translateX }
          ]
        },
        defaultStyles.container,
        {
          top: initialY,
          left: initialX,
          width: size,
          height: size,
          backgroundColor: color
        }
      ]}
    />
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    position: "absolute",
    borderRadius: 100
  }
});

export default Particle;
