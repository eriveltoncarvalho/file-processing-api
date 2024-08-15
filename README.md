# API processamento de arquivos

**Uma API desenvolvida utilizando Node.js e TypeScript, integrada com banco de dados PostgreSQL, para realizar o processamento eficiente de arquivos em larga escala. 
Otimizada para alta performance, a API é capaz de processar mais de 1 milhão de registros em menos de um minuto, garantindo escalabilidade e confiabilidade.**


**Configuração local**

- Criar o banco de dados de acordo a configuração do arquivo ormconfig.js;
- yarn install;
- yarn typeorm migration:run;
- yarn dev:server
- Após seguir os passos acima a aplicação estará pronta para utilização. 

**Funcionalidades**

- Existe um serviço que executa a cada minuto as rotas para verificar e processar os arquivos;
- Arquivos a serem enviados ficam no diretório billing, localizado na raiz do projeto: **/tmp/files/billing**;
- Arquivos enviados ficam no diretório send, localizado na raiz do projeto: **/tmp/files/send**;
- Arquivos com erros ficam no diretório fileWithError, localizado na raiz do projeto: **/tmp/files/fileWithError**;
- Logs com os erros ficam no diretório error, localizado na raiz do projeto: **/tmp/files/error**;

**Rotas / retornos**

- **POST:** localhost:3333/billing
- **Retorno:**
  {
    "totalRecords": 6,
    "totalAdded": 3
  }

- **POST:** localhost:3333/billing/send/email
- **Retorno:**
  {
    "totalEmailsSend": 10
  }
