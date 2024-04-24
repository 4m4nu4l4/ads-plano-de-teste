
function validarSenha(senha) {
    // Utilizando uma expressão regular para validar a senha
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(senha);
}

function validarEmail(email) {
    // Utilizando uma expressão regular para validar o email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


module.exports = { validarSenha, validarEmail, criptografarSenha };
