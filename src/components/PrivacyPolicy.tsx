import React from 'react';

interface PolicySection {
  title: string;
  content: React.ReactNode;
}

export const PrivacyPolicy: React.FC = () => {
  const policyData: PolicySection[] = [
    {
      title: '1. Informacje ogólne i Administrator Danych',
      content: (
        <p>
          Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych 
          użytkowników korzystających ze sklepu internetowego <span className="font-semibold text-slate-900">FikuMiku</span>. 
          Dbamy o bezpieczeństwo Twoich danych oraz Twoich pociech z najwyższą starannością.
        </p>
      ),
    },
    {
      title: '2. Jakie dane gromadzimy?',
      content: (
        <>
          <p className="mb-4">Podczas korzystania z naszego sklepu możemy poprosić Cię o podanie niektórych danych osobowych, w szczególności:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Imię i nazwisko (do realizacji zamówienia)</li>
            <li>Adres dostawy oraz adres e-mail</li>
            <li>Numer telefonu (dla kuriera)</li>
            <li>Dane techniczne, takie jak pliki cookies oraz adres IP</li>
          </ul>
        </>
      ),
    },
    {
      title: '3. Cel przetwarzania danych',
      content: (
        <p>
          Twoje dane przetwarzamy wyłącznie w celu realizacji zamówień, obsługi konta użytkownika, 
          kontaktowania się w sprawach związanych z zakupami oraz – jeśli wyrazisz na to zgodę – 
          wysyłania informacji o nowościach i kreatywnych zabawkach w naszym newsletterze.
        </p>
      ),
    },
    {
      title: '4. Bezpieczeństwo danych',
      content: (
        <p>
          Stosujemy nowoczesne środki techniczne i organizacyjne, aby zapewnić ochronę przetwarzanych 
          danych osobowych. Połączenie z naszą stroną jest szyfrowane za pomocą certyfikatu SSL, 
          dzięki czemu Twoje zakupy są w pełni bezpieczne.
        </p>
      ),
    },
    {
      title: '5. Kontakt',
      content: (
        <p>
          W razie jakichkolwiek pytań lub wątpliwości dotyczących ochrony Twoich danych, 
          zapraszamy do kontaktu pod adresem e-mail: <span className="font-semibold text-[#FF6E1F]">kontakt@fikumiku.pl</span> lub 
          poprzez formularz w zakładce Kontakt.
        </p>
      ),
    },
  ];

  return (
    <div className="w-full bg-white text-slate-700 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="border-b-4 border-[#FF6E1F] pb-6 mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Polityka Prywatności
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Sklep internetowy FikuMiku • Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}
          </p>
        </div>


        <div className="space-y-12">
          {policyData.map((section, index) => (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {section.title}
              </h2>
              <div className="text-slate-600 leading-relaxed text-base sm:text-lg">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          Dziękujemy za zaufanie i wspólne budowanie kreatywnego świata uśmiechu!
        </div>

      </div>
    </div>
  );
};