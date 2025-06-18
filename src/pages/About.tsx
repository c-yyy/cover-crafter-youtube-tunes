import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Youtube, Image as ImageIcon, Download, Shield, Clock, Users, Menu, X } from "lucide-react";
import { Link, useParams } from 'react-router-dom';

const About = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{t('aboutPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('aboutPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/about`} />
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
                  className="text-red-600 font-medium"
                >
                  {t('about')}
                </Link>
                <Link 
                  to={`/${lng}/contact`} 
                  className="text-slate-600 hover:text-red-600 font-medium transition-colors"
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
                    className="text-red-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('about')}
                  </Link>
                  <Link 
                    to={`/${lng}/contact`} 
                    className="text-slate-600 hover:text-red-600 font-medium transition-colors py-2"
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
          {/* Introduction Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-slate-800">
                  {t('aboutIntroTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {t('aboutIntroDescription')}
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {t('aboutIntroDetails')}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {t('aboutIntroMission')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-8">
              {t('aboutFeaturesTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {t('aboutFeatureQualityTitle')}
                  </h3>
                  <p className="text-slate-600">
                    {t('aboutFeatureQualityDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Download className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {t('aboutFeatureEasyTitle')}
                  </h3>
                  <p className="text-slate-600">
                    {t('aboutFeatureEasyDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {t('aboutFeatureSecureTitle')}
                  </h3>
                  <p className="text-slate-600">
                    {t('aboutFeatureSecureDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {t('aboutFeatureFastTitle')}
                  </h3>
                  <p className="text-slate-600">
                    {t('aboutFeatureFastDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {t('aboutFeatureFreeTitle')}
                  </h3>
                  <p className="text-slate-600">
                    {t('aboutFeatureFreeDescription')}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="bg-indigo-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Youtube className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">
                    {t('aboutFeatureCompatibleTitle')}
                  </h3>
                  <p className="text-slate-600">
                    {t('aboutFeatureCompatibleDescription')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-slate-800">
                  {t('aboutHowItWorksTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {t('aboutStep1Title')}
                      </h4>
                      <p className="text-slate-600">
                        {t('aboutStep1Description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {t('aboutStep2Title')}
                      </h4>
                      <p className="text-slate-600">
                        {t('aboutStep2Description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {t('aboutStep3Title')}
                      </h4>
                      <p className="text-slate-600">
                        {t('aboutStep3Description')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">
                        {t('aboutStep4Title')}
                      </h4>
                      <p className="text-slate-600">
                        {t('aboutStep4Description')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-slate-800">
                  {t('aboutFaqTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      {t('aboutFaq1Question')}
                    </h4>
                    <p className="text-slate-600">
                      {t('aboutFaq1Answer')}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      {t('aboutFaq2Question')}
                    </h4>
                    <p className="text-slate-600">
                      {t('aboutFaq2Answer')}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      {t('aboutFaq3Question')}
                    </h4>
                    <p className="text-slate-600">
                      {t('aboutFaq3Answer')}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      {t('aboutFaq4Question')}
                    </h4>
                    <p className="text-slate-600">
                      {t('aboutFaq4Answer')}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">
                      {t('aboutFaq5Question')}
                    </h4>
                    <p className="text-slate-600">
                      {t('aboutFaq5Answer')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default About;