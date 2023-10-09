#!/bin/bash

# Execute o arquivo main em segundo plano
./main &

# Execute o arquivo bot em segundo plano
./bot &

# Mantenha o script em execução para manter ambos os processos ativos
tail -f /dev/null
