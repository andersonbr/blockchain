const { Blockchain, Block } = require('./blockchain.js');
const { Urna } = require('./urna.js')

// vetor com o nome dos candidatos, incluindo nulo e branco
var candidatos = [
	'Nulo',
	'Branco',
	'João',
	'José',
	'Maria'
]

// funcao que gera votos de forma aleatoria
function generateVotos() {
	var votos = [];
	for (var i = 0; i < candidatos.length; i++) {
		votos[i] = parseInt(Math.random() * 100, 10);
	}
	return votos;
}

// 100 urnas para o exemplo
var nUrnas = 100;
// hash inicial
var ultimoHash = 0;

// inicializa o blockchain
var blockChain = new Blockchain(candidatos)
// cria os blocos e 
for (var i = 0; i < nUrnas; i++) {
	// cria urna com votos gerados aleatoriamente
	var urna = new Urna(i, generateVotos())
	// insere o bloco na cadeia blockchain
	blockChain.chain[i] = new Block(i, ultimoHash, urna);
	// guarda ultimo hash para ser utilizado no proximo bloco
	ultimoHash = blockChain.getLatestBlock().hash;
	
}

////////////////////////////////////////////////////////////////////////////
// Simulando uma alteracao nos dados da blockchain para verificar a validade
//
//Aumentando votos de um candidato
blockChain.chain[10].data.votos[3] += 100000000;	
console.log(blockChain.isChainValid()) // verificando novamente
//Retornando ao valor normal
blockChain.chain[10].data.votos[3] -= 100000000;
console.log(blockChain.isChainValid()) // verificando novamente

// mostrar contabilizacao de votos
var votos = blockChain.getBalance();
for (var i = 0; i<candidatos.length; i++) {
    console.log(`${candidatos[i]}: ${votos[i]}`);
}