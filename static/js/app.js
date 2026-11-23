const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
})[character]);

const getIniciais = nome => nome
  .trim()
  .split(/\s+/)
  .slice(0, 2)
  .map(parte => parte[0])
  .join("")
  .toUpperCase();

const whatsappUrl = numero => `https://wa.me/55${numero.replace(/\D/g, "")}`;
const moeda = valor => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0
}).format(valor);

function cardProfissional(profissional) {
  const nome = escapeHTML(profissional.nome);
  const whatsapp = (profissional.whatsapp || "").replace(/\D/g, "");
  const contato = whatsapp
    ? `<a class="btn btn-whatsapp" href="${whatsappUrl(whatsapp)}" target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp <span aria-hidden="true">↗</span></a>`
    : `<span class="btn btn-contact-disabled">Contato indisponível</span>`;

  return `
    <article class="card professional-card">
      <div class="card-header">
        <div class="avatar">${escapeHTML(getIniciais(profissional.nome))}</div>
        <div class="card-title"><h3>${nome}</h3><span class="specialty">${escapeHTML(profissional.especialidade)}</span></div>
        <span class="verified-mark" title="Perfil cadastrado" aria-label="Perfil cadastrado">✓</span>
      </div>
      <div class="card-body">
        <div class="info-row"><span aria-hidden="true">⌖</span> ${escapeHTML(profissional.bairro)}, Rondonópolis</div>
        <p class="curriculo">${escapeHTML(profissional.curriculo)}</p>
        <div class="badges">
          ${profissional.aceitaDiaria ? '<span class="badge badge-diaria">Diária</span>' : ""}
          ${profissional.aceitaContrato ? '<span class="badge badge-contrato">Contrato</span>' : ""}
        </div>
      </div>
      <div class="card-footer">${contato}</div>
    </article>`;
}

function cardVaga(vaga) {
  const whatsapp = (vaga.whatsapp || "").replace(/\D/g, "");
  const contato = whatsapp
    ? `<a class="btn btn-primary job-apply" href="${whatsappUrl(whatsapp)}" target="_blank" rel="noopener noreferrer">Tenho interesse <span aria-hidden="true">↗</span></a>`
    : `<span class="btn btn-contact-disabled job-apply">Contato indisponível</span>`;

  return `
    <article class="card vacancy-card">
      <div class="vacancy-topline"><span class="badge badge-${escapeHTML(vaga.tipo)}">${vaga.tipo === "diaria" ? "Diária" : "Contrato"}</span><span class="vacancy-status"><i></i> Aberta</span></div>
      <div class="vacancy-content">
        <span class="vacancy-category">${escapeHTML(vaga.especialidade)}</span>
        <h3>${escapeHTML(vaga.titulo)}</h3>
        <p>${escapeHTML(vaga.descricao)}</p>
        <div class="vacancy-details"><span><i aria-hidden="true">⌖</i> ${escapeHTML(vaga.bairro)}</span><span><i aria-hidden="true">◷</i> ${escapeHTML(vaga.contratante)}</span></div>
      </div>
      <div class="vacancy-footer"><div><small>Valor${vaga.tipo === "diaria" ? " por dia" : " estimado"}</small><strong>${moeda(vaga.valor)}</strong></div>${contato}</div>
    </article>`;
}

function preencherSelect(elemento, valores) {
  if (!elemento) return;
  const primeiraOpcao = elemento.options[0];
  elemento.replaceChildren(primeiraOpcao);
  valores.forEach(valor => {
    const opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = valor;
    elemento.append(opcao);
  });
}

