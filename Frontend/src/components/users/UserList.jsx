import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/api";
import UserForm from "./UserForm";
import { FaEdit, FaPlus, FaTimes, FaTrash } from "react-icons/fa";

function UserList() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = () => {
    getUsers().then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Confirmer la suppression ?")) {
      deleteUser(id).then(() => fetchUsers());
    }
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setShowForm(true);
  };

  const handleFormSaved = () => {
    fetchUsers();
    setShowForm(false);
    setUserToEdit(null);
  };

  return (
    <div className="container">
      <h2 className="mb-4">Utilisateurs</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setUserToEdit(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? <><FaTimes /> Fermer</> : <><FaPlus /> Ajouter un utilisateur</>}
      </button>

      {showForm && (
        <UserForm
          userToEdit={userToEdit}
          onUserSaved={handleFormSaved}
          onCancel={() => {
            setUserToEdit(null);
            setShowForm(false);
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(u)}>
                  <FaEdit /> Modifier
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.id)}>
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

export default UserList;
