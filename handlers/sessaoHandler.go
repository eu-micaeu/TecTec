package handlers

// Importando bibliotecas para a criação da classe e funções da sessão.
import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

// Estrutura da sessão.
type Sessao struct {
	ID_Sessao    int    `json:"id_sessao"`
	Data_Entrada string `json:"data_entrada"`
	Data_Saida   string `json:"data_saida"`
	ID_Usuario   int    `json:"id_usuario"`
}

func (s *Sessao) Entrada(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		nickname := c.Param("nickname")

		var usuario Usuario

		row := db.QueryRow("SELECT id_usuario FROM usuarios WHERE nickname = $1", nickname)

		err := row.Scan(&usuario.ID_Usuario)

		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário não encontrado"})
			return
		}

		_, err = db.Exec("INSERT INTO sessoes (data_entrada, id_usuario) VALUES (NOW() - INTERVAL '3 hours', $1)", usuario.ID_Usuario)

		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar sessão"})
			return
		}

		c.JSON(200, gin.H{"message": "Sessão iniciada com sucesso!"})
	}
}
