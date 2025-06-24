import { useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/api";

function UserForm({ userToEdit, onUserSaved, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name || "");
      setEmail(userToEdit.email || "");
    } else {
      setName("");
      setEmail("");
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email };

    if (userToEdit) {
      updateUser(userToEdit.id, user)
        .then(() => {
          alert("✅ Utilisateur mis à jour !");
          onUserSaved();
        })
        .catch(() => alert("❌ Erreur lors de la mise à jour"));
    } else {
      createUser(user)
        .then(() => {
          alert("✅ Utilisateur ajouté !");
          onUserSaved();
        })
        .catch(() => alert("❌ Erreur lors de l'ajout"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
      <h5>{userToEdit ? "✏️ Modifier un utilisateur" : "➕ Ajouter un utilisateur"}</h5>

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
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {userToEdit ? "Mettre à jour" : "Créer"}
        </button>
        {userToEdit && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
