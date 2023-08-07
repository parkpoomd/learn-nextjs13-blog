import "./globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/navigation/footer";
import { getDictionary } from "@/lib/getDictionary";
import siteConfig from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Explorer",
//   description:
//     "A minimal and lovely travel blog which shares experiences and cities around the world",
// };

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  // Get the Dictionary based on lang
  const dictionary = await getDictionary(lang);

  return {
    title: {
      template: `%s | ${siteConfig.siteName}`,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: siteConfig.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/opengraph-image.png`,
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "de-DE": `${process.env.NEXT_PUBLIC_SITE_URL}/de`,
      },
    },
  };
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <Navigation locale={lang} />
        <div className="min-h-[calc(100vh-300px)] pt-10">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
