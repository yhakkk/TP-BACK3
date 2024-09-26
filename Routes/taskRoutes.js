import express from "express";
import Task from "../Models/taskModel.js"; // Importa el modelo Task correctamente
import client from '../client.js';
const router = express.Router();

router.post("/registrarTask", async (req, res) => {
  const { title, description, status } = req.body;

  try {
    // Verifica que ambos campos estén presentes
    if (!title || !description || !status) {
      return res
        .status(400)
        .json({ message: "Título, descripción y estado son requeridos" });
    }

    // Crea la nueva tarea
    const task = new Task({
      title,
      description,
      status,
    });

    // Guarda la tarea en la base de datos
    await task.save();
    res.status(201).json({ message: "Task registrada con éxito" });
  } catch (error) {
    // Devuelve el mensaje de error para mayor claridad
    res
      .status(500)
      .json({ message: "Error al registrar la task", error: error.message });
  }
});

router.get("/getAllTask", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las tareas", error: error.message });
  }
});

router.put("/updateTask/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;
  
  try {
    // Verifica que ambos campos estén presentes
    if (!title || !description || !status) {
      return res
        .status(400)
        .json({ message: "Título, descripción y estado son requeridos" });
    }

    // Busca la tarea por su ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task no encontrada" });
    }

    // Actualiza la tarea
    task.title = title;
    task.description = description;
    task.status = status;

    // Guarda la tarea en la base de datos
    await task.save();
    res.status(200).json({ message: "Task actualizada con exito" });
  } catch (error) {
    // Devuelve el mensaje de error para mayor claridad
    res
      .status(500)
      .json({ message: "Error al actualizar la task", error: error.message });
  }
});

router.get('/stats', (req, res) => {
    client.GetTaskStats({}, (error, response) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
      }
      res.status(200).json(response);
    });
  });

export default router;
