// ==============================
// ECOCALC 2.0
// ==============================
// ECOCALC 3.0
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

// ==============================
// VARIÁVEIS
// ==============================

let etapa = 0;

const respostas = {};

const telaInicial = document.querySelector(".inicio");
const quiz = document.querySelector(".quiz");
const loading = document.querySelector(".loading");
const resultado = document.querySelector(".resultado");

// ==============================
// MOSTRAR PERGUNTA
// ==============================

function mostrarPergunta(){

document.getElementById("tituloPergunta").innerHTML =
perguntas[etapa].titulo;

document.getElementById("pergunta").innerHTML =
perguntas[etapa].html;

document.getElementById("barra").style.width =
((etapa+1)/perguntas.length)*100+"%";

// Restaurar respostas já preenchidas

Object.keys(respostas).forEach(id=>{

const campo=document.getElementById(id);

if(campo){

campo.value=respostas[id];

}

});

}

// ==============================
// SALVAR RESPOSTAS
// ==============================

function salvarRespostas(){

document.querySelectorAll("#pergunta input,#pergunta select").forEach(campo=>{

respostas[campo.id]=campo.value;

});

}

// ==============================
// INICIAR
// ==============================

window.onload=()=>{

document.getElementById("btnComecar").onclick=()=>{

telaInicial.style.display="none";

quiz.style.display="block";

mostrarPergunta();

};

};

// ==============================
// BOTÃO PRÓXIMO
// ==============================

document.getElementById("proximo").onclick=()=>{

salvarRespostas();

if(etapa<perguntas.length-1){

etapa++;

mostrarPergunta();

}else{

quiz.style.display="none";

loading.style.display="flex";

setTimeout(calcularResultado,2000);

}

};

// ==============================
// BOTÃO VOLTAR
// ==============================

document.getElementById("anterior").onclick=()=>{

if(etapa>0){

salvarRespostas();

etapa--;

mostrarPergunta();

}

};

