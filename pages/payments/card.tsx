import React, { FC } from "react";
import CardPaymentForm from "../../components/payments/CardPaymentForm";
import withAuth from "../../helpers/withAuth";

const Card: FC = () => {
  return (
    <>
      <div className="split left">
        <div className="centered">
          <div className="card">
            <div className="card--sale">
              <div>
                <h1>Resumen de venta</h1>
              </div>
              <div>
                <h1>Cinemex Universidad</h1>
              </div>
              <div>
                <h1>Concepto</h1>
              </div>
              <div>
                <h1>Venta</h1>
              </div>
              <div>
                <h1>Propina</h1>
              </div>
              <div>
                <h1>Total</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="split right">
        {/* <div className="card"> */}
        <CardPaymentForm />
        {/* </div> */}
      </div>
    </>
  );
};

export default withAuth(Card);
