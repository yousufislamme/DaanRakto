import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 border-t border-gray-300">
      <div className="container mx-auto px-6 md:px-12 flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-xl font-bold mb-2">Blood Donation</h3>
          <p className="text-gray-600">
            Save lives by donating blood. Your donation can make a difference!
          </p>
        </div>

        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
          <ul>
            <li className="mb-1">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/donate" className="text-gray-600 hover:text-gray-900">
                Donate Blood
              </Link>
            </li>
            <li className="mb-1">
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/3">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <ul className="flex space-x-4">
            <li>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                Twitter
              </Link>
            </li>
            <li>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-6 pt-4 border-t border-gray-300">
        <p className="text-gray-600">
          © {new Date().getFullYear()} Blood Donation. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
