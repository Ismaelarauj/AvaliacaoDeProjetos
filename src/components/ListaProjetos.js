import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, MenuItem, TextField } from '@mui/material';

const ListaProjetos = () => {
    const [projetos, setProjetos] = useState([]);
    const [filtro, setFiltro] = useState('todos');

    useEffect(() => {
        fetchProjetos();
    }, []);

    const fetchProjetos = async () => {
        const mockData = [
            {
                id: 1,
                titulo: 'Projeto Teste',
                autor: { nome: 'João Silva' },
                premio: { nome: 'Prêmio Inovação 2025' },
                status: 'avaliado',
                nota: 9.5,
            },
            {
                id: 2,
                titulo: 'Projeto Pendente',
                autor: { nome: 'Ana Pereira' },
                premio: { nome: 'Prêmio Inovação 2025' },
                status: 'pendente',
                nota: null,
            },
        ];
        setProjetos(mockData);
    };

    const filteredProjetos = projetos.filter((p) => {
        if (filtro === 'pendentes') return p.status === 'pendente';
        if (filtro === 'avaliados') return p.status === 'avaliado';
        return true;
    });

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Listagem de Projetos
                </Typography>
                <TextField
                    select
                    label="Filtro"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="todos">Todos</MenuItem>
                    <MenuItem value="pendentes">Pendentes</MenuItem>
                    <MenuItem value="avaliados">Avaliados</MenuItem>
                </TextField>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Autor</TableCell>
                            <TableCell>Prêmio</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Nota</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProjetos.map((projeto) => (
                            <TableRow key={projeto.id}>
                                <TableCell>{projeto.titulo}</TableCell>
                                <TableCell>{projeto.autor.nome}</TableCell>
                                <TableCell>{projeto.premio.nome}</TableCell>
                                <TableCell>{projeto.status}</TableCell>
                                <TableCell>{projeto.nota || '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
};

export default ListaProjetos;