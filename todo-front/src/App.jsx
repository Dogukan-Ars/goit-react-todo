
import { useDispatch } from 'react-redux'
import './App.css'
import { AppBar } from './components/AppBar/AppBar'
import Header from './components/Header/Header'
import Layout from './components/Layout/Layout'
import { TaskForm } from './components/TaskForm/TaskForm'
import { TaskList } from './components/TaskList/TaskList'
import { useEffect } from 'react'
import { fetchTasks } from './redux/tasksSlice'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch])

  return (
    <Layout>
      <Header />
      <AppBar />
      <TaskForm />
      <TaskList />
    </Layout>
  )
}

export default App
