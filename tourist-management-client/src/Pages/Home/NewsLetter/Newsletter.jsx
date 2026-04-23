import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FiMail, FiSend } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      Swal.fire({
        title: 'Subscribed!',
        text: 'You have successfully subscribed to our newsletter.',
        icon: 'success',
        confirmButtonText: 'Great',
        confirmButtonColor: '#10b981',
      });
      setEmail('');
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  return (
    <section className="section-sm bg-white">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-hero shadow-soft-lg">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent-500/20 rounded-full blur-3xl" />

          <div className="relative p-8 sm:p-12 lg:p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 mb-6">
              <FiMail className="text-2xl text-brand-300" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Join our newsletter
            </h2>
            <p className="text-ink-200 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Get destination guides, travel tips, and exclusive offers — straight to your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto"
            >
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-4 focus:ring-brand-500/30"
                />
              </div>
              <button type="submit" className="btn-accent-modern btn-lg-modern flex-shrink-0">
                Subscribe <FiSend />
              </button>
            </form>

            <p className="mt-4 text-xs text-ink-300">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
