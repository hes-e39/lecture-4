import { useState } from 'react';
import reactLogo from '/react.svg';

function App() {
    const [count, setCount] = useState<number>(1);

    return (
        <div className="flex flex-col items-center gap-12 pt-32">
            <div>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="size-32" alt="React logo" />
                </a>
            </div>

            <div className="text-3xl font-bold underline">E-39: Vite + React + TypeScript</div>
            <div>
                <button className="border-[0.5px] border-white p-2" onClick={() => setCount(count => count + 1)}>
                    Click me: {count}
                </button>
            </div>
        </div>
    );
}

export default App;
