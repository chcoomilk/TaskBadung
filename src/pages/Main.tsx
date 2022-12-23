import { Component, createSignal } from 'solid-js';

import styles from '../App.module.css';
import Canvas from './Canvas';
import IncomeCalculator from './KalkulatorGaji';

const App: Component = () => {
  const [tab, setTab] = createSignal<boolean>(true);

  const toggleTab = () => setTab(p => (!p));

  return (
    <div class={styles.App}>
      <div style={{ "margin-bottom": "1rem" }}>
        <button onClick={toggleTab}>Switch Task/Ganti Tugas</button>
      </div>
      {
        tab()
          ? <Canvas />
          : <IncomeCalculator />
      }
    </div>
  );
};

export default App;
