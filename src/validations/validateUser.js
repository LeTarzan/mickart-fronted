import { checkName } from "./validateProduct"

const validateUser = (data) => {
    let verify = []

    verify.push(checkId(data.user.id))
    verify.push(checkName(data.user.name))
    verify.push(checkName(data.user.lastname))

    verify.push(checkId(data.password.id))
    verify.push(checkPassword(data.password.password, data.password.newPassword))

    verify.push(checkId(data.address.id))
    verify.push(checkId(data.address.user_id))
}

const checkId = (id) => {
    if( (typeof id === "undefined") || (id === "") || (!Number.isNaN(id)) || (!id.match(/\/*[0-9]/)) )
        return { result: false, msg: "Erro interno!"}
    return { result: true}
}

const checkPassword = (password, newPassword) => {
    if((newPassword) && (newPassword !== password)){
        if( (typeof password === "undefined") || (password === "") || (!password.match(/^([a-z-A-Z ]|\/*[0-9]){8,30}$/)) ){
            return { result: false, msg: "A senha atual é inválida!" }
        }
        if( (typeof newPassword === "undefined") || (newPassword === "") || (!newPassword.match(/^([a-z-A-Z ]|\/*[0-9]){8,30}$/)) ){
            return { result: false, msg: "A nova senha é inválida!" }
        }
        return { result: true }
    }
    return { result: false, msg: "A nova senha não pode ser a mesma que a atual!" }
}
// data.user = {
//     id: this.state.id,
//     lastname: this.state.lastname,
//     name: this.state.name,
//   }
//   data.password = {
//     id: this.state.id,
//     currentPassword: this.state.currentPassword,
//     newPassword: this.state.newPassword
//   }
//   data.address = {
//     id: this.state.addressId,
//     address: this.state.address,
//     city: this.state.city,
//     number: this.state.number,
//     complement: this.state.complement,
//     zipcode: this.state.zipcode,
//     district: this.state.district,
//     user_id: this.state.id
//   }

export {
    validateUser
} 