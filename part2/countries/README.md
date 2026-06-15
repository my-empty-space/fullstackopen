# Buscador de Países (Countries App)

Este proyecto es una aplicación web interactiva desarrollada con **React** y **Vite** que permite a los usuarios buscar información detallada sobre países de todo el mundo utilizando una API REST pública. Forma parte del plan de estudios de la segunda parte del curso **Full Stack Open** de la Universidad de Helsinki.

---

## 🚀 Tecnologías Utilizadas

- **React (v18+)**: Biblioteca para construir la interfaz de usuario basada en componentes y hooks (`useState`, `useEffect`).
- **Vite**: Herramienta de compilación rápida para desarrollo frontend.
- **Axios**: Cliente HTTP para realizar peticiones a la API externa.
- **ESLint**: Linter para asegurar la calidad y el estilo del código.

---

## 📂 Estructura del Proyecto

A continuación se detallan las partes más importantes del código y sus propósitos correspondientes:

```text
├── src/
│   ├── services/
│   │   └── countries.js   # Comunicación directa con la API externa (Axios)
│   ├── App.jsx            # Lógica principal de la aplicación, control de estado e interfaz
│   └── main.jsx           # Punto de entrada de la aplicación de React
├── eslint.config.js       # Configuración del linter ESLint
├── index.html             # Estructura HTML principal sobre la cual se monta React
├── package.json           # Dependencias, scripts y metadatos del proyecto
└── vite.config.js         # Configuración del entorno de Vite
```

### Descripción de los Archivos Clave:
1. **`src/services/countries.js`**: Contiene las funciones encapsuladas para realizar solicitudes HTTP con Axios.
   - `getAllCountries()`: Obtiene la información completa de todos los países.
   - `getCountryByName(name)`: Obtiene los detalles específicos de un único país a partir de su nombre.
2. **`src/App.jsx`**: Aloja toda la interactividad del sistema. Consta de dos componentes principales:
   - `App`: Componente principal que maneja los estados globales (entrada de usuario, lista de nombres y filtros).
   - `Countries`: Componente hijo encargado de aplicar el renderizado condicional de los resultados según las reglas del negocio.

---

## ⚙️ Lógica de la Aplicación y Flujo de Datos

### 1. Inicialización y Carga de Datos
Al montarse el componente `App` por primera vez, un efecto `useEffect` ejecuta la función `getAllCountries()` de los servicios. Esta petición recupera la lista completa de países de la API. Del JSON recibido, se extraen los nombres oficiales de los países (`name.official`) y se almacenan en el estado local `countriesList`.

### 2. Búsqueda y Filtrado
Cuando el usuario escribe en la barra de búsqueda, se dispara la función `handleChange`:
- Si el campo de texto está vacío, el estado `countriesToShow` se limpia (`null`).
- Si contiene texto, se filtra la lista completa `countriesList` utilizando una búsqueda insensible a mayúsculas/minúsculas (`toLowerCase()` e `.includes()`). El arreglo de coincidencias resultantes se almacena en el estado `countriesToShow`.

### 3. Visualización y Renderizado Condicional (`Countries`)
El componente `Countries` recibe las coincidencias en la propiedad `countriesToShow` y aplica las siguientes reglas de negocio:
- **Sin búsqueda o Input Vacío**: No se muestra ningún resultado.
- **Cero coincidencias**: Renderiza el mensaje `"There are no matches"`.
- **Más de 10 coincidencias**: Muestra un texto pidiendo especificar un filtro más preciso (`"Too many matches, specify another filter"`), con el fin de evitar saturar la interfaz.
- **Entre 2 y 10 coincidencias**: Muestra una lista ordenada de los países encontrados, cada uno acompañado por un botón "Show" (ver notas).
- **Exactamente 1 coincidencia**: Se activa un efecto secundario (`useEffect`) que llama a `getCountryByName(name)` para traer los detalles completos del país, los cuales se guardan en el estado local `countryToRender`. Al obtenerse la respuesta, se renderiza la vista detallada que incluye:
  - Nombre común e internacional.
  - Capital.
  - Área territorial.
  - Lista de idiomas hablados.
  - Bandera en formato de imagen (`PNG`).

---

## 🔍 Notas de Implementación / Detalles Observados

1. **Botón "Show" sin funcionalidad**: En la lista de 2 a 10 coincidencias, los botones de `"Show"` están renderizados pero actualmente carecen de un manejador de eventos `onClick` o una lógica en el código para forzar la visualización detallada del país seleccionado.
2. **Etiqueta duplicada (Capital vs Área)**: En la vista detallada del país (línea 34 de `App.jsx`), la información del **área** se está mostrando bajo el título `"Capital:"` por error, duplicando la etiqueta del campo anterior.

---

## 🛠️ Cómo Ejecutar el Proyecto

Asegúrate de tener instalado [Node.js](https://nodejs.org/).

1. **Instalar dependencias**:
   ```bash
   npm install
   # o si utilizas pnpm
   pnpm install
   ```

2. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   # o con pnpm
   pnpm dev
   ```

3. Abre el navegador en la dirección local provista en la terminal (por defecto, `http://localhost:5173`).
