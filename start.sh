#!/bin/bash

# Execute o arquivo main em segundo plano
./main.exe &

# Execute o arquivo bot em segundo plano
./bot.exe &

# Mantenha o script em execução para manter ambos os processos ativos
tail -f /dev/null
