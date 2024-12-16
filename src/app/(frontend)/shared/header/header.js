import React, { useState, useEffect, useRef } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { motion } from 'motion/react';
import { Collapse } from 'flowbite';

import Button from '@/components/button';
import Logo1 from '@/images/logos/wy-logo-3.png';
import Logo2 from '@/images/logos/wy-logo-4.png';
import { cn } from '@/utils/class-names';

const Header = () => {
  const navigation = [{ name: 'Portfolio', href: '/portfolio' }];
  const mobileNavigation = [
    { name: 'Portfolio / 作品集', href: '/portfolio' },
    { name: 'Contact Us / 聯絡我們', href: '/contact' },
  ];
  const [isMobile, setIsMobile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const collapseRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const $targetEl = document.getElementById('targetEl');
      const $triggerEl = document.getElementById('triggerEl');
      collapseRef.current = new Collapse($targetEl, $triggerEl, {}, { id: 'targetEl', override: true });
    }
  }, []);

  return (
    <header>
      <div className="container mx-auto">
        <nav className="bg-transparent px-0 py-2.5 md:my-3">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 px-0">
            <a href="/" className="flex flex-nowrap">
              <img src={Logo1} height="48" className="h-12 sm:h-16" alt="WY Design Logo" />
              <img src={Logo2} height="48" className="h-12 sm:h-16" alt="WY Design Logo" />
            </a>
            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => collapseRef.current?.collapse()}
                  >
                    <IoClose id="triggerEl" className={cn('h-8 w-8 text-primary-600')} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => collapseRef.current?.expand()}
                  >
                    <IoMenu id="triggerEl" className={cn('h-8 w-8 text-primary-600')} />
                  </motion.div>
                )}
              </motion.div>
            </button>
            <div id="targetEl" className="hidden w-full md:block md:w-auto">
              <ul
                className={cn(
                  'text-body-md md:text-body-xl font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg',
                  'md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0',
                )}
              >
                {(isMobile ? mobileNavigation : navigation).map((item) => (
                  <li key={`menu-${item.name}`}>
                    <a
                      href={item.href}
                      className="mt-2 md:hover:scale-110 block py-2 px-3 rounded md:bg-transparent text-neutral-700 md:hover:text-primary-600 md:p-0"
                      aria-current="page"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                {!isMobile && <Button label="CONTACT US" link="/contact" />}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
