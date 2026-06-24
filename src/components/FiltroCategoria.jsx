import PropTypes from 'prop-types';
import '../styles/FiltroCategoria.css';

function FiltroCategoria({ categoriaSeleccionada, onCategoriaChange }) {
  const categorias = ['Todas', 'Entrada', 'Fondo', 'Postre'];

  return (
    <div className="filtro-categoria">
      <label htmlFor="categoria-select" className="filtro-label">
        Filtrar por categoría:
      </label>
      <div className="categoria-botones">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`btn-categoria ${
              categoriaSeleccionada === categoria ? 'activo' : ''
            }`}
            onClick={() => onCategoriaChange(categoria)}
            aria-pressed={categoriaSeleccionada === categoria}
          >
            {categoria}
          </button>
        ))}
      </div>
    </div>
  );
}

FiltroCategoria.propTypes = {
  categoriaSeleccionada: PropTypes.oneOf(['Todas', 'Entrada', 'Fondo', 'Postre']),
  onCategoriaChange: PropTypes.func.isRequired
};

FiltroCategoria.defaultProps = {
  categoriaSeleccionada: 'Todas'
};

export default FiltroCategoria;
