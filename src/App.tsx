import React, {useEffect} from 'react';
import './styles/App.css';
import IntroScreen from "./screens/IntroScreen";
import {Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {InAppPurchaseScreen} from "./screens/IAP/InAppPurchaseScreen";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {PaymentSuccess} from "./screens/Payment/PaymentSuccess";
import {FinalSuccessScreen} from "./screens/FinalSuccessScreen";
import Modal from "react-modal";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
const stripePromise = loadStripe('pk_test_51LLeAVGdp6dTWxMQILOmuwfXPYkYism4T6GskazsWMBijahZDTZJleozuyHyBD6RKG3wX6l3Nv341fq33fjN7BU200W1NfU2mA');
// "Af3iGcoCsePb8W3OyjwY31zx34uuYhxcqb7j6WQovkWFJMSdCupp_M8tT6dibvi47DN7aDemwJ2L6jHb",
const paypalOptions = {
    clientId: "AQ2E87W6hrPJHTZT4zTdxlZVKcCE1RR7jd7hOgszzNkE95vz5GAPfyDIOyjeiFDUX-exp1uVohQLJSaJ",
    currency: "USD",
    intent: "capture",
};


function App() {

    const supportedLocales = ['en', 'vi'];

    return (
      <Router>
          <Routes>
              <Route path="/purchase" element={
                  <PayPalScriptProvider
                      options={paypalOptions}
                  >
                      <Elements stripe={stripePromise}>
                      <InAppPurchaseScreen />
                      </Elements>
                  </PayPalScriptProvider>
              }
              />
              <Route path="/welcome" element={<IntroScreen />} />
              <Route path="/:locale/welcome" element={<IntroScreen />} />

              <Route path="/payment-success" element={<PaymentSuccess/>} />
              <Route path="/payment-cancel" element={<span>Payment Cancel</span>} />
              <Route path="/success" element={<FinalSuccessScreen/>} />
              <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
      </Router>
  );
}

export default App;
