import React from "react";
import styles from "./CartItem.module.css";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

type CartItemProps = {
  id: number;
  itemName: string;
  type: string;
  addOns: string[];
  sweetness: string;
  quantity: number;
  price: number;
  image: string;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  isSelectMode: boolean;
};

const CartCardItem: React.FC<CartItemProps> = ({
  id,
  itemName,
  type,
  addOns,
  sweetness,
  quantity,
  price,
  image,
  onIncrease,
  onDecrease,
  onRemove,
  isSelectMode,
}) => {
  const router = useRouter();

  const descriptionParts = [];
  if (type) descriptionParts.push(type);
  if (sweetness) descriptionParts.push(sweetness);
  if (addOns.length > 0) descriptionParts.push(addOns.join(", "));

  const description = descriptionParts.join(", ");

  return (
    <div
      className={styles.cartItemContainer}
      onClick={() => router.push(`/descriptionCart/${id}`)}
    >
      <div className={styles.imagePlaceholder}>
        <img src={image} alt={itemName} />
      </div>
      <div className={styles.itemInfo}>
        <h3 className={styles.itemName}>{itemName}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.quantityControl}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDecrease();
            }}
            className={styles.decrementButton}
          >
            -
          </button>
          <span className={styles.quantity}>{quantity}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onIncrease();
            }}
            className={styles.incrementButton}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.itemPrice}>
        {isSelectMode ? (
          <div
            className={styles.removeButton}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <FaTrash className={styles.trashIcon} />
          </div>
        ) : (
          <span>{price * quantity} Baht</span>
        )}
      </div>
    </div>
  );
};

export default CartCardItem;
