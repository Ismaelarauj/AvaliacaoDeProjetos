import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EnvioProjeto = () => {
    const [premios, setPremios] = useState([]);
    const [formData, setFormData] = useState({
        premioId: '',
        titulo: '',
        resumo: '',
        areaTematica: '',
        coautores: [],
        dataEnvio: new Date().toISOString().split('T')[0],
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchPremios();
    }, []);

    const fetchPremios = async () => {
        const mockData = [
            { id: 1, nome: 'Prêmio Inovação 2025' },
        ];
        setPremios(mockData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCoautoresChange = (e) => {
        setFormData({ ...formData, coautores: e.target.value.split(',').map((id) => id.trim()) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('Projeto enviado (simulação)');
        navigate('/projetos/enviar');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Envio de Projeto
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        label="Prêmio"
                        name="premioId"
                        value={formData.premioId}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    >
                        {premios.map((premio) => (
                            <MenuItem key={premio.id} value={premio.id}>
                                {premio.nome}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Título"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Resumo"
                        name="resumo"
                        value={formData.resumo}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        label="Área Temática"
                        name="areaTematica"
                        value={formData.areaTematica}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Coautores (IDs separados por vírgula)"
                        name="coautores"
                        value={formData.coautores.join(',')}
                        onChange={handleCoautoresChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Data de Envio"
                        name="dataEnvio"
                        value={formData.dataEnvio}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Enviar Projeto
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default EnvioProjeto;