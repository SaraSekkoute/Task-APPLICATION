import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../../services/api";

function ProductForm({ productToEdit, onProductSaved, onCancel }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      setPrice(productToEdit.price || "");
    } else {
      setName("");
      setPrice("");
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, price: parseFloat(price) };

    if (productToEdit) {
      updateProduct(productToEdit.id, product)
        .then(() => {
          alert("✅ Produit mis à jour !");
          onProductSaved();
        })
        .catch(() => alert("❌ Erreur lors de la mise à jour"));
    } else {
      createProduct(product)
        .then(() => {
          alert("✅ Produit ajouté !");
          onProductSaved();
        })
        .catch(() => alert("❌ Erreur lors de l'ajout"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
      <h5>{productToEdit ? "✏️ Modifier un produit" : "➕ Ajouter un produit"}</h5>

      <div className="mb-3">
        <label className="form-label">Nom</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Prix (€)</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          step="0.01"
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {productToEdit ? "Mettre à jour" : "Créer"}
        </button>
        {productToEdit && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
