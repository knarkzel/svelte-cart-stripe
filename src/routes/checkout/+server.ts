import { stripe } from "../stripe";
import type { RequestHandler } from "@sveltejs/kit";
import type { CartItem } from "../cart";
import { env } from "$env/dynamic/private";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const cartItems: CartItem[] = data.items;

  // Create session for redirecting users
  const lineItems = cartItems.map((item) => {
    return {
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name,
          images: [],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.amount,
    };
  });

  // Create session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    shipping_address_collection: {
      allowed_countries: ["NO"],
    },
    mode: "payment",
    success_url: `${env.BASE}/success`,
    cancel_url: `${env.BASE}/cancel`,
    phone_number_collection: {
      enabled: true,
    },
  });

  return new Response(
    JSON.stringify({
      url: session.url,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};
