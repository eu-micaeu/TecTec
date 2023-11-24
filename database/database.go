package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func NewDB() (*sql.DB, error) {

	dbUser := "root"
	dbPassword := "jF7fLmboaLgbZ4R39Ipwmp94h8876rCe"
	dbHost := "dpg-cl22lurmgg9c73ebjkv0-a.oregon-postgres.render.com"
	dbPort := "5432"
	dbName := "tectec"

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require", dbUser, dbPassword, dbHost, dbPort, dbName) // String utilizada para criar a URL da conexão

	db, err := sql.Open("postgres", dsn) // Função SQL para abrir a conexão

	if err != nil {
		log.Println("Erro ao conectar ao banco de dados:", err)
		return nil, err
	}

	return db, nil
}
