"use server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const GetStripeScret = async (amount: number) => {
  try {
    const paymentIndent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description: "Payment for Next Properties ",
    });
    return {
      clientSecret: paymentIndent.client_secret,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
