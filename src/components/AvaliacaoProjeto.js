import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../services/api.js';

const AvaliacaoProjeto = () => {
    const [formData, setFormData] = useState({
        projetoId: '',
        parecer: '',
        nota: '',
    });
    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        const fetchProjetos = async () => {
            const mockData = [
                { id: 1, titulo: 'Projeto Teste' },
            ];
            setProjetos(mockData);
        };
        fetchProjetos();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('Ação desativada para visualização');
    };

    const handleDelete = async (id) => {
        alert('Ação desativada para visualização');
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Avaliação de Projeto
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Projeto</InputLabel>
                        <Select
                            name="projetoId"
                            value={formData.projetoId}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="">Selecione um projeto</MenuItem>
                            {projetos.map((projeto) => (
                                <MenuItem key={projeto.id} value={projeto.id}>
                                    {projeto.titulo}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Parecer"
                        name="parecer"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={formData.parecer}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Nota (0-10)"
                        name="nota"
                        type="number"
                        fullWidth
                        margin="normal"
                        inputProps={{ min: 0, max: 10, step: 0.1 }}
                        value={formData.nota}
                        onChange={handleChange}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Enviar Avaliação
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AvaliacaoProjeto;