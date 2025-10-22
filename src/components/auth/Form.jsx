'use client'
import { useState } from "react"
import styles from '@/css-modules/auth.module.css'

export default function Form({isLoginPage}){

    const [isLogin, setIsLogin] = useState(isLoginPage ? true : false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique d'action à ajouter
    };

    return (
        <div className={styles.formContainer}>
            <div className={styles.formCard}>
                <div className={styles.formHeader}>
                    <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
                    <p className={styles.subtitle}>
                        {isLogin 
                            ? 'Connectez-vous à votre compte' 
                            : 'Créez votre compte'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {!isLogin && (
                        <>
                            <div className={styles.inputGroup}>
                                <label htmlFor="nom">Nom</label>
                                <input 
                                    type="text" 
                                    id="nom" 
                                    name="nom"
                                    placeholder="Votre nom"
                                    required
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="prenom">Prénom</label>
                                <input 
                                    type="text" 
                                    id="prenom" 
                                    name="prenom"
                                    placeholder="Votre prénom"
                                    required
                                />
                            </div>
                        </>
                    )}

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password">Mot de passe</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {isLogin ? 'Se connecter' : "S'inscrire"}
                    </button>
                </form>

                <div className={styles.formFooter}>
                    <span>
                        {isLogin 
                            ? "Vous n'avez pas de compte ?" 
                            : "Vous avez déjà un compte ?"}
                    </span>
                    <button 
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                        className={styles.toggleBtn}
                    >
                        {isLogin ? "S'inscrire" : "Se connecter"}
                    </button>
                </div>
            </div>
        </div>
    )
}