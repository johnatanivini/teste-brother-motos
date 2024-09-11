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
// O teste efeuado gerou um problema de recursão, eu faria usando as ferramentas já disponíveis no JS
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
