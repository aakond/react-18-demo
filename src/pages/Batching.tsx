import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const Batching: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<string[]>([]);

  const [textWithoutBatching, setTextWithoutBatching] = useState<string>('');
  const [todosWithoutBatching, setTodosWithoutBatching] = useState<string[]>([]);

  console.log('render');

  const createTodo = () => {
    setTodos((todos) => [text, ...todos]);
    setText('');
  };

  const createTodoWithoutBatching = () => {
    flushSync(() => setTodosWithoutBatching((todos) => [textWithoutBatching, ...todos]));
    flushSync(() => setTextWithoutBatching(''));
  };

  return (
    <>
      <h2>Batching</h2>
      <div className="Columns">
        <div>
          <div>Automatic batching</div>
          <input placeholder={'type something'} onChange={({ target: { value } }) => setText(value)} value={text} />
          <button onClick={createTodo}>Add todo</button>
          <ul>
            {todos.map((todo, key) => (
              <li key={key}>{todo}</li>
            ))}
          </ul>
        </div>
        <div>
          <div>Without batching</div>
          <input
            placeholder={'type something'}
            onChange={({ target: { value } }) => setTextWithoutBatching(value)}
            value={textWithoutBatching}
          />
          <button onClick={createTodoWithoutBatching}>Add todo</button>
          <ul>
            {todosWithoutBatching.map((todo, key) => (
              <li key={key}>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Batching;
