# Payments Microservice

## Dev

1. Clonar el repositorio
2. Instalar dependencias: ```npm install```
3. Crear un archivo `.env` basado en el `env.template`
4. Ir a https://dashboard.hookdeck.com/ y crear una conexión
5. Instalar sdk de hookdeck: 

```
npm install hookdeck-cli -g
```

6. Levantar hookdeck: 

```
hookdeck login
```

```
hookdeck listen 3003 stripe-to-localhost
```

7. Ir a https://dashboard.stripe.com/test/dashboard, crear un nuevo webhook y pegar la url generada por hookdeck. En el endpoint debe ir /payments/webhook.
8. Ejecutar `npm run start:dev`