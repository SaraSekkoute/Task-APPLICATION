import { useEffect, useState } from "react";
import {
  createTask,
  updateTask,
  getUsers,
  getProducts,
} from "../../services/api";

function TaskForm({ taskToEdit, onTaskSaved, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [relatedProductId, setRelatedProductId] = useState("");

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data));
    getProducts().then((res) => setProducts(res.data));
  }, []);

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setAssignedUserId(taskToEdit.assignedUser?.id || "");
      setRelatedProductId(taskToEdit.relatedProduct?.id || "");
    } else {
      setTitle("");
      setDescription("");
      setAssignedUserId("");
      setRelatedProductId("");
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      assignedUser: assignedUserId ? { id: assignedUserId } : null,
      relatedProduct: relatedProductId ? { id: relatedProductId } : null,
    };

    if (taskToEdit) {
      updateTask(taskToEdit.id, task)
        .then(() => {
          alert("✅ Tâche mise à jour !");
          onTaskSaved();
        })
        .catch(() => alert("❌ Erreur lors de la mise à jour"));
    } else {
      createTask(task)
        .then(() => {
          alert("✅ Tâche créée !");
          onTaskSaved();
        })
        .catch(() => alert("❌ Erreur lors de la création"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
      <h5>{taskToEdit ? "✏️ Modifier la tâche" : "➕ Nouvelle tâche"}</h5>

      <div className="mb-3">
        <label className="form-label">Titre</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Utilisateur assigné</label>
        <select
          className="form-select"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        >
          <option value="">-- Aucun --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Produit lié</label>
        <select
          className="form-select"
          value={relatedProductId}
          onChange={(e) => setRelatedProductId(e.target.value)}
        >
          <option value="">-- Aucun --</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {taskToEdit ? "Mettre à jour" : "Créer"}
        </button>
        {taskToEdit && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
