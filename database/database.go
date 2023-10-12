package database

// Importando bibliotecas para a criação e conexão do banco de dados
import (
	"database/sql"
	"fmt"
	"log"
	//"os"

	_ "github.com/lib/pq"
)

// Função para criar e conectar a um banco de dados
func NewDB() (*sql.DB, error) {

	dbUser := "root"
	dbPassword := "tectec123"
	dbHost := "dpg-cjd7jk7db61s73cdigjg-a.oregon-postgres.render.com"
	dbPort := "5432"
	dbName := "tectec"

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=require", dbUser, dbPassword, dbHost, dbPort, dbName) // String utilizada para criar a URL da conexão

	db, err := sql.Open("postgres", dsn) // Função SQL para abrir a conexão

	if err != nil {
		log.Println("Erro ao conectar ao banco de dados:", err)
		return nil, err
	}

	log.Println("Conexão com o banco de dados estabelecida com sucesso") // Avisa se a conexão com concedida com sucesso.

	return db, nil
}
