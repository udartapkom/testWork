import React from 'react';
import './App.css';
import Editor from './Editor';

function App() {
    const params = [
        {
            id: 1,
            name: "Назначение",
            type: "string",
        },
        {
            id: 2,
            name: "Длина",
            type: "string",
        },
    ];
    const model = {
        paramValues: [
            {
                paramId: 1,
                value: "повседневное",
            },
            {
                paramId: 2,
                value: "макси",
            },
        ],
        colors: [
            {
                id: 1,
                name: "green",
            },
            {
                id: 2,
                name: "orange",
            },
        ],
    };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Редактор</h1>
      </header>
      <Editor params={params} model={model}/>
    </div>
  );
}

export default App;