function renderProfissionais() {
  const container = document.getElementById("professional-grid");
  if (!container) return;

  const especialidade = document.getElementById("filtro-especialidade").value;
  const bairro = document.getElementById("filtro-bairro-prof").value;
  const tipo = document.getElementById("filtro-tipo").value;
  const busca = document.getElementById("busca-prof").value.trim().toLocaleLowerCase("pt-BR");
  const lista = profissionais.filter(profissional => {
    const texto = `${profissional.nome} ${profissional.especialidade} ${profissional.curriculo}`.toLocaleLowerCase("pt-BR");
    return (!especialidade || profissional.especialidade === especialidade)
      && (!bairro || profissional.bairro === bairro)
      && (tipo !== "diaria" || profissional.aceitaDiaria)
      && (tipo !== "contrato" || profissional.aceitaContrato)
      && (!busca || texto.includes(busca));
  });

  container.innerHTML = lista.length
    ? lista.map(cardProfissional).join("")
    : '<div class="empty-state"><span class="empty-icon" aria-hidden="true">⌕</span><h3>Nenhum profissional encontrado</h3><p>Tente ajustar a busca ou escolher outros filtros.</p></div>';
  document.getElementById("professional-count").textContent = `${lista.length} ${lista.length === 1 ? "profissional encontrado" : "profissionais encontrados"}`;
}

function renderVagas() {
  const container = document.getElementById("job-grid");
  if (!container) return;

  const especialidade = document.getElementById("filtro-especialidade-vaga").value;
  const bairro = document.getElementById("filtro-bairro-vaga").value;
  const tipo = document.getElementById("filtro-tipo-vaga").value;
  const busca = document.getElementById("busca-vaga").value.trim().toLocaleLowerCase("pt-BR");
  const lista = vagas.filter(vaga => {
    const texto = `${vaga.titulo} ${vaga.especialidade} ${vaga.descricao}`.toLocaleLowerCase("pt-BR");
    return vaga.ativa
      && (!especialidade || vaga.especialidade === especialidade)
      && (!bairro || vaga.bairro === bairro)
      && (!tipo || vaga.tipo === tipo)
      && (!busca || texto.includes(busca));
  });

  container.innerHTML = lista.length
    ? lista.map(cardVaga).join("")
    : '<div class="empty-state"><span class="empty-icon" aria-hidden="true">⌕</span><h3>Nenhuma oportunidade encontrada</h3><p>Tente ajustar a busca ou escolher outros filtros.</p></div>';
  document.getElementById("job-count").textContent = `${lista.length} ${lista.length === 1 ? "oportunidade disponível" : "oportunidades disponíveis"}`;
}

function inicializarSite() {
  const profissionaisAtivos = profissionais.length;
  const vagasAtivas = vagas.filter(vaga => vaga.ativa);
  const bairrosAtendidos = new Set(profissionais.map(profissional => profissional.bairro)).size;

  document.getElementById("stat-profissionais")?.replaceChildren(String(profissionaisAtivos).padStart(2, "0"));
  document.getElementById("stat-vagas")?.replaceChildren(String(vagasAtivas.length).padStart(2, "0"));
  document.getElementById("stat-bairros")?.replaceChildren(String(bairrosAtendidos).padStart(2, "0"));

  const profissionaisDestaque = document.getElementById("home-profissionais");
  if (profissionaisDestaque) profissionaisDestaque.innerHTML = profissionais.slice(0, 3).map(cardProfissional).join("");
  const vagasDestaque = document.getElementById("home-vagas");
  if (vagasDestaque) vagasDestaque.innerHTML = vagasAtivas.slice(0, 3).map(cardVaga).join("");

  preencherSelect(document.getElementById("filtro-especialidade"), [...new Set(profissionais.map(profissional => profissional.especialidade))].sort());
  preencherSelect(document.getElementById("filtro-bairro-prof"), [...new Set(profissionais.map(profissional => profissional.bairro))].sort());
  preencherSelect(document.getElementById("filtro-especialidade-vaga"), [...new Set(vagasAtivas.map(vaga => vaga.especialidade))].sort());
  preencherSelect(document.getElementById("filtro-bairro-vaga"), [...new Set(vagasAtivas.map(vaga => vaga.bairro))].sort());

  ["busca-prof", "filtro-especialidade", "filtro-bairro-prof", "filtro-tipo"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", renderProfissionais);
  });
  ["busca-vaga", "filtro-especialidade-vaga", "filtro-bairro-vaga", "filtro-tipo-vaga"].forEach(id => {
    document.getElementById(id)?.addEventListener("input", renderVagas);
  });

  renderProfissionais();
  renderVagas();
}

document.addEventListener("DOMContentLoaded", inicializarSite);
