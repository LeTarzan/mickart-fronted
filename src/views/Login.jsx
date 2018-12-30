import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.login.bind(this)
  }
}

async login() {
  console.log('Login ', this.state)
  let { username, password } = this.state
  try {
    const response = await fetch(`
      /login
    `, {
      method: 'POST',
      body: JSON.stringify({
        user: {
          password,
          username
        }
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const body = await response.json();
    console.log('body = ', body)
    if (body.data) {
      return this.successAlert('Cliente cadastrado com sucesso!')
    }
    throw new Error()
  } catch (error) {
    console.log('error addUser ', error)
    this.errorAlert('Não foi possível cadastrar o cliente!')
  }
}