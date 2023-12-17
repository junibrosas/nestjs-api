# Docker up

docker-compose up

# create the first migration

prisma migrate dev --name init

# install authentication related packages

pnpm add @nestjs/jwt bcrypt class-transformer class-validator cookie-parser @nestjs/config

# Install GraphQL packages

pnpm add @nestjs/graphql @nestjs/apollo @apollo/server graphql

# Generate auth module

npx nest g module auth
npx nest g service auth
npx nest g resolver auth

# Generate user module

npx nest g module user
npx nest g service user
npx nest g resolver user

pnpm add graphql-upload@^14.0.0
