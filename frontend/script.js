async function cadastrar(event) {
    event.preventDefault();

    const name = document.getElementById('name_cadastro').value;
    const email = document.getElementById('email_cadastro').value;
    const password = document.getElementById('password_cadastro').value;

    const data = {name, email, password}

    const response = await fetch('http://localhost:3006/usuario/cadastrar', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if(results.success) {
        alert(results.message)
        window.location.href = './catalogo.html';
    } else {
        alert(results.message)
    }
};

async function login(event) {
    event.preventDefault();

    const email = document.getElementById('email_login').value;
    const password = document.getElementById('password_login').value;

    const data = {email, password}

    const response = await fetch('http://localhost:3006/usuario/login', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    let results = await response.json();

    if(results.success) {
        let userData = results.data;
        console.log(userData)
        localStorage.setItem('informacoes', JSON.stringify(userData))
        
        alert(results.message)
        window.location.href = './catalogo.html';
    } else {
        alert(results.message)
    }
};


function logout() {
    localStorage.removeItem('informacoes')
    window.location.href = "login.html"
}


window.addEventListener("load", () => {
    if (localStorage.getItem("informacoes")) {
        let html = document.getElementById('informacoes')
        let dados = JSON.parse(localStorage.getItem('informacoes'))
        
        dados.perfil === "Admin"
            ? document.getElementById("inserirProduto").style.display = "block"
            : document.getElementById("inserirProduto").style.display = "none"
    }
})


async function inserirProduto(event) {
    event.preventDefault()

    const nome = document.getElementById("nome_produto").value
    const descricao = document.getElementById("descricao_produto").value
    const valor = Number(document.getElementById("valor_produto").value)
    const file = document.getElementById("file").files[0]

    console.log(nome);
    console.log(descricao);
    console.log(valor);
    console.log(file);
    console.log(document.getElementById("file"));
    console.log(document.getElementById("file").files[0]);

    let formData = new FormData();


    formData.append("nome", nome)
    formData.append("descricao", descricao)
    formData.append("valor", valor)
    formData.append("file", file)

    console.log(formData)

    const response = await fetch('http://localhost:3006/produto/cadastrar', {
        method: 'POST',
        body: formData
    })

    const results = await response.json();

    if(results.success) {        
        alert(results.message)
    } else {
        alert(results.message)
    }
}

async function listarProdutos() {
    const response = await fetch('http://localhost:3006/produto/listar', {
        method: 'GET',
        headers: {
            "Content-Type":"application/json"
        }
    })

    const results = await response.json();

    if(results.success) {
        let productData = results.data
        const images = 'http://localhost:3006/uploads/'  
        let html = document.getElementById('catalogo')
        productData.forEach(product => {
            let card = `<div class="item">
                <img src="${images + product.image}" alt="${product.nome}">
                <p class="nome">${product.nome}</p>
                <p class="descricao">${product.descricao}</p>
                <p class="preco">${product.valor}</p>
                <i class="fa-solid fa-cart-shopping carrinho" id="nuvem1"></i>
            </div>
            `;
            html.innerHTML += card;
        })      
    } else {
        alert(results.message)
    }
}