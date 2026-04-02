// backend/index.js
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// MongoDB 연결 (한국 인터넷 DNS 에러 해결 버전)
mongoose.connect(process.env.MONGODB_URI, {
  family: 4,                    // ← 이 줄이 핵심! IPv4 강제
})
  .then(() => console.log('✅ MongoDB 연결 성공!'))
  .catch(err => console.error('❌ MongoDB 연결 실패:', err));

// Todo 스키마
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
});
const Todo = mongoose.model('Todo', todoSchema);

// ===== API 엔드포인트 =====
// 전체 Todo 목록 가져오기
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Todo 추가
app.post('/todos', async (req, res) => {
  const newTodo = new Todo({ title: req.body.title });
  await newTodo.save();
  res.json(newTodo);
});

// Todo 완료 체크 (PUT)
app.put('/todos/:id', async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { completed: req.body.completed },
    { new: true }
  );
  res.json(todo);
});

// Todo 삭제
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: '✅ 삭제 완료!' });
});

// Vercel 배포용 (serverless) + 로컬 실행용
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 서버 실행 중: http://localhost:${PORT}`));
}
module.exports = app;   // Vercel에서 필요!