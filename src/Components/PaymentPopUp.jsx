import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from "../Components/PaymentPopUp.module.css";
import ExitC from "../Components/ExitC.jsx";
import { useState } from 'react'

function PaymentPopup({ setTrigger }) {
  const [popUp, setPopUp] = useState(false);

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
      setPopUp(true);
      setTrigger(false);
    });
  };

  return (
    <div className={styles.popup}>
            {popUp && <ExitC/>}
                <div className={styles.popupContent}>
                <div className={styles.titles}>
                <button className={styles.closeButton} onClick={() => {setTrigger(false)}}> <label>x</label></button>
                <img className={styles.Logo} alt="Logo" src="/logo copy.png" style={{width: "170px", height:"120px"}}/>
                <div className={styles.Text}>
                    <h1 style={{fontSize:"20px"}}>Contribucion a una Agrupacion</h1>
                    <p style={{fontSize: "1pxx"}}> Seleccione el metodo de pago deseado</p>
                </div>
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
        </div>

  );
}

export default PaymentPopup;
