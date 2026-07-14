// ==============================
// ECOCALC 2.0
// Parte 1
// ==============================

const perguntas = [

{
titulo:"🚗 Transporte",
html:`
<label>Qual meio de transporte você usa com mais frequência?</label>

<select id="transporte">
<option>Carro</option>
<option>Moto</option>
<option>Ônibus</option>
<option>Bicicleta</option>
<option>A pé</option>
</select>

<label>Quantos quilômetros por semana?</label>

<input type="number" id="km" placeholder="Ex: 120">
`
},

{
titulo:"⚡ Energia",

html:`
<label>Consumo de energia (kWh/mês)</label>

<input type="number" id="energia">

<label>Você utiliza lâmpadas LED?</label>

<select id="led">

<option>Sim</option>

<option>Não</option>

</select>
`
},

{
titulo:"💧 Água",

html:`
<label>Quanto tempo dura seu banho?</label>

<select id="banho">

<option>Menos de 5 minutos</option>

<option>5 a 10 minutos</option>

<option>Mais de 10 minutos</option>

</select>

<label>Você reaproveita água?</label>

<select id="agua">

<option>Sim</option>

<option>Não</option>

</select>
`
},

{
titulo:"♻️ Resíduos",

html:`
<label>Você faz coleta seletiva?</label>

<select id="reciclagem">

<option>Sim</option>

<option>Não</option>

</select>

<label>Utiliza garrafa reutilizável?</label>

<select id="garrafa">

<option>Sim</option>

<option>Não</option>

</select>
`
},

{
titulo:"🌳 Hábitos Sustentáveis",

html:`
<label>Você costuma economizar papel?</label>

<select id="papel">

<option>Sim</option>

<option>Não</option>

</select>

<label>Você apaga as luzes ao sair?</label>

<select id="luzes">

<option>Sempre</option>

<option>Às vezes</option>

<option>Nunca</option>

</select>
`
}

];

let etapa = 0;

const telaInicial = document.querySelector(".inicio");
const quiz = document.querySelector(".quiz");
const loading = document.querySelector(".loading");
const resultado = document.querySelector(".resultado");

