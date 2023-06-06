import Head from 'next/head';
import { useRouter } from 'next/router';

// !STARTERCONF Change these default meta
const defaultMeta = {
  title: 'Next.js + Tailwind CSS + TypeScript Starter',
  siteName: 'Next.js + Tailwind CSS + TypeScript Starter',
  description:
    'A starter for Next.js, Tailwind CSS, and TypeScript with Absolute Import, Seo, Link component, pre-configured with Husky',
  /** Without additional '/' on the end, e.g. https://theodorusclarence.com */
  url: 'https://tsnext-tw.thcl.dev',
  type: 'website',
  robots: 'follow, index',
  /**
   * No need to be filled, will be populated with openGraph function
   * If you wish to use a normal image, just specify the path below
   */
  image: 'https://tsnext-tw.thcl.dev//images/large-og.png',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  // Use siteName if there is templateTitle
  // but show full title if there is none
  // !STARTERCONF Follow config for opengraph, by deploying one on https://github.com/theodorusclarence/og
  // ? Uncomment code below if you want to use default open graph
  // meta['image'] = openGraph({
  //   description: meta.description,
  //   siteName: props.templateTitle ? meta.siteName : meta.title,
  //   templateTitle: props.templateTitle,
  // });

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />
      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />
      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      {/* // !STARTERCONF Remove or change to your handle */}
      {/* <meta name='twitter:site' content='@th_clarence' /> */}
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta
            name='publish_date'
            property='og:publish_date'
            content={meta.date}
          />
          {/* // !STARTERCONF Remove or change to your name */}
          <meta
            name='author'
            property='article:author'
            content='Theodorus Clarence'
          />
        </>
      )}

      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content='/browserconfig.xml' />
      <meta name='theme-color' content='#ffffff' />
      <link rel='icon' type='image/jpeg' href='/images/logo.original.jpeg' />
      <link rel='manifest' href='/manifest.json' />
      <link rel='apple-touch-icon' href='/images/apple-icon-180.png' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2048-2732.jpg'
        media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2732-2048.jpg'
        media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1668-2388.jpg'
        media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2388-1668.jpg'
        media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1536-2048.jpg'
        media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2048-1536.jpg'
        media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1668-2224.jpg'
        media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2224-1668.jpg'
        media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1620-2160.jpg'
        media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2160-1620.jpg'
        media='(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1290-2796.jpg'
        media='(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2796-1290.jpg'
        media='(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1179-2556.jpg'
        media='(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2556-1179.jpg'
        media='(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1284-2778.jpg'
        media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2778-1284.jpg'
        media='(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1170-2532.jpg'
        media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2532-1170.jpg'
        media='(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1125-2436.jpg'
        media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2436-1125.jpg'
        media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1242-2688.jpg'
        media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2688-1242.jpg'
        media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-828-1792.jpg'
        media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1792-828.jpg'
        media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1242-2208.jpg'
        media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-2208-1242.jpg'
        media='(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-750-1334.jpg'
        media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1334-750.jpg'
        media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-640-1136.jpg'
        media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)'
      />
      <link
        rel='apple-touch-startup-image'
        href='/images/apple-splash-1136-640.jpg'
        media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)'
      />
    </Head>
  );
}
