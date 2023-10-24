module.exports = {
  apps: [
    {
      name: 'gateway-buchim',
      script: 'node',
      args: 'dist/apps/api-gateway/main',
      env: {
        PORT: 1700,
      },
    },
    {
      name: 'user-service-buchim',
      script: 'node',
      args: 'dist/apps/user-service/main',
      env: {
        PORT: 1701,
      },
    },
    {
      name: 'post-service-buchim',
      script: 'node',
      args: 'dist/apps/post-service/main',
      env: {
        PORT: 1702,
      },
    },
  ],
};
