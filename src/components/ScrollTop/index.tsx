import React, { useState, useEffect } from 'react';
import styles from './style/index.module.less';
import { UpOutlined } from '@ant-design/icons';
const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  };

  return (
    <button
      className={`${styles.scrollToTopButton} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
    >
      <UpOutlined />
    </button>
  );
};

export default ScrollToTopButton;
