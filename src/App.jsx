import { recetas } from './data/recetas';
import ListaRecetas from './components/ListaRecetas';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>RecetApp</h1>
      <ListaRecetas recetas={recetas} />
    </div>
  );
}

export default App;
