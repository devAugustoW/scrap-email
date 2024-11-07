require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const winston = require("winston");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const url = "https://en.wikipedia.org/wiki/Web_scraping";

// Configuração de logs com Winston
const logger = winston.createLogger({
  	level: "info",
  	format: winston.format.combine(
    	winston.format.timestamp(),
    	winston.format.printf(({ timestamp, level, message }) => {
      	return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    	})
  	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "logs/application.log" }),
	],
});

// Função de scraping para capturar apenas o título
async function scrapeTitle(url) {
	try {
		const { data } = await axios.get(url);
		const $ = cheerio.load(data);
		const title = $("title").text();
		logger.info(`Scraping realizado com sucesso: ${title}`);
		return title;
	} catch (error) {
		logger.error("Erro ao fazer scraping:", error.message);
		return null;
	}
}

// Função de envio de email
async function sendEmail(title) {
	const transporter = nodemailer.createTransport({
		service: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
});

	const emailContent = `Título da página: ${title}`;

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: process.env.EMAIL_TO,
		subject: "Resultado do Scraping",
		text: emailContent,
	};

	try {
		await transporter.sendMail(mailOptions);
		logger.info("Email enviado com sucesso!");
	} catch (error) {
		logger.error(`Erro ao enviar email: ${error.message}`);
	}
}

// Limite de requisições para evitar abuso
const limiter = rateLimit({
	windowMs: 60 * 1000,
	max: 5,
	message: "Muitas requisições! Por favor, tente novamente mais tarde.",
});

app.use("/scrape-and-email", limiter);

// Endpoint para realizar o scraping e enviar o email manualmente
app.get("/scrape-and-email", async (req, res) => {
	const title = await scrapeTitle(url);
	if (!title) {
		logger.error("Erro no scraping, sem dados retornados.");
		return res.status(500).send({ message: "Erro no scraping" });
  }

	await sendEmail(title);
	res.send({ message: "Scraping e envio de email concluídos" });
});

// Agendamento diário para enviar o resultado do scraping por email
cron.schedule("0 8 * * *", async () => {
	logger.info("Executando scraping e envio de e-mail agendado às 8h.");
	const title = await scrapeTitle(url);
	if (title) {
		await sendEmail(title);
	} else {
		logger.error(
			"Erro no scraping durante execução agendada, sem dados retornados."
		);
	}
});

app.listen(PORT, () => {
  	logger.info(`Servidor rodando na porta ${PORT}`);
});
