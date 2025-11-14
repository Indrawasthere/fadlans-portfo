"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./page-transition.module.css";

export default function PageTransition() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const timer = setTimeout(() => setActive(false), 400); // durasi glitch
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={`${styles.transition} ${active ? styles.active : ""}`}></div>
  );
}
