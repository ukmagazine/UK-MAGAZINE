/**
 * UI copy in every supported language.
 *
 * Article bodies stay in the language they were written in; this covers the
 * interface — navigation, labels, controls, forms and empty states. Adding a
 * language means adding one entry here and one option to `locales`.
 */

export type Locale = 'en' | 'fa';

export const locales: ReadonlyArray<{
  code: Locale;
  /** Name shown in the switcher, written in that language. */
  label: string;
  dir: 'ltr' | 'rtl';
}> = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'fa', label: 'فارسی', dir: 'rtl' },
];

export const DEFAULT_LOCALE: Locale = 'fa';

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locales.find((entry) => entry.code === locale)?.dir ?? 'ltr';
}

export interface Dictionary {
  nav: {
    sections: string;
    opinion: string;
    more: string;
    subscribe: string;
    search: string;
    saved: string;
    savedCount: string;
    openMenu: string;
    closeMenu: string;
    home: string;
    skipToContent: string;
    language: string;
  };
  breaking: {
    label: string;
    viewAll: string;
    pause: string;
    resume: string;
  };
  home: {
    topStories: string;
    moreTopStories: string;
    latest: string;
    mostRead: string;
    editorsPicks: string;
    viewAll: string;
    inDepth: string;
    readFullStory: string;
    prevPicks: string;
    nextPicks: string;
    by: string;
  };
  sections: {
    aiTech: string;
    education: string;
    politicsWorld: string;
    scienceEnvironment: string;
    business: string;
    culture: string;
  };
  article: {
    breadcrumbHome: string;
    keyTakeaways: string;
    tableOfContents: string;
    share: string;
    save: string;
    saved: string;
    filedUnder: string;
    relatedTitle: string;
    newerStory: string;
    olderStory: string;
    updated: string;
    minRead: string;
    briefing: string;
    whatHappened: string;
    whyItMatters: string;
    biggerPicture: string;
    whatToWatch: string;
    keyTakeaway: string;
    copyLink: string;
    linkCopied: string;
  };
  newsletter: {
    kicker: string;
    emailLabel: string;
    placeholder: string;
    subscribe: string;
    subscribing: string;
    successTitle: string;
    successBody: string;
    privacy: string;
    errorEmpty: string;
    errorInvalid: string;
  };
  search: {
    title: string;
    placeholder: string;
    overlayPlaceholder: string;
    suggested: string;
    browseDesks: string;
    recent: string;
    clear: string;
    noRecent: string;
    quickMatches: string;
    seeAll: string;
    results: string;
    result: string;
    noResults: string;
    noResultsBody: string;
    emptyTitle: string;
    emptyBody: string;
    refine: string;
    published: string;
    sortBy: string;
    clearDesks: string;
    loading: string;
    close: string;
  };
  filters: {
    any: string;
    day: string;
    week: string;
    month: string;
    year: string;
    relevance: string;
    newest: string;
    oldest: string;
    mostRead: string;
    all: string;
    allStories: string;
    showing: string;
    of: string;
    loadMore: string;
    left: string;
    story: string;
    stories: string;
  };
  bookmarks: {
    title: string;
    kicker: string;
    intro: string;
    emptyTitle: string;
    emptyBody: string;
    browse: string;
    clearAll: string;
    savedCount: string;
    savedCountPlural: string;
  };
  footer: {
    sections: string;
    company: string;
    legal: string;
    dailyBrief: string;
    join: string;
    copyright: string;
  };
  notFound: {
    error: string;
    title: string;
    body: string;
    backHome: string;
    searchAll: string;
    browseDesk: string;
    todaysStories: string;
  };
}

