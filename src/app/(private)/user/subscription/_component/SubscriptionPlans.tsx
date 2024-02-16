"use client";

import { Card, Button, message } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { GetStripeScret } from "@/actions/payment";
import CheckoutForm from "./CheckoutForm";
import { Subscription } from "@prisma/client";

export type SubscriptionPlan = {
  name: string;
  price: number;
  propertiesLimit: number;
  imagePerProperties: number;
  features: string[];
};

interface Props {
  plan: SubscriptionPlan;
  subscription: any;
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const SubscriptionPlans = ({ plan, subscription }: Props) => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const getClientSecret = async () => {
    try {
      setLoading(true);
      const response = await GetStripeScret(plan.price);
      if (response.error) throw new Error(response.error);
      setClientSecret(response.clientSecret);
      setShowCheckoutForm(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const isSelected =
    subscription?.plan?.name === plan.name ||
    (!subscription && plan.name === "Basic");

  return (
    <>
      <Card
        bordered={false}
        className={`border border-solid border-gray-200 ${
          isSelected ? "border-blue-500 border border-solid" : ""
        }`}
      >
        <h2 className="text-xl font-bold mb-4">{plan.name} Plan</h2>
        <p className="text-gray-600 mb-4">Price: ${plan.price}/month</p>
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Features:</h3>
          <ul className="list-disc pl-6">
            {plan.features.map((feature, index) => (
              <li key={index} className="text-sm">
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-600">
          Properties Limit: {plan.propertiesLimit}
        </p>
        <p className="text-gray-600">
          Image per Property: {plan.imagePerProperties}
        </p>
        <Button
          onClick={getClientSecret}
          loading={loading}
          block
          disabled={isSelected}
          type="primary"
          className="mt-4"
        >
          {isSelected ? "Active Plan" : "Buy Now"}
        </Button>
      </Card>
      {showCheckoutForm && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <CheckoutForm
            plan={plan}
            showCheckoutForm={showCheckoutForm}
            setShowCheckoutForm={setShowCheckoutForm}
          />
        </Elements>
      )}
    </>
  );
};

export default SubscriptionPlans;
