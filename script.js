const estado = {
    elixir: 5,
    hpJogador: 1000,
    hpRival: 1000,
    tropasCampo: [],
    historico: "O sinal tocou! A batalha começou."
};

const cartas = [
    { nome: 'Nerd do Fundão', custo: 2, dano: 120, icone: '🤓' },
    { nome: 'Atleta da Ed. Física', custo: 4, dano: 250, icone: '🏃' },
    { nome: 'Inspetor de Bloco', custo: 3, dano: 180, icone: '👮' },
    { nome: 'Merendeira', custo: 5, dano: 350, icone: '👵' }
];

function atualizarTela() {
    document.getElementById('hp-rival').innerText = `HP: ${Math.max(0, estado.hpRival)}`;
    document.getElementById('hp-jogador').innerText = `HP: ${Math.max(0, estado.hpJogador)}`;
    document.getElementById('elixir').innerText = estado.elixir;
    document.getElementById('historico').innerText = estado.historico;

    const campoEl = document.getElementById('campo');
    campoEl.innerHTML = '';
    estado.tropasCampo.slice(-6).forEach(t => {
        const span = document.createElement('span');
        span.className = `tropa ${t.dono}`;
        span.innerText = `${t.icone} ${t.nome}`;
        campoEl.appendChild(span);
    });

    renderizarBotoes();
}

function renderizarBotoes() {
    const painel = document.getElementById('painel-cartas');
    painel.innerHTML = '';
    cartas.forEach(carta => {
        const btn = document.createElement('button');
        btn.innerText = `${carta.icone} ${carta.nome} (${carta.custo}⚡)`;
        btn.disabled = estado.elixir < carta.custo || estado.hpJogador <= 0 || estado.hpRival <= 0;
        btn.onclick = () => jogarCarta(carta);
        painel.appendChild(btn);
    });
}

function turnoRival() {
    if (Math.random() < 0.6 && estado.hpRival > 0) {
        const tropasRival = [
            { nome: 'Monitor', dano: 150, icone: '📜' },
            { nome: 'Dupla do Fundão', dano: 220, icone: '🎒' }
        ];
        const tropa = tropasRival[Math.floor(Math.random() * tropasRival.length)];
        estado.hpJogador -= tropa.dano;
        estado.tropasCampo.push({ dono: 'rival', nome: tropa.nome, icone: tropa.icone });
        estado.historico = `O Rival jogou ${tropa.nome} e causou ${tropa.dano} de dano!`;
    }
}

function jogarCarta(carta) {
    if (estado.elixir >= carta.custo) {
        estado.elixir -= carta.custo;
        estado.hpRival -= carta.dano;
        estado.tropasCampo.push({ dono: 'player', nome: carta.nome, icone: carta.icone });
        estado.historico = `Você jogou ${carta.nome} causando ${carta.dano} de dano!`;

        turnoRival();

        if (estado.elixir < 10) estado.elixir = Math.min(10, estado.elixir + 2);

        if (estado.hpRival <= 0) estado.historico = "🎉 VITÓRIA! Sua turma dominou a escola!";
        else if (estado.hpJogador <= 0) estado.historico = "💥 DERROTA! Foi para a diretoria!";

        atualizarTela();
    }
}

atualizarTela();
