# Rondonópolis Serviços

## Conexões locais que fazem projetos acontecer

Encontrar a pessoa certa para uma obra ou um novo trabalho não deveria ser complicado. O **Rondonópolis Serviços** aproxima profissionais da construção civil de quem precisa contratar em Rondonópolis, reunindo perfis e oportunidades em um só lugar.

> **Para quem constrói a cidade — e para quem quer construir nela.**

Este repositório contém um protótipo visual de um diretório local. A experiência foi pensada para valorizar o trabalho dos profissionais e facilitar a descoberta de oportunidades por bairro, especialidade e modalidade.

## Para quem é

- **Profissionais:** uma vitrine para apresentar especialidade, região de atendimento e modalidades de trabalho.
- **Contratantes:** um ponto de partida para encontrar profissionais e conhecer oportunidades de serviço locais.

## O que o protótipo demonstra

- Página inicial com apresentação do projeto, indicadores e anúncios em destaque.
- Diretório de profissionais com busca e filtros por especialidade, bairro e modalidade.
- Lista de vagas com filtros por função, bairro e tipo de contratação.
- Cartões adaptáveis a telas de celular e computador.
- Ação de contato preparada para WhatsApp quando um número válido estiver cadastrado.

## Comece a explorar

Não é necessário instalar dependências. Com Python instalado, execute na raiz do projeto:

```bash
python -m http.server 8000
```

Depois, abra [http://localhost:8000/templates/](http://localhost:8000/templates/) no navegador.

## Estrutura do projeto

```text
templates/
  index.html             Página inicial
  profissionais.html     Diretório de profissionais
  vagas.html             Lista de oportunidades
static/
  css/style.css          Identidade visual e estilos responsivos
  js/app.js              Renderização, busca e filtros
  js/data.js             Dados usados pelo protótipo
SQL/
  schema.sql             Espaço reservado para uma futura camada de dados
  dump.sql               Espaço reservado para dados de desenvolvimento
```

## Dados e estado atual

O site é **estático**: não possui cadastro de usuários, publicação de anúncios, autenticação ou integração com banco de dados. Os registros em `static/js/data.js` são demonstrativos, e os campos de WhatsApp estão vazios. Por isso, os anúncios não representam serviços reais e os contatos não estão ativos.

Para experimentar outros cartões, edite os arrays `profissionais` e `vagas` em `static/js/data.js`. Antes de usar o site em produção, substitua os exemplos por informações autorizadas e implemente uma forma segura de administrar e validar esses dados.

## Tecnologias

HTML, CSS e JavaScript nativos — sem bibliotecas ou serviços externos.

## Próximos passos possíveis

- Criar um fluxo de cadastro e publicação de anúncios.
- Conectar os dados a uma API e a um banco de dados.
- Validar perfis, contatos e oportunidades antes da publicação.
- Definir políticas de privacidade, moderação e termos de uso.

## Licença

Este repositório ainda não define uma licença de uso.
