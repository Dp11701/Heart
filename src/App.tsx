import React from 'react';
import './styles/App.css';
import IntroScreen from "./screens/IntroScreen";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {InAppPurchaseScreen} from "./screens/IAP/InAppPurchaseScreen";
import {PaymentSuccess} from "./screens/Payment/PaymentSuccess";
import {FinalSuccessScreen} from "./screens/FinalSuccessScreen";
import PaymentResultScreen from "./screens/Payment/PaymentResultScreen";
import {FinalSuccessPaymentCancelScreen} from "./screens/FinalSuccessPaymentCancelScreen";


function App() {
    
    return (
      <Router>
          <Routes>
              <Route path="/purchase" element={
                  <InAppPurchaseScreen />
              }
              />
              <Route path="/welcome" element={<IntroScreen />} />
              <Route path="/:locale/welcome" element={<IntroScreen />} />

              <Route path="/payment-result" element={<PaymentResultScreen />} />
              <Route path="/payment-success" element={<PaymentSuccess/>} />
              <Route path="/payment-cancel" element={<span>Payment Cancel</span>} />

              <Route path="/success" element={<FinalSuccessScreen/>} />
              <Route path="/success-payment-cancel" element={<FinalSuccessPaymentCancelScreen/>} />
              <Route path="*" element={<Navigate to="/welcome" replace />} />
          </Routes>
      </Router>
  );
}

export default App;
