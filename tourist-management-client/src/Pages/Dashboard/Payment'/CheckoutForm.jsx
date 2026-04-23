import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Components/AuthProvider";
import Swal from "sweetalert2";
import { FiCreditCard, FiDollarSign, FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const { data: specificbook = [] } = useQuery({
        queryKey: ['specificbook', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookss/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (specificbook?.price > 0) {
            axiosSecure
                .post('/create-payment-intent', { price: specificbook?.price })
                .then((res) => setClientSecret(res.data.clientSecret));
        }
    }, [axiosSecure, specificbook?.price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (card == null) { setProcessing(false); return; }

        const { error: methodError } = await stripe.createPaymentMethod({ type: 'card', card });
        if (methodError) {
            setError(methodError.message);
            setProcessing(false);
            return;
        }
        setError('');

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message || 'Payment could not be confirmed.');
        } else if (paymentIntent?.status === 'succeeded') {
            setTransactionId(paymentIntent.id);
            axiosSecure.patch(`books/${id}`).then((res) => {
                if (res.data.modifiedCount >= 0) {
                    Swal.fire({
                        title: "Payment successful!",
                        text: "Your tour is confirmed.",
                        icon: "success",
                        confirmButtonColor: "#10b981",
                    });
                }
            });
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Amount */}
            {specificbook?.price > 0 && (
                <div className="p-4 rounded-xl bg-ink-50 ring-1 ring-ink-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-ink-500">Amount due</p>
                        <p className="text-2xl font-bold text-ink-900 flex items-center">
                            <FiDollarSign className="text-brand-500" />
                            {specificbook.price}
                        </p>
                    </div>
                    <div className="badge-success">
                        <FiCheckCircle /> Ready to pay
                    </div>
                </div>
            )}

            <div className="form-group">
                <label className="label-modern flex items-center gap-2">
                    <FiCreditCard className="text-brand-500" /> Card details
                </label>
                <div className="input-modern !py-3">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '15px',
                                    color: '#0f172a',
                                    fontFamily: 'Inter, system-ui, sans-serif',
                                    '::placeholder': { color: '#94a3b8' },
                                },
                                invalid: { color: '#ef4444' },
                            },
                        }}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe || !clientSecret || processing}
                className="w-full btn-primary-modern py-3 text-base"
            >
                {processing ? (
                    <><FiLoader className="animate-spin" /> Processing...</>
                ) : (
                    <>Pay ${specificbook?.price}</>
                )}
            </button>

            {error && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 ring-1 ring-red-200 text-sm text-red-700">
                    <FiAlertCircle className="mt-0.5 flex-shrink-0" /> {error}
                </div>
            )}

            {transactionId && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-50 ring-1 ring-emerald-200 text-sm text-emerald-800">
                    <FiCheckCircle className="mt-0.5 flex-shrink-0" />
                    <span>Transaction ID: <code className="font-mono text-xs">{transactionId}</code></span>
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;
