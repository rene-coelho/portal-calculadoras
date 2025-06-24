const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/get', (req, res) => {
  const { sexo, idade, peso, altura, atividade, gordura } = req.body;

  if (!sexo || !idade || !peso || !altura || !atividade) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes ou inválidos.' });
  }

  const alturaM = altura / 100;
  const fatorAtividade = parseFloat(atividade);
  let tmb, massaMagra, get, imc, pesoIdeal;

  if (gordura !== null && gordura !== undefined && gordura !== '') {
    const percGordura = parseFloat(gordura);
    massaMagra = peso * (1 - percGordura / 100);
    tmb = 370 + 21.6 * massaMagra;
    get = tmb * fatorAtividade;
    imc = peso / (alturaM * alturaM);
    const gorduraRefMin = sexo === 'homem' ? 10 : 18;
    const gorduraRefMax = sexo === 'homem' ? 20 : 28;
    const pesoIdealMin = massaMagra / (1 - gorduraRefMin / 100);
    const pesoIdealMax = massaMagra / (1 - gorduraRefMax / 100);
    pesoIdeal = `${pesoIdealMin.toFixed(2)} - ${pesoIdealMax.toFixed(2)} kg`;
  } else {
    if (sexo === 'homem') {
      tmb = 10 * peso + 6.25 * altura - 5 * idade + 5;
    } else {
      tmb = 10 * peso + 6.25 * altura - 5 * idade - 161;
    }
    massaMagra = 1.10 * peso - 128 * (peso ** 2) / (altura ** 2);
    get = tmb * fatorAtividade;
    imc = peso / (alturaM * alturaM);
    pesoIdeal = ((altura ** 2) * 21.75 / 10000).toFixed(2) + ' kg';
  }

  return res.json({
    tmb: Math.round(tmb),
    get: Math.round(get),
    massaMagra: massaMagra.toFixed(2),
    imc: imc.toFixed(2),
    pesoIdeal
  });
});

app.get('/', (req, res) => {
  res.send('API GET está funcionando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
