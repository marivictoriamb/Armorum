import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "../Components/PaymentPopUp.module.css";

function PaymentPopup({ setTrigger }) {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: "10.00",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert("Pago realizado con éxito");
      setTrigger(false);
    });
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <button onClick={() => setTrigger(false)} className={styles.closeBtn}>
          X
        </button>
        <PayPalScriptProvider
          options={{
            "client-id":
              "Ad9nZ0bV62PEdpGYKkYBnwyCfl-G_7_z4_nAjhHHqnZuVhg1HKJlHWPQ3B8tEUDcTQitxOc88mymWKz-",
          }}
        >
          <div className={styles.paypalForm}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          </div>
        </PayPalScriptProvider>
      </div>
    </div>
  );
}

export default PaymentPopup;
