"use client";

import { useEffect, useState } from "react";
import styles from "./ArcadeLoading.module.css";

export default function ArcadeLoading() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div className={styles.screen}>
      <div className={styles.loader}>
        <div className={styles.pixel}></div>
        <div className={styles.pixel}></div>
        <div className={styles.pixel}></div>
      </div>
      <p className={styles.text}>LOADING…</p>
    </div>
  );
}
