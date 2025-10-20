import {Inter} from "next/font/google";
import Header from "@/components/Header";
import styles from '@/css-modules/landing.module.css'
const inter = Inter({ subsets: ["latin"] });
import Section1 from "@/components/Section1";


export default function LandingPage() {
  return (
    <main className={`${inter.className} ${styles.landingPage}`}>
      <Header />
      <Section1 />
    </main>
  );
}
