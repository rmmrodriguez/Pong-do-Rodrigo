//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 15;
let raio = dBolinha/2;

//variáveis da velocidade da bolinha
let velocidadexbolinha=3;
let velocidadeybolinha=3;

//variáveis da raquete
let xraquete=5;
let yraquete=150;
let craquete=10;
let hraquete=100;

//variáveis do oponente
let xoponente=585;
let yoponente=150;
let coponente=10;
let hoponente=100;
let vyoponente;

let hit = false;
let hitoponente = false;

//placar
let meuspontos=0;
let pontosoponente=0

//sons
let raquetada;
let ponto;
let trilhasonora;

function preload(){
  trilhasonora=loadSound('trilha.mp3')
  ponto=loadSound('ponto.mp3')
  raquetada=loadSound('raquetada.mp3')
}

function setup() {
  createCanvas(600, 400);
  trilhasonora.loop()
}

function draw() {
  background(0); //deixar o plano de fundo na cor preta
  mostrabolinha();
  movimentacao();
  colisao();
  mostraraquete(xraquete, yraquete);
  mostraraquete(xoponente, yoponente);
  movimentaraquete();
  //colisaoraquete();
  colisaoraquetebiblioteca();
  movimentaoponente();
  placar()
}    

function mostrabolinha(){
  circle(xBolinha, yBolinha, dBolinha)
}

function movimentacao(){
  xBolinha += velocidadexbolinha;
  yBolinha += velocidadeybolinha;
}

function colisao(){if (xBolinha + raio>width || xBolinha-raio<0){
    velocidadexbolinha *= -1}
  if(yBolinha + raio>height || yBolinha-raio<0){
    velocidadeybolinha *= -1}
}

function mostraraquete(x,y){
  rect(x,y,craquete, hraquete)
}

function movimentaraquete(){
  if (keyIsDown(87)){ //87 é o código do 'W'
    yraquete-=10;
  }
  if (keyIsDown(83)){ //87 é o código do 'S'
    yraquete+=10;
  }
}

function colisaoraquete(){
  if (xBolinha-raio<xraquete+craquete && yBolinha-raio<yraquete+hraquete && yBolinha+raio>yraquete){
    velocidadexbolinha *= -1
  }
}

function colisaoraquetebiblioteca(){
  hit = collideRectCircle(xraquete, yraquete, craquete, hraquete, xBolinha, yBolinha, raio);
  hitoponente=collideRectCircle(xoponente, yoponente, craquete, hraquete, xBolinha, yBolinha, raio);
  if (hit || hitoponente){
    velocidadexbolinha *= -1
    raquetada.play()
  }
}

function movimentaoponente(){
  if (keyIsDown(UP_ARROW)){
    yoponente-=10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yoponente+=10;
  }
}

function placar(){
  textAlign(CENTER); //Centralizando o placar
  textSize(20); //Definindo o tamanho do placar
  fill(255) //deixar o placar na cor branca
  text(meuspontos, 258,26) //pritando placar com suas coordenadas
  text(pontosoponente,341,26) //pritando placar com suas coordenadas
  if(xBolinha+raio>width){
    meuspontos+=1;
    ponto.play();
    xBolinha=300;
    yBolinha=200
    
  }
  if(xBolinha-raio<0){
    pontosoponente+=1;
    ponto.play();
    xBolinha=300;
    yBolinha=200
  }
}