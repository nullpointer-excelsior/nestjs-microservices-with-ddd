
up-rabbitmq:
	docker run --rm -it --hostname ddd-rabitmq -p 15672:15672 -p 5672:5672 rabbitmq:3-management

up-tracking:
	nest start -w tracking-ms

up-enrollment:
	nest start -w enrollment-ms
