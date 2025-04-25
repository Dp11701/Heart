import React from 'react';
import './styles/App.css';
import IntroScreen from "./screens/IntroScreen";
import {Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {InAppPurchaseScreen} from "./screens/IAP/InAppPurchaseScreen";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {PaymentSuccess} from "./screens/Payment/PaymentSuccess";
import {FinalSuccessScreen} from "./screens/FinalSuccessScreen";
const stripePromise = loadStripe('pk_test_51LLeAVGdp6dTWxMQILOmuwfXPYkYism4T6GskazsWMBijahZDTZJleozuyHyBD6RKG3wX6l3Nv341fq33fjN7BU200W1NfU2mA');

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/purchase" element={
                  <Elements stripe={stripePromise}>
                  <InAppPurchaseScreen />
                  </Elements>
              }
              />
              <Route path="/welcome" element={<IntroScreen />} />
              <Route path="/payment-success" element={<PaymentSuccess/>} />
              <Route path="/success" element={<FinalSuccessScreen/>} />
=             <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
      </Router>
  );
}

export default App;
