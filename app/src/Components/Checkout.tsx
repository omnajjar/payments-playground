import { useState } from 'react';
import { SubscriptionsPlansTable } from './SubscriptionsPlansTable';

export const Checkout: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <>
      <h3>Choose your Plan:</h3>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="please enter your email address"
        aria-label="Email"
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <SubscriptionsPlansTable customerEmail={email} />
    </>
  );
};
