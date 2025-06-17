document.getElementById('sexo').addEventListener('change', e => {
  document.getElementById('label-quadril').style.display = e.target.value === 'feminino' ? 'block' : 'none';
});
document.getElementById('form').addEventListener('submit', async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  const params = new URLSearchParams(data);
  const res = await fetch('/gordura-corporal?' + params);
  const json = await res.json();
  document.getElementById('resultado').textContent = res.ok
    ? `Percentual estimado de gordura corporal: ${json.gordura}%`
    : `Erro: ${json.erro}`;
});