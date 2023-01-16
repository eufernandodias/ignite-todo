import { Header } from "./components/Header";

import "./global.css";
import styles from "./App.module.css";
import { InputTask } from "./components/InputTask";

function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <InputTask />
      </div>
    </div>
  );
}

export default App;
