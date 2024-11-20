import React, { useState } from "react";
import { IoCopyOutline, IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import styles from "./QRCodeModal.module.css";
// const baseURL = "http://10.34.112.130:3030/";
const baseURL = process.env.NEXT_PUBLIC_ROOT_URL;
// const baseURL = "http://localhost:3030";
interface QRCodeModalProps {
  amount: number;
  phoneNumber?: string;
  memberInfo?: any;
  cartItems?: any[];
  promotion?: string;
  onClose?: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
  amount,
  phoneNumber,
  memberInfo,
  cartItems,
  promotion,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { setCartItems } = useCart();

  const handleModalOpen = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
    onClose?.();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(amount.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchRecordHistory = async () => {
    try {
      const response = await fetch(`${baseURL}/record`);
      if (response.ok) {
        const data = await response.json();
        console.log("Record history:", data);
      } else {
        throw new Error("Failed to fetch record history");
      }
    } catch (error) {
      console.error("Error fetching record history:", error);
    }
  };

  const handleCompletePayment = async () => {
    console.log("Complete Payment");
    // Add points to the member
    if (memberInfo) {
      try {
        const response = await fetch(`${baseURL}/member/add-points`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            MID: memberInfo.MID,
            points: 1,
          }),
        });
        if (response.ok) {
          // Points added successfully
          console.log("Membership points updated");
        } else {
          throw new Error("Failed to update membership points");
        }
      } catch (error) {
        console.error("Error adding points to member:", error);
      }
    } else {
      console.log("No member information available");
    }

    // Save the order record
    const customerName = memberInfo ? memberInfo.Mname : "Customer";
    const tel = memberInfo ? memberInfo.Tel : "000-000-0000";

    const menu = (cartItems || []).map((item) => {
      const addOns =
        item.addOns && item.addOns.length > 0 ? item.addOns.join(", ") : "None";

      if (item.category === "Bakery") {
        return [item.itemName, item.price, item.quantity];
      } else {
        return [
          item.itemName,
          item.type || "N/A",
          item.price,
          `Add On: ${addOns}`,
          item.quantity,
        ];
      }
    });

    const orderData = {
      Customer: customerName,
      Tel: tel,
      Menu: menu,
      totalPrice: amount,
      promotion: promotion || "No Promotion",
    };

    if (
      !orderData.Customer ||
      !orderData.Tel ||
      !orderData.Menu ||
      !orderData.totalPrice ||
      !orderData.promotion
    ) {
      console.error("Incomplete order information");
      return;
    }
    try {
      const response = await fetch(`${baseURL}/record`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log("Record has been successfully recorded");
        handleModalClose();
        setCartItems([]);
        router.push("/");
        await fetchRecordHistory();
      } else {
        throw new Error("Failed to save record");
      }
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  // Format PromptPay ID
  const formattedPhoneNumber = phoneNumber?.replace(/\D/g, "") || "";

  // Generate QR code URL
  const qrCodeUrl = `https://promptpay.io/${formattedPhoneNumber}/${amount.toFixed(2)}`;

  return (
    <>
      <button onClick={handleModalOpen} className={styles.generateButton}>
        Make a payment
      </button>

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>PromptPay QR Code</h3>
              <button onClick={handleModalClose} className={styles.closeButton}>
                <IoCloseOutline size={24} />
              </button>
            </div>

            <div className={styles.contentWrapper}>
              <div className={styles.qrCodeContainer}>
                <img
                  src={qrCodeUrl}
                  alt="PromptPay QR Code"
                  className={styles.qrCode}
                />
              </div>

              <div className={styles.amountContainer}>
                <div className={styles.amountInfo}>
                  <span className={styles.label}>Amount</span>
                  <span className={styles.amount}>฿{amount.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCopyAmount}
                  className={styles.copyButton}
                  aria-label="Copy amount"
                >
                  {copied ? (
                    <span className={styles.copiedText}>Copied!</span>
                  ) : (
                    <IoCopyOutline size={20} />
                  )}
                </button>
              </div>

              <div className={styles.recipientContainer}>
                <span className={styles.label}>Recipient</span>
                <p className={styles.recipientId}>{phoneNumber}</p>
              </div>

              <div className={styles.instructions}>
                <p>1. Open your banking app</p>
                <p>2. Scan this QR code</p>
                <p>3. Verify the amount and recipient</p>
                <p>4. Complete the payment</p>
              </div>

              <button
                onClick={handleCompletePayment}
                className={styles.completePaymentButton}
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QRCodeModal;
