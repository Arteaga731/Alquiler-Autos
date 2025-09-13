"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';

export const products = [
  {
    title: "Luxury Car Rental",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },
  {
    title: "Premium Car Sale",
    link: "https://userogue.com",
    thumbnail: "https://img.freepik.com/premium-photo/luxury-car-rental-car-sale-social-media-instagram-post-template-design_1126722-2530.jpg",
  },
  {
    title: "Car Rental Service",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },
  {
    title: "Vehicle Rental",
    link: "https://userogue.com",
    thumbnail: "https://evmwheels.com/front-theme/images/Group%20316.png",
  },
];

export const HeroParallax = () => {
  const firstRow = products.slice(0, 1);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };
  const isMobile = useMediaQuery({ maxWidth: 500 });
  const isTablet = useMediaQuery({ minWidth: 510, maxWidth: 900 });
  const isDesktop = useMediaQuery({ minWidth: 901, maxWidth: 1400 });
  
  const translateXReverseMobile = useTransform(scrollYProgress, [0, 0.3], [1000, 70]);
  const translateXTablet = useTransform(scrollYProgress, [0, 0.4], [1000, 300]);
  const translateXReverseDesktop = useTransform(scrollYProgress, [0, 0.4], [1000, 90]);
  
  const translateX = useSpring(
    isMobile
      ? translateXReverseMobile
      : isTablet
      ? translateXTablet
      : translateXReverseDesktop,
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.150], [15, 0]),
    springConfig
  );
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0, 1]),
    springConfig
  );
  
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.350], [20, 0]),
    springConfig
  );
  
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-800, 600]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-full py-40 overflow-hidden mb-[200px] antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse mb-[200px]">
          {firstRow.map((product, index) => (
            <div 
              key={`${product.title}-${index}`} 
              className="flex flex-col items-center lg:flex-row bg-gradient-to-br from-slate-900 to-green-500 max-w-full md:max-w-[800px] lg:max-w-[1300px] md:min-h-800px lg:min-h-[800px] gap-5 rounded-lg py-[50px] px-[50px] md:py-[100px] md:px-[100px] mx-auto"
            >
              <div>
                <h1 className="max-w-[250px] md:max-w-[600px] lg:max-w-[700px] lg:min-w-[500px] text-lg md:text-[24px] p-1 md:p-4 text-justify lg:text-left from-black via-gray-700 to-white bg-gradient-to-t bg-clip-text text-transparent capitalize font-bold parallax1H1 my-[40px] leading-[2rem] md:leading-[3rem]">
                  ¡Encuentra el auto perfecto a precios imbatibles! Ya sea para una escapada de fin de semana o un alquiler a largo plazo, te cubrimos con planes flexibles y sin cargos ocultos. ¡Reserva ahora y recorre la carretera con estilo!
                </h1>
              </div>
              <div className="mt-10 lg:mt-[-10px]">
                <ProductCard
                  product={product}
                  translate={translateX}
                />
              </div>
            </div>
          ))}
        </motion.div>
        <motion.div className="flex h-[600px] flex-row-reverse space-x-reverse space-x-20">
          {/* Contenido adicional puede ir aquí */}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="flex justify-between items-center max-w-7xl relative mx-auto py-20 z-20 md:py-40 px-4 w-full bg-transparent left-0 top-0">
      <div>
        <h1 className="text-2xl md:text-7xl font-bold dark:text-black bg-transparent">
          El Mejor <br /> Alquiler de Autos Para Ti
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-slate-800">
          Proporcionamos productos hermosos con limpieza y confianza. Somos un equipo de
          profesionales calificados y experimentados que son apasionados por nuestro trabajo.
        </p>
      </div>
    </div>
  );
};

export const ProductCard = ({ product, translate }) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-48 w-[50vh] md:h-96 md:w-[100vh] relative flex-shrink-0"
    >
      <div className="md:m-10">
        <img
          src={product.thumbnail}
          className="object-contain object-left-top absolute h-full w-full inset-0 max-w-[600px] max-h-[600px]"
          alt={product.title || "Imagen de vehículo de alquiler"}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/600x400?text=Imagen+no+disponible";
          }}
        />
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  translate: PropTypes.object.isRequired,
};