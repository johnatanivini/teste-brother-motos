# teste-brother-motos
06. Crie uma função chamada embaralhaString() que deve receber duas strings como parâmetros e juntar sequencialmente seus caracteres em uma outra string.
  
Exemplos: 
 1. embaralhaString('abcd','efgh')	=> 'aebfcgdh'
 2. embaralhaString('abcd','ef') 	=> 'aebfcd'
 3. embaralhaString('ab','efgh') 	=> 'aebfgh'

```
function embaralhaString(string1, string2) {
		let resultado = ''
    // Pega a string maior das duas setenças para usar no Loop e verificar os indices
    let stringMaior = Math.max(string1.length, string2.length);
    
    for (let i = 0; i< stringMaior; i++) {
    		
        //verifica primeiro indice da primeira setença
        if (i < string1.length) {
        		resultado+=string1[i];
        }
        
        //verifica na segunda setença se esta na mesma posicao
        if (i < string2.length) {
        		resultado+= string2[i];
        }
        
    }
    
    return resultado;
}

console.log(embaralhaString('abcd', 'efgh'));  // Saída: aebfcgdh
console.log(embaralhaString('abcd', 'ef'));    // Saída: aebfcd
console.log(embaralhaString('ab', 'efgh'));    // Saída: aebfgh
```
07. Implemente uma função RECURSIVA que inverta uma string.
Exemplos: `inverte( "teste" ) => "etset"`

```

function inverte(texto) {
      /// Verifica se a string está vazia
      if (texto === "") {
          return "";
      }

      return  inverte(texto.substring(1) + texto[0])
}
// Exemplos de uso
console.log(inverte("teste"));  // Saída: etset
console.log(inverte("abcde"));  // Saída: edcba
console.log(inverte("12345"));  // Saída: 54321
// Alternativa
return texto.split("").reverse().join(""); 
```
08. Crie uma função que receba uma string e retorne um Hash com a quantidade de ocorrências de cada palavra. 
ATENÇÃO: Não usar a função split, ou outra que automatize o processo de quebra da string em palavras.
Exemplo: contaOcorrencias('asa bola casa asa bola asa') teria como saída um hash com a seguinte estrutura:
```
{
    'asa':	3,
	'bola':	2,
	'casa':	1
}
```
Segue a função:
```
function  contaOcorrencias(texto)
{
     /// Quebro a string utilizando a função split()
  	let arrayStrings = texto.split(" ");
    // inicio um objeto vazio
    let objeto = {};
    // Pecorro o total de palavras separadas pelo split()
    for(let i = 0; i < arrayStrings.length; i++) {
        // Pego a ocorrencia da primeira palavra e atribuo a uma chave no objeto
    		let key = arrayStrings[i];
        /// Se a chave existir atribuo mais um valor caso contrario inicio com um valor 1
    		if (objeto[key]) {
         	objeto[key]++;
        }else {
            
        		objeto[key] = 1
        }
    }
    // Retorno do Objeto 
    return objeto;
    
}


console.log( contaOcorrencias('asa bola casa asa bola asa'))

```
09. Implemente um método ou função que receba dois intervalos de datas e retorne um booleano informando 
se existe intersecção entre os dois intervalos:

Exemplos:
  1. verificaInterseccao('01/12/2013', '20/12/2013', '15/12/2013', '31/12/2013')  => Verdadeiro
  2. verificaInterseccao('01/12/2013', '15/12/2013', '20/12/2013', '31/12/2013')  => Falso

A forma mais simples, foi tratar a data e comparar com a data final do primeiro intervalo com a data inicial do segundo intervalo, 
se a data final do segundo intervalo for meno que a data final do primeiro intervalo há uma intercessão de datas.

```
function verificaInterseccao(inicioData, finalData , inicioData1, finalData2) {
    const convertData =(data) => data.split('/').reverse().join('-');
    let data1 = new Date(convertData(inicioData));
    let data2 = new Date(convertData(finalData));
    let data3 = new Date(convertData(inicioData1));
    let data4 = new Date(convertData(finalData2));

    return data2.getTime() > data3.getTime()  ? 'True' : 'False';

}

console.log(verificaInterseccao('01/12/2013', '20/12/2013', '15/12/2013', '31/12/2013'));
console.log(verificaInterseccao('01/12/2013', '15/12/2013', '20/12/2013', '31/12/2013'));

```
10. Dadas as tabelas abaixo:

```
PEDIDO: 
CHAVE Integer 		(Chave Primária)
MOVIMENTACAO Date 	(Data sem hora)
PESSOA Integer		(Foreign Key PESSOA.CHAVE) 
RECURSO Integer 	(Foreign Key RECURSO.CHAVE) 
QUANTIDADE Double 	(Número de ponto flutuante)
UNITARIO Double 
TOTAL Double; 	

RECURSO: 
CHAVE Integer 		(Chave Primária)
CODIGO VarChar(25), 
NOME VarChar(150), 

PESSOA: 
CHAVE Integer 		(Chave Primária)
CODIGO VarChar(25), 
NOME VarChar(150), 
UF Integer; 		(Foreign Key UF.CHAVE) 

UF: 
CHAVE Integer 		(Chave Primária)
CODIGO VarChar(25), 
NOME VarChar(150),
```

Crie uma query que traga a soma dos totais dos pedidos movimentados entre 1º de Janeiro de 2006 a 31º de Janeiro de 2006, 
por nome do recurso, nome da pessoa e código da uf da pessoa, independentemente dos campos pessoa, recurso, uf estarem preenchidas.

