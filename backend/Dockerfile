FROM python:3.10-slim

# Instala las dependencias necesarias del sistema
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Actualiza pip
RUN pip install --upgrade pip

# Instala yt-dlp con pip
RUN pip install yt-dlp

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos locales al contenedor
COPY . /app

# Comando por defecto (puedes modificar esto según tu script)
CMD ["yt-dlp", "--help"]
