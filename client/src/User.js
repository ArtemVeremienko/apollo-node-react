import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_ONE_USER } from './query/user'

export default function User({ id }) {
  const { data, loading, error } = useQuery(GET_ONE_USER, {
    variables: { id },
  })

  if (loading) {
    return <h2>User is loading...</h2>
  }

  if (error) {
    return <h2>Error happened</h2>
  }

  const { getUser } = data

  if (!getUser) {
    return <h2>Can't find user</h2>
  }

  return (
    <div>
      <h2>Single user:</h2>
      <p>ID: {getUser.id}</p>
      <p>Name: {getUser.username}</p>
    </div>
  )
}
