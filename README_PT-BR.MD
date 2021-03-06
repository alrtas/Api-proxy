# API Proxy
Um dos problemas hoje no mundo da tecnologia é como controlar e medir as interconexões, ou chamadas API.
Para isso, implementei (codifiquei) um "proxy de apis" com os seguintes requisitos (em
ordem de importância):
## Requisitos
- [x] Executar a função de proxy sobre o domínio da maquina, isto é, ele deve agir como
um intermediário para as requisições dos clientes.
- [x] Deverá permitir o controle das quantidades máximas de requisições por:
  - [x] IP de origem
  - [x] Path de destino
  - [x] Combinações de ambos
- [x] Deve armazenar (e também permitir que se consulte) as estatísticas de uso do proxy.
## Adicional
- [x] A interface para estatísticas e controle deveria prover APIs Rest.
- [x] Um desenho simples de arquitetura da solução conta muito.
- [x] Cache


# Entendimento do problema

Um proxy de API é uma interface para desenvolvedores que desejam usar seus serviços de back-end. Em vez de fazer com que eles consumam esses serviços diretamente, eles acessam um proxy de API criado. Com um proxy, você pode fornecer recursos para aumentar o valor agregado, como:
 - Segurança
 - Analise
 - Tratamento de falhas
 - Cache e persistência
 - Cotas
 - Transformações
 - Monetizar

O proxy da API isola o desenvolvedor do aplicativo de seu serviço de back-end. Portanto, você está livre para alterar a implementação do serviço, desde que a API pública permaneça consistente. Por exemplo, você pode alterar a implementação de um banco de dados, mover seus serviços para um novo host ou fazer qualquer outra alteração na implementação do serviço. Ao manter uma API de front-end consistente, os aplicativos cliente existentes continuarão a funcionar independentemente das alterações no back-end.

Você pode usar políticas no proxy de API para adicionar funcionalidade a um serviço sem ter que fazer alterações no serviço de back-end. Por exemplo, você pode adicionar políticas ao seu proxy para realizar transformações e filtragem de dados, adicionar segurança, executar lógica condicional ou código personalizado e muitas outras ações. O importante a lembrar é que você implementa políticas no Edge, não em seu servidor de back-end.


