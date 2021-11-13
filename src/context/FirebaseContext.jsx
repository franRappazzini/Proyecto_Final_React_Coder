import React, { createContext, useContext, useEffect, useState } from "react";
import { getFirebase } from "../services/getFirebase";

const firebaseContext = createContext();
export const useFirebaseContext = () => useContext(firebaseContext);

function FirebaseContext({ children }) {
  const [productos, setProductos] = useState([]);
  const [categoriaParam, setCategoriaParam] = useState(null);
  const [idParam, setIdParam] = useState(null);
  const [stockItem, setStockItem] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const db = getFirebase();

    setProductos(null);

    if (categoriaParam) {
      db.collection("productos")
        .where("categoria", "==", categoriaParam)
        .get()
        .then((res) =>
          setProductos(res.docs.map((p) => ({ id: p.id, ...p.data() })))
        )
        .catch((err) => console.log(`Error: ${err}`));
    } else if (idParam) {
      db.collection("productos")
        .doc(idParam)
        .get()
        .then((res) => {
          setProductos({ id: res.id, ...res.data() });
          setStockItem(res.data().stock);
        })
        .catch((err) => console.log(`Error: ${err}`));
    } else {
      db.collection("productos")
        .get()
        .then((res) =>
          setProductos(res.docs.map((p) => ({ id: p.id, ...p.data() })))
        )
        .catch((err) => console.log(`Error: ${err}`));
    }
  }, [categoriaParam, idParam]);

  return (
    <firebaseContext.Provider
      value={{
        productos,
        setCategoriaParam,
        setIdParam,
        stockItem,
        setStockItem,
        busqueda,
        setBusqueda,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
}

export default FirebaseContext;
