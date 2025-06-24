import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../../services/api";
import TaskForm from "./TaskForm";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = () => {
    getTasks().then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette tâche ?")) {
      deleteTask(id).then(() => fetchTasks());
    }
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleFormSaved = () => {
    setShowForm(false);
    setTaskToEdit(null);
    fetchTasks();
  };

  return (
    <div className="container">
      <h2 className="mb-4">Tâches</h2>

      <button
        className="btn btn-success mb-3"
        onClick={() => {
          setTaskToEdit(null);
          setShowForm(!showForm);
        }}
      >
        {showForm ? <><FaTimes /> Fermer</> : <><FaPlus /> Nouvelle tâche</>}
      </button>

      {showForm && (
        <TaskForm
          taskToEdit={taskToEdit}
          onTaskSaved={handleFormSaved}
          onCancel={() => {
            setShowForm(false);
            setTaskToEdit(null);
          }}
        />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Description</th>
            <th>Utilisateur assigné</th>
            <th>Produit lié</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.description}</td>
              <td>{t.assignedUser?.name || "—"}</td>
              <td>{t.relatedProduct?.name || "—"}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(t)}>
                  <FaEdit /> Modifier
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(t.id)}>
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

export default TaskList;
