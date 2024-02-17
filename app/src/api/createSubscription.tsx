import type { Stripe } from 'stripe';

const PAYMENT_ENDPOINT = `${import.meta.env.VITE_API_ENDPOINT}/create_subscription`;

export const createSubscription = async (
  code: string,
  email: string,
): Promise<Stripe.Checkout.Session> => {
  const response = await fetch(PAYMENT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subscription: code, email }),
  });

  if (response.ok) {
    const checkoutSession = await response.json();
    return checkoutSession as Stripe.Checkout.Session;
  } else {
    throw new Error('Oops, Failed to create subscription link');
  }
};
