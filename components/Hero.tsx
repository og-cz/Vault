import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-300 rounded-full filter blur-3xl"></div>
      </div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          <h2 className="mb-6">Discover the Latest Tech Gadgets</h2>
          <p className="mb-8 text-blue-100 text-xl">
            Explore cutting-edge technology and innovation. From smartphones to smart homes, find the perfect gadget for your lifestyle.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}