function calcularResultado(){

let emissao = 0;

//==============================
// Ler respostas salvas
//==============================

const transporte = respostas.transporte || "";
const km = Number(respostas.km) || 0;
const energia = Number(respostas.energia) || 0;
const led = respostas.led || "";
const banho = respostas.banho || "";
const agua = respostas.agua || "";
const reciclagem = respostas.reciclagem || "";
const garrafa = respostas.garrafa || "";
const papel = respostas.papel || "";
const luzes = respostas.luzes || "";

//==============================
// Transporte
//==============================

switch(transporte){

case "Carro":
    emissao += 30;
    break;

case "Moto":
    emissao += 20;
    break;

case "Ônibus":
    emissao += 10;
    break;

case "Bicicleta":
    emissao += 2;
    break;

case "A pé":
    emissao += 0;
    break;

}

emissao += km * 0.12;

//==============================
// Energia
//==============================

emissao += energia * 0.06;

if(led=="Não")
    emissao += 8;

//==============================
// Banho
//==============================

switch(banho){

case "Menos de 5 minutos":
    emissao += 1;
    break;

case "5 a 10 minutos":
    emissao += 5;
    break;

case "Mais de 10 minutos":
    emissao += 10;
    break;

}

//==============================
// Água
//==============================

if(agua=="Não")
    emissao += 8;

//==============================
// Reciclagem
//==============================

if(reciclagem=="Não")
    emissao += 10;

//==============================
// Garrafa
//==============================

if(garrafa=="Não")
    emissao += 5;

//==============================
// Papel
//==============================

if(papel=="Não")
    emissao += 5;

//==============================
// Luzes
//==============================

switch(luzes){

case "Sempre":
    emissao += 0;
    break;

case "Às vezes":
    emissao += 5;
    break;

case "Nunca":
    emissao += 10;
    break;

registrarUso();

}

//==============================
// Pontuação
//==============================

let pontos = Math.round(100 - (emissao * 0.35));

if(pontos>100) pontos=100;

if(pontos<0) pontos=0;

//==============================
// Mostrar resultado
//==============================

loading.style.display="none";

resultado.style.display="block";

document.getElementById("pontuacao").innerHTML =
pontos + "/100";

//==============================
// Velocímetro
//==============================

let angulo = (pontos * 1.8) - 90;

document.getElementById("ponteiro").style.transform =
"rotate("+angulo+"deg)";

//==============================
// Classificação
//==============================

let texto="";
let cor="";

if(pontos>=85){

texto="🌱 Baixa emissão";
cor="#2d6a4f";

}
else if(pontos>=65){

texto="🌿 Emissão moderada";
cor="#52b788";

}
else if(pontos>=40){

texto="🌎 Emissão elevada";
cor="#f4a261";

}
else{

texto="🚨 Alta emissão";
cor="#e63946";

}

document.getElementById("nivel").innerHTML = texto;
document.getElementById("nivel").style.color = cor;

//==============================
// Árvores
//==============================

let arvores = Math.max(1,Math.ceil(emissao/25));

document.getElementById("arvores").innerHTML =

"<h2>🌳 Compensação Ambiental</h2>"+
"<p>Seriam necessárias aproximadamente <b>"+
arvores+
" árvores</b> para compensar parte dessa emissão.</p>";

//==============================
// Missões
//==============================

let missoes="<h2>🎯 Seu Plano de Ação</h2><br>";

if(transporte=="Carro")
missoes+="🚲 Utilize transporte alternativo uma vez por semana.<br>";

if(energia>200)
missoes+="💡 Reduza o consumo de energia.<br>";

if(banho=="Mais de 10 minutos")
missoes+="🚿 Tome banhos mais curtos.<br>";

if(agua=="Não")
missoes+="💧 Reaproveite água sempre que possível.<br>";

if(reciclagem=="Não")
missoes+="♻️ Faça coleta seletiva.<br>";

if(garrafa=="Não")
missoes+="🧴 Use uma garrafa reutilizável.<br>";

if(papel=="Não")
missoes+="📄 Evite desperdício de papel.<br>";

if(luzes!="Sempre")
missoes+="💡 Apague as luzes ao sair.<br>";

missoes+="🌱 Pequenas mudanças fazem grande diferença.";

document.getElementById("missoes").innerHTML = missoes;

//====================================
// GRÁFICO
//====================================

const canvas = document.getElementById("grafico");

if(canvas){

const ctx = canvas.getContext("2d");

if(window.graficoEco){

window.graficoEco.destroy();

}

window.graficoEco = new Chart(ctx,{

type:"doughnut",

data:{

labels:[
"Transporte",
"Energia",
"Hábitos"
],

datasets:[{

data:[

km*0.12+(
transporte=="Carro"?30:
transporte=="Moto"?20:
transporte=="Ônibus"?10:
transporte=="Bicicleta"?2:0
),

energia*0.06+(led=="Não"?8:0),

emissao-
(
km*0.12+
(transporte=="Carro"?30:
transporte=="Moto"?20:
transporte=="Ônibus"?10:
transporte=="Bicicleta"?2:0)
)-
(energia*0.06+(led=="Não"?8:0))

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

}

//====================================
// FRASES
//====================================

const frases=[

"🌎 Pequenas atitudes transformam o planeta.",

"🌱 Sustentabilidade começa com você.",

"💚 Cada escolha faz diferença.",

"♻️ O melhor resíduo é aquele que não é produzido.",

"🌳 Não existe planeta B."

];

const frase=document.getElementById("fraseEco");

if(frase){

frase.innerHTML=

frases[Math.floor(Math.random()*frases.length)];

}

//====================================
// BAIXAR
//====================================

const baixar=document.getElementById("baixarImagem");

if(baixar){

baixar.onclick=()=>{

window.print();

};

}

//====================================
// REFAZER
//====================================

const refazer=document.getElementById("refazer");

if(refazer){

refazer.onclick=()=>{

location.reload();

};

}

//====================================
// MODO ESCURO
//====================================

const modo=document.getElementById("modoEscuro");

if(modo){

modo.onclick=()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

modo.innerHTML="☀️ Modo Claro";

}else{

modo.innerHTML="🌙 Modo Escuro";

}

};

}

}