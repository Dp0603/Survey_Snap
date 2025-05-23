import React from "react";
import "../styles/Pricing.css";
import { useToast } from "../../contexts/ToastContext";

const Pricing = () => {
  const { showToast } = useToast();

  const handlePayment = async (amount, plan) => {
    try {
      const res = await fetch("http://localhost:3000/payment/create_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          receipt: `receipt_order_${Math.random().toString(36).substring(7)}`,
        }),
      });

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_REACT_APP_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "SurveySnap",
        description: `SurveySnap ${plan} Plan`,
        order_id: order.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(
              "http://localhost:3000/payment/verify_order",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...response,
                  customer_email: "pateldevam100@gmail.com", 
                  amount: order.amount, 
                }),
              }
            );

            const result = await verifyRes.json();

            if (result.status === "success") {
              showToast(
                "🎉 Payment Successful! Confirmation sent via email.",
                "success"
              );
            } else {
              showToast("⚠️ Payment verification failed.", "error");
            }
          } catch (err) {
            showToast("⚠️ Could not verify payment.", "error");
          }
        },
        prefill: {
          name: "Dp",
          email: "pateldevam100@gmail.com",
          contact: "9999999999",
        },
        theme: { color: "#1976d2" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment Error:", error);
      showToast("❌ Payment failed. Please try again.", "error");
    }
  };

  return (
    <section id="pricing" className="pricing-section">
      <h2 className="pricing-title">Pricing</h2>
      <div className="pricing-cards">
        <div className="pricing-card">
          <h3>Basic</h3>
          <p>Perfect for individuals and small teams.</p>
          <p className="pricing-price">₹199/month</p>
          <button
            className="pricing-cta"
            onClick={() => handlePayment(199, "Basic")}
          >
            Get Started
          </button>
        </div>

        <div className="pricing-card">
          <h3>Pro</h3>
          <p>For growing businesses and advanced features.</p>
          <p className="pricing-price">₹499/month</p>
          <button
            className="pricing-cta"
            onClick={() => handlePayment(499, "Pro")}
          >
            Get Started
          </button>
        </div>

        <div className="pricing-card">
          <h3>Enterprise</h3>
          <p>Custom solutions for large organizations.</p>
          <p className="pricing-price">Contact Us</p>
          <button className="pricing-cta">Contact Sales</button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
