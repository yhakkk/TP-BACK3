# gRPC

El sistema tiene como objetivo gestionar tareas de manera efectiva, permitiendo a los usuarios registrar, actualizar y obtener información sobre tareas y sus estadísticas. Al dividir la funcionalidad en microservicios, se mejora la modularidad y la capacidad de implementación independiente de cada componente.

En resumen, permite la gestión eficiente de tareas utilizando tecnologías modernas para garantizar un rendimiento óptimo y una buena experiencia de usuario.

### Componentes Clave:

1. **MongoDB**:
    - Base de datos no relacional que almacena datos de tareas, permitiendo operaciones como crear, leer, actualizar y eliminar tareas.
2. **gRPC**:
    - Protocolo de comunicación que permite que los microservicios interactúen entre sí de manera eficiente, utilizando definiciones de servicios y mensajes en un formato estructurado.
3. **Microservicios**:
    - El sistema se compone de múltiples servicios, cada uno encargado de una funcionalidad específica (por ejemplo, gestión de tareas, estadísticas de tareas). Esto facilita la escalabilidad y el mantenimiento del sistema.
