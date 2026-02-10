export function Footer() {
  return (
    <footer className="bg-black border-t border-red-900/50 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl text-white tracking-widest font-medium">VAULT</h2>
            <p className="text-gray-500 text-sm tracking-wide">
              "Our business is security of life itself..."
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white mb-6 uppercase tracking-widest text-sm">Quick Links</h3>
            <ul className="space-y-3 text-sm tracking-wide">
              <li><button className="text-red-600 font-medium uppercase">Home</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors uppercase">About Us</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors uppercase">Upload</button></li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-white mb-6 uppercase tracking-widest text-sm">Contact Us</h3>
            <div className="space-y-4 text-sm tracking-wide text-gray-400">
              <p>Do you have any queries or suggestions?</p>
              <a href="mailto:yourinfo@gmail.com" className="block text-gray-300 hover:text-red-600 underline decoration-gray-600 underline-offset-4 transition-colors">
                yourinfo@gmail.com
              </a>
              <div className="pt-2">
                <p>If you need support? Just give us a call.</p>
                <a href="tel:+5511122233344" className="block text-white hover:text-red-600 underline decoration-white underline-offset-4 transition-colors mt-1">
                  +55 111 222 333 44
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-red-900/50 pt-8"></div>
      </div>
    </footer>
  );
}