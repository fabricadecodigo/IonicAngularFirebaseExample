# Como rodar o projeto

Primeiro instale as dependencias
```
npm install
```

Depois coloque as suas configuraçoes do firebase no arquivo environment.ts

```
firebase: {
  projectId: 'seu-id-projeto',
  appId: 'seu-app-id',
  databaseURL: 'sua-url-database',
  storageBucket: 'seu-storage-bucket',
  locationId: 'sua-region',
  apiKey: 'sua-api-key',
  authDomain: 'seu-auth-domain.firebaseapp.com',
  messagingSenderId: 'seu-message-sender-id',
},
```

Agora é só rodar o projeto
```
npm start
# ou
npx ionic serve
```
