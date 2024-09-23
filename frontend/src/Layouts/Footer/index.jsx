import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 bg-slate-100">
      <div className="container mx-auto px-6">
        {/* Upper Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-6">
          {/* Logo and Links */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} className="w-auto h-10" alt="logo" />
              <span className="ml-2 text-lg font-semibold text-gray-800">
                Bring Food!
              </span>
            </Link>
            <nav className="flex flex-col gap-2 text-gray-600">
              <a href="#" className="hover:text-gray-900">
                About Us
              </a>
              <a href="#" className="hover:text-gray-900">
                Contact Us
              </a>
              <a href="#" className="hover:text-gray-900">
                Careers
              </a>
              <a href="#" className="hover:text-gray-900">
                Help
              </a>
              <a href="#" className="hover:text-gray-900">
                Sitemap
              </a>
            </nav>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-gray-600">
              <a href="#" className="hover:text-gray-900">
                Order Now
              </a>
              <a href="#" className="hover:text-gray-900">
                Offers
              </a>
              <a href="#" className="hover:text-gray-900">
                Gift Cards
              </a>
              <a href="#" className="hover:text-gray-900">
                Partner with Us
              </a>
            </nav>
          </div>

          {/* Contact & Subscribe */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-gray-800">Contact Us</h3>
            <p className="text-gray-600">
              123 Food Street, Suite 456 <br />
              Cityname, Country 78910 <br />
              Phone: (123) 456-7890 <br />
              Email: support@bringfood.com
            </p>

            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
              <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Lower Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-300 pt-4">
          <p className="text-gray-500">
            © 2022 Bring Food. All rights reserved.
          </p>
          <ul className="flex space-x-4 text-gray-600 mt-4 lg:mt-0">
            <li>
              <a href="#" className="hover:text-gray-900">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-900">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
