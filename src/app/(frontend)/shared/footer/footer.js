import React, { useMemo, useEffect, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaLine } from 'react-icons/fa';
import { BiArrowToTop } from 'react-icons/bi';

const Footer = () => {
  const data = useStaticQuery(graphql`
    {
      allSocialJson {
        nodes {
          id
          name
          href
          icon {
            publicURL
          }
        }
      }
    }
  `);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        if (window.scrollY > 500) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 500;
    const startTime = performance.now();
    const scrollAnimation = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeInOut = 0.5 - Math.cos(progress * Math.PI) / 2;

      window.scrollTo(0, start * (1 - easeInOut));

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    };
    requestAnimationFrame(scrollAnimation);
  };

  const allSocialDataList = useMemo(() => {
    return data.allSocialJson.nodes?.map((node) => {
      let iconElement = null;
      switch (node.name) {
        case 'Instagram':
          iconElement = <FaInstagram size={30} />;
          break;
        case 'Facebook':
          iconElement = <FaFacebook size={30} />;
          break;
        case 'Line':
          iconElement = <FaLine size={30} />;
          break;
        default:
          break;
      }
      return {
        ...node,
        iconElement,
      };
    });
  }, [data.allSocialJson.nodes]);

  return (
    <footer>
      <div className="relative">
        <div className="fixed bottom-20 right-5 flex flex-col gap-5 z-50">
          {allSocialDataList?.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 hidden md:block"
              whileHover={{
                scale: 1.2,
                opacity: 1,
                transition: { duration: 0.3 },
              }}
            >
              {React.cloneElement(link.iconElement, { className: 'text-primary-900' })}
            </motion.a>
          ))}
          {isVisible && (
            <motion.a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="opacity-80"
              whileHover={{
                scale: 1.2,
                opacity: 1,
                transition: { duration: 0.3 },
              }}
              title="Back to Top"
            >
              <BiArrowToTop size={30} className="text-primary-900" />
            </motion.a>
          )}
        </div>
      </div>
      <div className="container mx-auto">
        <div className="mt-2 md:mb-20 mb-10">
          <hr className="text-neutral-300"></hr>
        </div>
        <div className="flex md:flex-row flex-col gap-8 md:items-center justify-between md:mb-20 mb-10">
          <div className="text-body-md font-light">Copyright © 2022 WY DESIGN</div>
          <div className="flex md:flex-row flex-col md:items-center md:gap-6 gap-4">
            <div className="flex flex-row items-center opacity-70">
              <p className="text-body-sm font-semibold tracking-widest text-neutral-700 pr-4">CONNECT</p>
              <hr className="w-16 text-neutral-700"></hr>
            </div>
            <div className="flex flex-row  items-center gap-6">
              {allSocialDataList?.map((node) => (
                <a href={node.href} key={node.name} target="_blank" rel="noreferrer">
                  <img className="h-10 w-10" src={node.icon.publicURL} alt={node.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
