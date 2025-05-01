import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Box, TextField, Button, Table, TableBody, TableCell,
    TableHead, TableRow, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    FormControl, InputLabel
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../services/api.js';

const CrudPremio = () => {
    const [premios, setPremios] = useState([]);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        ano: '',
        cronogramas: [{ dataInicio: '', descricao: '', dataFim: '' }],
    });

    useEffect(() => {
        fetchPremios();
    }, []);

    const fetchPremios = async () => {
        const mockData = [
            {
                id: 1,
                nome: 'Prêmio Inovação 2025',
                descricao: 'Reconhecimento a projetos inovadores',
                ano: 2025,
                Cronogramas: [
                    { dataInicio: '2025-01-01', descricao: 'Inscrições', dataFim: '2025-03-01' },
                ],
            },
        ];
        setPremios(mockData);
    };

    const handleOpen = (premio = null) => {
        if (premio) {
            setEditId(premio.id);
            setFormData({
                nome: premio.nome,
                descricao: premio.descricao,
                ano: premio.ano,
                cronogramas: premio.Cronogramas || [{ dataInicio: '', descricao: '', dataFim: '' }],
            });
        } else {
            setEditId(null);
            setFormData({
                nome: '',
                descricao: '',
                ano: '',
                cronogramas: [{ dataInicio: '', descricao: '', dataFim: '' }],
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e, index = null, field = null) => {
        if (index !== null && field) {
            const newCronogramas = [...formData.cronogramas];
            newCronogramas[index] = { ...newCronogramas[index], [field]: e.target.value };
            setFormData({ ...formData, cronogramas: newCronogramas });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const addCronograma = () => {
        setFormData({
            ...formData,
            cronogramas: [...formData.cronogramas, { dataInicio: '', descricao: '', dataFim: '' }],
        });
    };

    const removeCronograma = (index) => {
        const newCronogramas = formData.cronogramas.filter((_, i) => i !== index);
        setFormData({ ...formData, cronogramas: newCronogramas });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/premios/${editId}`, formData);
                alert('Prêmio atualizado com sucesso!');
            } else {
                await api.post('/premios', formData);
                alert('Prêmio criado com sucesso!');
            }
            fetchPremios();
            handleClose();
        } catch (error) {
            alert('Erro ao salvar prêmio: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Deseja excluir este prêmio?')) {
            try {
                await api.delete(`/premios/${id}`);
                alert('Prêmio excluído com sucesso!');
                fetchPremios();
            } catch (error) {
                alert('Erro ao excluir prêmio: ' + error.message);
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gerenciamento de Prêmios
                </Typography>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpen()}>
                    Novo Prêmio
                </Button>
                <Table sx={{ mt: 2 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Ano</TableCell>
                            <TableCell>Cronogramas</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {premios.map((premio) => (
                            <TableRow key={premio.id}>
                                <TableCell>{premio.nome}</TableCell>
                                <TableCell>{premio.descricao}</TableCell>
                                <TableCell>{premio.ano}</TableCell>
                                <TableCell>
                                    {premio.Cronogramas?.map((c, i) => (
                                        <div key={i}>
                                            {c.descricao} ({c.dataInicio} a {c.dataFim})
                                        </div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(premio)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(premio.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editId ? 'Editar Prêmio' : 'Novo Prêmio'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nome"
                            name="nome"
                            fullWidth
                            margin="normal"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            label="Descrição"
                            name="descricao"
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Ano"
                            name="ano"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={formData.ano}
                            onChange={handleChange}
                            required
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Cronogramas
                        </Typography>
                        {formData.cronogramas.map((cronograma, index) => (
                            <Box key={index} sx={{ mb: 2, border: '1px solid #ccc', p: 2 }}>
                                <TextField
                                    label="Data de Início"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    value={cronograma.dataInicio}
                                    onChange={(e) => handleChange(e, index, 'dataInicio')}
                                    required
                                />
                                <TextField
                                    label="Descrição"
                                    fullWidth
                                    margin="normal"
                                    value={cronograma.descricao}
                                    onChange={(e) => handleChange(e, index, 'descricao')}
                                />
                                <TextField
                                    label="Data de Fim"
                                    type="date"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ shrink: true }}
                                    value={cronograma.dataFim}
                                    onChange={(e) => handleChange(e, index, 'dataFim')}
                                    required
                                />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => removeCronograma(index)}
                                    sx={{ mt: 1 }}
                                >
                                    Remover Cronograma
                                </Button>
                            </Box>
                        ))}
                        <Button variant="outlined" onClick={addCronograma} sx={{ mb: 2 }}>
                            Adicionar Cronograma
                        </Button>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" onClick={handleSubmit}>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CrudPremio;