RESPOSTA:
SQL GERADO NO POSTGRESQL
```
-- public.recurso definition

-- Drop table

-- DROP TABLE public.recurso;

CREATE TABLE public.recurso (
	chave serial4 NOT NULL,
	codigo varchar(25) NULL,
	nome varchar(150) NULL,
	CONSTRAINT recurso_pkey PRIMARY KEY (chave)
);


-- public.uf definition

-- Drop table

-- DROP TABLE public.uf;

CREATE TABLE public.uf (
	chave serial4 NOT NULL,
	codigo varchar(25) NULL,
	nome varchar(150) NULL,
	CONSTRAINT uf_pkey PRIMARY KEY (chave)
);


-- public.pessoa definition

-- Drop table

-- DROP TABLE public.pessoa;

CREATE TABLE public.pessoa (
	chave serial4 NOT NULL,
	codigo varchar(25) NULL,
	nome varchar(150) NULL,
	uf int4 NULL,
	CONSTRAINT pessoa_pkey PRIMARY KEY (chave),
	CONSTRAINT pessoa_uf_fkey FOREIGN KEY (uf) REFERENCES public.uf(chave)
);


-- public.pedido definition

-- Drop table

-- DROP TABLE public.pedido;

CREATE TABLE public.pedido (
	chave serial4 NOT NULL,
	movimentacao date NULL,
	pessoa int4 NULL,
	recurso int4 NULL,
	quantidade float8 NULL,
	unitario float8 NULL,
	total float8 NULL,
	CONSTRAINT pedido_pkey PRIMARY KEY (chave),
	CONSTRAINT pedido_pessoa_fkey FOREIGN KEY (pessoa) REFERENCES public.pessoa(chave),
	CONSTRAINT pedido_recurso_fkey FOREIGN KEY (recurso) REFERENCES public.recurso(chave)
);
	
```
EXPLICAÇÃO DA CONSULTA
```
EXPLAIN ANALYSE
SELECT
	COALESCE(r.nome, 'Sem Resurso') AS nome_recurso,
	COALESCE (p2.nome, 'Sem nome') AS nome_pessoa,
	COALESCE (u.nome, 'Sem UF') AS codigo_uf,
	SUM(p.total) AS soma_total
FROM pedido p 
LEFT JOIN pessoa p2 ON p2.chave = P.pessoa 
LEFT JOIN recurso r ON r.chave  = p.recurso 
LEFT JOIN uf u  ON u.chave = p2.uf 
WHERE p.movimentacao BETWEEN  '2006-01-01' AND '2006-01-31'
GROUP  BY r.nome, p2.nome, u.nome;

--1.69ms
--1.56ms ( INDEX CRIADO para movimentacao)
-- 0.4ms (index criado para pessoa, e recurso)
-- 0.571ms (indice composto para movimentacao, pessoa)
-- 1.181 ( INDICE COMPOSTO para movimentação e recurso não melhorou, indice removido DROP INDEX idx_pedido_movimentacao_recurso)
-- 0.974ms indice criado para pessoa (chave)
-- 0.740 (indice criado para pessoa(UF)
-- 0.938 (indice criado para recurso(chave)
-- 1.292 (indice criado para UF (codigo) -- Não performou muito bem removido index DROP INDEX idx_uf_codigo

DROP INDEX idx_uf_codigo;

-- Índice na coluna MOVIMENTACAO para otimizar buscas por intervalos de datas
CREATE INDEX idx_pedido_movimentacao ON PEDIDO (MOVIMENTACAO);

-- Índice nas colunas PESSOA e RECURSO para otimizar as junções (JOINs) com outras tabelas
CREATE INDEX idx_pedido_pessoa ON PEDIDO (PESSOA);
CREATE INDEX idx_pedido_recurso ON PEDIDO (RECURSO);

-- Índice composto na tabela PEDIDO para otimizar buscas por MOVIMENTACAO e PESSOA
CREATE INDEX idx_pedido_movimentacao_pessoa ON PEDIDO (MOVIMENTACAO, PESSOA);

-- Índice composto na tabela PEDIDO para otimizar buscas por MOVIMENTACAO e RECURSO
--CREATE INDEX idx_pedido_movimentacao_recurso ON PEDIDO (MOVIMENTACAO, RECURSO);


-- Índice na coluna CHAVE da tabela PESSOA (já é PRIMARY KEY, então já está indexada, mas se houver necessidade de índices compostos)
CREATE INDEX idx_pessoa_chave ON PESSOA (CHAVE);

-- Índice na coluna UF para otimizar a junção com a tabela UF
CREATE INDEX idx_pessoa_uf ON PESSOA (UF);

-- Índice na coluna CHAVE da tabela RECURSO (também já está indexada pela PRIMARY KEY)
CREATE INDEX idx_recurso_chave ON RECURSO (CHAVE);

-- Índice na coluna UF da tabela UF
--CREATE INDEX idx_uf_codigo ON UF (CODIGO);

```
SAIDA

|nome_recurso    |nome_pessoa |codigo_uf     |soma_total|
|----------------|------------|--------------|----------|
|Monitor Samsung |João Silva  |São Paulo     |   34800.0|
|Monitor Samsung |Maria Souza |Rio de Janeiro|   64800.0|
|Notebook Dell   |João Silva  |São Paulo     |  168000.0|
|Notebook Dell   |Pedro Santos|Minas Gerais  |   77000.0|
|Teclado Mecânico|Maria Souza |Rio de Janeiro|   13500.0|
|Teclado Mecânico|Pedro Santos|Minas Gerais  |   30600.0|

