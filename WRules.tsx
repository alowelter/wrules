function validateCPFCJPJ(value: string) {
  const cpf = value.replace(/[^\d]+/g, "");
  if (validateCPF(cpf) === true || validateCNPJ(cpf) === true) {
    console.log("validateCPFCJPJ", true);
    return true;
  } else {
    console.log("validateCPFCJPJ", false);
    return "CPF/CNPJ inválido";
  }
}

function validateCPF(value: string) {
  const cpf = value.replace(/[^\d]+/g, "");
  let sum = 0;
  let rest;
  const erro = "CPF inválido";
  if (cpf == "00000000000") return erro;

  for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(9, 10))) return erro;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest == 10 || rest == 11) rest = 0;
  if (rest != parseInt(cpf.substring(10, 11))) return erro;
  return true;
}
function validateCNPJ(value: string) {
  const cnpj = value.replace(/[^\d]+/g, "");
  const erro = "CNPJ inválido";
  if (cnpj == null) return erro;
  if (cnpj.length != 14) return erro;
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return erro;
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(0))) return erro;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitos.charAt(1))) return erro;
  return true;
}

const WRules = () => {
  let rules: any = {};
  return {
    getRules: function () {
      return { ...rules };
    },
    required: function (msg: string = "Campo requerido") {
      rules.required = msg;
      return this;
    },
    min: function (value: number, msg: string = `Tamanho mínimo ${value}`) {
      rules.minLength = { value: value, message: msg };
      return this;
    },
    minLength: function (value: number, msg: string = `Tamanho mínimo ${value}`) {
      rules.minLength = { value: value, message: msg };
      return this;
    },
    max: function (value: number, msg: string = `Tamanho máximo ${value}`) {
      rules.maxLength = { value: value, message: msg };
      return this;
    },
    maxLength: function (value: number, msg: string = `Tamanho máximo ${value}`) {
      rules.maxLength = { value: value, message: msg };
      return this;
    },
    minValue: function (value: number, msg: string = `Valor mínimo ${value}`) {
      rules.min = { value: value, message: msg };
      return this;
    },
    maxValue: function (value: number, msg: string = `Valor máximo ${value}`) {
      rules.max = { value: value, message: msg };
      return this;
    },
    validate: function (fn: any, msg: string = "Inválido") {
      rules.validate = { fn, message: msg };
      return this;
    },
    pattern: function (value: RegExp, msg: string = "Inválido") {
      rules.pattern = { value: value, message: msg };
      return this;
    },
    mail: function (msg: string = "E-mail inválido") {
      rules.pattern = {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: msg,
      };
      return this;
    },
    number: function (msg: string = "Número inválido") {
      rules.valueAsNumber = msg;
      return this;
    },
    integer: function () {
      rules.pattern = { value: /^[0-9]+$/, message: "Número inválido" };
      return this;
    },
    float: function () {
      rules.pattern = { value: /^[0-9]+(\.[0-9]+)?$/, message: "Valor inválido" };
      return this;
    },
    date: function (msg: string = "Data inválida") {
      rules.pattern = { value: /^\d{4}-\d{2}-\d{2}$/, message: msg };
      return this;
    },
    url: function (msg: string = "URL inválida") {
      rules.pattern = {
        value: /^(http|https):\/\/[^ "]+$/,
        message: msg,
      };
      return this;
    },
    cpf: function () {
      rules.validate = validateCPF;
      return this;
    },
    cnpj: function () {
      rules.validate = validateCNPJ;
      return this;
    },
    cpfcnpj: function () {
      rules.validate = validateCPFCJPJ;
      return this;
    },
    cep: function () {
      rules.pattern = { value: /^\d{5}-\d{3}$/, message: "CEP inválido" };
      return this;
    },
  };
};

export const w = () => {
  let instance = WRules();
  let handler = {
    get: function (target: any, prop: any) {
      return prop in target ? target[prop] : {};
    },
  };
  return new Proxy(instance, handler);
};
