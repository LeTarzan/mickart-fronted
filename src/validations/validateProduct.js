const validateProduct = (data) => {

    let verify = []
    verify.push(checkName(data.name))
    verify.push(checkQTD(data.qtd_stored))
    verify.push(checkValue(data.value))
    verify.push(checkSize(data.size_available))

    for (let item of verify) {
        if (!item.result)
            return item
    }
    return { result: true }
}

function checkName(name) {
    console.log('aa', name)
    if ((name == "") || (!name.match(/^[a-z-A-Z ]{3,30}$/))) {
        return { result: false, msg: "Nome inválido!" }
    }
    return { result: true }
}

function checkQTD(qtd) {
    if ((typeof qtd === "undefined") || (qtd === "") || (!qtd.match(/\/*[0-9]/))) {
        return { result: false, msg: "Quantidade em inválido!" }
    }
    return { result: true }
}

function checkValue(value) {
    if ((typeof qtd === "undefined") || (value === "") || (!value.match(/\/*[1-9]/))) {
        return { result: false, msg: "Valor inválido!" }
    }
    return { result: true }
}

function checkSize(size) {
    if ((typeof qtd === "undefined") || (size === "") || (!size.match(/\/*[1-9]/))) {
        return { result: false, msg: "Tamanho inválido!" }
    }
    return { result: true }
}

export {
    validateProduct,
    checkName
} 