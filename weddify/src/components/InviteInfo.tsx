'use client';

import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import CountdownTimer from '../components/CountdownTimer';
import InviteForm from '../components/InviteForm';
import Footer from '../components/Footer';
import LanguageSwitcher from '../components/LanguageSwitcher';

type Language = 'en' | 'tr';

const InvitePage: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const messages: Record<Language, { main: string; date: string; location: string }> = {
    en: {
      main: 'Dear guests, our story is reaching its most magical chapter. As we write the words "happily ever after," your presence at our wedding would make it even more special. Please fill out the form below to let us know how many will be attending.',
      date: 'Date: 19th August 2024',
      location: 'Location: 1811 Albion Rd, Etobicoke, ON M9W 5W4',
    },
    tr: {
      main: 'Değerli misafirlerimiz, hikayemiz en büyülü bölümüne ulaşıyor. "Sonsuza dek mutlu yaşadılar" sözlerini yazarken, düğünümüzde sizin de bulunmanız bu anı daha da özel kılacaktır. Katılacak kişi sayısını aşağıdaki formu doldurarak bize bildiriniz.',
      date: 'Tarih: 19 Ağustos 2024',
      location: 'Konum: 1811 Albion Rd, Etobicoke, ON M9W 5W4',
    },
  };

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language);
  };

  const currentMessage = messages[currentLanguage];

  return (
    <>
      <Head>
        <title>Gaye & Enes Wedding Invitation</title>
        <meta name="description" content="Join us in celebrating the wedding of Gaye & Enes on 19th August 2024. RSVP to let us know how many will be attending." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Gaye & Enes Wedding Invitation" />
        <meta property="og:description" content="Join us in celebrating the wedding of Gaye & Enes on 19th August 2024. RSVP to let us know how many will be attending." />
        <meta property="og:image" content="/Users/Enes/Documents/GitHub/weddify/weddify/public/wedding-background.PNG" />
        <meta property="og:url" content="https://weddify-ten.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={currentLanguage === 'en' ? 'en_US' : 'tr_TR'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gaye & Enes Wedding Invitation" />
        <meta name="twitter:description" content="Join us in celebrating the wedding of Gaye & Enes on 19th August 2024. RSVP to let us know how many will be attending." />
        <meta name="twitter:image" content="/Users/Enes/Documents/GitHub/weddify/weddify/public/wedding-background.PNG" />
      </Head>
      <div className="min-h-screen flex flex-col bg-amber-200 p-4">
        <Navbar />
        <div className="flex flex-col justify-center items-center flex-grow">
          <CountdownTimer targetDate="2024-08-19T19:30:00" />
          <LanguageSwitcher currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
          <div className="bg-yellow-400 text-black text-center font-bold p-6 mt-6 mb-4 border-2 border-b-4 border-black rounded-lg shadow-lg max-w-lg mx-auto">
            {currentMessage.main}
          </div>
          <div className="bg-yellow-400 text-black text-center p-4 mt-4 mb-8 border-2 border-black border-b-4 rounded-lg shadow-lg max-w-lg mx-auto">
            <p className="text-md font-bold">{currentMessage.date}</p>
            <p className="text-md font-bold">{currentMessage.location}</p>
          </div>
          <InviteForm />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default InvitePage;
