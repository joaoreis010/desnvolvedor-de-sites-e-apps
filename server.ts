import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { google } from "googleapis";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser } from "./src/db/users.ts";
import { db } from "./src/db/index.ts";
import { transactions, accounts, categories, users, groups, userGroups, groupPosts, investments } from "./src/db/schema.ts";
import { eq, and, desc, inArray, sql } from "drizzle-orm";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Auth & User Sync
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      const { email, displayName, photoURL } = req.body;
      const user = await getOrCreateUser(req.user!.uid, email, displayName, photoURL);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Google Sheets Export
  app.post("/api/export/sheets", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const { accessToken } = req.body;
      if (!accessToken || accessToken === 'MOCK_TOKEN') {
        return res.status(400).json({ error: "Um token de acesso válido do Google é necessário para exportar. Por favor, faça login novamente para conceder permissão." });
      }

      const userTransactions = await db.select().from(transactions).where(eq(transactions.userId, dbUser.id));
      
      const auth = new google.auth.OAuth2();
      auth.setCredentials({ access_token: accessToken });
      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheet = await sheets.spreadsheets.create({
        requestBody: {
          properties: { title: `Relatório Financeiro Finanza - ${new Date().toLocaleDateString('pt-BR')}` }
        }
      });

      const spreadsheetId = spreadsheet.data.spreadsheetId;
      
      const values = [
        ["Data", "Descrição", "Tipo", "Valor"],
        ...userTransactions.map(t => [
          new Date(t.date).toLocaleDateString('pt-BR'),
          t.description,
          t.type === 'income' ? 'Receita' : 'Despesa',
          Number(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
        ])
      ];

      await sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId!,
        range: "Página1!A1",
        valueInputOption: "RAW",
        requestBody: { values }
      });

      res.json({ spreadsheetId, url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}` });
    } catch (error: any) {
      console.error("Sheets export failed:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Accounts
  app.get("/api/accounts", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });
      const userAccounts = await db.select().from(accounts).where(eq(accounts.userId, dbUser.id));
      res.json(userAccounts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/accounts", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });
      const { name, type, bank, balance, currency } = req.body;
      const newAccount = await db.insert(accounts).values({
        userId: dbUser.id,
        name,
        type,
        bank,
        balance,
        currency
      }).returning();
      res.json(newAccount[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Transactions
  app.get("/api/transactions", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });
      const userTransactions = await db.select().from(transactions).where(eq(transactions.userId, dbUser.id)).orderBy(desc(transactions.date));
      res.json(userTransactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/transactions", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });
      const { accountId, categoryId, groupId, amount, type, description, date } = req.body;
      const newTransaction = await db.insert(transactions).values({
        userId: dbUser.id,
        accountId: parseInt(accountId),
        categoryId: parseInt(categoryId),
        groupId: groupId ? parseInt(groupId) : null,
        amount,
        type,
        description,
        date: date ? new Date(date) : new Date()
      }).returning();
      const account = await db.query.accounts.findFirst({ where: eq(accounts.id, accountId) });
      if (account) {
        const newBalance = type === 'income' ? Number(account.balance) + Number(amount) : Number(account.balance) - Number(amount);
        await db.update(accounts).set({ balance: newBalance.toString() }).where(eq(accounts.id, accountId));
      }
      res.json(newTransaction[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Groups
  app.get("/api/groups", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const memberships = await db.select().from(userGroups).where(eq(userGroups.userId, dbUser.id));
      if (memberships.length === 0) return res.json([]);

      const groupIds = memberships.map(m => m.groupId);
      const userGroupsList = await db.select().from(groups).where(inArray(groups.id, groupIds));
      res.json(userGroupsList);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/groups", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const { name, description, password, isPrivate } = req.body;
      const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();

      const newGroup = await db.insert(groups).values({
        name,
        description,
        password, // Optional password
        isPrivate: !!isPrivate,
        createdBy: dbUser.id,
        inviteCode
      }).returning();

      await db.insert(userGroups).values({
        userId: dbUser.id,
        groupId: newGroup[0].id,
        role: 'admin'
      });

      res.json(newGroup[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/groups/join", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const { inviteCode, password } = req.body;
      const group = await db.query.groups.findFirst({ where: eq(groups.inviteCode, inviteCode) });
      if (!group) return res.status(404).json({ error: "Group not found with this code" });

      // Check password if it's a private group or has a password
      if (group.password && group.password !== password) {
        return res.status(403).json({ error: "Incorrect password for this group" });
      }

      const existingMember = await db.query.userGroups.findFirst({
        where: and(eq(userGroups.userId, dbUser.id), eq(userGroups.groupId, group.id))
      });
      if (existingMember) return res.status(400).json({ error: "Already a member of this group" });

      await db.insert(userGroups).values({
        userId: dbUser.id,
        groupId: group.id,
        role: 'member'
      });

      res.json(group);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/groups/:id/balance", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const groupId = parseInt(req.params.id);
      const membership = await db.query.userGroups.findFirst({
        where: and(eq(userGroups.userId, dbUser.id), eq(userGroups.groupId, groupId))
      });
      if (!membership) return res.status(403).json({ error: "Not a member of this group" });

      const groupBalance = await db.select({
        totalIncome: sql<string>`sum(case when type = 'income' then amount else 0 end)`,
        totalExpense: sql<string>`sum(case when type = 'expense' then amount else 0 end)`
      }).from(transactions).where(eq(transactions.groupId, groupId));

      res.json(groupBalance[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/groups/:id/posts", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const groupId = parseInt(req.params.id);
      const membership = await db.query.userGroups.findFirst({
        where: and(eq(userGroups.userId, dbUser.id), eq(userGroups.groupId, groupId))
      });
      if (!membership) return res.status(403).json({ error: "Not a member of this group" });

      const posts = await db.query.groupPosts.findMany({
        where: eq(groupPosts.groupId, groupId),
        with: { user: true },
        orderBy: desc(groupPosts.createdAt)
      });
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/groups/:id/posts", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const groupId = parseInt(req.params.id);
      const { content } = req.body;
      
      const membership = await db.query.userGroups.findFirst({
        where: and(eq(userGroups.userId, dbUser.id), eq(userGroups.groupId, groupId))
      });
      if (!membership) return res.status(403).json({ error: "Not a member of this group" });

      const newPost = await db.insert(groupPosts).values({
        groupId,
        userId: dbUser.id,
        content
      }).returning();

      res.json(newPost[0]);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/groups/:id/transactions", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const groupId = parseInt(req.params.id);
      const membership = await db.query.userGroups.findFirst({
        where: and(eq(userGroups.userId, dbUser.id), eq(userGroups.groupId, groupId))
      });
      if (!membership) return res.status(403).json({ error: "Not a member of this group" });

      const groupTransactions = await db.select().from(transactions).where(eq(transactions.groupId, groupId)).orderBy(desc(transactions.date));
      res.json(groupTransactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Categories
  app.get("/api/categories", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });
      const userCategories = await db.select().from(categories);
      res.json(userCategories);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Simple server-side cache
  let cachedMarketData: any = null;
  let lastMarketUpdate = 0;
  let cachedNewsData: any = null;
  let lastNewsUpdate = 0;

  const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  // AI Projections & News
  app.get("/api/ai/projections", async (req, res) => {
    try {
      const prompt = "Proporcione uma análise financeira detalhada e sofisticada para as 3 principais ações globais hoje. Inclua: 1. Nome e Símbolo, 2. Projeção de curto prazo, 3. Análise de Sentimento (Otimista/Pessimista) com justificativa. Use formatação Markdown elegante com títulos e listas. Responda em Português.";
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });
      res.json({ content: response.text });
    } catch (error: any) {
      console.error("AI projections error:", error);
      res.json({ 
        content: "### Análise de Mercado (Modo de Segurança)\n\n" +
                 "Devido à alta volatilidade e demanda nos sistemas, estamos operando em modo de contingência.\n\n" +
                 "**Ativos em Destaque:**\n" +
                 "1. **NVIDIA (NVDA)**: Sentimento Otimista. O setor de semicondutores continua forte com a expansão de infraestrutura de IA.\n" +
                 "2. **Apple (AAPL)**: Sentimento Neutro. Expectativa em torno da integração de novos recursos de software.\n" +
                 "3. **Petrobras (PETR4)**: Sentimento Cauteloso. Dependência dos preços globais de petróleo e cenário fiscal doméstico.\n\n" +
                 "*Tente novamente em instantes para uma análise completa.*" 
      });
    }
  });

  // Investments
  app.get("/api/investments", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });
      const userInvestments = await db.query.investments.findMany({
        where: eq(investments.userId, dbUser.id),
        orderBy: [desc(investments.createdAt)],
      });
      res.json(userInvestments);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/investments", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });
      const { symbol, name, type, quantity, averagePrice, currency } = req.body;
      const [newInvestment] = await db.insert(investments).values({
        userId: dbUser.id,
        symbol,
        name,
        type,
        quantity,
        averagePrice,
        currency: currency || 'BRL'
      }).returning();
      res.json(newInvestment);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/investments/:id", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });
      await db.delete(investments).where(and(eq(investments.id, parseInt(req.params.id)), eq(investments.userId, dbUser.id)));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/market/ticker", async (req, res) => {
    const now = Date.now();
    if (cachedMarketData && (now - lastMarketUpdate < CACHE_DURATION)) {
      return res.json(cachedMarketData);
    }

    try {
      const prompt = `Gere um JSON com os dados de mercado em tempo real (estimados/simulados com precisão) para: Bitcoin (BTC/BRL), Ethereum (ETH/BRL), S&P 500, IBOVESPA, Dólar (USD/BRL), Euro (EUR/BRL), Ouro (XAU/BRL) e CDI.
      Para cada item inclua: symbol, name, price (com moeda), change (percentual), up (booleano).
      Retorne APENAS o JSON puro.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });
      const text = response.text?.replace(/```json/g, '').replace(/```/g, '').trim();
      const data = JSON.parse(text || "[]");
      cachedMarketData = data;
      lastMarketUpdate = now;
      res.json(data);
    } catch (error: any) {
      console.error("Market ticker error:", error);
      // Detailed fallback data
      const fallback = [
        { symbol: 'BTC/BRL', name: 'Bitcoin', price: 'R$ 362.450', change: '+1.2%', up: true },
        { symbol: 'ETH/BRL', name: 'Ethereum', price: 'R$ 13.800', change: '+0.8%', up: true },
        { symbol: 'USD/BRL', name: 'Dólar', price: 'R$ 5,68', change: '+0.15%', up: true },
        { symbol: 'IBOV', name: 'IBOVESPA', price: '127.850', change: '-0.4%', up: false },
        { symbol: 'XAU/BRL', name: 'Ouro (g)', price: 'R$ 442,00', change: '+0.3%', up: true },
        { symbol: 'CDI', name: 'CDI Anual', price: '10,75%', change: '0,00%', up: true }
      ];
      res.json(fallback);
    }
  });

  app.post("/api/ai/chat", requireAuth, async (req: AuthRequest, res) => {
    try {
      const dbUser = await db.query.users.findFirst({ where: eq(users.uid, req.user!.uid) });
      if (!dbUser) return res.status(404).json({ error: "User not found" });

      const { message, history } = req.body;
      
      // Fetch user transactions for context
      const userTransactions = await db.query.transactions.findMany({
        where: eq(transactions.userId, dbUser.id),
        with: { category: true },
        orderBy: desc(transactions.date),
        limit: 100 // Slightly reduced for token safety
      });

      const context = userTransactions.map(t => ({
        date: t.date,
        amount: t.amount,
        type: t.type,
        category: t.category.name,
        description: t.description
      }));

      let latestNews = "Informação indisponível no momento devido à alta demanda.";
      
      // Check cache for news
      const now = Date.now();
      if (cachedNewsData && (now - lastNewsUpdate < CACHE_DURATION)) {
        latestNews = cachedNewsData;
      } else {
        try {
          const newsPrompt = "Atue como um analista financeiro sênior. Resuma as 5 notícias mundiais e de moedas (FX) mais impactantes do momento. Forneça dados reais de mercado se possível. Responda em Português.";
          const newsResponse = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: newsPrompt,
          });
          latestNews = newsResponse.text || latestNews;
          cachedNewsData = latestNews;
          lastNewsUpdate = now;
        } catch (newsError) {
          console.error("Failed to fetch news for chat context:", newsError);
        }
      }

      const systemInstruction = `Você é o Alpha Intelligence, o Assistente Financeiro Pessoal mais avançado do mundo.
Sua missão é fornecer inteligência financeira de altíssimo nível, ajudando o usuário a atingir a liberdade financeira.

DIRETRIZES:
1. Responda de forma executiva, sofisticada e extremamente útil em Português.
2. Utilize Markdown para formatação (negrito, tabelas, listas).
3. Use os dados históricos do usuário e as notícias globais abaixo para fundamentar suas respostas.
4. Se perguntado sobre projeções ("Quando serei milionário?"), use fórmulas de juros compostos com base nos aportes e saldo atual.
5. Seja proativo: se detectar muitos gastos em uma categoria, sugira otimização.

NOTÍCIAS GLOBAIS:
${latestNews}

DADOS DO USUÁRIO:
${JSON.stringify(context, null, 1)}

RESPONDA SEMPRE EM PORTUGUÊS. SEJA UM ANALISTA DE WALL STREET.`;

      const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        config: {
          systemInstruction,
        }
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("AI chat error:", error);
      // Check if it's a quota error
      if (error.message?.includes('quota') || error.message?.includes('429') || error.message?.includes('RESOURCE_EXHAUSTED')) {
        return res.json({ 
          text: "### Sistema em Alta Demanda\n\nOlá! Meu processador de inteligência está sob altíssima carga no momento devido à grande quantidade de consultas. \n\nNo entanto, analisando rapidamente seus dados (offline), vejo que você tem mantido seu controle financeiro. Como posso te ajudar com dúvidas gerais de finanças enquanto aguardamos a normalização dos meus circuitos avançados?" 
        });
      }
      res.status(500).json({ error: "Ocorreu um erro no processamento da sua mensagem. Por favor, tente novamente." });
    }
  });

  app.get("/api/finance/news", async (req, res) => {
    const now = Date.now();
    if (cachedNewsData && (now - lastNewsUpdate < CACHE_DURATION)) {
      // If we have cached news, return it
      return res.json({ content: cachedNewsData });
    }

    try {
      const prompt = "Atue como um analista financeiro sênior. Resuma as 4 notícias corporativas e econômicas mais impactantes do momento. Para cada notícia, forneça um título impactante, um resumo executivo de 2 frases e o 'Bottom Line' (o que isso significa para empresas). Use formatação Markdown sofisticada. Responda em Português.";
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });
      cachedNewsData = response.text;
      lastNewsUpdate = now;
      res.json({ content: response.text });
    } catch (error: any) {
      console.error("Finance news error:", error);
      res.json({ 
        content: "### Informativo de Mercado (Resumo Offline)\n\n" +
                 "**1. Inflação e Juros:** Bancos centrais globais mantêm cautela diante de dados mistos de emprego.\n\n" +
                 "**2. Setor Tech:** Continuidade da volatilidade em empresas de IA após ralis expressivos.\n\n" +
                 "**3. Commodities:** Petróleo Brent opera em estabilidade com tensões no Oriente Médio monitoradas.\n\n" +
                 "**4. Brasil:** Mercado atento às discussões fiscais e metas de déficit zero para o próximo ano."
      });
    }
  });

  app.get("/api/finance/convert", async (req, res) => {
    const { from, to, amount } = req.query;
    try {
      const prompt = `Converta ${amount} ${from} para ${to} com base em taxas de mercado estimadas. Retorne apenas o número convertido.`;
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });
      res.json({ result: response.text?.trim() });
    } catch (error: any) {
      console.error("Finance convert error:", error);
      // Rough fallback logic
      let rate = 1;
      if (from === 'USD' && to === 'BRL') rate = 5.65;
      else if (from === 'BRL' && to === 'USD') rate = 0.18;
      else if (from === 'EUR' && to === 'BRL') rate = 6.10;
      
      const result = (Number(amount) * rate).toFixed(2);
      res.json({ result: `~ ${result} (Taxa estimada)` });
    }
  });




  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
