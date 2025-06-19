import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, MapPin, Clock, Send, Youtube, Menu, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link, useParams } from 'react-router-dom';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t('contactFormSuccessTitle'),
        description: t('contactFormSuccessDescription'),
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>{t('contactPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('contactPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/contact`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to={`/${lng}`} className="flex items-center space-x-3">
                <div className="bg-red-600 p-2 rounded-lg">
                  <Youtube className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800">
                  {t('headerTitle')}
                </h1>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  to={`/${lng}`} 
                  className="text-slate-600 hover:text-red-600 font-medium transition-colors"
                >
                  {t('homeTitle')}
                </Link>
                <Link 
                  to={`/${lng}/about`} 
                  className="text-slate-600 hover:text-red-600 font-medium transition-colors"
                >
                  {t('about')}
                </Link>
                <Link 
                  to={`/${lng}/contact`} 
                  className="text-red-600 font-medium"
                >
                  {t('contact')}
                </Link>
              </nav>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-slate-600" />
                ) : (
                  <Menu className="h-6 w-6 text-slate-600" />
                )}
              </button>
            </div>
            
            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <nav className="md:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
                <div className="flex flex-col space-y-3">
                  <Link 
                    to={`/${lng}`} 
                    className="text-slate-600 hover:text-red-600 font-medium transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('homeTitle')}
                  </Link>
                  <Link 
                    to={`/${lng}/about`} 
                    className="text-slate-600 hover:text-red-600 font-medium transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('about')}
                  </Link>
                  <Link 
                    to={`/${lng}/contact`} 
                    className="text-red-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('contact')}
                  </Link>
                </div>
              </nav>
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Introduction */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                {t('contactHeroTitle')}
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                {t('contactHeroDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                    <span>{t('contactFormTitle')}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          {t('contactFormNameLabel')}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t('contactFormNamePlaceholder')}
                          className="border-2 border-slate-200 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                          {t('contactFormEmailLabel')}
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t('contactFormEmailPlaceholder')}
                          className="border-2 border-slate-200 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                        {t('contactFormSubjectLabel')}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t('contactFormSubjectPlaceholder')}
                        className="border-2 border-slate-200 focus:border-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                        {t('contactFormMessageLabel')}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t('contactFormMessagePlaceholder')}
                        className="border-2 border-slate-200 focus:border-purple-500 resize-none"
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 hover:bg-purple-700 h-12 text-lg font-semibold"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>{t('contactFormSubmittingText')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-5 w-5" />
                          <span>{t('contactFormSubmitText')}</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Contact Details */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-800">
                      {t('contactInfoTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Mail className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">
                          {t('contactInfoEmailTitle')}
                        </h3>
                        <p className="text-slate-600">
                          support@youtube-thumbnail-download.com
                        </p>
                        <p className="text-sm text-slate-500">
                          {t('contactInfoEmailDescription')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">
                          {t('contactInfoHoursTitle')}
                        </h3>
                        <p className="text-slate-600">
                          {t('contactInfoHoursWeekdays')}
                        </p>
                        <p className="text-slate-600">
                          {t('contactInfoHoursWeekends')}
                        </p>
                        <p className="text-sm text-slate-500">
                          {t('contactInfoHoursTimezone')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">
                          {t('contactInfoResponseTitle')}
                        </h3>
                        <p className="text-slate-600">
                          {t('contactInfoResponseTime')}
                        </p>
                        <p className="text-sm text-slate-500">
                          {t('contactInfoResponseDescription')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Quick Links */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-800">
                      {t('contactFaqTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      {t('contactFaqDescription')}
                    </p>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {t('contactFaqItem1Question')}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {t('contactFaqItem1Answer')}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {t('contactFaqItem2Question')}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {t('contactFaqItem2Answer')}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <h4 className="font-semibold text-slate-800 mb-1">
                          {t('contactFaqItem3Question')}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {t('contactFaqItem3Answer')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Business Information */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl text-slate-800">
                      {t('contactBusinessTitle')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {t('contactBusinessNameTitle')}
                        </h4>
                        <p className="text-slate-600">
                          YouTube Thumbnail Downloader Service
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {t('contactBusinessTypeTitle')}
                        </h4>
                        <p className="text-slate-600">
                          {t('contactBusinessTypeDescription')}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {t('contactBusinessEstablishedTitle')}
                        </h4>
                        <p className="text-slate-600">
                          2024
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Contact;