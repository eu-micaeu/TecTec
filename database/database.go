package database

import (
	"database/sql"
	"fmt"
	"log"
	//"os"

	_ "github.com/lib/pq"
)

func NewDB() (*sql.DB, error) {

	dbUser := "root"
dbPassword := "NsPP0Cl4Xus4NjgoUvLnkTFpUtz9nN5I"
dbHost := "dpg-cjd7jk7db61s73cdigjg-a.oregon-postgres.render.com"
dbPort := "5432"
dbName := "tectec"

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require", dbUser, dbPassword, dbHost, dbPort, dbName)
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Println("Erro ao conectar ao banco de dados:", err)
		return nil, err
	}

	log.Println("Conexão com o banco de dados estabelecida com sucesso")
	return db, nil
}