import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AdSlot } from '@/components/ads/AdSlot';
import { ArticleCard } from '@/components/article/ArticleCard';
import { ArticleGrid } from '@/components/article/ArticleGrid';
import { EditorsPicksRow } from '@/components/article/EditorsPicksRow';
import { HeroStory } from '@/components/article/HeroStory';
import { LatestNewsFeed } from '@/components/article/LatestNewsFeed';
import { TrendingList } from '@/components/article/TrendingList';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  getArticlesByCategory,
  getByCategories,
  getEditorsPicks,
  getHeroSupport,
  getHomePinned,
  getInDepth,
  getLatest,
  getLeadStory,
  getMostRead,
  toCardArticles,
} from '@/lib/articles';

export default function HomePage() {
  /**
   * Hero. Editor pins come first — the first pin is the lead, the second
   * opens the top-stories rail — and the automatic choice fills whatever they
   * leave. With no live pins this is exactly the previous behaviour.
   */
  const pinned = getHomePinned();
  const pinnedIds = pinned.map((article) => article.id);

  const lead = pinned[0] ?? getLeadStory();
  const support = [
    ...pinned.slice(1),
    ...getHeroSupport(3, lead?.id).filter((article) => !pinnedIds.includes(article.id)),
  ].slice(0, 3);
  const heroIds = [lead?.id, ...support.map((article) => article.id)].filter(
    (id): id is string => Boolean(id),
  );

  /**
   * 🔴 Every story in the hero appears once on this page. Each section below
   * skips `heroIds` before it counts, so it still fills to its full length.
   * Without this the lead turned up again in «پربازدیدترین» and in its own
   * desk's section — and a pinned story, the one the editor most wants seen,
   * would have been the most repeated thing on the page.
   */
  const latestAll = getLatest(7, heroIds);
  const latest = latestAll;
  // One image-led story anchors the middle of the latest row.
  const latestFeature = latestAll.find((article) => article.id !== latestAll[0]?.id);
  const mostRead = getMostRead(5, undefined, heroIds);

  const technology = getArticlesByCategory('technology', 5, heroIds);
  const [technologyFeature, ...technologySupport] = technology;

  const health = getArticlesByCategory('health', 3, heroIds);
  const politicsWorld = getByCategories(['politics', 'world'], 4, heroIds);
  const society = getArticlesByCategory('society', 3, heroIds);
  // No `sports` section: the desk is hidden, and a homepage rail is exactly the
  // route to it that Task 6 closes. Its category page still exists.
  const events = getArticlesByCategory('event', 3, heroIds);
  const business = getArticlesByCategory('business', 4, heroIds);
  const [businessLead, ...businessRest] = business;
  const culture = getArticlesByCategory('culture', 3, heroIds);
  const [cultureLead, ...cultureRest] = culture;
  const editorsPicks = getEditorsPicks(4, heroIds);
  const inDepth = getInDepth(2, heroIds);

  return (
    <>
      <div className="frame">
        {/* Hero ------------------------------------------------- */}
        {lead ? <HeroStory lead={lead} support={support} pinnedIds={pinnedIds} /> : null}

        {/* Latest · feature · most read · newsletter ------------- */}
        <section
          id="latest"
          /* Explicit fractions rather than 12-col spans: a 2-of-12 "پربازدیدترین"
             column was only 189px, which wrapped its headlines into a 1335px
             tower and stretched every sibling to match. */
          className="mt-16 grid scroll-mt-32 grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 md:grid-cols-2 lg:grid-cols-[3fr_5fr_3fr]"
        >
          {/* Latest — compact chronological list */}
          {latest.length > 0 ? (
            <div>
              <LatestNewsFeed articles={latest.slice(0, 5)} showTimeRail={false} compact />
            </div>
          ) : null}

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

          {/* Most read — ranked list. Renders nothing when the corpus is
              too small to rank, rather than a heading over an empty column. */}
          {mostRead.length > 0 ? (
            <aside aria-label="پربازدیدترین">
              <TrendingList articles={mostRead} />
            </aside>
          ) : null}
        </section>

        <AdSlot placement="homepage" className="mt-12 sm:mt-16" />

        {/* Technology -------------------------------------------- */}
        {technologyFeature ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="technology-heading">
            <SectionHeader title="فناوری" href="/category/technology/" />

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
            <SectionHeader title="سلامت" href="/category/health/" />
            <ArticleGrid articles={health} columns={3} divided />
          </section>
        ) : null}

        {/* Politics and World ----------------------------------- */}
        {politicsWorld.length > 0 ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="politics-heading">
            <SectionHeader title="سیاست و جهان" titleKey="politicsWorld" href="/category/politics/" />
            <ArticleGrid
              articles={politicsWorld}
              columns={4}
              showSummary={false}
              variant="standard"
            />
          </section>
        ) : null}
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
            <SectionHeader title="جامعه" href="/category/society/" />
            <ArticleGrid articles={society} variant="image" columns={3} />
          </section>
        ) : null}

        {/* Business --------------------------------------------- */}
        {businessLead ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="business-heading">
            <SectionHeader title="اقتصاد" titleKey="business" href="/category/business/" />

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
            <SectionHeader title="سرگرمی" titleKey="culture" href="/category/culture/" />

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

        {/* Events ------------------------------------------------ */}
        {events.length > 0 ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="events-heading">
            <SectionHeader title="رویداد" href="/category/event/" />
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

    </>
  );
}
