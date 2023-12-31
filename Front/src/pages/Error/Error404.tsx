import { Link } from "react-router-dom";
import coffreFort from "../../assets/images/coffre-fort-vide.jpg";
import "./style.css"
export default function ErrorPage() {
  return (
    <div id="error-page">
      <h1>
        Oops ! La page que vous recherchez n'est
        malheureusement pas ici.
      </h1>
      <p>Revenez à la <Link to="/">page  d'accueil</Link>  </p> 
      <div><img src={coffreFort} alt="Coffre-fort vide" /></div>
    </div>
  );
}
