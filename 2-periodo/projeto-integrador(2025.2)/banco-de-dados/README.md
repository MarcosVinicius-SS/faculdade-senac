# Banco de Dados do Projeto Integrador (2025.2)

Nesta pasta está o arquivo com a estrutura do banco de dados do projeto.

## Arquivo SQL
- `banco_de_dados.sql` → Contém todas as tabelas, relacionamentos e dados iniciais do sistema.

> ⚠️ Abra este arquivo em qualquer editor SQL (MySQL, PostgreSQL, etc.) para criar ou analisar o banco de dados.

## Modelos de Banco de Dados

### Modelo Conceitual
O modelo conceitual representa de forma **abstrata e independente de tecnologia** a estrutura do sistema.  
Ele mostra as **entidades principais**, seus **atributos** e os **relacionamentos** entre elas, sem se preocupar com detalhes de implementação.  
Serve como guia inicial para entender **o domínio do problema** e **as regras de negócio** que o banco deve suportar.

### Modelo Relacional
O modelo relacional é a **tradução do modelo conceitual para um formato implementável** em bancos de dados relacionais (MySQL, PostgreSQL, etc.).  
Ele inclui:
- Tabelas correspondentes às entidades.
- Chaves primárias e estrangeiras.
- Tipos de dados para cada coluna.
- Restrições de integridade.
- Relacionamentos implementados via chaves.

> 💡 O modelo relacional é o que permite criar o banco de dados de fato, enquanto o modelo conceitual serve para planejamento e entendimento do sistema.
