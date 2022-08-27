const dollarsToCents = require('dollars-to-cents');

const stripe = require('stripe')(
  'sk_test_51K7hf7FFI7cfnoeesIAPbmXvBPX2fDyeH4QNAQZtGH1efIPHyJuDtVSZ1DnbAdCWj9wfqFE33XQof1N7WiOZuRlZ00GiSGLP6u'
);

const createPaymentIntent = async ({ body: { amount } }, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: dollarsToCents(amount),
      currency: 'eur',
      payment_method_types: ['card'],
    });

    return res.status(200).send({
      paymentIntent,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createPaymentIntent,
};
