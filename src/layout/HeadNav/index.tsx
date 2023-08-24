import Router from 'next/router';
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

import styles from './style/index.module.less';
import { usePathname } from 'next/navigation';
import Login from '@/components/Login';

export default function HeadNav() {
  const menuList = [
    { title: '首页', path: '/' },
    { title: '生活分享', path: '/life/' },
    { title: '留言板', path: '/message/' },
    { title: '关于我', path: '/about/' },
  ];

  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Hello,I am Benjamin', 'Welcome !'],
      typeSpeed: 50,
    });
    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  const menuClick = (path: string) => {
    Router.push(path);
  };

  const pathName = usePathname();  
    
  return (
    <div className={styles.headerWrap}>
      {/* 导航区域 */}
      <div className={styles.headNav}>
        {/* <div className={styles.logo}>搜索|LOGO区域</div> */}
        <img
          src={'/assets/images/logo.png'}
          alt=""
          className={`${styles.logo}`}
        />
        <div className={styles.navBar}>
          {menuList.map((item) => {
            return (
              <div
                key={item.path}
                className={`${styles.menuItem} ${
                  pathName===item.path ? styles.active : ''
                }`}
                onClick={() => menuClick(item.path)}
              >
                {item.title}
              </div>
            );
          })}
          <Login className={styles.menuItem}></Login>
        </div>
      </div>
      {/* 打字机区域 */}
      <div ref={el} className={styles.typeIntro} />
    </div>
  );
}
