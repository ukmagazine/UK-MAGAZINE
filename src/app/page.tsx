import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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

  const aiTech = getByCategories(['ai', 'technology'], 5);
  const [aiFeature, ...aiSupport] = aiTech;

  const education = getArticlesByCategory('education', 3);
  const politicsWorld = getByCategories(['politics', 'world'], 4);
  const scienceEnvironment = getByCategories(['science', 'environment'], 3);
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
          /* Explicit fractions rather than 12-col spans: a 2-of-12 "Most read"
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
          <aside aria-label="Most read">
            <TrendingList articles={mostRead} />
          </aside>

          {/* Newsletter — rich red accent block */}
          <aside aria-label="Newsletter">
            <NewsletterCard
              variant="panel"
              title="The stories that shape our world"
              description="Curated insights, delivered daily."
            />
          </aside>
        </section>

        {/* AI and Technology ------------------------------------ */}
        {aiFeature ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="ai-tech-heading">
            <SectionHeader title="AI and Technology" titleKey="aiTech" href="/category/ai" />

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <ArticleCard
                  article={aiFeature}
                  variant="standard"
                  headingLevel="h3"
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="[&_h3]:text-xl sm:[&_h3]:text-2xl"
                />
              </Reveal>

              <div className="lg:col-span-5">
                <div className="space-y-6 lg:border-s lg:border-line lg:ps-8">
                  {aiSupport.map((article, index) => (
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

        {/* Education -------------------------------------------- */}
        <section className="mt-12 sm:mt-16" aria-labelledby="education-heading">
          <SectionHeader title="Education" titleKey="education" href="/category/education" />
          <ArticleGrid articles={education} columns={3} divided />
        </section>

        {/* Politics and World ----------------------------------- */}
        <section className="mt-12 sm:mt-16" aria-labelledby="politics-heading">
          <SectionHeader title="Politics and World" titleKey="politicsWorld" href="/category/politics" />
          <ArticleGrid
            articles={politicsWorld}
            columns={4}
            showSummary={false}
            variant="standard"
          />
        </section>
      </div>

      {/* Editor's picks — row of elevated editorial cards -------- */}
      <section className="frame mt-12 sm:mt-16" aria-labelledby="picks-heading">
        {/* The row renders its own section rule so the scroll controls can
            sit on it. Card projection only — bodies stay server-side. */}
        <EditorsPicksRow articles={toCardArticles(editorsPicks)} />
      </section>

      <div className="frame">
        {/* Science and Environment — image cards ---------------- */}
        <section className="mt-12 sm:mt-16" aria-labelledby="science-heading">
          <SectionHeader title="Science and Environment" titleKey="scienceEnvironment" href="/category/science" />
          <ArticleGrid articles={scienceEnvironment} variant="image" columns={3} />
        </section>

        {/* Business --------------------------------------------- */}
        {businessLead ? (
          <section className="mt-12 sm:mt-16" aria-labelledby="business-heading">
            <SectionHeader title="Business" titleKey="business" href="/category/business" />

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
            <SectionHeader title="Culture" titleKey="culture" href="/category/culture" />

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

        {/* In depth --------------------------------------------- */}
        <section className="mt-12 sm:mt-16" aria-labelledby="indepth-heading">
          <SectionHeader title="In depth" href="/search?q=analysis" linkLabel="Browse long reads" />

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
            <span className="link-underline">Browse every long read</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1 rtl:-scale-x-100"
            />
          </Link>
        </section>
      </div>

      {/* Newsletter ------------------------------------------- */}
      <div className="frame mt-12 sm:mt-16">
        <NewsletterCard />
      </div>
    </>
  );
}
