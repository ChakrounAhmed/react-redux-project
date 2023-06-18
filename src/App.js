import "./App.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  completeTodo,
  deleteTodo,
  updateTodo,
} from "./JS/actions/todoActions";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [task, setTask] = useState("");
  const [editTask, setEditTask] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [filter, setFilter] = useState("All");
  const todos = useSelector((state) => state.todoReducer);
  const dispatch = useDispatch();

  const handleEdit = (todoId) => {
    handleShow();
    setEditTask("");
    setEditTodoId(todoId);
  };

  const handleSaveChanges = () => {
    dispatch(updateTodo(editTask, editTodoId));
    handleClose();
    setEditTask("");
    setEditTodoId(null);
  };

  const handleCloseEdit = () => {
    handleClose();
    setEditTask("");
    setEditTask(null);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="add task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch(addTodo(task));
          setTask("");
        }}
      >
        Add Task
      </button>
      <button onClick={() => setFilter("All")}>All</button>
      <button onClick={() => setFilter("Done")}>Done</button>
      <button onClick={() => setFilter("Undone")}>Undone</button>

      {filter === "All"
        ? todos.map((el) => (
            <div>
              {el.title !== "" && (
                <div>
                  <h2>{el.title}</h2>

                  <Button variant="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                  <Modal
                    show={show}
                    onHide={() => {
                      handleClose();
                      setEditTask("");
                    }}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <input
                        type="text"
                        placeholder="edit task..."
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(deleteTodo(el.id))}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => dispatch(completeTodo(el.id))}
                  >
                    {el.complete ? "Done" : "Undone"}
                  </Button>
                </div>
              )}
            </div>
          ))
        : filter === "Done"
        ? todos
            .filter((el) => el.complete === true)
            .map((el) => (
              <div>
                {el.title !== "" && (
                  <div>
                    <h2>{el.title}</h2>
                    <Button variant="primary" onClick={() => handleEdit(el.id)}>
                      Edit
                    </Button>
                    <Modal
                      show={show}
                      onHide={() => {
                        handleClose();
                        setEditTask("");
                      }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <input
                          type="text"
                          placeholder="edit task..."
                          value={editTask}
                          onChange={(e) => setEditTask(e.target.value)}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(deleteTodo(el.id))}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => dispatch(completeTodo(el.id))}
                    >
                      {el.complete ? "Done" : "Undone"}
                    </Button>
                  </div>
                )}
              </div>
            ))
        : todos
            .filter((el) => el.complete === false)
            .map((el) => (
              <div>
                {el.title !== "" && (
                  <div>
                    <h2>{el.title}</h2>
                    <Button variant="primary" onClick={() => handleEdit(el.id)}>
                      Edit
                    </Button>
                    <Modal
                      show={show}
                      onHide={() => {
                        handleClose();
                        setEditTask("");
                      }}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <input
                          type="text"
                          placeholder="edit task..."
                          value={editTask}
                          onChange={(e) => setEditTask(e.target.value)}
                        />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(deleteTodo(el.id))}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => dispatch(completeTodo(el.id))}
                    >
                      {el.complete ? "Done" : "Undone"}
                    </Button>
                  </div>
                )}
              </div>
            ))}
    </div>
  );
}

export default App;
