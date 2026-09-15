# BDII – Atividade Extra: Modelagem de Banco de Dados (MER e MR)

## Descrição da Atividade
Esta atividade individual foi proposta na disciplina **Banco de Dados II (BDII)**, ministrada pelo professor **Danilo Farias**.

O objetivo do exercício foi analisar um **mini-mundo** fornecido pelo professor e desenvolver os modelos de banco de dados necessários para representar o sistema descrito.

Para isso, foram elaborados:

- **MER (Modelo Entidade-Relacionamento)**
- **MR (Modelo Relacional)**

Os modelos foram construídos com base na análise do cenário apresentado e publicados em **formato de imagem**, conforme solicitado na atividade.

## Mini-Mundo Escolhido
Para esta atividade foi escolhido o mini-mundo **Empresa XTZ – Sistema de Gestão de Recursos Humanos**.

O sistema tem como objetivo melhorar o controle e gerenciamento dos funcionários da empresa, incluindo informações sobre departamentos, projetos e atividades dos empregados.

## Principais Entidades do Sistema

O sistema contempla diversas entidades importantes, como:

- **Departamentos** – unidades organizacionais da empresa.
- **Empregados** – funcionários da empresa com informações como nome, salário, escolaridade e cargo.
- **Projetos** – atividades desenvolvidas pela empresa.
- **Alocações** – associação entre empregados e projetos, registrando as horas trabalhadas.
- **Dependentes** – pessoas que dependem do empregado (filhos, cônjuges, etc.).
- **Cargos** – função ocupada pelo empregado dentro do departamento.
- **Funções em Projetos** – papel desempenhado pelo empregado dentro de um projeto.
- **Férias** – períodos de descanso registrados no sistema.
- **Advertências** – registros disciplinares de funcionários.
- **Registros de Ponto e Faltas** – controle de presença e ausências.

## Modelos Desenvolvidos

### Modelo Entidade-Relacionamento (MER)
Representa de forma conceitual as **entidades, atributos e relacionamentos** presentes no sistema da empresa.

📌 Arquivo disponível nesta pasta:
`mer_empresa_xtz.png`

### Modelo Relacional (MR)
Apresenta a estrutura do banco de dados em formato de **tabelas, chaves primárias e chaves estrangeiras**, permitindo sua implementação em um sistema gerenciador de banco de dados.

📌 Arquivo disponível nesta pasta:
`mr_empresa_xtz.png`

## Objetivo da Modelagem
A modelagem foi desenvolvida para representar a estrutura do sistema de gestão de recursos humanos da empresa XTZ, permitindo organizar informações sobre funcionários, departamentos, projetos e demais processos administrativos da empresa.
