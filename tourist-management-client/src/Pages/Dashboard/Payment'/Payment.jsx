import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { FiLock, FiShield, FiCheckCircle } from "react-icons/fi";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);

const Payment = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-brand-50 ring-1 ring-brand-100 items-center justify-center mb-4">
                    <FiLock className="text-brand-600 text-2xl" />
                </div>
                <h1 className="heading-md">Complete your payment</h1>
                <p className="muted mt-2">Securely confirm your tour with Stripe.</p>
            </div>

            <div className="card-modern p-6 sm:p-8">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-ink-500">
                <span className="inline-flex items-center gap-1.5">
                    <FiShield className="text-brand-500" /> 256-bit encryption
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <FiCheckCircle className="text-brand-500" /> PCI-compliant
                </span>
                <span className="inline-flex items-center gap-1.5">
                    <FiLock className="text-brand-500" /> Powered by Stripe
                </span>
            </div>
        </div>
    );
};

export default Payment;
