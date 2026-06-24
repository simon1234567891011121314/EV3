import PropTypes from 'prop-types';
import RecetaCard from './RecetaCard';
import '../styles/ListaRecetas.css';

function ListaRecetas({ recetas }) {
  if (!recetas || recetas.length === 0) {
    return (
      <div className="lista-recetas-vacia">
        <p>No hay recetas disponibles</p>
      </div>
    );
  }

  return (
    <div className="lista-recetas">
      {recetas.map((receta) => (
        <RecetaCard
          key={receta.id}
          nombre={receta.nombre}
          origen={receta.origen}
          porciones={receta.porciones}
          categoria={receta.categoria}
          descripcion={receta.descripcion}
          ingredientes={receta.ingredientes}
          esVegetariana={receta.esVegetariana}
        />
      ))}
    </div>
  );
}

ListaRecetas.propTypes = {
  recetas: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      origen: PropTypes.string,
      porciones: PropTypes.number,
      categoria: PropTypes.oneOf(['Entrada', 'Fondo', 'Postre']),
      descripcion: PropTypes.string,
      ingredientes: PropTypes.arrayOf(PropTypes.string),
      esVegetariana: PropTypes.bool
    })
  )
};

ListaRecetas.defaultProps = {
  recetas: []
};

export default ListaRecetas;
