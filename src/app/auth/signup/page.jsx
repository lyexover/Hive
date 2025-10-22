import Header from "@/components/auth/Header";
import styles from '@/css-modules/auth.module.css';
import Form from "@/components/auth/Form";


export default function SignupPage() {
  return (

    <main className={styles.main}>

         <Header />
         <Form isLoginPage={false} />

    </main>

   
    
  );
}