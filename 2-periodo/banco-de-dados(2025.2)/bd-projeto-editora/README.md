# Projeto de Banco de Dados – Mini-mundo Editora

## Descrição do Projeto
Este projeto foi desenvolvido em grupo na disciplina **Banco de Dados II (BDII)**, ministrada pelo professor **Danilo Farias**.

O objetivo foi desenvolver um **projeto completo de banco de dados** a partir de um mini-mundo proposto, incluindo modelagem, criação de scripts SQL e documentação do sistema.

O mini-mundo escolhido pela equipe foi **Editora**, que representa o funcionamento de uma empresa responsável pela publicação, gerenciamento e venda de livros.

## Mini-mundo: Editora
O sistema de banco de dados foi projetado para gerenciar informações relacionadas a uma editora de livros, incluindo:

- Cadastro de **livros**
- Informações sobre **autores**
- Controle de **departamentos**
- Registro de **exemplares de livros**
- Organização por **áreas de conhecimento**
- Associação de **palavras-chave**
- Cadastro de **funcionários**
- Registro de **pedidos e vendas**

Esse sistema permite gerenciar o processo editorial, desde o cadastro de obras até o controle de vendas e estoque.

## Modelagem do Banco de Dados

Para representar o sistema foram desenvolvidos:

### Modelo Entidade-Relacionamento (MER)
Representa de forma conceitual as entidades e relacionamentos do sistema.

### Modelo Relacional (MR)
Representa a estrutura do banco de dados em formato de tabelas, incluindo chaves primárias e estrangeiras.

As imagens desses modelos estão disponíveis no documento de documentação do projeto.

## Scripts Desenvolvidos

O projeto inclui diferentes tipos de scripts SQL:

### DDL (Data Definition Language)
Scripts responsáveis por:

- Criação das tabelas
- Alteração da estrutura das tabelas
- Criação de views
- Exclusão das tabelas e dependências

### DML (Data Manipulation Language)

Scripts responsáveis por:

- Inserção de dados nas tabelas
- Atualização de registros
- Exclusão de registros

Cada tabela possui aproximadamente **20 registros para testes e simulação do sistema**.

### DQL (Data Query Language)

Foram desenvolvidas **consultas SQL para relatórios importantes do sistema**, utilizando:

- `JOIN`
- `SUBSELECT`

Totalizando **no mínimo 20 consultas SQL** para extração de informações do banco de dados.

### Views

Também foram criadas **views para representar relatórios importantes**, facilitando a consulta de dados no sistema.

## Arquivos do Projeto

📦 `editora_projeto_bd.zip`  
Arquivo contendo todos os scripts SQL do projeto (DDL, DML, DQL e views).

📄 `documentacao_projeto_editora.docx`  
Documento contendo:

- descrição detalhada do mini-mundo  
- imagens do **MER (modelo conceitual)**  
- imagens do **MR (modelo relacional)**  
- explicação da estrutura do banco de dados.

## Objetivo do Projeto
O projeto demonstra a aplicação prática dos conceitos de **modelagem e desenvolvimento de banco de dados**, incluindo:

- análise de domínio
- modelagem conceitual e relacional
- criação e manipulação de dados com SQL
- desenvolvimento de consultas e relatórios.
