import {
  Environment,
  Image,
  ScrollControls,
  useScroll,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import React, { useEffect, useRef, useState } from "react";
import "../services/Utils";
import { Canvas, useFrame } from "react-three-fiber";
import { easing } from "maath";
import { useTheme } from "../ThemeContext";
// import { motion } from "framer-motion";
import {
  springImg,
  summerImg,
  fallImg,
  winterImg,
  logoSumCanvas,
  logoFallCanvas,
  logoSpringCanvas,
  logoWinterCanvas,
} from "../assets";
const logo = [
  logoSpringCanvas,
  logoSumCanvas,
  logoFallCanvas,
  logoWinterCanvas,
];

const img = [springImg, summerImg, fallImg, winterImg];
function Rig(props) {
  const ref = useRef();
  const scroll = useScroll();
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update();
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return <group ref={ref} {...props} />;
}

function Carousel({ radius = 1.4, count = 8 }) {
  const { setSeason } = useTheme();
  const handleClick = (seasons) => {
    setSeason(seasons);
  };
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      onClick={() => {
        if (img[i % img.length] === img[0]) {
          handleClick("spring");
        }
        if (img[i % img.length] === img[1]) {
          handleClick("summer");
        }
        if (img[i % img.length] === img[2]) {
          handleClick("fall");
        }
        if (img[i % img.length] === img[3]) {
          handleClick("winter");
        }
      }}
      url={img[i % img.length]}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
    />
  ));
}

function Card({ url, ...props }) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const pointerOver = (e) => {
    e.stopPropagation();
    hover(true);
  };
  const pointerOut = () => hover(false);
  useFrame((_, delta) => {
    easing.damp3(ref.current.scale, hovered ? 1.15 : 1, 0.1, delta);
    easing.damp(
      ref.current.material,
      "radius",
      hovered ? 0.25 : 0.1,
      0.2,
      delta
    );
    easing.damp(ref.current.material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
  });
  return (
    <Image
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      {...props}
    >
      <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </Image>
  );
}

function Banner(props) {
  const { season } = useTheme();
  const ref = useRef();
  const textures = {
    summer: useTexture(logo.at(1)),
    default: useTexture(logo.at(0)),
    fall: useTexture(logo.at(2)),
    winter: useTexture(logo.at(3)),
  };

  const [texture, setTexture] = useState(textures.default);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const scroll = useScroll();

  useEffect(() => {
    if (season === "summer") {
      setTexture(textures.summer);
    } else if (season === "fall") {
      setTexture(textures.fall);
    } else if (season === "winter") {
      setTexture(textures.winter);
    } else {
      setTexture(textures.default);
    }
  }, [
    season,
    textures.default,
    textures.fall,
    textures.summer,
    textures.winter,
  ]);

  useFrame((_, delta) => {
    ref.current.material.time.value += Math.abs(scroll.delta) * 4;
    ref.current.material.map.offset.x += delta / 2;
  });

  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[1.6, 1.6, 0.14, 128, 16, true]} />
      <meshSineMaterial
        map={texture}
        map-anisotropy={16}
        map-repeat={[30, 1]}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
}

const HomeBanner = () => {
  const { season } = useTheme();
  return (
    <div className="w-2/4 h-3/4 max-md:w-full max-md:h-2/4 max-md:pt-0 4 max-md:justify-between">
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={["#cfe4e5", 8.5, 12]} />
        <ScrollControls pages={10} infinite>
          <Rig rotation={[0, 0, 0.1]}>
            <Carousel />
          </Rig>
          <Banner position={[0, -0.1, 0]} />
        </ScrollControls>
        <Environment preset="dawn" blur={0.5} />
      </Canvas>
      <div className="absolute right-20 max-md:hidden">
        <p
          className={`${season}2-text-gradient `}
          style={{
            position: "relative",
            // left: 200,
            fontSize: "13px",
          }}
        >
          scroll up/down ...
        </p>

        {/* <div className="w-[24px] h-[32px] rounded-xl absolute border-4 border-white-100 flex justify-center items-start p-1">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-1 h-2 rounded-full bg-white-100"
        />
      </div> */}
        <p
          className={`${season}2-text-gradient max-md:block `}
          style={{
            position: "relative",
            // left: 200,
            fontSize: "13px",
          }}
        >
          click to change to season
        </p>
      </div>
      {/* <div className="hidden absolute max-md:block top-1/2  right-10 ">
        <p
          className={`${season}2-text-gradient hidden max-md:block max-md:text-sm`}
          style={{
            position: "relative",
          }}
        >
          Click to change to season
        </p>
      </div> */}
    </div>
  );
};

export default HomeBanner;
