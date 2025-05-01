import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Container, Typography, Box } from '@mui/material';
import api from '../services/api.js';

const ListaVencedores = () => {
    const [vencedores, setVencedores] = useState([]);

    useEffect(() => {
        const fetchVencedores = async () => {
            const mockData = [
                {
                    id: 1,
                    titulo: 'Projeto Teste',
                    autores: [{ nome: 'João Silva' }],
                    avaliacao: { nota: 9.5 },
                    premio: { nome: 'Prêmio Inovação 2025' },
                },
            ];
            setVencedores(mockData);
        };
        fetchVencedores();
    }, []);

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Projetos Vencedores
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Autor(es)</TableCell>
                            <TableCell>Nota</TableCell>
                            <TableCell>Prêmio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {vencedores.map((projeto) => (
                            <TableRow key={projeto.id}>
                                <TableCell>{projeto.titulo}</TableCell>
                                <TableCell>
                                    {projeto.autores.map((autor) => autor.nome).join(', ')}
                                </TableCell>
                                <TableCell>{projeto.avaliacao?.nota || 'N/A'}</TableCell>
                                <TableCell>{projeto.premio?.nome || 'N/A'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Container>
    );
};

export default ListaVencedores;