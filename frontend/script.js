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

if (document.getElementById('catalogo')) {
    window.addEventListener("load", () => {
        if (localStorage.getItem("informacoes")) {
            let html = document.getElementById('informacoes')
            let dados = JSON.parse(localStorage.getItem('informacoes'))
            
            dados.perfil === "Admin"
                ? document.getElementById("inserirProduto").style.display = "block"
                : document.getElementById("inserirProduto").style.display = "none"
        }
    })
}


async function inserirProduto(event) {
    event.preventDefault()

    const nome = document.getElementById("nome_produto").value
    const descricao = document.getElementById("descricao_produto").value
    const valor = Number(document.getElementById("valor_produto").value)
    const file = document.getElementById("file").files[0]

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
                <img src="${images + product.src}" alt="${product.nome}">
                <p class="nome">${product.nome}</p>
                <p class="descricao">${product.descricao}</p>
                <p class="preco">R$${product.valor}</p>
                <i class="fa-solid fa-cart-shopping carrinho" onclick="adicionarCarrinho(${product.id})"></i>
            </div>
            `;
            html.innerHTML += card;
        })      
    } else {
        alert(results.message)
    }
}
if (document.getElementById('catalogo')) {
    document.addEventListener('DOMContentLoaded', listarProdutos)
}

async function adicionarCarrinho(idProduto) {
    const informacoesUsuario = localStorage.getItem('informacoes');
    const usuario = JSON.parse(informacoesUsuario); 
    const idUsuario = usuario.id;
    const quantidade = 1

    const data = {idProduto, idUsuario, quantidade}

    const response = await fetch('http://localhost:3006/usuario/carrinho', {
        method: 'POST',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if(results.success) {
        alert(results.message)
    } else {
        alert(results.message)
    }

}


async function listarCarrinho() {
    const informacoesUsuario = localStorage.getItem('informacoes');
    const usuario = JSON.parse(informacoesUsuario); 
    const idUsuario = usuario.id; 

    const response = await fetch(`http://localhost:3006/carrinho/listar/${idUsuario}`, {
        method: 'GET',
        headers: {
            "Content-Type":"application/json"
        },
    })

    const results = await response.json();

    if(results.success) {
        let productData = results.data
        const images = 'http://localhost:3006/uploads/'  
        let html = document.getElementById('carrinho')
        html.innerHTML = '';
        function atualizarTotal() {
            let total = 0;
            productData.forEach(product => {
                const quantidade = document.getElementById(`quantidade`).value;
                total += product.valor * quantidade;
            });
            const textoTotal = document.getElementById('total');
            textoTotal.textContent = "R$ " + total;
        }
        productData.forEach(product => {
            let card = `
            <div class="item">
                <img src="${images + product.src}" alt="${product.nome}">
                <p class="nome">${product.nome}</p>
                <input type="number" id="quantidade" value="1" min="1">
                <p class="preco">R$${product.valor}</p>
                <i class="fa-solid fa-trash" onclick="removerCarrinho(${product.idProduto})"></i>
            </div>`;
            html.innerHTML += card;
            console.log(product.id)
            const inputQuantidade = document.getElementById(`quantidade`);
            inputQuantidade.addEventListener('input', atualizarTotal); 
        })     
        atualizarTotal();
        
    } else {
        alert(results.message)
    }
}


async function removerCarrinho(idProduto) {
    const informacoesUsuario = localStorage.getItem('informacoes');
    const usuario = JSON.parse(informacoesUsuario); 
    const idUsuario = usuario.id; 

    const data = {idUsuario, idProduto}
    
    const response = await fetch(`http://localhost:3006/usuario/carrinho/deletar`, {
        method: 'DELETE',
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    })

    const results = await response.json();

    if(results.success) {
        alert(results.message)
        listarCarrinho()
    } else {
        alert(results.message)
    }
}
if (document.getElementById('carrinho')) {
    document.addEventListener('DOMContentLoaded', listarCarrinho)
}