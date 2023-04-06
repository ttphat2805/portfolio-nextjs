import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { urlFor } from "../sanity";
type Props = {
  skills: Skills[];
};
const ParticlesCanvas = ({ skills }: Props) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {},
    []
  );

  const imageCanvas = useMemo(() => {
    return skills.map((skill: Skills) => ({
      src: urlFor(skill.image).url(),
    }));
  }, [skills]);

  return (
    <Particles
      id="tsparticles"
      className="w-full h-full absolute"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 120,
        style: {
          position: "absolute",
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 1,
            },
          },
        },

        particles: {
          collisions: {
            enable: true,
          },
          rotate: {
            value: 360,
            random: true,
            anim: {
              enable: true,
              speed: 2,
            },
          },
          line_linked: {
            enable: false,
            distance: 500,
            color: "#ffffff",
            opacity: 0.4,
            width: 2,
          },
          move: {
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 4,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 6234,
              rotateY: 6155,
            },
          },
          number: {
            density: {
              enable: true,
              area: 10000,
            },
            value: 100,
          },

          opacity: { value: { min: 0.5, max: 0.8 } },

          shape: {
            type: "image",
            image: imageCanvas,
          },

          size: {
            value: 30,
            random: false,
            anim: {
              enable: true,
              speed: 10,
              size_min: 20,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesCanvas;
