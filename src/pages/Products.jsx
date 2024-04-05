import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProducts } from "../context/ProductContext";

import Card from "../components/Card";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import {
  searchProducts,
  filterProducts,
  getInitialQuery,
} from "../helpers/helpers";

import styles from "./products.module.css";

function Products() {
  const products = useProducts("");

  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState([]);
  const [query, setQuery] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplay(products);
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplay(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBar search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {!display.length && <Loader></Loader>}
          {display.map((p) => (
            <Card key={p.id} data={p}>
              {p.title}
            </Card>
          ))}
        </div>
        <SideBar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default Products;
