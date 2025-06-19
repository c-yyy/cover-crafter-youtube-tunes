import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Scale, Users, Shield, Calendar } from "lucide-react";

const Terms = () => {
  const { t, i18n } = useTranslation();
  const currentDate = new Date().toLocaleDateString();

  return (
    <>
      <Helmet>
        <title>{t('termsPageTitle')} - {t('siteTitle')}</title>
        <meta name="description" content={t('termsPageDescription')} />
        <link rel="canonical" href={`${window.location.origin}/terms`} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-slate-800">
                {t('termsPageTitle')}
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
                <span>{t('termsLastUpdated')}: {currentDate}</span>
              </p>
            </div>

            {/* Introduction */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                  <Scale className="h-6 w-6 text-green-600" />
                  <span>{t('termsIntroTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('termsIntroDescription')}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  {t('termsIntroAgreement')}
                </p>
              </CardContent>
            </Card>

            {/* Service Description */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('termsServiceTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('termsServiceDescription')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>{t('termsServiceItem1')}</li>
                  <li>{t('termsServiceItem2')}</li>
                  <li>{t('termsServiceItem3')}</li>
                  <li>{t('termsServiceItem4')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  <span>{t('termsUserTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('termsUserDescription')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>{t('termsUserItem1')}</li>
                  <li>{t('termsUserItem2')}</li>
                  <li>{t('termsUserItem3')}</li>
                  <li>{t('termsUserItem4')}</li>
                  <li>{t('termsUserItem5')}</li>
                  <li>{t('termsUserItem6')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <span>{t('termsProhibitedTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('termsProhibitedDescription')}
                </p>
                <ul className="list-disc list-inside space-y-2 text-slate-600">
                  <li>{t('termsProhibitedItem1')}</li>
                  <li>{t('termsProhibitedItem2')}</li>
                  <li>{t('termsProhibitedItem3')}</li>
                  <li>{t('termsProhibitedItem4')}</li>
                  <li>{t('termsProhibitedItem5')}</li>
                  <li>{t('termsProhibitedItem6')}</li>
                  <li>{t('termsProhibitedItem7')}</li>
                </ul>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('termsIntellectualTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    {t('termsIntellectualDescription')}
                  </p>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('termsIntellectualYoutubeTitle')}
                    </h3>
                    <p className="text-slate-600">
                      {t('termsIntellectualYoutubeDesc')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('termsIntellectualUserTitle')}
                    </h3>
                    <p className="text-slate-600">
                      {t('termsIntellectualUserDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800 flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-yellow-600" />
                  <span>{t('termsDisclaimersTitle')}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('termsDisclaimersServiceTitle')}
                    </h3>
                    <p className="text-slate-600">
                      {t('termsDisclaimersServiceDesc')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('termsDisclaimersAvailabilityTitle')}
                    </h3>
                    <p className="text-slate-600">
                      {t('termsDisclaimersAvailabilityDesc')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">
                      {t('termsDisclaimersAccuracyTitle')}
                    </h3>
                    <p className="text-slate-600">
                      {t('termsDisclaimersAccuracyDesc')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('termsLiabilityTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {t('termsLiabilityDescription')}
                </p>
              </CardContent>
            </Card>

            {/* Privacy Policy */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('termsPrivacyTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {t('termsPrivacyDescription')}
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('termsTerminationTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {t('termsTerminationDescription')}
                </p>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('termsGoverningTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {t('termsGoverningDescription')}
                </p>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card className="shadow-lg border-0 bg-white mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('termsChangesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  {t('termsChangesDescription')}
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-800">
                  {t('termsContactTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {t('termsContactDescription')}
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700">
                    <strong>{t('termsContactEmail')}:</strong> legal@youtube-thumbnail-download.com
                  </p>
                  <p className="text-slate-700 mt-2">
                    <strong>{t('termsContactWebsite')}:</strong> {window.location.origin}
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

export default Terms;