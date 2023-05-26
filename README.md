# Chipdeals Mobile Money Api - Javascript

Learn how to simply integrate mobile money payment on your website directly in your html.

- The full http doc is here -> https://www.chipdeals.me/docs
- Chipdeals website is here -> https://www.chipdeals.me

## Requirement

You only need to have basics knowledge in Html and Css. If you Know Javascript, it is good but not required to make great things.

## Demo

You can see the [demo page](https://rawcdn.githack.com/Chipdeals/mobile-money-api-Javascript/1.8.3/demo/index.html) of what you will be able to make

## Integrating the widget is very simple

### 1. Api Key

[Contact Us](https://www.chipdeals.me/contact) and get an api key to perform chipdeals requests

But you can use the test apiKey to start now.

Test ApiKey: ` ` test_FOdigzgSopV8GZggZa89 ` `

### 2. Include script

#Add these payment libraries to your script section. It is either in your head tags or at the end of your body tag

```html
<script
  src="https://cdn.jsdelivr.net/gh/Chipdeals/mobile-money-api-Javascript@1.8.3/lib.min.js"
  apiKey="test_FOdigzgSopV8GZggZa89"
  successfulRedirection="https://chipdeals.me/mobile-money"
></script>
```

- The attribute `src` is the Url of the payment library script you are including
- The attribute `apiKey` is the apiKey we got in previous step
- The attribute `successfulRedirection` is optional. It contain an url where you want your users to be redirected after they payed

### 3. Add Payment Button

Add this payment button to your code.

The Button must contain class `chipdeals-button` to allow our script to find it and add click listener.

```html
<button class="chipdeals-button" amount="3000">Pay 3000 XOF</button>
```

### 4. Congratulation

When you click your button, Chipdeals payment widget will appear and users can perform transactions simply.

You can do more, and [customize your payment](#customize-payment)

### Payment Customization

Most customization you want to do is available via attributes you can add or remove to payment `button`

Customization List:

| attributes     | Required? | meaning                                                                                                                                                                                          |
| -------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amount`       | Yes       | The amount you want user to pay                                                                                                                                                                  |
| `currency`     | No        | The currency of the amount. Default is `XOF`                                                                                                                                                     |
| `img`          | No        | Url of the product you want user to pay for                                                                                                                                                      |
| `name`         | No        | The name of the product you want user to pay for                                                                                                                                                 |
| `addFeeToUser` | No        | If you add this attribute to your button, we will calculate the payment fees on the amount the user will pay. Ex if fees are `2%` we will ask user to pay `1020 XOF` for an amount of `1000 XOF` |

#### Samples

##### Currency

```html
<button class="chipdeals-button" amount="3000" currency="XOF">Pay Now</button>
```

##### Image

```html
<button
  class="chipdeals-button"
  amount="3000"
  img="https://chipdeals.me/images/icon_chipdeal.png"
>
  Pay Now
</button>
```

##### Name

```html
<button
  class="chipdeals-button"
  amount="3000"
  name="The best product you can imaginate"
>
  Pay Now
</button>
```

##### Fees to user

```html
<button class="chipdeals-button" amount="3000" addFeeToUser>Pay Now</button>
```

### Advanced Usage

In your javascript code, you can add handlers to catch transaction state changing events.

#### Payment Succeeded Event

You can add a handler to get your code executed as soon as user pay successfully.

You need to listen the event `chipdealsPaymentSucceeded` on `document` .

##### Success payment listener sample

```javascript
document.addEventListener("chipdealsPaymentSucceeded", (event) => {
  console.log(event.detail.description);
  console.log(event.detail);
  /* event.detail
  {
    "status": "success",
    "message": "Successfully processed transaction",
    "title": "Paiement effectué",
    "description": "Paiement a réussi",
    "code": 200,
    "fullTransaction": {
      "reference": "t-66a7879b-2af5-442c-b2ea-caa201c4a039",
      "senderPhoneNumber": "22951010580",
      "senderCountryCode": "BJ",
      "senderOperator": "MTN",
      "senderFirstName": "Dougbe",
      "senderLastName": "Dougbe",
      "status": "success",
      "statusMessage": "Successfully processed transaction",
      "statusMessageCode": 200,
      "startTimestampInSecond": 1685073059,
      "endTimestampInSecond": 1685073071,
      "originalCurrency": "USD",
      "originalAmount": 8,
      "currency": "XOF",
      "amount": 4893,
      "transactionType": "payment",
      "operatorReference": ""
    }
  }
*/
});
```

#### Payment Failed Event

You can add a handler to get your code executed when payment failed.

You need to listen the event `chipdealsPaymentFailed` on `document` .

##### Failed payment listener sample

```javascript
document.addEventListener("chipdealsPaymentFailed", (event) => {
  console.log(event.detail.description);
  console.log(event.detail);
  /* event.detail
  {
    "status": "error",
    "message": "Payer’s payment account balance is low",
    "title": "Paiement non effectué",
    "description": "Vous avez un solde insuffisant pour ce paiement. Réessayez dès que possible",
    "code": 460,
    "fullTransaction": {
      "reference": "t-2bdad088-b563-41ab-90c9-7ebd8988d2ef",
      "senderPhoneNumber": "22951010460",
      "senderCountryCode": "BJ",
      "senderOperator": "MTN",
      "senderFirstName": "Euler",
      "senderLastName": "Dougbe",
      "status": "error",
      "statusMessage": "payer's balance is low",
      "statusMessageCode": 460,
      "startTimestampInSecond": 1685072964,
      "endTimestampInSecond": 1685072972,
      "originalCurrency": "USD",
      "originalAmount": 8,
      "currency": "XOF",
      "amount": 4893,
      "transactionType": "payment",
      "operatorReference": ""
    }
  }
  */
});
```

#### Payment Updated Event

You can add a handler to get your code executed as soon as payment state change.

You need to listen the event `chipdealsPaymentUpdated` on `document` .

##### State changed listener sample

```javascript
document.addEventListener("chipdealsPaymentUpdated", (event) => {
  console.log(event.detail.description);
  console.log(event.detail);
  /* event.detail
  {
    "status": "pending",
    "message": "Data are validated, payment server is working",
    "title": "Veuillez patientez",
    "description": "Nous initialisons le paiement",
    "code": 203,
    "fullTransaction": {
      "reference": "t-3d465ad1-d620-41b8-8bc8-b59f5f12eb72",
      "senderPhoneNumber": "22951010580",
      "senderCountryCode": "BJ",
      "senderOperator": "MTN",
      "senderFirstName": "Euler",
      "senderLastName": "Dougbe",
      "status": "pending",
      "statusMessage": "Data are validated, server is working",
      "statusMessageCode": 203,
      "startTimestampInSecond": 1685072694,
      "endTimestampInSecond": 0,
      "originalCurrency": "USD",
      "originalAmount": 8,
      "currency": "XOF",
      "amount": 4893,
      "transactionType": "payment",
      "operatorReference": ""
    }
  }
  */
});
```

<br/>

# Contact us

### Call us or write us to [get your apikey](https://www.chipdeals.me/contact) and start getting payment

<br/>

- E-mail: products@chipdeals.me
- Website: https://www.chipdeals.me/contact
- Phone: +22990630401
- Whatsapp: +22990630401

<br/>
<br/>
<br/>
<br/>

#

Copyright (C) 2022 Chipdeals Inc - https://www.chipdeals.me
