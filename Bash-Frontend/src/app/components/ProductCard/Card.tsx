"use client";
import React, { useState } from "react";
import styles from "./Card.module.css";
import Link from "next/link";

interface CardProps {
  id: number | string;
  name: string;
  description: string;
  hotPrice: string | number;
  coldPrice: string | number;
  category: string;
  TypeOfDrinks: string;
  isRecommended: boolean;
  image: string;
}

const Card: React.FC<CardProps> = ({
  id,
  name,
  description,
  hotPrice,
  coldPrice,
  category,
  TypeOfDrinks,
  isRecommended,
  image,
}) => {
  const truncatedDescription = (description || "").length > 50
  ? description.substring(0, 50) + "..."
  : description || "";

      const displayPrice = () => {
        if (hotPrice !== "-" && coldPrice !== "-") {
          return (
            <div>
              <span>{hotPrice}.-  </span> | <span>{coldPrice}.- </span>
            </div>
          );
        } else if (hotPrice !== "-") {
          return <span>{hotPrice}.- </span>;
        } else if (coldPrice !== "-") {
          return <span>{coldPrice}.- </span>;
        } else {
          return <span>Price not available</span>;
        }
      };

  return (
    <main>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=ADLaM+Display&family=Montserrat:wght@400;700&display=swap"
      />
    <div className={styles.card} id="Card">
      <Link href={`/description/${id}`}>
        <img src={image} alt={name} className={styles.cardImage} />
        <h3 className={styles.cardTitle} id="CardTitle">
          {name}
          {isRecommended && (
            <span role="img" aria-label="thumbs up">
              {" "}
              👍
            </span>
          )}
        </h3>
        <p className={styles.cardDescription}>{truncatedDescription}</p>
        <div className={styles.cardPrice}>{displayPrice()}</div>
        <div className={styles.cardAddToCart}>
          <button id="Addbtn">+</button>
        </div>
      </Link>
    </div>
    </main>
  );
};

export default Card;
