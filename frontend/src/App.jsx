import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const API_URL = '/api/todos';

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const res = await axios.post(API_URL, { title });
    setTodos([...todos, res.data]);
    setTitle('');
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTodos(todos.map(todo => todo._id === id ? res.data : todo));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">🎯 Todo 리스트</h1>
        
        <form onSubmit={addTodo} className="flex gap-3 mb-8">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="할 일 입력하기..."
            className="flex-1 px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-indigo-500 text-lg"
          />
          <button
            type="submit"
            className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl text-lg transition"
          >
            추가
          </button>
        </form>

        <div className="space-y-3">
          {todos.map(todo => (
            <div
              key={todo._id}
              className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 p-5 rounded-2xl transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
                className="w-6 h-6 accent-indigo-600 cursor-pointer"
              />
              <span className={`flex-1 text-lg ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-xl hover:bg-red-100 transition"
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-12">할 일이 없네요~ 추가해보세요! ✨</p>
        )}
      </div>
    </div>
  );
}

export default App;