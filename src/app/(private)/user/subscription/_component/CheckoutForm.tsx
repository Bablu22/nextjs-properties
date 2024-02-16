"use client";

import React, { useState } from "react";
import { SubscriptionPlan } from "./SubscriptionPlans";
import { Modal, Button, message } from "antd";
import {
  useStripe,
  useElements,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import { saveSubscription } from "@/actions/subscription";
import { useRouter } from "next/navigation";

interface Props {
  plan: SubscriptionPlan;
  showCheckoutForm: boolean;
  setShowCheckoutForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckoutForm = ({
  plan,
  showCheckoutForm,
  setShowCheckoutForm,
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleOk = async () => {
    try {
      setLoading(true);
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/user/account",
        },
        redirect: "if_required",
      });
      if (result.error) {
        message.error(result.error.message);
        setLoading(false);
      } else {
        setShowCheckoutForm(false);
        message.success("Payment successful");
        await saveSubscription({
          paymentId: result.paymentIntent.id,
          plan,
        });
        message.success("Subscription purchased successfully");
        router.push("/user/account");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCheckoutForm(false);
  };

  return (
    <Modal
      title={`Checkout - ${plan.name} Plan`}
      open={showCheckoutForm}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          loading={loading}
          key="submit"
          type="primary"
          onClick={handleOk}
        >
          Pay Now
        </Button>,
      ]}
    >
      <PaymentElement />
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["US"],
        }}
      />
    </Modal>
  );
};

export default CheckoutForm;
