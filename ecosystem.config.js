module.exports = {
    apps: [
      {
        name: 'pakki-apigateway-env',
        script: 'npm',
        args: 'run dev',
        instances: 1,
        autorestart: true,
        watch: true,
        ignore_watch: ['src/helpers/Guias/**/*.pdf'],
        max_memory_restart: '1G',
        env: {
          PORT:3000,          
          ENVIROMENT:'Development Server',
          MONGO_URL:'mongodb://127.0.0.1:27017/devpakkiDB',
          USERDB:'devappakki',
          PWDDB:'4Pp4kk1',                  
        },
      },
      {
        name: 'pakki-apigateway-prod',
        script: 'npm',
        args: 'run dev',
        instances: 1,
        autorestart: true,
        watch: true,
        ignore_watch: ['src/helpers/Guias/**/*.pdf'],
        max_memory_restart: '1G',
        env: {
          PORT:3000,          
          ENVIROMENT:'Development Server',
          MONGO_URL:'mongodb://127.0.0.1:27017/devpakkiDB',
          USERDB:'prodppakki',
          PWDDB:'4Pp4kk1',                  
        },
      },    
    ]
  };