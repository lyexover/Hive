'use client'
import { useState } from "react"
import styles from '@/css-modules/auth.module.css'
import { useActionState } from "react";
import { login, signUp } from "@/app/actions/authActions";

export default function Form({ isLoginPage }) {
    const [isLogin, setIsLogin] = useState(isLoginPage);
    const initialState = { errorMessage: '' };
    
    // Use separate action states for login and signup
    const [loginState, loginAction, loginPending] = useActionState(login, initialState);
    const [signUpState, signUpAction, signUpPending] = useActionState(signUp, initialState);

    // Determine which state and action to use based on current mode
    const currentState = isLogin ? loginState : signUpState;
    const currentAction = isLogin ? loginAction : signUpAction;
    const pending = isLogin ? loginPending : signUpPending;

    const handleToggle = () => {
        setIsLogin(!isLogin);
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

                <form action={currentAction} className={styles.form}>
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

                    <button 
                        type="submit" 
                        className={styles.submitBtn}
                        disabled={pending}
                    >
                        {pending ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
                    </button>

                    <div className={styles.errorMessage}>
                        {currentState.errorMessage && <p>{currentState.errorMessage}</p>}
                    </div>
                </form>

                <div className={styles.formFooter}>
                    <span>
                        {isLogin 
                            ? "Vous n'avez pas de compte ?" 
                            : "Vous avez déjà un compte ?"}
                    </span>
                    <button 
                        type="button"
                        onClick={handleToggle}
                        className={styles.toggleBtn}
                    >
                        {isLogin ? "S'inscrire" : "Se connecter"}
                    </button>
                </div>
            </div>
        </div>
    );
}