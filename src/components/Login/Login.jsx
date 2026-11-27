
import { useState } from "react";
import style from './Login.module.css';
import travelBackground from "../../assets/travel-background.png";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erreurs, setErreurs] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        const nouvellesErreurs = {};

        if (!email.trim()) {
            nouvellesErreurs.email = "Veuillez introduire votre email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nouvellesErreurs.email = "Adresse email invalide";
        }

        if (!password.trim()) {
            nouvellesErreurs.password = "Veuillez introduire votre mot de passe";
        }

        if (Object.keys(nouvellesErreurs).length > 0) {
            setErreurs(nouvellesErreurs);
            return;
        }

        setErreurs({});

        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const responseText = await response.text();

            if (response.ok) {
                let data = {};

                try {
                    data = JSON.parse(responseText);
                } catch {
                    data.message = responseText;
                }

                alert("Connexion réussie ! Bienvenue " + (data.nom || ""));
                console.log("Utilisateur connecté :", data);
            } else {
            setErreurs({
                general: responseText || "Email ou mot de passe incorrect."
            });
            }

        } catch (error) {
            console.error("Erreur:", error);
            setErreurs({
                general: "Impossible de contacter le serveur."
            });
        }
    }

    return (
        <div className={style.container} style={{ backgroundImage: `url(${travelBackground})` }}>
            <div className={style.loginCard}>

                <h1 className={style.logo}>Travel Agency</h1>

                <p className={style.slogan}>
                    Découvrez le monde avec nous
                </p>

                <h2 className={style.title}>Bienvenue !</h2>

                <p className={style.subtitle}>
                    Connectez-vous à votre compte pour continuer.
                </p>

                <form className={style.form} onSubmit={handleSubmit}>

                    <div className={style.formGroup}>
                        <label htmlFor="email">Adresse email</label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Entrez votre email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />

                        {erreurs.email && (
                            <p className={style.error}>{erreurs.email}</p>
                        )}
                    </div>

                    <div className={style.formGroup}>
                        <label htmlFor="password">Mot de passe</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className={style.togglePassword}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    </button>

                    {erreurs.password && (
                        <p className={style.error}>{erreurs.password}</p>
                    )}

                    {erreurs.general && (
                        <p className={style.error}>{erreurs.general}</p>
                    )}

                    <button
                        type="submit"
                        className={style.loginButton}
                    >
                        Se connecter
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Login;
