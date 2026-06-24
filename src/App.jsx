import { useState } from 'react';
import { recetas } from './data/recetas';
import ListaRecetas from './components/ListaRecetas';
import FiltroCategoria from './components/FiltroCategoria';
import './App.css';
import './styles/Buscador.css';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  // Normaliza y valida el texto de búsqueda
  const normalizarBusqueda = (texto) => {
    // Recorta espacios al inicio y final
    const trimmed = texto.trim();
    // Limita el largo a 50 caracteres (previene inyecciones y spam)
    const limitado = trimmed.substring(0, 50);
    // Convierte a minúsculas para búsqueda case-insensitive
    const minuscula = limitado.toLowerCase();
    // Normaliza acentos (NFD = descompone caracteres acentuados)
    return minuscula.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Filtra recetas por categoría y búsqueda
  const recetasFiltradas = recetas.filter((receta) => {
    // Filtro por categoría
    const cumpleCategoría =
      categoriaFiltro === 'Todas' || receta.categoria === categoriaFiltro;

    // Filtro por búsqueda (normalizada con acentos)
    const busquedaNormalizada = normalizarBusqueda(busqueda);
    const nombreNormalizado = receta.nombre
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const cumpeBúsqueda =
      busquedaNormalizada === '' || nombreNormalizado.includes(busquedaNormalizada);

    return cumpleCategoría && cumpeBúsqueda;
  });

  // Maneja cambios en el buscador (componente controlado)
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  // Maneja cambios de categoría
  const handleCategoriaChange = (categoria) => {
    setCategoriaFiltro(categoria);
  };

  // Cuenta recetas vegetarianas en el resultado filtrado
  const contadorVegetarianas = recetasFiltradas.filter(
    (receta) => receta.esVegetariana
  ).length;

  return (
    <div className="app">
      <div className="app-header">
        <h1>🍳 RecetApp</h1>
        <p className="app-subtitulo">Recetario digital interactivo</p>
      </div>

      <div className="app-filtros">
        {/* Contador de vegetarianas */}
        <div className="contador-vegetarianas">
          <span className="contador-icon">🌱</span>
          <span className="contador-texto">
            <strong>{contadorVegetarianas}</strong> receta{contadorVegetarianas !== 1 ? 's' : ''} vegetariana{contadorVegetarianas !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Componente de búsqueda */}
        <div className="buscador-recetas">
          <label htmlFor="busqueda-input" className="buscador-label">
            Buscar receta por nombre
          </label>
          <input
            id="busqueda-input"
            type="text"
            className="buscador-input"
            placeholder="Ej: Lasaña, Tiramisu, Hummus..."
            value={busqueda}
            onChange={handleBusquedaChange}
            maxLength="50"
            aria-label="Buscar receta"
          />
        </div>

        {/* Componente de filtro por categoría */}
        <FiltroCategoria
          categoriaSeleccionada={categoriaFiltro}
          onCategoriaChange={handleCategoriaChange}
        />
      </div>

      {/* Renderizado condicional: mostrar lista o mensaje */}
      {recetasFiltradas.length > 0 ? (
        <ListaRecetas recetas={recetasFiltradas} />
      ) : (
        <div className="resultados-info">
          <div className="resultados-info-titulo">
            No hay recetas que coincidan
          </div>
          <p>
            Intenta con otra búsqueda o elige una categoría diferente
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