window.onload = function(){

document.getElementById("btnComecar").onclick = () => {

    telaInicial.style.display = "none";
    quiz.style.display = "block";

    mostrarPergunta();

};
function mostrarPergunta(){

document.getElementById("tituloPergunta").innerHTML=
perguntas[etapa].titulo;

document.getElementById("pergunta").innerHTML=
perguntas[etapa].html;

document.getElementById("barra").style.width=
((etapa+1)/perguntas.length)*100+"%";

}

document.getElementById("proximo").onclick=()=>{

if(etapa<perguntas.length-1){

etapa++;

mostrarPergunta();

}else{

quiz.style.display="none";

loading.style.display="flex";

setTimeout(calcularResultado,2500);

}

document.getElementById("anterior").onclick=()=>{

if(etapa>0){

etapa--;

mostrarPergunta();

}

}

function calcularResultado(){

    let emissao = 0;

    // ===== CAPTURA DOS DADOS =====

    const transporte = document.getElementById("transporte").value;
    const km = Number(document.getElementById("km").value) || 0;
    const energia = Number(document.getElementById("energia").value) || 0;
    const led = document.getElementById("led").value;
    const banho = document.getElementById("banho").value;
    const agua = document.getElementById("agua").value;
    const reciclagem = document.getElementById("reciclagem").value;
    const garrafa = document.getElementById("garrafa").value;
    const papel = document.getElementById("papel").value;
    const luzes = document.getElementById("luzes").value;

    // ===== TRANSPORTE =====

    switch(transporte){

        case "Carro":
            emissao += 35;
            break;

        case "Moto":
            emissao += 22;
            break;

        case "Ônibus":
            emissao += 12;
            break;

        case "Bicicleta":
            emissao += 2;
            break;

        case "A pé":
            emissao += 0;
            break;

    }

    emissao += km * 0.45;

    // ===== ENERGIA =====

    emissao += energia * 0.18;

    if(led=="Não")
        emissao += 12;

    // ===== BANHO =====

    switch(banho){

        case "Mais de 20 minutos":
            emissao += 15;
            break;

        case "10 a 20 minutos":
            emissao += 8;
            break;

        case "Até 10 minutos":
            emissao += 2;
            break;

    }

    // ===== ÁGUA =====

    switch(agua){

        case "Alto":
            emissao += 15;
            break;

        case "Médio":
            emissao += 8;
            break;

        case "Baixo":
            emissao += 2;
            break;

    }

    // ===== RECICLAGEM =====

    switch(reciclagem){

        case "Nunca":
            emissao += 15;
            break;

        case "Às vezes":
            emissao += 8;
            break;

        case "Sempre":
            emissao += 0;
            break;

    }

    // ===== GARRAFA =====

    if(garrafa=="Não")
        emissao += 6;

    // ===== PAPEL =====

    switch(papel){

        case "Muito":
            emissao += 10;
            break;

        case "Médio":
            emissao += 5;
            break;

        case "Pouco":
            emissao += 1;
            break;

    }

    // ===== LUZES =====

    switch(luzes){

        case "Sempre":
            emissao += 12;
            break;

        case "Às vezes":
            emissao += 6;
            break;

        case "Nunca":
            emissao += 0;
            break;

    }

    let pontos = Math.round(100 - emissao);

    if(pontos > 100) pontos = 100;

    if(pontos < 0) pontos = 0;

// Mostrar resultado

loading.style.display="none";

resultado.style.display="block";

document.getElementById("pontuacao").innerHTML=pontos+"/100";

// Ponteiro

let angulo=(pontos*1.8)-90;

document.getElementById("ponteiro").style.transform=
"rotate("+angulo+"deg)";

// Classificação

let texto="";

let cor="#2d6a4f";

if(pontos>=85){

texto="🏆 Guardião do Planeta";

cor="#2d6a4f";

}

else if(pontos>=70){

texto="🌿 Amigo da Natureza";

cor="#52b788";

}

else if(pontos>=50){

texto="🌎 Em Evolução";

cor="#f4a261";

}

else{

texto="🚨 Hora de mudar hábitos";

cor="#e63946";

}

document.getElementById("nivel").innerHTML=texto;

document.getElementById("nivel").style.color=cor;

// Árvores

let arvores=Math.ceil((100-pontos)/4)+2;

document.getElementById("arvores").innerHTML=

"<h2>🌳 Compensação Ambiental</h2>"+

"<p>Plantando aproximadamente <b>"+

arvores+

" árvores</b> você ajudaria a compensar parte do seu impacto.</p>";

// Missões

let missoes = [];

if(transporte=="Carro"){

    missoes.push("🚶 Sempre que possível, faça trajetos curtos a pé ou de bicicleta.");

    missoes.push("🚌 Utilize transporte público algumas vezes por semana.");

}

if(km>50){

    missoes.push("📍 Reduza deslocamentos longos ou agrupe compromissos.");

}

if(energia>250){

    missoes.push("💡 Reduza o consumo de energia desligando aparelhos fora de uso.");

}

if(led=="Não"){

    missoes.push("💡 Troque as lâmpadas comuns por LED.");

}

if(banho=="Mais de 20 minutos"){

    missoes.push("🚿 Diminua o tempo do banho para economizar água e energia.");

}

if(agua=="Alto"){

    missoes.push("💧 Evite desperdícios fechando a torneira quando não estiver usando.");

}

if(reciclagem=="Nunca"){

    missoes.push("♻️ Separe plástico, vidro, papel e metal para reciclagem.");

}

if(garrafa=="Não"){

    missoes.push("🥤 Utilize uma garrafa reutilizável em vez de descartáveis.");

}

if(papel=="Muito"){

    missoes.push("📄 Prefira documentos digitais sempre que possível.");

}

if(luzes=="Sempre"){

    missoes.push("💡 Apague as luzes ao sair dos ambientes.");

}

if(missoes.length==0){

    missoes.push("🏆 Parabéns! Seus hábitos já são bastante sustentáveis.");

    missoes.push("🌱 Continue incentivando outras pessoas a cuidar do planeta.");

}

document.getElementById("missoes").innerHTML=

"<h2>📍 Plano de Ação</h2><ul><li>"+

missoes.join("</li><li>")+

"</li></ul>";

loading.style.display = "none";

resultado.style.display = "block";

document.getElementById("pontuacao").innerHTML = pontos + "/100";

let nivel = "";
let cor = "";
let mensagem = "";

if (pontos >= 85) {

    nivel = "🟢 Baixa emissão";
    cor = "#2ecc71";

    mensagem =
    "Parabéns! Seus hábitos geram uma baixa emissão de carbono. Continue mantendo esse estilo de vida sustentável.";

} else if (pontos >= 60) {

    nivel = "🟡 Emissão moderada";
    cor = "#f1c40f";

    mensagem =
    "Você já possui bons hábitos, mas ainda pode reduzir bastante sua pegada adotando pequenas mudanças.";

} else if (pontos >= 40) {

    nivel = "🟠 Emissão alta";
    cor = "#e67e22";

    mensagem =
    "Sua pegada de carbono está acima do ideal. Algumas mudanças na rotina podem fazer grande diferença.";

} else {

    nivel = "🔴 Emissão muito alta";
    cor = "#e74c3c";

    mensagem =
    "Sua emissão de carbono é muito elevada. É recomendável rever hábitos de transporte, energia e consumo.";

}

document.getElementById("nivel").innerHTML = nivel;
document.getElementById("nivel").style.color = cor;

document.getElementById("ponteiro").style.transform =
"rotate(" + ((pontos * 180) / 100 - 90) + "deg)";

document.getElementById("fraseEco").innerHTML = mensagem;

const arvores = Math.max(1, Math.ceil(emissao / 8));

document.getElementById("arvores").innerHTML =

"<h2>🌳 Compensação Ambiental</h2>" +

"<p>Para compensar aproximadamente sua emissão anual seriam necessárias <b>" +

arvores +

" árvores.</b></p>";

// Gráfico

const transporteGrafico = Math.min(40, Math.round(
    (transporte=="Carro") ? 35 :
    (transporte=="Moto") ? 25 :
    (transporte=="Ônibus") ? 15 :
    (transporte=="Bicicleta") ? 5 : 2
));

const energiaGrafico = Math.min(40, Math.round(energia * 0.18));

const aguaGrafico = Math.min(25,
    agua=="Alto" ? 20 :
    agua=="Médio" ? 12 : 5
);

const reciclagemGrafico = Math.min(20,
    reciclagem=="Nunca" ? 20 :
    reciclagem=="Às vezes" ? 10 : 2
);

const habitosGrafico = Math.min(30,

    (led=="Não" ? 8 : 0) +

    (garrafa=="Não" ? 5 : 0) +

    (papel=="Muito" ? 10 :
     papel=="Médio" ? 5 : 2) +

    (luzes=="Sempre" ? 10 :
     luzes=="Às vezes" ? 5 : 0)

);

const ctx = document.getElementById("grafico").getContext("2d");

if(window.graficoEco){

    window.graficoEco.destroy();

}

window.graficoEco = new Chart(ctx,{

    type:"doughnut",

    data:{

        labels:[
            "Transporte",
            "Energia",
            "Água",
            "Reciclagem",
            "Hábitos"
        ],

        datasets:[{

            data:[

                transporteGrafico,

                energiaGrafico,

                aguaGrafico,

                reciclagemGrafico,

                habitosGrafico

            ]

        }]

    },

    options:{

        responsive:true,

        plugins:{

            legend:{

                position:"bottom"

            }

        }

    }

});

// ======================
// Extras EcoCalc
// ======================

// Frases

const frases=[

"🌎 Pequenas atitudes transformam o planeta.",

"🌱 Sustentabilidade começa com você.",

"💚 Cada escolha faz diferença.",

"♻️ O melhor resíduo é aquele que não é produzido.",

"🌳 A natureza agradece suas atitudes."

];

const frase = document.getElementById("fraseEco");

if(frase){

frase.innerHTML =
frases[Math.floor(Math.random()*frases.length)];

}

// Contador animado

let numero=document.getElementById("numero");

if(numero){

let atual=0;

let alvo=1247;

let contador=setInterval(()=>{

atual+=7;

numero.innerHTML=atual;

if(atual>=alvo){

numero.innerHTML=alvo;

clearInterval(contador);

}

},10);

}

// Modo escuro

// ======================
// Modo escuro
// ======================

const btnModoEscuro = document.getElementById("modoEscuro");

if (btnModoEscuro) {

    btnModoEscuro.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            btnModoEscuro.innerHTML = "☀️ Modo Claro";
        } else {
            btnModoEscuro.innerHTML = "🌙 Modo Escuro";
        }

    });

}

// Baixar imagem (versão simples)

document.getElementById("baixarImagem").onclick=()=>{

window.print();

};

// Refazer

document.getElementById("refazer").onclick=()=>{

location.reload();

};

// Folhas caindo

function criarFolha(){

let folha=document.createElement("div");

folha.className="folha";

folha.innerHTML="🍃";

folha.style.left=Math.random()*100+"vw";

folha.style.animationDuration=(5+Math.random()*6)+"s";

document.body.appendChild(folha);

setTimeout(()=>{

folha.remove();

},10000);

}

setInterval(criarFolha,700);
