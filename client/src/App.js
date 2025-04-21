import logo from './logo.svg';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layot from './components/Layot';

import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Todo from './components/todo/Todo';
import Post from './components/post/Post';
import User from './components/user/User';
import MyHome from './components/MyHome';
import { Home } from '@mui/icons-material';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Layot/>}> 
        <Route index element={<MyHome/>}/>
        <Route path="todo" element={<Todo/>}/>
        <Route path="posts" element={<Post/>}/>
        <Route path="album" element={<User/>}/>
        <Route path="users" element={<User/>}/>
        </Route>

        <Route path="todos" element={[<Todo/>,<Layot/>]}/>
      </Routes>
     </Router>
    
     </>
    
  );
}

export default App;
