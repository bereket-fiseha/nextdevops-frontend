
import { formatAmountForStripe } from '../../../libs/stripe-helpers'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
})

export default async function handler(
  req,
  res
) {
  if (req.method === 'POST') {
    const amount = req.body.amount
    const proposalId = req.body.proposalId
    const quoteId = req.body.quoteId
    try {

      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'Shipper Checkout',
            amount: formatAmountForStripe(amount, 'usd'),
            currency: 'usd',
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/QuotesReceivedShipper?session_id={CHECKOUT_SESSION_ID}&proposalId=${proposalId}&quoteId=${quoteId}`,
        cancel_url: `${req.headers.origin}/QuotesReceivedShipper`,
      }
      const checkoutSession =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
