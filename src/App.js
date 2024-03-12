import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Users from './components/users';
import 'bootstrap/dist/css/bootstrap.css';
function App() {
  return (
    <div className="employee-management">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path ="/users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
