
/*
@Autor : Yuri Domingos
Data   : 22 -06 -2021
Objectivo : Construir um bot, apto, para entrar na nossa bolsa de valores 

*/



console.log("------ Entrando na bolsa de valores ------------------------")

// chamada de todos os pacotes necessários para o desenvolvimento necessário  

const express = require('express')
const path = require('path')
var request = require('request');
const PORT = process.env.PORT || 5000
var bodyParser = require("body-parser");
var cors = require('cors');

var player = require('play-sound')(opts = {})
var app = express();



const http = require('http')
Web3 = require("web3");


//-- vamos, criar um nosso project ID na plataforma mãe (INFURA), ou será o código normal (API da nossa bolsa de valores )
web3 = new Web3('https://mainnet.infura.io/v3/ed07e65b44354a48aa1f5547369fb513');


//
var server = http.createServer(app).listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.use(express.static(path.join(__dirname, 'public')))


var cors = require('cors');
app.use(cors({credentials: true, origin: '*'}));
 // .set('views', path.join(__dirname, 'views'))
  //.set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('pages/index'))
 app.get("/", function(req, res) {
  /*
  var answer = checkParameters(['testing'], req.query);

  if(answer.status=="fail"){

    res.send(answer);
    return;
  }

  var testing = req.query.testing;

  if(testing == "false"){
    res.send({arbs: theArbs, prices: allCoins });
  }

  else{
    res.send({arbs: theTestingArbs, prices: allCoins });

  }
 	*/

  res.send("example response");

 })




 app.get("/simulacaoTransacao", function(req, res) {
  exampleTransactions();
  res.send("O exemplo das transações foram criadas. verifica a tua console.")

 })


function simulacaoTransacao()
{
   var endereco          = '0xC0DcE374F9aC0607B432Be0b3439c5Dc84c8f985';
   var chavePrivadaDaConta = '305378D1DE2E37FE1100464AFBC1ACC9CFC91EDF1A226E07544D6EBE2BFBC250';
   var enderecoDoToken   = '0x1d6cbd79054b89ade7d840d1640a949ea82b7639';
   
   web3.eth.accounts.wallet.add("0x"+chavePrivadaDaConta);
   
   var abiDoContracto = [
   
    {
    "constant": true,
    "inputs": [],
    "name": "getDAIPrice",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "buyDai",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
];
   
   var primeiroContrato = new web3.eth.Contract(abiDoContracto, enderecoDoToken)

const daiPrice = primeiroContrato.methods.getDAIPrice().call(
{
  'from': '0xC0DcE374F9aC0607B432Be0b3439c5Dc84c8f985'

},function(error, data){
  console.log(" o preço da DAI é :")
  console.log(data)
})


// comprar dai

var tx = primeiroContrato.methods.buyDai().send({

  'from': '0xC0DcE374F9aC0607B432Be0b3439c5Dc84c8f985',
  'gas':1000000,
  value: 10000000,


}, function(error, data){
  console.log(error);
  console.log(data)
})


}

// verificar os parametros 

function verifcarParametros(requiredParams, sentParams){

  hasAll = true;

  for (i in requiredParams){
    var hasThis = false;
    for(j in sentParams){
      if(requiredParams[i] == j){
        hasThis = true;
      }
    }

    if(hasThis == false){
      return {"status":"fail", "msg":"please send "+ requiredParams[i]};

    }

  }


  return {"status":"success", "msg":"Has all the params"};

}
  


