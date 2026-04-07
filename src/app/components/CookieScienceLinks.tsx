import { ExternalLink, BookOpen } from 'lucide-react';

interface CookieScienceLinksProps {
  /** Optional: highlight the article most relevant to the current cookie type */
  activeArticleUrl?: string;
}

const COOKIE_SCIENCE_ARTICLES = [
  {
    url: 'https://senseifood.com/cookie-science/why-cookies-are-chewy',
    title: 'Why Cookies Are Chewy',
    description: 'The science behind moisture, sugars, and gluten',
    emoji: '🍪',
  },
  {
    url: 'https://senseifood.com/cookie-science/why-cookies-get-crispy',
    title: 'Why Cookies Get Crispy',
    description: 'Low moisture, high sugar, and the Maillard reaction',
    emoji: '🔥',
  },
  {
    url: 'https://senseifood.com/cookie-science/why-cookies-spread',
    title: 'Why Cookies Spread',
    description: 'Fat, sugar, and heat control how far cookies spread',
    emoji: '↔️',
  },
  {
    url: 'https://senseifood.com/cookie-science/why-cookies-spread-too-much',
    title: 'Why Cookies Spread Too Much',
    description: 'Diagnosing flat cookies and how to fix them',
    emoji: '😱',
  },
  {
    url: 'https://senseifood.com/cookie-science/why-cookies-dont-spread',
    title: 'Why Cookies Don\'t Spread',
    description: 'When cookies stay puffy and how to fix it',
    emoji: '⬆️',
  },
  {
    url: 'https://senseifood.com/cookie-science/why-cookies-flatten',
    title: 'Why Cookies Flatten',
    description: 'Temperature, butter state, and dough hydration',
    emoji: '⬇️',
  },
  {
    url: 'https://senseifood.com/cookie-science/why-cookies-turn-hard',
    title: 'Why Cookies Turn Hard',
    description: 'Staling, moisture loss, and how to keep them soft',
    emoji: '🧱',
  },
  {
    url: 'https://senseifood.com/cookie-science/brown-sugar-vs-white-sugar',
    title: 'Brown Sugar vs White Sugar',
    description: 'How sugar type changes texture, color, and flavor',
    emoji: '🟫',
  },
];

export function CookieScienceLinks({ activeArticleUrl }: CookieScienceLinksProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 flex-wrap">
          <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
          <h3 className="font-bold text-gray-900 text-sm">Cookie Science Articles</h3>
          <a
            href="https://senseifood.com/articles"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1 transition-colors"
          >
            All Articles <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-2 leading-relaxed">
          Learn why it happens in the article — then apply it here: change ingredients and watch texture, spread, and water activity update live.
        </p>
      </div>

      <div className="divide-y divide-gray-50">
        {COOKIE_SCIENCE_ARTICLES.map((article) => {
          const isActive = article.url === activeArticleUrl;
          return (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-start gap-3 px-5 py-3 hover:bg-amber-50 transition-colors group ${
                isActive ? 'bg-amber-50 border-l-2 border-amber-500' : ''
              }`}
            >
              <span className="text-lg flex-shrink-0 mt-0.5">{article.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className={`text-sm font-semibold ${isActive ? 'text-amber-700' : 'text-gray-800'} group-hover:text-amber-700 transition-colors`}>
                  {article.title}
                  {isActive && (
                    <span className="ml-2 text-xs font-normal bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                      Relevant
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">{article.description}</div>
              </div>
              <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-amber-500 flex-shrink-0 mt-1 transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
