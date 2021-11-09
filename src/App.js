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

function App() {
  return (
    <FirebaseContext>
      <CartContext>
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
          </Switch>
        </BrowserRouter>
      </CartContext>
    </FirebaseContext>
  );
}

export default App;
