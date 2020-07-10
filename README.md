# LinkApi desafio

## Requisitos

- Node.Js 10.14^
- Yarn 1.21^
- Docker
- Conta no Pipedrive
- Conta no Bling
- Ngrok (opcional)

## Instalação

```sh
$ cp .env.example .env
$ yarn install
```

Com o arquivo de configuração, preencher as credenciais para os serviços Bling e Pipedrive
`PIPEDRIVE_TOKEN` = token do pipedrive
`BLING_API_KEY` = token de api de usuario do bling
`NGROK_TOKEN` = É possivel testar o webhook através do ngrok, para isso é preciso configurar o token de autenticação do serviço ngrok

## Servidor web

Irá rodar na porta 8080 por padrão, é possivel alterar pelo `.env`

```sh
$ yarn start
```

## Integração

A integração irá buscar as oportunidades no Pipedrive, consultar no banco se a oportunidade ja foi cadastrada no Bling, quando é criado um pedido no Bling é registrado no mongo que a oportunidade foi cadastrada com sucesso.

```sh
$ yarn integration:bling
```

## Webhook

Criei um webhook para ficar escutando as atualizações de oportunidades, para funcionar corretamente é preciso cadastrar a URI na api do pipedrive com evento de `updated` para a entidade `deal`.

Foi utilizado o docker para manter o ambiente de desenvolvimento isolado.
