import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState(3);
  const [colors, setColors] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [score, setScore] = useState(0);

  const getRandomColor = () => {
    const colorNumber = Math.round(Math.random() * 0xffffff) + 1;
    const colorString = '#' + colorNumber.toString(16).padStart(6, '0');
    return colorString;
  };

  const getNewColors = () => {
    const newColors = [];
    for (let i = 0; i < difficulty; i++) {
      newColors.push(getRandomColor());
    }
    return newColors;
  };

  const resetGame = () => {
    setColors(getNewColors());
    setCorrectIndex(Math.floor(Math.random() * colors.length));
  };

  useEffect(() => {
    resetGame();
  }, []);

  return (
    <div className="App">
      <div
        className="color-box"
        style={{ background: colors[correctIndex] }}
      ></div>
      <div>
        {colors.map((color) => (
          <button
            onClick={(e) => {
              const color = e.currentTarget.getAttribute('color');
              console.log(color);

              if (color === colors[correctIndex]) {
                setScore(score + 1);
                setDifficulty(difficulty + 1);
                resetGame();
              } else {
                setScore(0);
                setDifficulty(3);
                resetGame();
              }
            }}
            key={color}
            color={color}
          >
            {color}
          </button>
        ))}
      </div>
      <p>Score: {score.toString()}</p>
    </div>
  );
}

export default App;
