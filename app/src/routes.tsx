import App from './App';
import { PaymentFailed } from './pages/PaymentFailed';
import { PaymentSuccessful } from './pages/PaymentSuccessful';

export const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/payment_success',
    element: <PaymentSuccessful />,
  },
  {
    path: 'payment_fail',
    element: <PaymentFailed />,
  },
];
