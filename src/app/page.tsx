import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ArticleGrid } from '@/components/article/ArticleGrid';
import { EditorsPicksRow } from '@/components/article/EditorsPicksRow';
import { HeroStory } from '@/components/article/HeroStory';
import { LatestNewsFeed } from '@/components/article/LatestNewsFeed';
import { TrendingList } from '@/components/article/TrendingList';
import { NewsletterCard } from '@/components/newsletter/NewsletterCard';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  getArticlesByCategory,
  getByCategories,
  getEditorsPicks,
  getHeroSupport,
  getInDepth,
  getLatest,
  getLeadStory,
  getMostRead,
  toCardArticles,
} from '@/lib/articles';

export default function HomePage() {
  const lead = getLeadStory();
  const support = getHeroSupport(3);
  const heroIds = [lead.id, ...support.map((article) => article.id)];

  const latestAll = getLatest(7, heroIds);
  const latest = latestAll;
  // One image-led story anchors the middle of the latest row.
  const latestFeature = latestAll.find((article) => article.id !== latestAll[0]?.id);
  const mostRead = getMostRead(5);

  const technology = getArticlesByCategory('technology', 5);
  const [technologyFeature, ...technologySupport] = technology;

  const health = getArticlesByCategory('health', 3);
  const politicsWorld = getByCategories(['politics', 'world'], 4);
  const society = getArticlesByCategory('society', 3);
  const sports = getArticlesByCategory('sports', 3);
  const events = getArticlesByCategory('event', 3);
  const business = getArticlesByCategory('business', 4);
  const [businessLead, ...businessRest] = business;
  const culture = getArticlesByCategory('culture', 3);
  const [cultureLead, ...cultureRest] = culture;
  const editorsPicks = getEditorsPicks(4);
  const inDepth = getInDepth(2);

  return (
    <>
      <div className="frame">
        {/* Hero ------------------------------------------------- */}
        <HeroStory lead={lead} support={support} />

        {/* Latest · feature · most read · newsletter ------------- */}
        <section
          id="latest"
          /* Explicit fractions rather than 12-col spans: a 2-of-12 "پربازدیدترین"
             column was only 189px, which wrapped its headlines into a 1335px
             tower and stretched every sibling to match. */
          className="mt-16 grid scroll-mt-32 grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 md:grid-cols-2 lg:grid-cols-[2.5fr_4fr_2.5fr_3fr]"
        >
          {/* Latest — compact chronological list */}
          <div>
            <LatestNewsFeed articles={latest.slice(0, 5)} showTimeRail={false} compact />
          </div>

          {/* Feature — one large image-led story */}
          {latestFeature ? (
            <div>
              <Reveal>
                <ArticleCard
                  article={latestFeature}
                  variant="image"
                  headingLevel="h2"
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  imageAspect="aspect-[16/10] lg:aspect-[4/5]"
                />
              </Reveal>
            </div>
          ) : null}

          {/* Most read — red ranking */}
          <aside aria-label="پربازدیدترین">
            <TrendingList articles={mostRead} />
          </aside>

          {/* Newsletter — rich red accent block */}
          <aside aria-label="خبرنامه">
            <NewsletterCard
              variant="panel"
              title="گزارش‌هایی که جهان ما را شکل می‌دهند"
              description="گزیده‌ای از مهم‌ترین‌ها، هر روز."
            />
          </aside>
        </section>

        <AdSlot placement="homepage" className="mt-12 sm:mt-16" />

        {/* Technology -------------------------------------------- */}
        {technologyFeature ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="technology-heading">
            <SectionHeader title="فناوری" href="/category/technology" />

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <ArticleCard
                  article={technologyFeature}
                  variant="standard"
                  headingLevel="h3"
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="[&_h3]:text-xl sm:[&_h3]:text-2xl"
                />
              </Reveal>

              <div className="lg:col-span-5">
                <div className="space-y-6 lg:border-s lg:border-line lg:ps-8">
                  {technologySupport.map((article, index) => (
                    <Reveal
                      key={article.id}
                      delay={index * 0.06}
                      className={index > 0 ? 'border-t border-line pt-6' : undefined}
                    >
                      <ArticleCard
                        article={article}
                        variant="horizontal"
                        showSummary={false}
                        headingLevel="h3"
                      />
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Health ------------------------------------------------ */}
        {health.length > 0 ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="health-heading">
            <SectionHeader title="سلامت" href="/category/health" />
            <ArticleGrid articles={health} columns={3} divided />
          </section>
        ) : null}

        {/* Politics and World ----------------------------------- */}
        <section className="mt-12 sm:mt-16" aria-labelledby="politics-heading">
          <SectionHeader title="سیاست و جهان" titleKey="politicsWorld" href="/category/politics" />
          <ArticleGrid
            articles={politicsWorld}
            columns={4}
            showSummary={false}
            variant="standard"
          />
        </section>
      </div>

      {/* Editor's picks — row of elevated editorial cards --------
          Skipped entirely when empty: a section rule and heading standing over
          nothing reads as a broken page, which is exactly what an automated
          feed with no editorial flags would produce. */}
      {editorsPicks.length > 0 ? (
        <section className="frame mt-12 sm:mt-16" aria-labelledby="picks-heading">
          {/* The row renders its own section rule so the scroll controls can
              sit on it. Card projection only — bodies stay server-side. */}
          <EditorsPicksRow articles={toCardArticles(editorsPicks)} />
        </section>
      ) : null}

      <div className="frame">
        {/* Society — image cards --------------------------------- */}
        {society.length > 0 ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="society-heading">
            <SectionHeader title="جامعه" href="/category/society" />
            <ArticleGrid articles={society} variant="image" columns={3} />
          </section>
        ) : null}

        {/* Business --------------------------------------------- */}
        {businessLead ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="business-heading">
            <SectionHeader title="اقتصاد" titleKey="business" href="/category/business" />

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-5">
                <ArticleCard article={businessLead} variant="standard" headingLevel="h3" />
              </Reveal>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7 lg:ps-2">
                {businessRest.map((article, index) => (
                  <Reveal key={article.id} delay={index * 0.06}>
                    <ArticleCard
                      article={article}
                      variant={article.kind === 'opinion' ? 'opinion' : 'compact'}
                      headingLevel="h3"
                      className={article.kind === 'opinion' ? 'h-full' : undefined}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Culture — magazine layout ---------------------------- */}
        {cultureLead ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="culture-heading">
            <SectionHeader title="فرهنگ" titleKey="culture" href="/category/culture" />

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <ArticleCard
                  article={cultureLead}
                  variant="image"
                  headingLevel="h3"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  imageAspect="aspect-[4/3] sm:aspect-[16/10]"
                />
              </Reveal>

              <div className="space-y-8 lg:col-span-5">
                {cultureRest.map((article, index) => (
                  <Reveal
                    key={article.id}
                    delay={index * 0.06}
                    className={index > 0 ? 'border-t border-line pt-8' : undefined}
                  >
                    <ArticleCard article={article} variant="horizontal" headingLevel="h3" />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Sports and events ------------------------------------- */}
        {sports.length > 0 ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="sports-heading">
            <SectionHeader title="ورزش" href="/category/sports" />
            <ArticleGrid articles={sports} columns={3} showSummary={false} />
          </section>
        ) : null}

        {events.length > 0 ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="events-heading">
            <SectionHeader title="رویداد" href="/category/event" />
            <ArticleGrid articles={events} columns={3} showSummary={false} />
          </section>
        ) : null}

        {/* In depth --------------------------------------------- */}
        {inDepth.length > 0 ? (
        <section className="mt-12 sm:mt-16" aria-labelledby="indepth-heading">
          <SectionHeader title="پرونده" href="/search?q=analysis" linkLabel="مرور گزارش‌های بلند" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {inDepth.map((article, index) => (
              <Reveal key={article.id} delay={index * 0.08}>
                <ArticleCard
                  article={article}
                  variant="featured"
                  headingLevel="h3"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="[&_h3]:text-xl sm:[&_h3]:text-2xl"
                />
              </Reveal>
            ))}
          </div>

          <Link
            href="/search?q=analysis"
            className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand-red"
          >
            <span className="link-underline">مرور همهٔ گزارش‌های بلند</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:-scale-x-100"
            />
          </Link>
        </section>
        ) : null}
      </div>

      {/* Newsletter ------------------------------------------- */}
      <div className="frame mt-12 sm:mt-16">
        <NewsletterCard />
      </div>
    </>
  );
}
