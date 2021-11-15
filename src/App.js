import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import FirebaseContext from "./context/FirebaseContext";
import ItemListContainer from "./components/ItemList/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetail/ItemDetailContainer";
import CartContext from "./context/CartContext";
import Cart from "./components/Cart/Cart";
import FormCompra from "./components/Form/FormCompra";
import Favoritos from "./components/Favoritos/Favoritos";
import FavoritosContext from "./context/FavoritosContext";
import Error404 from "./components/Error/Error404";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <FirebaseContext>
      <CartContext>
        <FavoritosContext>
          <BrowserRouter>
            <Header />

            <Switch>
              <Route exact path="/" component={Home} />

              <Route
                exact
                path="/categoria/:idCategoria"
                component={ItemListContainer}
              />

              <Route
                exact
                path="/producto/:idProducto"
                component={ItemDetailContainer}
              />

              <Route exact path="/carrito" component={Cart} />

              <Route exact path="/favoritos" component={Favoritos} />

              <Route exact path="/checkout" component={FormCompra} />

              <Route exact path="*" component={Error404} />
            </Switch>

            <Footer />
          </BrowserRouter>
        </FavoritosContext>
      </CartContext>
    </FirebaseContext>
  );
}

export default App;
