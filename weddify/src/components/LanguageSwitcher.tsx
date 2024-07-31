'use client';

type Language = 'en' | 'tr';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex justify-center mb-4">
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-4 py-2 mx-2 border border-b-4 border-zinc-600 rounded-lg font-bold ${currentLanguage === 'en' ? 'bg-gray-700 text-white' : ' bg-black text-white'}`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange('tr')}
        className={`px-4 py-2 mx-2 border border-b-4 border-zinc-600 rounded-lg font-bold ${currentLanguage === 'tr' ? 'bg-gray-700 text-white' : 'bg-black text-white'}`}
      >
        Turkish
      </button>
    </div>
  );
};

export default LanguageSwitcher;
