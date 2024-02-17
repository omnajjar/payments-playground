import { useState } from 'react';
import { Bounce, ToastOptions, toast } from 'react-toastify';
import { createSubscription } from '../api/createSubscription';

const PLANS = [
  {
    title: 'Silver 🥈',
    code: 'SILVER',
    price: 'AED 99',
    ctaCaption: 'Select Silver Plan',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    title: 'Gold 🥇',
    code: 'GOLD',
    price: 'AED 250',
    ctaCaption: 'Select Gold Plan',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
  {
    title: 'Diamond 💎',
    code: 'DIAMOND',
    price: 'AED 500',
    ctaCaption: 'Select Diamond Plan',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
  },
];

const commonToastOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  transition: Bounce,
};

interface SubscriptionsPlansTableProps {
  customerEmail: string;
}

export const SubscriptionsPlansTable: React.FC<
  SubscriptionsPlansTableProps
> = ({ customerEmail }) => {
  const onPlanSelected = async (planCode: string) => {
    if (!customerEmail || customerEmail.trim().length == 0) {
      toast.error('Please enter a valid email', commonToastOptions);
      return;
    }

    try {
      const checkoutSession = await createSubscription(planCode, customerEmail);

      if (checkoutSession && checkoutSession.url) {
        window.open(checkoutSession.url);
      } else {
        toast.error(
          'Oops, Failed to create subscription link',
          commonToastOptions,
        );
      }
    } catch (error: unknown) {
      const message = (error as Error).message || 'Oops something went wrong';

      toast.error(message, commonToastOptions);
    }
  };

  return (
    <div className="flex flex-column flex-items-center">
      <div className="grid w-full">
        {PLANS.map(({ title, description, ctaCaption, code, price }) => (
          <Plan
            key={code}
            title={title}
            description={description}
            ctaCaption={ctaCaption}
            onPlanSelected={onPlanSelected}
            planCode={code}
            price={price}
          />
        ))}
      </div>
    </div>
  );
};

interface PlanProps {
  title: string;
  description: string;
  ctaCaption: string;
  onPlanSelected: (planCode: string) => Promise<void>;
  planCode: string;
  price: string;
}

function Plan({
  title,
  description,
  ctaCaption,
  planCode,
  onPlanSelected,
  price,
}: PlanProps) {
  const [loading, setLoading] = useState(false);

  const handlePlanSelected = () => {
    setLoading(true);
    onPlanSelected(planCode).finally(() => setLoading(false));
  };

  return (
    <article className="borders p-15">
      <h5 className="text-center">{`${title} (${price})`}</h5>
      <hr />
      <p>{description}</p>
      <hr />
      <div className="flex flex-justify-center mb-10">
        <button
          {...(loading ? { 'aria-busy': 'true' } : {})}
          style={{ minWidth: '230px' }}
          className="secondary"
          onClick={handlePlanSelected}
        >
          {ctaCaption}
        </button>
      </div>
    </article>
  );
}
