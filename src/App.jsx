
import './App.css'
import { AppBar } from './components/AppBar/AppBar'
import Layout from './components/Layout/Layout'
import { TaskList } from './components/TaskList/TaskList'

function App() {

  return (
    <Layout>
      <AppBar />
      <TaskList />
    </Layout>
  )
}

export default App
