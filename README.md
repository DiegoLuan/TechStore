# TechStore
Simples ecommerce, com listagem de produto, cadastro, detalhe de cada produto, e carrinho de compras, integrados com o backend Nest JS.

#### COMO RODAR

Front:  
- npm install
- npm start

Back: 
- npm install
- npx prisma generate
- no arquivo .env, adicione sua connection string do banco a ser utilizado.
- Rode a migration: npx prisma migrate dev --name <nome-da-migration>
- npm run start:dev
   
