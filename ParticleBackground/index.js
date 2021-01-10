import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { View, ViewPropTypes } from "react-native";
import Particle from "./components/Particle";
import { randomIntFromInterval } from "./utils";

// TO-DO consider create prop particleColors when user passes multiple particle color
const ParticleBackground = ({
  particleSize,
  particleDispersion,
  particleColor,
  backgroundColor,
  containerStyle,
}) => {
  const [particles, setParticles] = useState([]);
  const [componentDimensions, setComponentDimensions] = useState({
    width: 0,
    height: 0,
  });

  // TO-DO move random statement to some method
  const getParticleColor = () =>{
    const multiplePaticleColors = Array.isArray(particleColor)

    if(!multiplePaticleColors) return particleColor

    const particleColorLength = particleColor.length
    const randomIndex = Math.floor(Math.random() * particleColorLength )
    const randomlyPickedColor = particleColor[randomIndex]

    return randomlyPickedColor
  }

  const getParticles = () => {
    const currentParticles = [];
    const { width, height } = componentDimensions;
    const parentArea = width * height;
    const particleArea = Math.pow(particleSize + particleDispersion, 2);
    const estimatedParticleQuantity = Math.floor(parentArea / particleArea);

    for (let y = 0; y < estimatedParticleQuantity; y += 1) {
      const realY = randomIntFromInterval(0, height);
      const realX = randomIntFromInterval(0, width);
      currentParticles.push({
        y: realY,
        x: realX,
        size: particleSize,
      });
    }
    return currentParticles;
  };

  const getParticleViews = () => {
    return particles.map(({ x, y, size }, index) => (
      <Particle
        parentWidth={componentDimensions.width}
        parentHeight={componentDimensions.height}
        color={getParticleColor()}
        initialX={x}
        initialY={y}
        size={size}
        key={index}
      />
    ));
  };

  const setDimensions = ({ nativeEvent }) => {
    const { width, height } = componentDimensions;
    if (!nativeEvent || height !== 0 || width !== 0) return;

    if (nativeEvent) {
      const { layout } = nativeEvent;
      const { width, height } = layout;
      setComponentDimensions({ width, height });
    }
  };

  useEffect(() => {
    const { width, height } = componentDimensions;
    if (height !== 0 || width !== 0) {
      requestAnimationFrame(() => {
        const generatedParticles = getParticles();
        setParticles(generatedParticles);
      });
    }
  }, [componentDimensions]);

  return (
    <View
      style={[containerStyle, { backgroundColor }]}
      onLayout={setDimensions}
    >
      {getParticleViews()}
    </View>
  );
};

ParticleBackground.propTypes = {
  particleSize: PropTypes.number,
  particleDispersion: PropTypes.number,
  particleColor: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  backgroundColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
};

export default ParticleBackground;
