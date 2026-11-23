# Rondonópolis Serviços

Site estático para aproximar profissionais da construção civil e pessoas que procuram serviços em Rondonópolis (MT).

## Estrutura

- `templates/`: páginas Início, Profissionais e Vagas.
- `static/css/`: estilos compartilhados, responsivos e sem dependências externas.
- `static/js/`: dados demonstrativos e renderização, busca e filtros.
- `SQL/`: espaço reservado para a futura camada de dados.

## Executar localmente

Na raiz do projeto, inicie um servidor estático:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000/templates/` no navegador. Não é necessário instalar dependências.

Os registros em `static/js/data.js` são demonstrativos e não incluem contatos reais. Atualize-os com informações autorizadas antes de usar o site em produção.