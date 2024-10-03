create database crud_api;
use crud_api;
 
create table users(
	id int not null auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    cpf_number bigint,
    staus enum('Ativo', 'Inativo') default('Ativo'),
    created_at timestamp default current_timestamp
);

create table produtos(
	id int not null auto_increment primary key,
	nome varchar(255) not null,
    descricao varchar(255),
    valor decimal(5,2) not null,
    src varchar(255) not null,
    status enum('Ativo', 'Inativo') default('Ativo')
    perfil enum('Admin', 'Usuário') default('Usuário')
);

create table carrinho(
	id int not null auto_increment primary key,
	usuario int not null,
    produto int not null,
    quantidade int default(1),
    
    foreign key (usuario) references users(id),
    foreign key (produto) references produtos(id)
);

create table favoritos(
	id int not null auto_increment primary key,
	usuario int not null,
    produto int not null,
    
    foreign key (usuario) references users(id),
    foreign key (produto) references produtos(id)
);