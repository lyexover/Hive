
import Header from "@/components/Header";
import styles from '@/css-modules/landing.module.css'
import Section1 from "@/components/Section1";


export default function LandingPage() {
  return (
    <main className={styles.landingPage}>
      <Header />
      <Section1 />
    </main>
  );
}
