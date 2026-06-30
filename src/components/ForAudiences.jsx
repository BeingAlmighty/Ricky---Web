import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function ForAudiences() {
  const riderBenefits = [
    'Convenient Booking: Request a ride directly from your phone in a few taps.',
    'Live Tracking: Track your driver\'s arrival in real time.',
    'Multiple Payment Options: Pay through UPI, cash, or wallets.',
    'Safety Features: Share trip details with family and friends.'
  ]

  const driverBenefits = [
    'Earn More Locally: Get ride requests without roaming around.',
    'Flexible Working Hours: Drive whenever it suits your schedule.',
    'Reliable Daily Opportunities: Connect with local riders.',
    'Technology That Helps: Simple app interface and route support.'
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12">
        
        <div className="bg-surface-light p-10 rounded-3xl border border-gray-100 transition-card">
          <h2 className="text-3xl font-semibold mb-6 tracking-tight">For Riders</h2>
          <p className="text-text-secondary mb-8 font-inter">
            Experience the most convenient way to travel short distances in your neighborhood.
          </p>
          <ul className="space-y-4 mb-10">
            {riderBenefits.map((benefit, i) => {
              const [title, desc] = benefit.split(':')
              return (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-dark">{title}:</span>
                    <span className="text-text-secondary font-inter"> {desc}</span>
                  </div>
                </li>
              )
            })}
          </ul>
          <button className="flex items-center gap-2 font-semibold text-primary hover:text-[#6D28D9] transition-colors group">
            Explore Rider App 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-dark text-white p-10 rounded-3xl premium-shadow relative overflow-hidden transition-card">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

          <h2 className="text-3xl font-semibold mb-6 tracking-tight relative z-10">For Drivers</h2>
          <p className="text-gray-400 mb-8 font-inter relative z-10">
            Join Delhi's growing electric mobility ecosystem and earn more reliably.
          </p>
          <ul className="space-y-4 mb-10 relative z-10">
            {driverBenefits.map((benefit, i) => {
              const [title, desc] = benefit.split(':')
              return (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-accent-green shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-semibold text-white">{title}:</span>
                    <span className="text-gray-400 font-inter"> {desc}</span>
                  </div>
                </li>
              )
            })}
          </ul>
          <button className="relative z-10 flex items-center justify-center gap-3 bg-white text-dark px-6 py-3 rounded-xl transition-all duration-300 font-inter font-medium hover:-translate-y-1 premium-shadow w-full sm:w-auto">
            Become a Driver
          </button>
        </div>

      </div>
    </section>
  )
}
