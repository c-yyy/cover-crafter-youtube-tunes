import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Cookie, Database, Mail, Calendar } from "lucide-react";

const Privacy = () => {
  const { t, i18n } = useTranslation();
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <Helmet>
        <title>{t('privacyPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('privacyPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/privacy`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">
                {t('privacyPageTitle')}
              </h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="mb-8 text-center">
              <p className="text-slate-600 flex items-center justify-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{t('privacyLastUpdated')}: {currentDate}</span>
              </p>
            </div>

            {/* Introduction */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                  <Eye className="h-6 w-6 text-blue-600" />
                  <span>{t('privacyIntroTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('privacyIntroDescription')}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {t('privacyIntroCommitment')}
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                  <Database className="h-6 w-6 text-green-600" />
                  <span>{t('privacyCollectionTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('privacyCollectionAutoTitle')}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>{t('privacyCollectionAutoItem1')}</li>
                      <li>{t('privacyCollectionAutoItem2')}</li>
                      <li>{t('privacyCollectionAutoItem3')}</li>
                      <li>{t('privacyCollectionAutoItem4')}</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('privacyCollectionLocalTitle')}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li>{t('privacyCollectionLocalItem1')}</li>
                      <li>{t('privacyCollectionLocalItem2')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('privacyUsageTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>{t('privacyUsageItem1')}</li>
                  <li>{t('privacyUsageItem2')}</li>
                  <li>{t('privacyUsageItem3')}</li>
                  <li>{t('privacyUsageItem4')}</li>
                  <li>{t('privacyUsageItem5')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                  <Cookie className="h-6 w-6 text-orange-600" />
                  <span>{t('privacyCookiesTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    {t('privacyCookiesDescription')}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('privacyCookiesTypesTitle')}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li><strong>{t('privacyCookiesEssentialTitle')}:</strong> {t('privacyCookiesEssentialDesc')}</li>
                      <li><strong>{t('privacyCookiesAnalyticsTitle')}:</strong> {t('privacyCookiesAnalyticsDesc')}</li>
                      <li><strong>{t('privacyCookiesAdvertisingTitle')}:</strong> {t('privacyCookiesAdvertisingDesc')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('privacyThirdPartyTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    {t('privacyThirdPartyDescription')}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('privacyThirdPartyServicesTitle')}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600">
                      <li><strong>Google AdSense:</strong> {t('privacyThirdPartyAdsense')}</li>
                      <li><strong>Google Analytics:</strong> {t('privacyThirdPartyAnalytics')}</li>
                      <li><strong>YouTube API:</strong> {t('privacyThirdPartyYoutube')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('privacySecurityTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('privacySecurityDescription')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>{t('privacySecurityItem1')}</li>
                  <li>{t('privacySecurityItem2')}</li>
                  <li>{t('privacySecurityItem3')}</li>
                  <li>{t('privacySecurityItem4')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('privacyRightsTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>{t('privacyRightsItem1')}</li>
                  <li>{t('privacyRightsItem2')}</li>
                  <li>{t('privacyRightsItem3')}</li>
                  <li>{t('privacyRightsItem4')}</li>
                  <li>{t('privacyRightsItem5')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('privacyChildrenTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {t('privacyChildrenDescription')}
                </p>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('privacyChangesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {t('privacyChangesDescription')}
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <span>{t('privacyContactTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('privacyContactDescription')}
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700">
                    <strong>{t('privacyContactEmail')}:</strong> privacy@youtube-cover-download.com
                  </p>
                  <p className="text-slate-700 mt-2">
                    <strong>{t('privacyContactWebsite')}:</strong> {window.location.origin}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default Privacy;