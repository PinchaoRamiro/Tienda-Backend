# API REST - Node.js / Express

Esta es una API construida en **Node.js** utilizando **Express**. Proporciona funcionalidades para autenticación, gestión de usuarios, productos, pedidos y reportes administrativos.

---

## 📁 Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```plaintext
src/
├── app.js                  # Archivo principal de la aplicación
├── config/
│   └── db.js               # Configuración de la base de datos
├── controllers/            # Controladores para manejar la lógica de negocio
├── middleware/             # Middlewares para autenticación y validación
├── models/                 # Definición de los modelos de la base de datos
├── routes/                 # Rutas de la API
└── utils/                  # Funciones utilitarias

``` 

 # 🚀 Instalación

~~~bash
  git clone https://github.com/PinchaoRamiro/Tienda-Backend.git
  cd Tienda-Backend
  npm install
~~~

Configura las variables de entorno en un archivo .env.

# ▶️ Uso

~~~bash
npm start
~~~

El servidor por defecto corre en http://localhost:5000.

# 🔐 Rutas Disponibles
Las rutas están organizadas por módulo y montadas bajo /api/.

## Autenticación
POST /api/auth/register - Registrar un nuevo usuario

POST /api/auth/login - Iniciar sesión

### Usuarios
GET /api/user/profile - Obtener el perfil del usuario (requiere token)

PUT /api/user/profile - Actualizar perfil

### Administrador
GET /api/admin/users - Listar usuarios

DELETE /api/admin/user/:id - Eliminar usuario

### Productos
GET /api/product - Listar productos

POST /api/product - Crear producto

PUT /api/product/:id - Actualizar producto

DELETE /api/product/:id - Eliminar producto

### Pedidos
POST /api/order - Crear un pedido

GET /api/order - Listar pedidos

### Categorías
GET /api/category - Listar categorías

POST /api/category - Crear categoría

### Reportes Administrativos
GET /api/admin/report/sales - Reporte de ventas

GET /api/admin/report/users - Reporte de usuarios

# 🛡️ Middleware
authMiddleware.js: Protege rutas privadas mediante verificación de JWT.