// src/app/api/create-payment-intent/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { amount, username } = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "sar",
    metadata: { username },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}