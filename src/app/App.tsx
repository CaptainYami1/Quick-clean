import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, ChevronRight, Star, Home, Building2, Snowflake, Droplets, MessageCircle } from 'lucide-react';
import Slider from 'react-slick';
import logo from '../imports/logo.png';
import logo2 from '../imports/Screenshot_2026-04-30_094908.png';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    // Add your Web3Forms Access Key here:
    formData.append("access_key", "82cb3d1f-1f60-4893-812c-fda49012ef0e");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const carouselImages = [
    'https://images.unsplash.com/photo-1758273238594-9a9d6c20eaa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    'https://images.unsplash.com/photo-1758273238795-c284e5ae09b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    'https://images.unsplash.com/photo-1758273238415-01ec03d9ef27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    'https://images.unsplash.com/photo-1604881672497-7a056ebe94e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    'https://images.unsplash.com/photo-1718152423221-0c72ba1a2ee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920'
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    pauseOnHover: false,
    arrows: false
  };

  const services = [
    {
      title: 'House Cleaning',
      description: 'Professional residential cleaning services tailored to your home. From deep cleaning to regular maintenance, we ensure your space is spotless.',
      icon: <Home size={60} className="text-blue-600" />,
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Commercial Cleaning',
      description: 'Comprehensive commercial cleaning solutions for offices, retail spaces, and facilities. Maintain a pristine professional environment.',
      icon: <Building2 size={60} className="text-green-600" />,
      gradient: 'from-green-600 to-green-800'
    },
    {
      title: 'Snow Removal',
      description: 'Reliable snow removal services to keep your property safe and accessible during winter months. Available 24/7 for emergencies.',
      icon: <Snowflake size={60} className="text-blue-500" />,
      gradient: 'from-blue-500 to-cyan-700'
    },
    {
      title: 'Pressure Washing',
      description: 'Expert pressure washing for driveways, decks, siding, and more. Restore your property\'s original beauty and curb appeal.',
      icon: <Droplets size={60} className="text-teal-600" />,
      gradient: 'from-teal-600 to-blue-700'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Homeowner',
      content: 'Quick Clean transformed my home! Their attention to detail is unmatched. Highly recommend their services.',
      rating: 5
    },
    {
      name: 'David Chen',
      role: 'Business Owner',
      content: 'Professional, reliable, and thorough. They\'ve been maintaining our office for over a year now.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'Property Manager',
      content: 'The snow removal service is outstanding. They respond quickly and keep our properties safe all winter.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center py-2 sm:py-3">
            <motion.img
              src={scrolled ? logo : logo2}
              alt="Quick Clean Logo"
              className="h-10 sm:h-12 lg:h-14 drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
            />

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors text-sm lg:text-base ${scrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-green-300 drop-shadow-lg'
                    }`}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-1 ${scrolled ? 'text-gray-700' : 'text-white drop-shadow-lg'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t shadow-lg"
          >
            <div className="px-3 py-3 space-y-1">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-2.5 text-gray-700 hover:text-blue-600 font-medium text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-12 sm:pt-0">
        {/* Image Carousel Background */}
        <div className="absolute inset-0 z-0">
          <Slider {...carouselSettings} className="h-full">
            {carouselImages.map((image, index) => (
              <div key={index} className="relative h-screen">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-green-700/90"></div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-blue-900/30"></div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 sm:mt-0">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Professional Cleaning
            <br />
            <span className="text-green-300">Excellence Delivered</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-lg"
          >
            Transforming spaces with premium cleaning services. Your satisfaction is our guarantee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#contact"
              className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold text-lg hover:bg-green-600 transition-colors inline-flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Free Quote
              <ChevronRight className="ml-2" />
            </motion.a>

            <motion.a
              href="#services"
              className="px-8 py-4 bg-white text-blue-900 rounded-full font-semibold text-lg hover:bg-blue-50 transition-colors shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Services
            </motion.a>
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full z-[2]"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: 0
            }}
            animate={{
              y: [null, Math.random() * -100 - 50],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive cleaning solutions designed to meet all your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                <div className="p-8">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <motion.a
                    href="#contact"
                    className="text-blue-600 font-semibold flex items-center cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    Learn More
                    <ChevronRight size={20} className="ml-1" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10+', label: 'Years Experience' },
              { number: '5000+', label: 'Happy Clients' },
              { number: '24/7', label: 'Available' },
              { number: '100%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Ready to experience the Quick Clean difference? Contact us today for a free quote.
              </p>

              <div className="space-y-6">
                <motion.a
                  href="tel:+12506316899"
                  className="flex items-start cursor-pointer hover:text-blue-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <Phone className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+1 (250) 631-6899</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://wa.me/12506316899?text=Hello%20I%20would%20like%20to%20make%20an%20enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start cursor-pointer hover:text-green-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <MessageCircle className="w-6 h-6 text-green-500 mt-1 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">WhatsApp</div>
                    <div className="text-gray-600">+1 (250) 631-6899</div>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:info@quickclean.com"
                  className="flex items-start cursor-pointer hover:text-blue-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <Mail className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">info@quickclean.com</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://maps.google.com/?q=Greater+Metro+Area"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start cursor-pointer hover:text-blue-600 transition-colors"
                  whileHover={{ x: 10 }}
                >
                  <MapPin className="w-6 h-6 text-blue-600 mt-1 mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">Location</div>
                    <div className="text-gray-600">Serving the Greater Metro Area</div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Service</label>
                  <select name="service" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                    <option value="">Select a service</option>
                    <option value="House Cleaning">House Cleaning</option>
                    <option value="Commercial Cleaning">Commercial Cleaning</option>
                    <option value="Snow Removal">Snow Removal</option>
                    <option value="Pressure Washing">Pressure Washing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Tell us about your needs..."
                  ></textarea>
                </div>

                {isSuccess && (
                  <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                    Thank you! Your message has been sent successfully. We'll be in touch soon.
                  </div>
                )}

                {errorMessage && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img src={logo} alt="Quick Clean Logo" className="h-12 mb-4 brightness-0 invert" />
              <p className="text-gray-400">
                Professional cleaning services you can trust. Excellence delivered every time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-white transition-colors">Home</a>
                <a href="#services" className="block text-gray-400 hover:text-white transition-colors">Services</a>
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                {services.map(service => (
                  <div key={service.title} className="text-gray-400">{service.title}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Quick Clean Janitorial Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}