# Mercado livre API Proxy

## Desafio
- [ ] Executar a função de proxy sobre o domínio api.mercadolibre.com, isto é, ele deve agir como
um intermediário para as requisições dos clientes, enviando-as à api.mercadolibre.com.
- [ ] Deverá permitir o controle das quantidades máximas de requisições por:
  - [ ] IP de origem
  - [ ] Path de destino
  - [ ] Combinações de ambos
- [ ] Deve armazenar (e também permitir que se consulte) as estatísticas de uso do proxy.
## Adicional
- [ ] A interface para estatísticas e controle deveria prover APIs Rest.
- [ ] Um desenho simples de arquitetura da solução conta muito.
- [ ] Cache

## Outros
Sabemos que o teste é complexo e seria desejável ter todos os requisitos implementados (e
funcionando), no entanto, qualquer nível de completude será aceito.
O código deve estar disponível em um repositório privado do Github ou Bitbucket. Após finalizar
o desenvolvimento, adicione o usuário ITMLB (it-mlb@mercadolivre.com) como colaborador para
que possamos avaliá-lo.<br>
O proxy (como solução) deverá poder superar 50.000 requisições por segundo. Não faremos
testes de carga, mas avaliaremos se a arquitetura utilizada é escalável o suficiente.

# Stack

* Node JS (Express API)
* Mongo DB
* React  



# Express API Starter

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [mocha](https://www.npmjs.com/package/mocha)
  * ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run dev
```
