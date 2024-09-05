// clientGrpc.js (en el microservicio de gestión)

import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(process.cwd(), 'task.proto'); // Protocolo del microservicio de análisis

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const taskProto = grpc.loadPackageDefinition(packageDefinition).TaskService;

const client = new taskProto('localhost:50051', grpc.credentials.createInsecure());

export default client;
