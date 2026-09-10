# Proyecto Sprint 18: Around the U.S. - Autorización

Aplicación web de React con registro, inicio de sesión y rutas protegidas. Los usuarios autorizados pueden gestionar su perfil y una galería de lugares; quienes no tienen una sesión válida son redirigidos al acceso.

## Funcionalidades

- Registrar nuevos usuarios e informar el resultado mediante un modal.
- Iniciar sesión y almacenar el JWT en `localStorage`.
- Validar el JWT al volver a abrir la aplicación.
- Proteger la ruta principal y cerrar sesión de forma segura.
- Cargar la información del usuario desde la API.
- Mostrar tarjetas obtenidas desde la API.
- Agregar nuevas tarjetas.
- Dar y quitar "me gusta" en las tarjetas.
- Eliminar tarjetas propias.
- Editar el perfil del usuario.
- Cambiar el avatar del usuario.
- Ampliar las imágenes de las tarjetas.
- Cerrar las ventanas emergentes mediante el botón de cierre.
- Adaptarse a diferentes tamaños de pantalla.

## Tecnologías utilizadas

- React
- JavaScript
- JSX
- CSS
- React Router
- API REST y JWT
- Vite
- Git y GitHub

## Ejecutar localmente

```bash
git clone git@github.com:DRH2042/web_project_around_auth.git
cd web_project_around_auth
npm install
npm run dev
```

## Repositorio

[Ver el proyecto en GitHub](https://github.com/DRH2042/web_project_around_auth)

## Autor

Daniel Ramirez Holguin — TripleTen LATAM
