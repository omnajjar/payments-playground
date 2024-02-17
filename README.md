# Stripe Payments Playground (Subscriptions)

This is a playground show casing how to setup and use [Stripe](https://stripe.com/) subscriptions.

> IMPORTANT NOTE: This showcase assumes that you have a product or service that offers 3 type of plans 'Silver', 'Gold' and 'Diamond' So make sure to define these products in your Stripe dashboard.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

This show case has 2 parts, frontend and backend all using js technologies, as the following:

- The frontend is a react app bootstrapped using [Vite](https://vitejs.dev/) and lives under `app` directory.

- The backend is a nodejs web server built using [Nestjs](https://nestjs.com/) and lives under `service` directory.

> Please refer to the `README.md` file in each part of installation guid.

## Usage

1. Clone the repo.
2. Install frontend dependencies:

```shell
> cd app && npm i
```

3.  Install backend dependencies:

```shell
> cd service && npm i
```

4. Create and fill in `.env` file that holds the required environment variables. Use `.env.example` to get the required keys.

5. Run the server:

```shell
> cd service && npm run start:dev
```

6. Run the app:

```shell
> cd app && npm run dev
```

## Environment Variables (Service)

| Variable Name                        | Description                                                                                                          | Example Value                         |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| HEALTH_CHECK_MESSAGE                 | Health check message to be returned                                                                                  | success                               |
| STRIPE_SECRET_KEY                    | API key for Stripe integration                                                                                       | sk_test_123456789                     |
| SILVER_SUBSCRIPTION_PRICE_ID         | Price id for 'Silver' subscription. To be obtained from Stripe dashboard                                             | price_123456789                       |
| GOLD_SUBSCRIPTION_PRICE_ID           | Price id for 'Gold' subscription. To be obtained from Stripe dashboard                                               | price_123456789                       |
| DIAMOND_SUBSCRIPTION_PRICE_ID        | Price id for 'Diamond' subscription. To be obtained from Stripe dashboard                                            | price_123456789                       |
| SERVICE_PAYMENT_SUCCESS_REDIRECT_URL | A redirect url to be used by stripe upon successful subscription                                                     | http://localhost:3000/payment_success |
| SERVICE_PAYMENT_FAIL_REDIRECT_URL    | A redirect url to be used by stripe upon failed subscription                                                         | http://localhost:3000/payment_fail    |
| APP_PAYMENT_SUCCESS_REDIRECT_URL     | A redirect url to be used by our service upon successful subscription to redirect to successful page in our frontend | http://localhost:8080/payment_success |
| APP_PAYMENT_FAIL_REDIRECT_URL        | A redirect url to be used by our service upon failed subscription to redirect to failed page in our frontend         | http://localhost:8080/payment_fail    |
