import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../services/api";
import ProductForm from "./ProductForm";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = () => {
    getProducts().then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      deleteProduct(id).then(() => fetchProducts());
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowForm(true);
  };

  const handleFormSaved = () => {
    setProductToEdit(null);
    setShowForm(false);
    fetchProducts();
  };

  return (
    <div className="container">
      <h2 className="mb-4">Produits</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setProductToEdit(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? <><FaTimes /> Fermer</> : <><FaPlus /> Ajouter un produit</>}
      </button>

      {showForm && (
        <ProductForm
          productToEdit={productToEdit}
          onProductSaved={handleFormSaved}
          onCancel={() => {
            setShowForm(false);
            setProductToEdit(null);
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prix (€)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>
                  <FaEdit /> Modifier
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                  <FaTrash /> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
