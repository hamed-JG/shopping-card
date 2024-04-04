import Card from "../components/Card";
import { useProducts } from "../context/ProductContext";
import styles from "./products.module.css";

function Products() {
  const products = useProducts();
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        <div>{!products.length && <div>Loading...</div>}</div>
        {products.map((p) => (
          <Card key={p.id} data={p}>{p.title}</Card>
        ))}
      </div>
      <div>Sidebar</div>
    </div>
  );
}

export default Products;
