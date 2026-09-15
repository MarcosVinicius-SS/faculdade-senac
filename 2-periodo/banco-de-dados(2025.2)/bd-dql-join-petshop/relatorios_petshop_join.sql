-- Relatorio 1 
SELECT 
    emp.nome AS 'Empregado',
    emp.cpf AS 'CPF',
    DATE_FORMAT(emp.dataAdm, '%d/%m/%Y') AS 'Data Admissão',
    CONCAT('R$ ', FORMAT(emp.salario, 2, 'de_DE')) AS 'Salário',
    dep.nome AS 'Departamento',
    tel.numero AS 'Número de Telefone'
FROM
    empregado emp
INNER JOIN
    departamento dep ON dep.idDepartamento = emp.Departamento_idDepartamento
LEFT JOIN
    telefone tel ON tel.Empregado_cpf = emp.cpf
ORDER BY 
	dataAdm DESC;

-- Relatorio 2
SELECT 
    emp.nome as 'Nome',
    emp.cpf as 'CPF',
    DATE_FORMAT(emp.dataAdm, '%d/%m/%Y') as 'Data Admissão',
    CONCAT('R$ ', FORMAT(emp.salario, 2, 'de_DE')) as 'Salário',
    dep.nome as 'Departamento',
    tel.numero as 'Número de Telefone'
    
FROM
    empregado emp
INNER JOIN
	departamento dep on dep.idDepartamento = emp.Departamento_idDepartamento
LEFT JOIN
	telefone tel on tel.Empregado_cpf = emp.cpf
WHERE
	emp.salario < (SELECT AVG(salario) FROM empregado)
ORDER BY
	emp.nome
;

-- Relatorio 3
select 
	dep.nome as "Departamento",
    COUNT(emp.cpf) as "Quantidade de Funcionarios",
    CONCAT('R$: ' ,FORMAT(AVG(emp.salario),2, 'de_DE')) as 'Media Salarial',
    CONCAT('R$: ' ,FORMAT(AVG(vend.comissao),2, 'de_DE')) as 'Media Comissão'
FROM 
	empregado emp
INNER JOIN 
	departamento dep on dep.idDepartamento = emp.Departamento_idDepartamento
INNER JOIN 
    venda vend ON vend.empregado_cpf = emp.cpf
WHERE 
	emp.salario < (SELECT AVG(salario) FROM empregado) 
    AND vend.comissao < (SELECT AVG(comissao) FROM venda)
GROUP BY 
	dep.nome
ORDER BY 
	dep.nome
;	

-- Relatorio 4
SELECT 
	emp.nome AS 'Empregados',
    emp.cpf AS 'CPF',
    UCASE(emp.sexo) AS 'sexo',
    CONCAT('R$: ' ,FORMAT(emp.salario,2, 'de_DE')) AS "Salario",
    COUNT(vend.idVenda) AS 'Quantidade Vendas',
    concat("R$ ", FORMAT(sum(vend.valor), 2, 'de_DE')) "Total valor Vendido",
    concat("R$ ", FORMAT(sum(vend.comissao), 2, 'de_DE')) "Total Comissao das Vendas"
FROM
	empregado emp 
INNER JOIN 
	Venda vend ON vend.empregado_cpf = emp.cpf
WHERE 
	 emp.sexo IN (
        'F',
        'M'
    )
GROUP BY 
	emp.nome,
    emp.cpf,
    emp.sexo,
    emp.salario
ORDER BY 
	 "Quantidade Vendas" DESC;
	
;

-- Relatorio 5
SELECT 
	e.nome AS 'Nome Empregado',
    e.cpf AS 'CPF Empregado',
    UCASE(e.sexo) AS 'Sexo',
    CONCAT('R$: ', FORMAT(e.salario, 2, 'de_DE')) AS 'Salário',
    COUNT(DISTINCT v.idVenda) AS 'Quantidade Vendas com Serviço',
    CONCAT('R$: ', FORMAT(SUM(iserv.valor), 2, 'de_DE')) AS 'Total Valor Vendido com Serviço',
    CONCAT('R$: ', FORMAT(SUM(v.comissao), 2, 'de_DE')) AS 'Total Comissão das Vendas com Serviço'
FROM 
	Empregado e
INNER JOIN 
	ItensServico iserv ON e.cpf = iserv.empregado_cpf
INNER JOIN 
	Venda v ON iserv.Venda_idVenda = v.idVenda
GROUP BY 
	e.nome, e.cpf, e.sexo, e.salario
ORDER BY 
	`Quantidade Vendas com Serviço` DESC;

