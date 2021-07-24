const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')
const users = [{id: 1, username: 'Hgon', age: 20}]

const schema = require('./schema')

const app = express()
app.use(cors())

const root = {
    getAllUsers: () =>  users,
    getUser: ({id}) => users.find(user => user.id === id),
    createUser: ({input}) => {
        const user = {...input, id: Date.now()}
        users.push(user)
        return user
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root
}))

app.listen(5000, () => console.log('server started on port 5000'))
