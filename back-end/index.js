import express from "express";
import cors from "cors";
import axios from "axios";
import { db } from "./connect.js";
import { BSON, ObjectId } from "mongodb";

const app = express();

// Configuração completa do CORS
app.use(cors({
  origin: 'http://localhost:8080', // ou a porta do seu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger de requisições
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rota principal do webhook
app.post("/api/send-to-webhook", async (req, res) => {
  try {
    console.log("Dados recebidos:", req.body);

    // Configuração do Axios
    const response = await axios({
      method: 'post',
      url: 'https://webhook.site/124c075f-b93a-4464-85e7-4de6d977a219',
      data: req.body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 5000 // timeout de 5 segundos
    });

    console.log("Resposta do webhook:", response.data);

    res.status(200).json({
      success: true,
      message: "Dados enviados com sucesso!",
      webhookResponse: response.data
    });

  } catch (error) {
    console.error("Erro detalhado:", error);

    // Tratamento avançado de erros do Axios
    let errorMessage = "Erro interno do servidor";
    let statusCode = 500;
    let errorDetails = {};

    if (error.response) {
      // Erros 4xx/5xx
      statusCode = error.response.status;
      errorMessage = `Erro no webhook (${statusCode})`;
      errorDetails = error.response.data;
    } else if (error.request) {
      // Não houve resposta
      errorMessage = "Sem resposta do webhook";
    } else {
      // Erro na configuração
      errorMessage = error.message;
    }

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: errorDetails,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

app.post('/register', async (req, res) => {
  try {
    const newUser = req.body;

    // Validação simples (pode ser expandida)
    if (!newUser.nome || !newUser.email || !newUser.senha) {
      return res.status(400).send({ error: 'Dados incompletos' });
    }

    // Verifica se já existe um usuário com o mesmo e-mail
    const existingUser = await db.collection('users').findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(409).send({ error: 'E-mail já cadastrado' });
    }

    // Inserção no banco
    const result = await db.collection('users').insertOne(newUser);
    res.status(201).send({ message: 'Usuário cadastrado com sucesso', id: result.insertedId });
  } catch (err) {
    res.status(500).send({ error: 'Erro ao cadastrar usuário' });
  }
});

app.get("/minhas-receitas", async (req, res) => {
  const { userId } = req.query;
  try {
    const objectUserId = new ObjectId(userId);
    // Aqui você poderia filtrar por ID do usuário, se quiser
    const receitas = await db.collection("users").find({ _id: objectUserId }).toArray();

    res.status(200).json(receitas);
  } catch (err) {
    console.error("Erro ao buscar receitas:", err);
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
});

app.post("/favoritar", async (req, res) => {
  try {
    // ✅ Extração do corpo da requisição
    const { userId, receita } = req.body;

    // ✅ Validação
    if (!userId || !receita) {
      return res.status(400).json({ error: "userId e receita são obrigatórios" });
    }

    // ✅ Tentativa de conversão segura para ObjectId
    let objectUserId;
    try {
      objectUserId = new ObjectId(userId);
    } catch (err) {
      console.error("ID inválido:", userId);
      return res.status(400).json({ error: "userId inválido" });
    }

    // ✅ Atualização no banco
    const result = await db.collection("users").updateOne(
      { _id: objectUserId },
      { $addToSet: { receitas_favoritas: receita } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // ✅ Resposta de sucesso
    res.status(200).json({ message: "Receita adicionada aos favoritos com sucesso!" });
  } catch (err) {
    console.error("Erro ao adicionar receita favorita:", err);
    res.status(500).json({ error: "Erro ao adicionar receita favorita" });
  }
});

app.post("/desfavoritar", async (req, res) => {
  try {
    const { userId, receitaId } = req.body;

    if (!userId || !receitaId) {
      return res.status(400).json({ error: "userId e receitaId são obrigatórios" });
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { receitas_favoritas: { id: receitaId } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Receita não encontrada nos favoritos" });
    }

    res.status(200).json({ message: "Receita removida dos favoritos com sucesso!" });
  } catch (err) {
    console.error("Erro ao remover receita favorita:", err);
    res.status(500).json({ error: "Erro interno ao desfavoritar receita" });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const usuario = await db.collection("users").findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    res.status(200).json({
      message: "Login bem-sucedido",
      userId: usuario._id.toString(), // Converta o ObjectId para string
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      email: usuario.email,
      telefone: usuario.telefone,
      data_nasc: usuario.data_nasc,
      senha: usuario.senha,
      receitas_favoritas: usuario.receitas_favoritas,
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ error: "Erro no servidor ao fazer login" });
  }
});

//rota esqueci senha
app.post('/esqueci-senha', async (req, res) => {
  const { email, novaSenha, nome, sobrenome, telefone, dataNasc } = req.body;

  if (!email || !novaSenha) {
    return res.status(400).json({ error: 'Email e nova senha são obrigatórios' });
  }

  try {
    const usuario = await db.collection('users').findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await db.collection('users').updateOne(
      { email },
      { $set: { senha: novaSenha } }
    );

    res.json({ message: 'Senha atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    res.status(500).json({ error: 'Erro ao atualizar senha' });
  }
});

//rota alterar dados
app.post('/alterar-dados', async (req, res) => {
  const { nome, sobrenome, telefone, dataNasc, senha, email } = req.body;

  if (!nome || !sobrenome || !telefone || !dataNasc || !senha) {
    return res.status(400).json({ error: 'Esses campos são obrigatórios' });
  }

  try {
    const usuario = await db.collection('users').findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await db.collection('users').updateOne(
      { email }, // filtro
      {
        $set: {
          nome,
          sobrenome,
          data_nasc: dataNasc,
          telefone,
          senha
        }
      }
    );

    res.json({ message: 'Dados atualizados com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados' });
  }
});



// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Tratamento de rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Rota não encontrada" });
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/api/send-to-webhook`);
});