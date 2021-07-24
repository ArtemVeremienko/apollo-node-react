import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import './App.css'
import { GET_ALL_USERS } from './query/user'
import { CREATE_USER } from './mutations/user'
import User from './User'

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const [newUser] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)

  const clearForm = () => {
    setName('')
    setAge(0)
  }

  const addUser = async () => {
    console.log({ name, age })
    try {
      await newUser({
        variables: {
          input: {
            username: name,
            age,
          },
        },
      })
      clearForm()
    } catch (error) {
      console.error(error)
    }
  }

  const getNewUsers = () => {
    refetch()
  }

  useEffect(() => {
    if (data) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  let content = users.map(user => (
    <div className='user' key={user.id}>
      {user.id}. {user.username} age: {user.age}
    </div>
  ))

  if (loading) {
    content = <h1>Loading...</h1>
  }

  if (error) {
    content = <h1>Something went wrong</h1>
  }

  return (
    <div>
      <form>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          type='text'
          placeholder='name'
        />
        <input
          value={age}
          onChange={e => setAge(+e.target.value)}
          type='number'
          placeholder='age'
        />
        <div className='btns'>
          <button onClick={addUser} type='button'>
            Создать
          </button>
          <button onClick={getNewUsers} type='button'>
            Получить
          </button>
        </div>
      </form>
      <div>{content}</div>
      <User id={'1'} />
    </div>
  )
}

export default App