-- Relatorio 6
SELECT 
	p.nome as "Nome do Pet",
	DATE_FORMAT(v.data	, '%d/%m/%Y') as "Data do Serviço",
    s.nome as "Nome do Serviço",
    SUM(itensS.quantidade) as 'Quantidade Servico',
    CONCAT("R$: ", format(SUM(itensS.valor), 2, 'de_DE')) as "Valor Serciço",
    e.nome as "Empregado Resp Serviço"
FROM 
	PET p
INNER JOIN 
	ItensServico itensS on p.idPET = itensS.PET_idPET
INNER JOIN 
	Servico s on itensS.Servico_idServico = S.idServico
INNER JOIN 
	Venda v on itensS.Venda_idVenda = v.idVenda
INNER JOIN 
	Empregado e on itensS.empregado_cpf = e.cpf
GROUP BY 	
	p.nome,
    v.data,
    s.nome,
    e.nome
order by 
v.DATA Desc;

-- Relatorio 7
SELECT 
	date_format(v.data, '%d/%m/%Y') as "Data da Venda",
    concat('R$: ', format(v.valor, 2, 'de_DE')) as "Valor da venda",
    concat('R$: ', format(v.desconto, 2, 'de_DE')) as "Desconto",
    concat('R$: ', format(v.valor - v.desconto, 2, 'de_DE')) as "Valor Final Venda",
    e.nome as "Empregado Ralizou Venda"

FROM 	
	Venda v
INNER JOIN 
	Empregado e on v.empregado_cpf = e.cpf
ORDER BY 
	v.DATA Desc; 
    
-- Relatorio 8
SELECT 
	s.nome as 'Nome Serviço',
    count(iserv.servico_idServico) as 'Quantidade Vendas',
    concat("R$: ",format(SUM(iserv.valor), 2, 'de_DE')) as 'Total Valor Vendido'
    
FROM 
	Servico s
    
INNER JOIN 
	itensServico iserv on  s.idservico = iserv.servico_idServico
GROUP BY 
	s.nome
ORDER BY 
	'Quatidade Vendas' desc;

-- Relatorio 9
SELECT 
    e.nome AS 'Nome Empregado',
    COUNT(v.idVenda) AS 'Quantidade de Vendas',
    CONCAT('R$: ', FORMAT(SUM(v.valor), 2, 'de_DE')) AS 'Valor Total Vendido',
    CONCAT('R$: ', FORMAT(SUM(v.valor - v.desconto), 2, 'de_DE')) AS 'Valor Total com Descontos'
FROM 
    Venda v
INNER JOIN 
    Empregado e ON v.Empregado_cpf = e.cpf
GROUP BY 
    e.nome
ORDER BY 
    `Quantidade de Vendas` DESC;

-- Relatorio 10
SELECT 
	DATE_FORMAT(v.data, '%d/%m/%Y') AS 'Data Venda',
    COUNT(v.idVenda) AS 'Quantidade de Vendas',
    CONCAT('R$: ', FORMAT(SUM(v.valor), 2, 'de_DE')) AS 'Valor Total Venda'
FROM 
	Venda v
GROUP BY 
	v.data
ORDER BY 
	v.data DESC;
    
-- Relatorio 11
SELECT
	p.nome as "Nome produto",
    f.nome as "Fornecedor do produto",
    concat('R$: ', format(p.valorVenda, 2, 'de_DE')) as "Valor produto",
    p.marca as "Categaroria Produto",
    f.nome as "Nome Fornecedor",
    f.email as "Email fornecedo",
group_concat(concat('(', substring(t.numero, 1, 2), ')', ' ', substring(t.numero, 3)) separator ')') 'Telefone Fornecedor'
FROM 	
	produtos as P
INNER JOIN 
	ItensCompra itensC on p.idProduto = itensC.Produtos_idProduto
INNER JOIN 
	Compras c on itensC.Compras_idCompra = c.idCompra
INNER JOIN 
	Fornecedor f on c.Fornecedor_cpf_cnpj = f.cpf_cnpj
LEFT JOIN 
	Telefone t on f.cpf_cnpj = t.Fornecedor_cpf_cnpj
GROUP BY 
	p.nome,
    p.valorVenda,
    p.marca,
    f.nome,
    f.email
ORDER BY 
	p.nome;
    
-- Relatorio 12
SELECT 
    p.nome AS "Nome Produto",
    SUM(ivp.quantidade) AS "Quantidade Total Vendas",
    SUM(ivp.quantidade * ivp.valor) AS "Valor Total Recebido pela Venda do Produto"
FROM 
    petshop.Produtos AS p
INNER JOIN 
    petshop.ItensVendaProd AS ivp 
    ON p.idProduto = ivp.Produto_idProduto
INNER JOIN 
    petshop.Venda AS v 
    ON ivp.Venda_idVenda = v.idVenda
GROUP BY 
    p.idProduto, p.nome
ORDER BY 
    SUM(ivp.quantidade) DESC;
