// ============================================================
// SELETORES GLOBAIS
// Elementos do DOM capturados uma vez e reutilizados em todo o código
// ============================================================

const converButton          = document.querySelector(".converButton")
const currencySelectFrom    = document.querySelector(".currency-selector-from")
const currencySelectTo      = document.querySelector(".currency-selector-to")
const currencyValueFromConvert = document.querySelector(".currency-value-from")
const currencyValueToConvert   = document.querySelector(".currency-value-to")

// Chave de autenticação da AwesomeAPI
const API_KEY = "5b105e035045861389736f59be2aa4a6895a1e63edd4f29b1133739bb25d9f13"


// ============================================================
// buscarTaxa(origem, destino)
// Faz a requisição à API e retorna a taxa de câmbio (bid)
// entre a moeda de origem e a moeda de destino
// ============================================================

async function buscarTaxa(origem, destino) {
    try {
        const url = `https://economia.awesomeapi.com.br/json/last/${origem}-${destino}?token=${API_KEY}`
        const response = await fetch(url)
        const data = await response.json()
        const chave = `${origem}${destino}` // ex: "USDBRL"
        return parseFloat(data[chave].bid)  // retorna o número da taxa, ex: 5.22
    } catch (erro) {
        alert("Erro ao buscar a cotação. Verifique sua conexão e tente novamente.")
        return null
    }
}


// ============================================================
// convertValues()
// Executada ao clicar no botão "Converter"
// Valida os campos, busca a taxa, calcula e exibe o resultado
// ============================================================

async function convertValues() {

    const inputCurrencyValue = document.querySelector(".input-currency").value

    // Valida se as duas moedas foram selecionadas
    if (currencySelectFrom.value == "" || currencySelectTo.value == "") {
        alert("Selecione as duas moedas antes de converter.")
        return
    }

    // Busca a taxa de câmbio na API
    const taxa = await buscarTaxa(currencySelectFrom.value, currencySelectTo.value)

    // Exibe a cotação no span dentro da div .cotacao
    const taxaFormatada = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    }).format(taxa)
    document.querySelector(".cotacao-valor").innerHTML = `1 ${currencySelectFrom.value} = ${taxaFormatada} ${currencySelectTo.value}`

    // Calcula o resultado da conversão
    const resultado = Number(inputCurrencyValue) * taxa

    // Exibe o valor convertido (moeda de destino)
    if (currencySelectTo.value == "BRL") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(resultado)
    }

    if (currencySelectTo.value == "USD") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(resultado)
    }

    if (currencySelectTo.value == "EUR") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(resultado)
    }

    if (currencySelectTo.value == "ARS") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS"
        }).format(resultado)
    }

    if (currencySelectTo.value == "PYG") {
        currencyValueToConvert.innerHTML = new Intl.NumberFormat("es-PY", {
            style: "currency",
            currency: "PYG"
        }).format(resultado)
    }

    // Exibe o valor de origem formatado na moeda selecionada
    if (currencySelectFrom.value == "BRL") {
        currencyValueFromConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(inputCurrencyValue)
    }

    if (currencySelectFrom.value == "USD") {
        currencyValueFromConvert.innerHTML = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(inputCurrencyValue)
    }

    if (currencySelectFrom.value == "EUR") {
        currencyValueFromConvert.innerHTML = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR"
        }).format(inputCurrencyValue)
    }

    if (currencySelectFrom.value == "ARS") {
        currencyValueFromConvert.innerHTML = new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS"
        }).format(inputCurrencyValue)
    }

    if (currencySelectFrom.value == "PYG") {
        currencyValueFromConvert.innerHTML = new Intl.NumberFormat("es-PY", {
            style: "currency",
            currency: "PYG"
        }).format(inputCurrencyValue)
    }

}


// ============================================================
// changeCurrency()
// Executada ao trocar qualquer um dos selects de moeda
// Atualiza a imagem e o nome da moeda nos blocos de resultado
// Reseta os valores exibidos e busca a cotação se ambas
// as moedas estiverem selecionadas
// ============================================================

async function changeCurrency() {

    const currencyNameFrom = document.getElementById("currency-name-from")
    const currencyNameTo   = document.getElementById("currency-name-to")
    const imgFrom          = document.getElementById("img-from")
    const imgTo            = document.getElementById("img-to")

    // Atualiza imagem e nome da moeda de ORIGEM
    if (currencySelectFrom.value == "BRL") {
        currencyNameFrom.innerHTML = "Real Brasileiro"
        imgFrom.src = "./assets/img/brasil.png"
    }

    if (currencySelectFrom.value == "USD") {
        currencyNameFrom.innerHTML = "Dólar Americano"
        imgFrom.src = "./assets/img/usa.png"
    }

    if (currencySelectFrom.value == "EUR") {
        currencyNameFrom.innerHTML = "Euro"
        imgFrom.src = "./assets/img/euro.png"
    }

    if (currencySelectFrom.value == "ARS") {
        currencyNameFrom.innerHTML = "Peso Argentino"
        imgFrom.src = "./assets/img/arg.png"
    }

    if (currencySelectFrom.value == "PYG") {
        currencyNameFrom.innerHTML = "Guarani Paraguaio"
        imgFrom.src = "./assets/img/parag.png"
    }

    // Atualiza imagem e nome da moeda de DESTINO
    if (currencySelectTo.value == "BRL") {
        currencyNameTo.innerHTML = "Real Brasileiro"
        imgTo.src = "./assets/img/brasil.png"
    }

    if (currencySelectTo.value == "USD") {
        currencyNameTo.innerHTML = "Dólar Americano"
        imgTo.src = "./assets/img/usa.png"
    }

    if (currencySelectTo.value == "EUR") {
        currencyNameTo.innerHTML = "Euro"
        imgTo.src = "./assets/img/euro.png"
    }

    if (currencySelectTo.value == "ARS") {
        currencyNameTo.innerHTML = "Peso Argentino"
        imgTo.src = "./assets/img/arg.png"
    }

    if (currencySelectTo.value == "PYG") {
        currencyNameTo.innerHTML = "Guarani Paraguaio"
        imgTo.src = "./assets/img/parag.png"
    }

    // Reseta os valores exibidos nos blocos de resultado
    currencyValueFromConvert.innerHTML = "-"
    currencyValueToConvert.innerHTML = "-"

    // Se as duas moedas estiverem selecionadas, exibe a cotação imediatamente
    if (currencySelectFrom.value != "" && currencySelectTo.value != "") {
        const taxa = await buscarTaxa(currencySelectFrom.value, currencySelectTo.value)
        const taxaFormatada = new Intl.NumberFormat("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        }).format(taxa)
        document.querySelector(".cotacao-valor").innerHTML = `1 ${currencySelectFrom.value} = ${taxaFormatada} ${currencySelectTo.value}`
    } else {
        document.querySelector(".cotacao-valor").innerHTML = ""
    }

}


// ============================================================
// EVENT LISTENERS
// Associam os eventos do usuário às funções correspondentes
// ============================================================

currencySelectFrom.addEventListener("change", changeCurrency)
currencySelectTo.addEventListener("change", changeCurrency)
converButton.addEventListener("click", convertValues)
