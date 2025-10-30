import { useEffect } from 'react';
import TalentBank from './pages/TalentBank';


// Importa a função de teste
import { testFetchTalents } from './services/testGoogleSheetsServices';

function App() {
  useEffect(() => {
    // Executa o teste quando o app carrega
    testFetchTalents();
  }, []);

  return <TalentBank />;
}

export default App;