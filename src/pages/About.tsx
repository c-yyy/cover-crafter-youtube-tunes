import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import { Users, Target, Award, Globe, Heart, ImageIcon, Youtube, Download, Shield, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams<{ lng: string }>();


  return (
    <>
      <Helmet>
        <title>{t('aboutPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('aboutPageDescription')} />
        <meta name="keywords" content={t('aboutPageKeywords')} />
        <meta property="og:title" content={`${t('aboutPageTitle')} - ${t('siteTitle')}`} />
        <meta property="og:description" content={t('aboutPageDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/${lng || 'en'}/about`} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${t('aboutPageTitle')} - ${t('siteTitle')}`} />
        <meta name="twitter:description" content={t('aboutPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/${lng || 'en'}/about`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": t('aboutPageTitle'),
            "description": t('aboutPageDescription'),
            "url": `${window.location.origin}/${lng || 'en'}/about`,
            "mainEntity": {
              "@type": "Organization",
              "name": t('siteTitle'),
              "description": t('aboutIntroDescription'),
              "url": window.location.origin
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Header currentPage="about" />

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
                    <ImageIcon className="h-8 w-8 text-red-600" aria-hidden="true" />
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
                    <Download className="h-8 w-8 text-blue-600" aria-hidden="true" />
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
                    <Shield className="h-8 w-8 text-green-600" aria-hidden="true" />
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
                    <Clock className="h-8 w-8 text-purple-600" aria-hidden="true" />
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
                    <Users className="h-8 w-8 text-orange-600" aria-hidden="true" />
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
                    <Youtube className="h-8 w-8 text-indigo-600" aria-hidden="true" />
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