const en: Dictionary = {
  nav: {
    sections: 'Sections',
    opinion: 'Opinion',
    more: 'More',
    subscribe: 'Subscribe',
    search: 'Search UK MAGAZINE',
    saved: 'Saved stories',
    savedCount: 'Saved stories, {count} saved',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'UK MAGAZINE — home',
    skipToContent: 'Skip to main content',
    language: 'Choose language',
  },
  breaking: {
    label: 'Breaking',
    viewAll: 'View all updates',
    pause: 'Pause breaking news headlines',
    resume: 'Resume breaking news headlines',
  },
  home: {
    topStories: 'Top stories',
    moreTopStories: 'More top stories',
    latest: 'Latest',
    mostRead: 'Most read',
    editorsPicks: 'Editor’s picks',
    viewAll: 'View all',
    inDepth: 'In depth',
    readFullStory: 'Read the full story',
    prevPicks: 'Previous picks',
    nextPicks: 'Next picks',
    by: 'By',
  },
  sections: {
    aiTech: 'AI and Technology',
    education: 'Education',
    politicsWorld: 'Politics and World',
    scienceEnvironment: 'Science and Environment',
    business: 'Business',
    culture: 'Culture',
  },
  article: {
    breadcrumbHome: 'Home',
    keyTakeaways: 'Key takeaways',
    tableOfContents: 'In this article',
    share: 'Share',
    save: 'Save story',
    saved: 'Saved',
    filedUnder: 'Filed under',
    relatedTitle: 'More on this story',
    newerStory: 'Newer story',
    olderStory: 'Older story',
    updated: 'Updated',
    minRead: 'min read',
    briefing: 'The briefing',
    whatHappened: 'What happened',
    whyItMatters: 'Why it matters',
    biggerPicture: 'The bigger picture',
    whatToWatch: 'What to watch',
    keyTakeaway: 'Key takeaway',
    copyLink: 'Copy link to this article',
    linkCopied: 'Link copied to clipboard',
  },
  newsletter: {
    kicker: 'Stay informed',
    emailLabel: 'Email address',
    placeholder: 'you@example.com',
    subscribe: 'Subscribe',
    subscribing: 'Subscribing…',
    successTitle: 'You’re subscribed.',
    successBody:
      'The next edition of {name} will arrive at {email}. Confirm your address from the email we just sent.',
    privacy: 'We never sell reader data. Unsubscribe in one click from any edition.',
    errorEmpty: 'Enter your email address to subscribe.',
    errorInvalid: 'That address does not look right — check for a typo.',
  },
  search: {
    title: 'Find a story',
    placeholder: 'Try “energy”, “procurement” or “evidence”',
    overlayPlaceholder: 'Search stories, topics and desks',
    suggested: 'Suggested topics',
    browseDesks: 'Browse desks',
    recent: 'Recent searches',
    clear: 'Clear',
    noRecent: 'Your recent searches will appear here.',
    quickMatches: 'quick matches',
    seeAll: 'See all results for',
    results: 'results',
    result: 'result',
    noResults: 'No stories match',
    noResultsBody: 'Try a broader term, remove a desk filter, or widen the date range.',
    emptyTitle: 'Search UK MAGAZINE',
    emptyBody:
      'Enter a term above, or press the “/” key from anywhere on the site to open quick search.',
    refine: 'Refine',
    published: 'Published',
    sortBy: 'Sort by',
    clearDesks: 'Clear desks',
    loading: 'Loading results…',
    close: 'Close search',
  },
  filters: {
    any: 'Any time',
    day: 'Past 24 hours',
    week: 'Past week',
    month: 'Past month',
    year: 'Past year',
    relevance: 'Most relevant',
    newest: 'Newest first',
    oldest: 'Oldest first',
    mostRead: 'Most read',
    all: 'All',
    allStories: 'All stories',
    showing: 'Showing',
    of: 'of',
    loadMore: 'Load {count} more',
    left: 'left',
    story: 'story',
    stories: 'stories',
  },
  bookmarks: {
    title: 'Saved stories',
    kicker: 'Your library',
    intro:
      'Everything you have bookmarked, kept in this browser. Nothing is sent to a server, and your list survives a refresh.',
    emptyTitle: 'Nothing saved yet',
    emptyBody:
      'Use the bookmark control on any story to keep it here. Saved stories stay in this browser — no account required, and they survive a refresh.',
    browse: 'Browse today’s stories',
    clearAll: 'Clear all',
    savedCount: 'saved story',
    savedCountPlural: 'saved stories',
  },
  footer: {
    sections: 'Sections',
    company: 'Company',
    legal: 'Legal',
    dailyBrief: 'The Daily Brief',
    join: 'Join',
    copyright: 'A fictional publication built as a design template.',
  },
  notFound: {
    error: 'Error 404',
    title: 'This page is off the map.',
    body: 'The story you were looking for may have been moved, renamed, or never existed at this address. Everything UK MAGAZINE has published is still one search away.',
    backHome: 'Back to the front page',
    searchAll: 'Search every story',
    browseDesk: 'Browse a desk',
    todaysStories: 'Today’s stories',
  },
};

