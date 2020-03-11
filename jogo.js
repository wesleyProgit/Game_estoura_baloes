var timerId = null; //Variável que armazena a chamada da funcão timeOut

function inciaJogo(){

    var url = window.location.search
    var nivel_jogo = url.replace('?', '')

    var tempo_segundos = 0
    
    if(nivel_jogo == 1){//Fácil 120 segundos
        tempo_segundos = 120
    }

    if(nivel_jogo == 2){//Normail 60 segudos
        tempo_segundos = 60
    }
    
    if(nivel_jogo == 3){//Dificil 30 segundos
        tempo_segundos = 30
    }
    
    //Inserindo segundos no spam
    document.getElementById('cronometro').innerHTML = tempo_segundos  

    //Quantidade de baloes
    var qtde_baloes = 10
    crian_baloes(qtde_baloes)

    //Imprimir qtde baloes inteiro
    document.getElementById('baloesInteiros').innerHTML = qtde_baloes
    document.getElementById('baloesEstourados').innerHTML = 0

    contagem_tempo(tempo_segundos + 1)
}

function contagem_tempo(segundos){
    //Decrementa um 1 segundo do cronômetro
    segundos = segundos - 1

    //Cronômetro pausa no zero
    if(segundos == -1){
        clearTimeout(timerId)
        gamer_over()
        return false
    }

    //Passa os segundos para o cronômetro
    document.getElementById('cronometro').innerHTML = segundos

    //Acão do cronômetro
    timerId = setTimeout("contagem_tempo("+segundos+")", 1000)
}

function crian_baloes(qtde_baloes){
    for(var i = 1; i <= qtde_baloes; i++){

        //Cria os balões na tela
        var balao = document.createElement('img')
        balao.src = 'imagens/balao_azul_pequeno.png'
        balao.style.margin = '10px'
        balao.style.cursor='crosshair'
        balao.id = 'b'+i
        balao.onclick = function(){estourar(this);}


        document.getElementById('cenario').appendChild(balao)
    }

}

function estourar(e){
    var id_balao = e.id
    
    document.getElementById(id_balao).setAttribute("onclick", "")
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1)
}

function pontuacao(acao){

    var baloesInteiros = document.getElementById('baloesInteiros').innerHTML 
    var baloesEstourados = document.getElementById('baloesEstourados').innerHTML

    baloesInteiros = parseInt(baloesInteiros)
    baloesEstourados = parseInt(baloesEstourados)

    baloesInteiros = baloesInteiros + acao
    baloesEstourados = baloesEstourados - acao

    document.getElementById('baloesInteiros').innerHTML = baloesInteiros
    document.getElementById('baloesEstourados').innerHTML = baloesEstourados

    sintuacao_jogo(baloesInteiros)

}

function sintuacao_jogo(baloesInteiros){

    if(baloesInteiros == 0){
        alert('Parabéns, você conseguiu estourar todos os balões a tempo!!')
        parar_jogo()

    }

}

function parar_jogo(){
    clearTimeout(timerId)
}

function gamer_over(){  
    alert('Fim de jogo você não conseguiu!')
    
}