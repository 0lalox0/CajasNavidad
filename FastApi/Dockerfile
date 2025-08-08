# Usar una imagen oficial de Python
FROM python:3.11

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el resto del código
COPY . .

# Exponer el puerto en el que corre FastAPI
EXPOSE 8000

# Comando para ejecutar FastAPI con Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
