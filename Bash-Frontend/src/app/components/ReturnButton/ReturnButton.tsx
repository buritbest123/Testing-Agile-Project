import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";
import styles from "./ReturnButton.module.css";

const ReturnButton: React.FC = () => {
  const router = useRouter();

  return (
    <main>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Montserrat:wght@400;700&display=swap"
      />
      <div className="px-4 flex items-center py-4 mt-2">
        <a onClick={() => router.back()} className={styles.returnButton}>
          <span className={styles.iconText}>
            <AiOutlineLeft /> <p className="font-adlam"> Return</p>
          </span>
        </a>
      </div>
    </main>
  );
};

export default ReturnButton;