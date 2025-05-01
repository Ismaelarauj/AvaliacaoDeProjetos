import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CrudPremio from './components/CrudPremio.js';
import CrudAutor from './components/CrudAutor.js';
import CrudAvaliador from './components/CrudAvaliador.js';
import EnvioProjeto from './components/EnvioProjeto.js';
import AvaliacaoProjeto from './components/AvaliacaoProjeto.js';
import ListaVencedores from './components/ListaVencedores.js';
import { AppBar, Toolbar, Button } from '@mui/material';

function App() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href="/premios">Prêmios</Button>
                    <Button color="inherit" href="/autores">Autores</Button>
                    <Button color="inherit" href="/avaliadores">Avaliadores</Button>
                    <Button color="inherit" href="/projetos/enviar">Enviar Projeto</Button>
                    <Button color="inherit" href="/projetos/avaliar">Avaliar Projeto</Button>
                    <Button color="inherit" href="/vencedores">Vencedores</Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/premios" element={<CrudPremio />} />
                <Route path="/autores" element={<CrudAutor />} />
                <Route path="/avaliadores" element={<CrudAvaliador />} />
                <Route path="/projetos/enviar" element={<EnvioProjeto />} />
                <Route path="/projetos/avaliar" element={<AvaliacaoProjeto />} />
                <Route path="/vencedores" element={<ListaVencedores />} />
                <Route path="/" element={<CrudPremio />} />
            </Routes>
        </Router>
    );
}

export default App;