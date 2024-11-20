import React from "react";
import styles from "./PaymentItem.module.css";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type PaymentItemProps = {
  id: number;
  itemName: string;
  type: string;
  addOns: string[];
  sweetness: string;
  quantity: number;
  price: number;
  image: string;
};

const PaymentCardItem: React.FC<PaymentItemProps> = ({
  id,
  itemName,
  type,
  addOns,
  sweetness,
  quantity,
  price,
  image,
}) => {
  const router = useRouter();

  const descriptionParts = [];
  if (type) descriptionParts.push(type);
  if (sweetness) descriptionParts.push(sweetness);
  if (addOns.length > 0) descriptionParts.push(addOns.join(", "));

  const description = descriptionParts.join(", ");

  return (
    <div className={styles.paymentItemContainer}>
      <span className={styles.quantityLabel}>x{quantity}</span>
      <div className={styles.imagePlaceholder}>
        <img src={image} alt={itemName} />
      </div>
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{itemName}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.itemPrice}>
        <span>{price * quantity} Baht</span>
      </div>
    </div>
  );
};

export default PaymentCardItem;
