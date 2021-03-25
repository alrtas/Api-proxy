# Mercado livre API Proxy
O MercadoLivre possui atualmente +30.000 servidores onde suas aplicações são executadas. Elas
comunicam-se entre si através de apis, sendo que algumas possuem ainda acesso externo
(api.mercadolibre.com).
Um dos problemas que temos é como controlar e medir estas interconexões.
Para isso, precisamos implementar (codifique) um "proxy de apis" com os seguintes requisitos (em
ordem de importância):
## Desafio
- [x] Executar a função de proxy sobre o domínio api.mercadolibre.com, isto é, ele deve agir como
um intermediário para as requisições dos clientes, enviando-as à api.mercadolibre.com.
- [ ] Deverá permitir o controle das quantidades máximas de requisições por:
  - [x] IP de origem
  - [ ] Path de destino
  - [ ] Combinações de ambos
- [ ] Deve armazenar (e também permitir que se consulte) as estatísticas de uso do proxy.
## Adicional
- [ ] A interface para estatísticas e controle deveria prover APIs Rest.
- [ ] Um desenho simples de arquitetura da solução conta muito.
- [x] Cache

## Outros
Sabemos que o teste é complexo e seria desejável ter todos os requisitos implementados (e
funcionando), no entanto, qualquer nível de completude será aceito.
O código deve estar disponível em um repositório privado do Github ou Bitbucket. Após finalizar
o desenvolvimento, adicione o usuário ITMLB (it-mlb@mercadolivre.com) como colaborador para
que possamos avaliá-lo.<br>
O proxy (como solução) deverá poder superar 50.000 requisições por segundo. Não faremos
testes de carga, mas avaliaremos se a arquitetura utilizada é escalável o suficiente.

# Entendimento do problema

# Proposta de solução
Para solucionar o problema, lembrando que no texto está explicito a necessidade de codificar, foi pensado em um estrutura, em JavaScript, que irá atuar como Proxy em todo o dominio `/`, ou seja, todas as requisições que passarem pela maquina, na aplicação foi adicionado um path `/api/v1` onde também atuam todos os middlewares, para conclusão do desafio foram codificados os seguintes middlewares.
 - Logs
    - Irá salvar em um banco de dados mongodb em *proxy.logs* um documento para cada requisição realizada que passe pelo path */api/v1/*, salvando informações como, `horário`, `ip`, e dados do `path`.   
- Limitadores
   - Será responsavel, por realizar uma busca no banco de dados mongodb em *proxy.logs* se existem um determinado número de chamadas (informado via `.env`) para um determinado *path* ou *ip* (ou os *dois*, basta configurar no `.env`) em um periodo de tempo determinado. (também via `.env`), caso tenha excedido irá receber um retorno com status http em `429 Too Many Requests`, receberá um body, com ```{message: "error", reason: "Too Many Requests", stack: "...} ```. Cada chamado realizado após esse limite, receberá um delay de 100ms nas respostas, incremental de acordo com a quantidade de novos chamados, com o proposito de desencorajar ataques.
   - Exemplo de configuração no .env: `LIMMITER_WINDOWMS = 1` / `LIMMITER_MAX  = 10000` / `LIMMITER_TYPE = ippath; `, com está configuração irá validar se, na ultima horá foram realizadas mais de 10.000 requisições usando a combinação do path+ip, assim caso um determinado IP faça mais de 10.000 requisições me menos de um horá para um determinado endpoint, será bloqueado, enquanto em outro endpoint. Não.
 - Cache
    - Fornecerá um camada de cache para melhorar o tempo resposta das requisições, tendo como premissa que as as apis que desejarem utilizar o cache, deverão importar a função cache e realizar um Set da resposta obtida. Para que o middleware de cache consiga analisar se para o `path` solicitado, existe um documento no banco de dados monogdb em *proxy.cache* onde o atributo **time** esteja dentro do ultimo minuto, caso esteja, irá retornar a resposta como o documento do banco, não realizando uma nova chamada ao endpoint e melhorando o tempo resposta.

Todos os middlewares são executados na ordem apresentada após isto a requisição é encaminhada para o código dentro de `api/index.js` onde irá avaliar o restante do `path` e se for um dos configurdos, como `/emojis` ou `/faqs` ou `/mars-weather` irá encaminhar ao respectivo arquivo de api de cada um deles. Estes irão realizar as ações necessárias e efetuar o retorno em JSON. Caso seja necessário adicionar uma nova API, basta adicionar um arquivo com o nome da API e com o respectivo código, assim como o seu caminho no `/api/index.js`.

Além dos middlwares apresentados, existem outros dois que tratam erros e exceções, sendo que em qualquer middleware se for passado a função next(error) com um parametro de erro que pode ser a mensagem que irá aparecer para o clinete na ponta, chegara nestes middlwares e sera tratado e dado a resposta para o cliente. Existem somente dois tratamento, para casos de 404, não encontrado e de exceção não espearada 500, outros códigos/tratamentos devem ser implentados ainda.
 
### Técnologias utilizadas

* Node JS (Express API)
* Mongo DB

# Outras soluções


# Exemplo arquitetura
![image](https://user-images.githubusercontent.com/32065208/112071293-3a7e5580-8b4e-11eb-8729-343668e8c357.png)

# Middlewares
![image](https://user-images.githubusercontent.com/32065208/112072488-af528f00-8b50-11eb-8533-848d472e8e3e.png)

# Melhorias
  1. Alterar sistema de cache para utilizar `Redis` ao inves de `MongoDB`, uma vez que Redis é uma aplicação que funciona de maneira *in memory* entregará uma performance superior ao monogoDB quando atuando em Cache. 
  2. Desacoplar /api/proxy-usage.js em outro projeto, uma vez que o objetivo desse script é gerar APIs para verificar o uso do api proxy e fornecer dados para o front-end do dashboard, o mesmo poderia estar rodando em um container a parte, uma vez que todos os dados de uso são guardados em banco e não in memory.

# FAQ
 1. Porque JavaScript (Node.JS - Express)?
 2. Porque MongoDB?

# Dependencias do projeto
    "autocannon": "^7.0.5",
    "axios": "^0.21.1",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^4.4.1",
    "mongodb": "^3.6.5",
    "mongoose": "^5.12.2",
    "morgan": "^1.10.0",
