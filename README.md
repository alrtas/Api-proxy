# Mercado livre API Proxy

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

# Stack

* Node JS (Express API)
* Mongo DB
* React  

# Exemplo arquitetura
![image](https://user-images.githubusercontent.com/32065208/112071293-3a7e5580-8b4e-11eb-8729-343668e8c357.png)
# Middlewares

![image](https://user-images.githubusercontent.com/32065208/112072488-af528f00-8b50-11eb-8533-848d472e8e3e.png)
