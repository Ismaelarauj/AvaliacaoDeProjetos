import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AvaliacaoProjeto = () => {
    const [projetos, setProjetos] = useState([]);
    const [formData, setFormData] = useState({
        projetoId: '',
        parecer: '',
        nota: '',
        dataAvaliacao: new Date().toISOString().split('T')[0],
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjetos();
    }, []);

    const fetchProjetos = async () => {
        const mockData = [
            { id: 1, titulo: 'Projeto Teste' },
        ];
        setProjetos(mockData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('Avaliação registrada (simulação)');
        navigate('/projetos/avaliar');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Avaliação de Projeto
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        label="Projeto"
                        name="projetoId"
                        value={formData.projetoId}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    >
                        {projetos.map((projeto) => (
                            <MenuItem key={projeto.id} value={projeto.id}>
                                {projeto.titulo}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Parecer"
                        name="parecer"
                        value={formData.parecer}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        required
                    />
                    <TextField
                        label="Nota (0-10)"
                        name="nota"
                        type="number"
                        value={formData.nota}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        inputProps={{ min: 0, max: 10 }}
                        required
                    />
                    <TextField
                        label="Data da Avaliação"
                        name="dataAvaliacao"
                        value={formData.dataAvaliacao}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Avaliar Projeto
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default AvaliacaoProjeto;