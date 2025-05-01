import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import api from '../services/api.js';

const EnvioProjeto = () => {
    const [formData, setFormData] = useState({
        premioId: '',
        areaTematica: '',
        titulo: '',
        resumo: '',
        coautores: '',
    });
    const [premios, setPremios] = useState([]);

    useEffect(() => {
        const fetchPremios = async () => {
            const mockData = [
                { id: 1, nome: 'Prêmio Inovação 2025' },
            ];
            setPremios(mockData);
        };
        fetchPremios();
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
                    Envio de Projeto
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Prêmio</InputLabel>
                        <Select
                            name="premioId"
                            value={formData.premioId}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="">Selecione um prêmio</MenuItem>
                            {premios.map((premio) => (
                                <MenuItem key={premio.id} value={premio.id}>
                                    {premio.nome}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Área Temática"
                        name="areaTematica"
                        fullWidth
                        margin="normal"
                        value={formData.areaTematica}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Título"
                        name="titulo"
                        fullWidth
                        margin="normal"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Resumo"
                        name="resumo"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        value={formData.resumo}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Coautores (separados por vírgula)"
                        name="coautores"
                        fullWidth
                        margin="normal"
                        value={formData.coautores}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Enviar Projeto
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default EnvioProjeto;