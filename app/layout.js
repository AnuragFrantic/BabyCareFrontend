import {
  Jost,
  Baloo_Chettan_2,
  Nunito_Sans,
} from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const baloo = Baloo_Chettan_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});


const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata = {
  title: "Buchiki - Your One-Stop Online Store for Baby Products",
  description: "Buchiki is your one-stop online store for all things baby. We offer a wide range of high-quality baby products, including toys, clothing, feeding accessories, and more. Shop with confidence and convenience at Buchiki.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${jost.variable}
        ${baloo.variable}
        ${nunito.variable}

        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">

        {children}

      </body>
    </html>
  );
}