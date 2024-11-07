# Aplicação de Scraping e Envio de E-mail

Este projeto é uma aplicação backend em Node.js que realiza scraping de uma página web para capturar o título e envia os resultados por e-mail. A aplicação também permite agendar o processo de scraping e envio de e-mail automaticamente todos os dias.

<br>

## Funcionalidades
- Scraping de página: Extrai o título de uma página específica.
- Envio de e-mail: Envia o título extraído para um e-mail configurado.
- Agendamento automático: Executa o scraping e envio de e-mail diariamente em um horário especificado.
- Limite de requisições: Limita o acesso ao endpoint para evitar abusos.

<br>

## Tecnologias Utilizadas
- Node.js: Ambiente de execução JavaScript.
- Express: Framework para criação de servidor backend.
- Axios: Cliente HTTP para realizar requisições.
- Cheerio: Biblioteca para manipulação e extração de dados de HTML.
- Nodemailer: Biblioteca para envio de e-mails.
- node-cron: Biblioteca para agendamento de tarefas.
- Winston: Biblioteca para geração de logs.
- express-rate-limit: Middleware para limitar requisições.

<br>

## Configuração
### Pré-requisitos
- Node.js instalado.
- E-mail Pass do Gmail.
- Passo 1: Clone o Repositório

<br>

# Passo 1: Clone o Repositório
Clone este repositório para o seu ambiente local.
```
git clone https://github.com/usuario/repositorio.git
cd repositorio
```

<br>

# Passo 2: Instale as Dependências
```
npm install
```
<br>

# Passo 3: Configuração do .env
```
PORT=3000
EMAIL_SERVICE=gmail               # Serviço de e-mail (ex: gmail, outlook)
EMAIL_USER=seuemail@gmail.com      # E-mail de envio
EMAIL_PASS=sua_senha               # Senha ou senha de aplicativo para o e-mail de envio
EMAIL_TO=destinatario@gmail.com    # E-mail de destino
```

<br>

## Iniciar o Servidor
```
node src/index.js
```

<br>

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.