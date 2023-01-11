
# Diseño de microservicios con Domain Driven Design sobre Nestjs

Este repositorio contiene el modelo de una arquitectura de microservicios basados en un servicio tipo UBER. El diseño de los componentes es implementado con Domain Driven Design puedes leer el detalle de la implelemtnación [acá](https://nullpointer-excelsior.github.io/posts/disenando-microservicios-con-ddd/)



```bash
#!/bin/bash
# init rabbitmq
docker run --rm -it --hostname ddd-rabitmq -p 15672:15672 -p 5672:5672 rabbitmq:3-management
# init tracking microservice
nest start -w tracking-ms
# init enrollment microservice 
nest start -w enrollment-ms
```

### Autor: Benjamín