//const SHA256 = require('crypto-js/sha256');
const SHA256 = require('sha256');

// classe de um bloco
class Block {
	constructor(timestamp, previousHash = '', data) {
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.nonce = parseInt(Math.random() * 2147483647, 10);
		this.data = data;
		this.hash = this.calculateHash();
	}

	// calcula o hash do bloco atual
	calculateHash() {
		return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
	}
}

// classe da cadeia blockchain
class Blockchain {
	constructor(candidatos) {
		this.chain = [];
		this.candidatos = candidatos;
	}

	// retornar o hash do último bloco
	getLatestBlock() {
		return this.chain[this.chain.length - 1];
	}


	// computar o somatorio dos votos nos candidatos definidos no vetor candidatos
	// passado no contrutor do blockchain
	getBalance() {
		var balance = [];
		// zerar votacao
		for (var i = 0; i < this.candidatos.length; i++) {
			balance[i] = 0;
		}

		for (const block of this.chain) {
			for (var i = 0; i < this.candidatos.length; i++) {
				balance[i] += block.data.votos[i];
			}
		}

		return balance;
	}

	// verifica se toda a cadeia do blockchain é valida, recalculando os
	// hashes e verificando se o hash que está no bloco é igual ao calculado.
	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];

			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false;
			}

			if (currentBlock.previousHash !== previousBlock.calculateHash()) {
				return false;
			}
		}
		return true;
	}
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;