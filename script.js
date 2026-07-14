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

let pontos = 100;

let transporte = document.getElementById("transporte")?.value || "";
let km = Number(document.getElementById("km")?.value) || 0;
let energia = Number(document.getElementById("energia")?.value) || 0;
let led = document.getElementById("led")?.value || "";
let banho = document.getElementById("banho")?.value || "";
let agua = document.getElementById("agua")?.value || "";
let reciclagem = document.getElementById("reciclagem")?.value || "";
let garrafa = document.getElementById("garrafa")?.value || "";
let papel = document.getElementById("papel")?.value || "";
let luzes = document.getElementById("luzes")?.value || "";

// Transporte

if(transporte=="Carro") pontos-=20;
if(transporte=="Moto") pontos-=15;
if(transporte=="Ônibus") pontos-=8;
if(transporte=="Bicicleta") pontos+=5;
if(transporte=="A pé") pontos+=8;

pontos-=Math.floor(km/30);

// Energia

pontos-=Math.floor(energia/40);

if(led=="Sim") pontos+=5;

// Água

if(banho=="Mais de 10 minutos") pontos-=15;

if(banho=="5 a 10 minutos") pontos-=7;

if(agua=="Sim") pontos+=5;

// Resíduos

if(reciclagem=="Sim") pontos+=8;

if(garrafa=="Sim") pontos+=5;

// Hábitos

if(papel=="Sim") pontos+=5;

if(luzes=="Sempre") pontos+=6;

if(luzes=="Às vezes") pontos+=2;

if(pontos>100) pontos=100;

if(pontos<0) pontos=0;

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

let missoes="<h2>🎯 Seu Plano de Ação</h2><br>";

if(transporte=="Carro")

missoes+="🚲 Faça um trajeto por semana sem usar o carro.<br>";

if(energia>180)

missoes+="💡 Reduza o consumo de energia em 10%.<br>";

if(banho=="Mais de 10 minutos")

missoes+="🚿 Diminua o banho para até 8 minutos.<br>";

if(reciclagem=="Não")

missoes+="♻️ Comece a separar os resíduos recicláveis.<br>";

if(garrafa=="Não")

missoes+="🧴 Utilize uma garrafa reutilizável.<br>";

if(luzes!="Sempre")

missoes+="💡 Apague as luzes ao sair dos ambientes.<br>";

missoes+="🌱 Compartilhe essas dicas com um amigo.";

document.getElementById("missoes").innerHTML=missoes;

// Gráfico

const ctx=document.getElementById("grafico");

if(window.graficoEco){

window.graficoEco.destroy();

}

window.graficoEco=new Chart(ctx,{

});

}
type:"doughnut",

data 

labels:[
"Transporte",
"Energia",
"Água",
"Reciclagem",
"Hábitos"
],

datasets [{

data:[

100-pontos,

energia/4,

10,

10,

20

]

}]

},

options 

plugins:{

legend:{

position:"bottom"

}

}

}

;

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
