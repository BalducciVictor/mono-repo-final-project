import { Icon } from "../../components/atoms/icons";
import { FormularInput } from "../../components/molecules/FormularInput";
import AuthImage from "../../assets/icons/auth.png";

export const Auth = () => {
  return (
    <div>
      <section>
        <Icon
          name={"mainLogo"}
        />
        <h1>Welcome Back</h1>
        <p>Merci de choisir votre profil pour vous connecter</p>
        <p>Nouveau collaborateur</p>
        <p>Admin</p>
        <div>
          <FormularInput
            label={"Email"}
            placeholder={"mail@exemple.com"}
            type={"mail"}
          />
          <FormularInput
            label={"Mot de passe"}
            placeholder={"Min. 8 characters"}
            type={"password"}
          />
        </div>
        <button>Sing in</button>
      </section>
      <section>
        <img src={AuthImage} alt="auth icon"/>
        <h2>Bienvenue sur Onby !</h2>
        <p>
          Vous avez récemment rejoint notre groupe, avant tout bienvenue !
          Onby est une plateforme interne qui va vous accompagner 
          à vous connecter à notre environnement de développement
          afin d’avoir accès à nos produits.
        </p>
      </section>
    </div>
  )
}
