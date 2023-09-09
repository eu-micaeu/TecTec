package database

import (
	"database/sql"
	"fmt"
	"log"
	
	_ "github.com/lib/pq"
)

func NewDB() (*sql.DB, error) {

	dbUser := "DB_USER"
	dbPassword := "DB_PASSWORD"
	dbHost := "DB_HOST"
	dbPort := "DB_PORT"
	dbName := "DB_NAME"

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Println("Erro ao conectar ao banco de dados:", err)
		return nil, err
	}

	log.Println("Conexão com o banco de dados estabelecida com sucesso")
	return db, nil
}