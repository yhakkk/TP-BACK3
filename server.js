import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import Task from './Models/taskModel.js'; // Modelo de Task para interactuar con la BD
import conectarBD from './db.js';
const PROTO_PATH = path.join(process.cwd(), 'task.proto'); // Actualiza el nombre del archivo proto

conectarBD()

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const taskProto = grpc.loadPackageDefinition(packageDefinition).TaskService;

// Función para obtener una tarea por ID
async function getTask(call, callback) {
  const { taskId } = call.request;
  
  try {
    const task = await Task.findById(taskId); // Asumiendo que Task es un modelo de Mongoose
    if (!task) {
      return callback({ code: grpc.status.NOT_FOUND, message: "Task not found" });
    }
    callback(null, {
      taskId: task._id,
      title: task.title,
      description: task.description,
      createdAt: task.createdAt.toISOString(),
    });
  } catch (error) {
    callback({ code: grpc.status.INTERNAL, message: error.message });
  }
}

// Función para obtener estadísticas de las tareas
async function getTaskStats(call, callback) {
  try {
    const totalTasks = await Task.countDocuments();
    const lastTask = await Task.findOne().sort({ createdAt: -1 });
    
    callback(null, {
      totalTasks,
      lastCreatedTask: lastTask ? lastTask.title : "No tasks available",
    });
  } catch (error) {
    callback({ code: grpc.status.INTERNAL, message: error.message });
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(taskProto.service, { getTask, getTaskStats });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('Servidor gRPC escuchando en el puerto 50051');
    server.start();
  });
}

main();