# Proposta de solução
Para solucionar o problema, lembrando que no texto está explicito a necessidade de codificar, foi pensado em um estrutura, em JavaScript, que irá atuar como Proxy em todo o dominio `/`, ou seja, todas as requisições que passarem pela maquina, na aplicação no path `/*`  atuam todos os middlewares, para conclusão do desafio foram codificados os seguintes middlewares.
 - Logs
    - Irá salvar em um banco de dados mongodb em *proxy.logs* um documento para cada requisição realizada que passe pelo path */*, salvando informações como, `horário`, `ip`, e dados do `path`. Alguns dados dos LOGs podem ser extraidos via REST API
- Limitadores
   - Será responsavel, por realizar uma busca no banco de dados mongodb em *proxy.logs* se existem um determinado número de chamadas para um determinado *path* ou *ip* (ou os *dois*) em um periodo de tempo determinado, caso tenha excedido irá receber um retorno com status http em `429 Too Many Requests`, receberá um body, com ```{message: "error", reason: "Too Many Requests", stack: "...} ```. Cada chamado realizado após esse limite, receberá um delay de 100ms nas respostas, incremental de acordo com a quantidade de novos chamados, com o proposito de desencorajar ataques.
   - Exemplo de configuração no .env: `LIMMITER_WINDOWMS = 1` / `LIMMITER_MAX  = 10000` / `LIMMITER_TYPE = ippath; `, ou também pode ser feita via REST API, com está configuração irá validar se, na ultima horá foram realizadas mais de 10.000 requisições usando a combinação do path+ip, assim caso um determinado IP faça mais de 10.000 requisições me menos de um horá para um determinado endpoint, será bloqueado, enquanto em outro endpoint. Não.
 - Cache
    - Fornecerá um camada de cache para melhorar o tempo resposta das requisições, tendo como premissa que as as apis que desejarem utilizar o cache, deverão importar a função cache e realizar um Set da resposta obtida. Para que o middleware de cache consiga analisar se para o `path` solicitado, existe um documento no banco de dados monogdb em *proxy.cache* onde o atributo **time** esteja dentro do ultimo minuto, caso esteja, irá retornar a resposta como o documento do banco, não realizando uma nova chamada ao endpoint e melhorando o tempo resposta.

Todos os middlewares são executados na ordem apresentada após isto a requisição é encaminhada para o código dentro de `api/index.js` onde irá avaliar o restante do `path` e se for um dos configurdos, como `/emojis` ou `/faqs` ou `/mars-weather`, entre outras irá encaminhar ao respectivo arquivo de api de cada um deles. Estes irão realizar as ações necessárias e efetuar o retorno em JSON. Caso seja necessário adicionar uma nova API, basta adicionar um arquivo com o nome da API e com o respectivo código, assim como o seu caminho no `/api/index.js`.

Além dos middlwares apresentados, existem outros dois que tratam erros e exceções, sendo que em qualquer middleware se for passado a função next(error) com um parametro de erro que pode ser a mensagem que irá aparecer para o clinete na ponta, chegara nestes middlwares e sera tratado e dado a resposta para o cliente. Existem somente dois tratamento, para casos de 404, não encontrado e de exceção não espearada 500, outros códigos/tratamentos devem ser implentados ainda.

Também foi adicionado um middleware com um conceito bem simplorio de segurança pode pode ser evoluido a implementação de seguraça em APIs individuais ou em todas quando aplicadas no path `/*`, assim também sendo possivel realizar uma limitação por aplicação, criando o conceito onde um aplicação receberia um token e uma aplicação poderia se subscrever em diversas APIs, e as regras de limitação seriam em cima no uso da aplicação e não das APIs.
 
### APIs criadas 
 
[projeto.postman_collection.zip](https://github.com/alrtas/api-proxy/files/6218628/Meli.postman_collection.zip)

### Técnologias utilizadas

* Node JS (Express API)
* Mongo DB

# Outras soluções

* [Apigee](https://cloud.google.com/apigee?hl=pt-br)
* [NGINX Plus](https://www.nginx.com/solutions/api-management-gateway/)
* [Amazon API Gateway](https://aws.amazon.com/pt/api-gateway/)


# Exemplo arquitetura
![image](https://user-images.githubusercontent.com/32065208/112071293-3a7e5580-8b4e-11eb-8729-343668e8c357.png)

# Middlewares
![log_mediator](https://user-images.githubusercontent.com/32065208/112524630-d098c280-8d7e-11eb-84e7-8f82bebf3a95.PNG)
![limiter_mediator](https://user-images.githubusercontent.com/32065208/112525070-469d2980-8d7f-11eb-9c5f-4d1469d692bc.PNG)
![cache_mediator](https://user-images.githubusercontent.com/32065208/112524671-d7273a00-8d7e-11eb-85e5-94ab82721dfc.PNG)


# Melhorias
  1. Alterar sistema de cache para utilizar `Redis` ao inves de `MongoDB`, uma vez que Redis é uma aplicação que funciona de maneira *in memory* entregará uma performance superior ao monogoDB quando atuando em Cache. 
  2. Desacoplar `/usage/`, `/config/`, `/emojis/` e `faqs/*` em outros projetos, uma vez que o objetivo desse script é gerar APIs para verificar o uso do api proxy e fornecer dados para o front-end do dashboard, o mesmo poderia estar rodando em um container a parte, uma vez que todos os dados de uso são guardados em banco e não in memory.
  3. Realizar o rate limit por aplicação, para isso seria necessário criar o conceito de aplicação, onde o desenvolvedor iria cria-lá e receber um token para essa aplicação, e então iria subscrever as APIs que gostaria de utilizar nesta aplicação, assim seria possivel fazer o monitoramento, além do apresentado, por ip, path, ip+path mas também pela aplicação inteira, criando regras de governanças mais voltadas ao negócio geral e não a api em si.
  4. Criar mais um banco de dados para monitorar todos os erros que ocorrem, principalmente nos blocos try catch.

# Dependencias do projeto
    "axios": "^0.21.1",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^4.4.1",
    "mongodb": "^3.6.5",
    "mongoose": "^5.12.2",
    "morgan": "^1.10.0",
