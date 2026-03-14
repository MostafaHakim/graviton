import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Globe } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSetting } from "../store/features/auth/settingsSlice";
import { createContact } from "../store/features/auth/contactSlice";

const Contact = () => {
  const { settings, loading } = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log(formData);
    await dispatch(createContact(formData));

    setTimeout(() => {
      setSubmitStatus("success");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#134C45] to-[#0d362f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 font-kalpurush">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <div className="w-20 h-1 bg-[#3BD480] mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-3 text-base font-kalpurush max-w-2xl mx-auto">
            আপনার যেকোনো প্রশ্ন, মতামত বা প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।
            আমরা ২৪ ঘন্টার মধ্যে আপনার বার্তার উত্তর দেবো।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-5">
            {/* Address Card */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-[#134C45] to-[#3BD480] opacity-90"></div>
              <div className="relative z-10 p-6 pt-12">
                <div className="w-12 h-12 bg-[#3BD480] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#134C45] mb-2 font-kalpurush text-center">
                  আমাদের ঠিকানা
                </h3>
                <p className="text-sm text-gray-600 text-center font-kalpurush">
                  {settings?.address}
                </p>
              </div>
            </div>

            {/* Email Card */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-[#134C45] to-[#3BD480] opacity-90"></div>
              <div className="relative z-10 p-6 pt-12">
                <div className="w-12 h-12 bg-[#3BD480] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#134C45] mb-2 font-kalpurush text-center">
                  ইমেইল ঠিকানা
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-sm text-gray-600 font-kalpurush">
                    {settings?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-[#134C45] to-[#3BD480] opacity-90"></div>
              <div className="relative z-10 p-6 pt-12">
                <div className="w-12 h-12 bg-[#3BD480] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#134C45] mb-2 font-kalpurush text-center">
                  ফোন নম্বর
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-sm text-gray-600 font-kalpurush">
                    {settings?.mobile}
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours Card */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-[#134C45] to-[#3BD480] opacity-90"></div>
              <div className="relative z-10 p-6 pt-12">
                <div className="w-12 h-12 bg-[#3BD480] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#134C45] mb-2 font-kalpurush text-center">
                  অফিস সময়
                </h3>
                <div className="space-y-2 text-center">
                  <p className="text-sm text-gray-600 font-kalpurush">
                    {settings?.timeOpen}
                  </p>
                  <p className="text-sm text-gray-600 font-kalpurush">
                    {settings?.timeClose}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-[#134C45] to-[#3BD480] opacity-90"></div>

              <div className="relative z-10 p-6 pt-12">
                <h2 className="text-2xl font-bold text-[#134C45] mb-6 font-kalpurush text-center">
                  পাঠান আপনার বার্তা
                </h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-center font-kalpurush">
                      ✓ আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা খুব শীঘ্রই
                      আপনার সাথে যোগাযোগ করবো।
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-medium text-[#134C45] mb-1 font-kalpurush">
                        আপনার নাম *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-200"
                        placeholder="আপনার নাম লিখুন"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium text-[#134C45] mb-1 font-kalpurush">
                        ইমেইল ঠিকানা *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-200"
                        placeholder="আপনার ইমেইল লিখুন"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-[#134C45] mb-1 font-kalpurush">
                        ফোন নম্বর
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-200"
                        placeholder="আপনার ফোন নম্বর লিখুন"
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm font-medium text-[#134C45] mb-1 font-kalpurush">
                        বিষয় *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-200"
                        placeholder="বার্তার বিষয় লিখুন"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-[#134C45] mb-1 font-kalpurush">
                      আপনার বার্তা *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3BD480] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="আপনার বার্তা লিখুন..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#134C45] to-[#3BD480] text-white py-3 rounded-lg font-kalpurush hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>পাঠানো হচ্ছে...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>বার্তা পাঠান</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-[#134C45] to-[#3BD480] opacity-90"></div>
            <div className="relative z-10 p-6 pt-12">
              <h3 className="text-lg font-bold text-[#134C45] mb-4 font-kalpurush text-center">
                আমাদের অবস্থান
              </h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.614235821169!2d91.9603297!3d21.5229439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adb71017bed085%3A0x490c23f5c284f9c8!2sGraviton%20Academy%2C%20Moheshkhali!5e1!3m2!1sen!2sbd!4v1773509252279!5m2!1sen!2sbd"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-lg"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
