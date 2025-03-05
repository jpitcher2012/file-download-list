import './App.css';
import FileDownloadList from './components/FileDownloadList/FileDownloadList';

function App() {

  let data = require('./data/sample-data.json');

  return (
    <div className='App'>
      <FileDownloadList data={data}/>
    </div>
  );
}

export default App;
