import React, { useEffect, useState } from 'react';

import styles from './style/index.module.less';

export default function Footer() {
  const [years, setYears] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const startTime = Number(new Date('2023-08-15')); // 设置博客开始时间
    const interval = setInterval(() => {
      const currentTime = Number(new Date());
      const diff = currentTime - startTime;

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24),
      );
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setYears(years);
      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.footer}>
      <span>Copyright © 2023 皖ICP备2023001984号</span>
      <span>{`博客已运行${years}年${days}天${hours}小时${minutes}分钟${seconds}秒`}</span>
    </div>
  );
}
