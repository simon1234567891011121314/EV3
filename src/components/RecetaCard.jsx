import PropTypes from 'prop-types';
import '../styles/RecetaCard.css';

function RecetaCard({
  nombre,
  origen,
  porciones,
  categoria,
  descripcion,
  ingredientes,
  esVegetariana
}) {
  // Determina la clase CSS según la categoría
  const getCategoriaClass = (cat) => {
    const categoriaMap = {
      'Entrada': 'categoria-entrada',
      'Fondo': 'categoria-fondo',
      'Postre': 'categoria-postre'
    };
    return categoriaMap[cat] || 'categoria-default';
  };

  return (
    <div className="receta-card">
      <div className={`categoria-badge ${getCategoriaClass(categoria)}`}>
        {categoria}
      </div>

      {esVegetariana && (
        <div className="vegetariana-badge">
          🌱 Vegetariana
        </div>
      )}

      <h3 className="receta-nombre">{nombre}</h3>

      <div className="receta-info">
        <span className="info-item">
          <strong>Origen:</strong> {origen}
        </span>
        <span className="info-item">
          <strong>Porciones:</strong> {porciones}
        </span>
      </div>

      <p className="receta-descripcion">{descripcion}</p>

      <div className="ingredientes-section">
        <h4>Ingredientes</h4>
        <ul className="ingredientes-list">
          {ingredientes && ingredientes.length > 0 ? (
            ingredientes.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))
          ) : (
            <li className="sin-ingredientes">No hay ingredientes registrados</li>
          )}
        </ul>
      </div>
    </div>
  );
}

// PropTypes - Validación de tipos y documentación
RecetaCard.propTypes = {
  nombre: PropTypes.string,
  origen: PropTypes.string,
  porciones: PropTypes.number,
  categoria: PropTypes.oneOf(['Entrada', 'Fondo', 'Postre']),
  descripcion: PropTypes.string,
  ingredientes: PropTypes.arrayOf(PropTypes.string),
  esVegetariana: PropTypes.bool
};

// Valores por defecto
RecetaCard.defaultProps = {
  nombre: 'Receta sin nombre',
  origen: 'Origen desconocido',
  porciones: 0,
  categoria: 'Fondo',
  descripcion: 'Sin descripción disponible',
  ingredientes: [],
  esVegetariana: false
};

export default RecetaCard;