const fa: Dictionary = {
  nav: {
    sections: 'بخش‌ها',
    opinion: 'دیدگاه',
    more: 'بیشتر',
    subscribe: 'اشتراک',
    search: 'جستجو در یو‌کی مگزین',
    saved: 'ذخیره‌شده‌ها',
    savedCount: 'ذخیره‌شده‌ها، {count} مورد',
    openMenu: 'باز کردن منو',
    closeMenu: 'بستن منو',
    home: 'یو‌کی مگزین — صفحهٔ نخست',
    skipToContent: 'رفتن به محتوای اصلی',
    language: 'انتخاب زبان',
  },
  breaking: {
    label: 'فوری',
    viewAll: 'همهٔ به‌روزرسانی‌ها',
    pause: 'توقف عناوین فوری',
    resume: 'ادامهٔ عناوین فوری',
  },
  home: {
    topStories: 'مهم‌ترین‌ها',
    moreTopStories: 'خبرهای مهم بیشتر',
    latest: 'تازه‌ترین‌ها',
    mostRead: 'پربازدیدترین‌ها',
    editorsPicks: 'انتخاب سردبیر',
    viewAll: 'مشاهدهٔ همه',
    inDepth: 'گزارش تحلیلی',
    readFullStory: 'خواندن گزارش کامل',
    prevPicks: 'قبلی',
    nextPicks: 'بعدی',
    by: 'نوشتهٔ',
  },
  sections: {
    aiTech: 'هوش مصنوعی و فناوری',
    education: 'آموزش',
    politicsWorld: 'سیاست و جهان',
    scienceEnvironment: 'علم و محیط زیست',
    business: 'اقتصاد',
    culture: 'فرهنگ',
  },
  article: {
    breadcrumbHome: 'خانه',
    keyTakeaways: 'نکته‌های کلیدی',
    tableOfContents: 'در این گزارش',
    share: 'هم‌رسانی',
    save: 'ذخیرهٔ گزارش',
    saved: 'ذخیره شد',
    filedUnder: 'موضوع‌ها',
    relatedTitle: 'بیشتر دربارهٔ این موضوع',
    newerStory: 'گزارش تازه‌تر',
    olderStory: 'گزارش پیشین',
    updated: 'به‌روزرسانی',
    minRead: 'دقیقه مطالعه',
    briefing: 'خلاصهٔ خبر',
    whatHappened: 'چه اتفاقی افتاد',
    whyItMatters: 'چرا مهم است',
    biggerPicture: 'تصویر بزرگ‌تر',
    whatToWatch: 'چه چیزی را دنبال کنیم',
    keyTakeaway: 'نکتهٔ کلیدی',
    copyLink: 'کپی پیوند این گزارش',
    linkCopied: 'پیوند کپی شد',
  },
  newsletter: {
    kicker: 'باخبر بمانید',
    emailLabel: 'نشانی ایمیل',
    placeholder: 'you@example.com',
    subscribe: 'اشتراک',
    subscribing: 'در حال ثبت…',
    successTitle: 'اشتراک شما ثبت شد.',
    successBody:
      'شمارهٔ بعدی {name} به {email} فرستاده می‌شود. لطفاً نشانی خود را از طریق ایمیلی که ارسال شد تأیید کنید.',
    privacy: 'ما هرگز داده‌های خوانندگان را نمی‌فروشیم. لغو اشتراک با یک کلیک ممکن است.',
    errorEmpty: 'برای اشتراک، نشانی ایمیل خود را وارد کنید.',
    errorInvalid: 'این نشانی درست به نظر نمی‌رسد — لطفاً بررسی کنید.',
  },
  search: {
    title: 'جستجوی گزارش',
    placeholder: '«انرژی»، «تدارکات» یا «شواهد» را امتحان کنید',
    overlayPlaceholder: 'جستجوی گزارش‌ها، موضوع‌ها و بخش‌ها',
    suggested: 'موضوع‌های پیشنهادی',
    browseDesks: 'مرور بخش‌ها',
    recent: 'جستجوهای اخیر',
    clear: 'پاک کردن',
    noRecent: 'جستجوهای اخیر شما اینجا نمایش داده می‌شود.',
    quickMatches: 'نتیجهٔ سریع',
    seeAll: 'مشاهدهٔ همهٔ نتایج برای',
    results: 'نتیجه',
    result: 'نتیجه',
    noResults: 'گزارشی یافت نشد برای',
    noResultsBody: 'عبارت کلی‌تری را امتحان کنید، فیلتر بخش را بردارید یا بازهٔ زمانی را گسترده‌تر کنید.',
    emptyTitle: 'جستجو در یو‌کی مگزین',
    emptyBody: 'عبارتی را بالا وارد کنید، یا از هر جای سایت کلید «/» را بزنید.',
    refine: 'پالایش',
    published: 'زمان انتشار',
    sortBy: 'مرتب‌سازی',
    clearDesks: 'حذف بخش‌ها',
    loading: 'در حال بارگذاری نتایج…',
    close: 'بستن جستجو',
  },
  filters: {
    any: 'هر زمان',
    day: 'یک روز گذشته',
    week: 'یک هفتهٔ گذشته',
    month: 'یک ماه گذشته',
    year: 'یک سال گذشته',
    relevance: 'مرتبط‌ترین',
    newest: 'تازه‌ترین',
    oldest: 'قدیمی‌ترین',
    mostRead: 'پربازدیدترین',
    all: 'همه',
    allStories: 'همهٔ گزارش‌ها',
    showing: 'نمایش',
    of: 'از',
    loadMore: 'نمایش {count} مورد بیشتر',
    left: 'باقی‌مانده',
    story: 'گزارش',
    stories: 'گزارش',
  },
  bookmarks: {
    title: 'گزارش‌های ذخیره‌شده',
    kicker: 'کتابخانهٔ شما',
    intro:
      'هر آنچه نشان‌گذاری کرده‌اید، در همین مرورگر نگهداری می‌شود. چیزی به سرور فرستاده نمی‌شود و فهرست شما پس از بارگذاری دوباره باقی می‌ماند.',
    emptyTitle: 'هنوز چیزی ذخیره نشده',
    emptyBody:
      'با دکمهٔ نشان‌گذاری در هر گزارش، آن را اینجا نگه دارید. گزارش‌های ذخیره‌شده در همین مرورگر می‌مانند — بدون نیاز به حساب کاربری.',
    browse: 'مرور گزارش‌های امروز',
    clearAll: 'پاک کردن همه',
    savedCount: 'گزارش ذخیره‌شده',
    savedCountPlural: 'گزارش ذخیره‌شده',
  },
  footer: {
    sections: 'بخش‌ها',
    company: 'دربارهٔ ما',
    legal: 'حقوقی',
    dailyBrief: 'خلاصهٔ روزانه',
    join: 'عضویت',
    copyright: 'تمام حقوق محفوظ است.',
  },
  notFound: {
    error: 'خطای ۴۰۴',
    title: 'این صفحه پیدا نشد.',
    body: 'گزارشی که دنبالش بودید شاید جابه‌جا یا حذف شده باشد، یا هرگز در این نشانی نبوده است. همهٔ آنچه یو‌کی مگزین منتشر کرده، تنها یک جستجو با شما فاصله دارد.',
    backHome: 'بازگشت به صفحهٔ نخست',
    searchAll: 'جستجوی همهٔ گزارش‌ها',
    browseDesk: 'مرور بخش‌ها',
    todaysStories: 'گزارش‌های امروز',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, fa };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

/** Replace `{token}` placeholders in a translated string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}
