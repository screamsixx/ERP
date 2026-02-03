# Etapa 1: Build de Angular
FROM node:18 as builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./
RUN npm install

COPY . .

# Compilar en modo producción
RUN npm run build --configuration=production

# Etapa 2: Servir con Apache
FROM httpd:2.4

# Limpiar contenido por defecto de Apache
RUN rm -rf /usr/local/apache2/htdocs/*

# Copiar build Angular al htdocs de Apache
COPY --from=builder /app/dist/sakai-ng/ /usr/local/apache2/htdocs/

# Expone el puerto 80
EXPOSE 80
