# Usa una imagen base de Node.js
FROM node:20-alpine AS build-step

# Establecer el límite de memoria para Node.js
ENV NODE_OPTIONS=--max_old_space_size=4096

# Variable de entorno que define el ambiente por defecto deploy
ARG TYPE

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto al directorio de trabajo
COPY package*.json ./
#COPY package.json /app

# Instala las dependencias del proyecto
#RUN npm ci --prefer-offline --no-audit --progress=false
RUN npm install

# Copia el resto de los archivos de tu proyecto al directorio de trabajo
COPY . /app

# Construye la aplicación Angular
RUN npm run build:${TYPE}

# Configura la imagen de producción de Nginx
FROM nginx:alpine

# Copia los archivos generados de la compilación de Angular a la carpeta de Nginx
COPY --from=build-step /app/dist/super-set/browser /usr/share/nginx/html

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para que se pueda acceder a la aplicación desde el navegador
EXPOSE 80

# Comando para iniciar Nginx cuando se ejecute el contenedor
CMD ["nginx", "-g", "daemon off;"]

