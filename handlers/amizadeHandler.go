package handlers

// Importando bibliotecas para a criação da classe e funções do usuário.
import (
	"database/sql"

	"github.com/gin-gonic/gin"
)

// Estrutura da amizade.
type Amizade struct {
	ID_Amizade int `json:"id_amizade"`
	ID_Usuario   int `json:"id_usuario"`
	ID_Usuario_Seguindo   int `json:"id_usuario_seguindo"`
	Data_Seguindo string `json:"data_seguindo"`
}

// Função com a finalidade de criar uma amizade.
func (a *Amizade) CriarAmizade(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		var novaAmizade Amizade

		if err := c.BindJSON(&novaAmizade); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao criar amizade"})
			return
		}

		_, err := db.Exec("INSERT INTO amizades (id_usuario, id_usuario_seguindo, data_seguindo) VALUES ($1, $2, NOW())", novaAmizade.ID_Usuario, novaAmizade.ID_Usuario_Seguindo)

		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar amizade"})
			return
		}

		c.JSON(200, gin.H{"message": "Amizade criada com sucesso!"})
	}
}

// Função com a finalidade de desfazer uma amizade.
func (a *Amizade) DesfazerAmizade(db *sql.DB) gin.HandlerFunc {

	return func(c *gin.Context) {

		var novaAmizade Amizade

		if err := c.BindJSON(&novaAmizade); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao desfazer amizade"})
			return
		}

		_, err := db.Exec("DELETE FROM amizades WHERE id_usuario = $1 AND id_usuario_seguindo = $2", novaAmizade.ID_Usuario, novaAmizade.ID_Usuario_Seguindo)

		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao desfazer amizade"})
			return
		}

		c.JSON(200, gin.H{"message": "Amizade desfeita com sucesso!"})
	}
}

// Função com a finalidade de mostrar todas as amizades de um usuário.
func (a *Amizade) MostrarAmizades(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idUsuario := c.Param("id_usuario")

		rows, err := db.Query("SELECT u.id_usuario, u.nickname, u.tecnologia, u.biografia FROM amizades a JOIN usuarios u ON a.id_usuario_seguindo = u.id_usuario WHERE a.id_usuario = $1", idUsuario)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao buscar amizades"})
			return
		}
		defer rows.Close()

		var amigos []Usuario

		for rows.Next() {
			var amigo Usuario
			if err := rows.Scan(&amigo.ID_Usuario, &amigo.Nickname, &amigo.Tecnologia, &amigo.Biografia); err != nil {
				c.JSON(500, gin.H{"message": "Erro ao buscar amizades"})
				return
			}
			amigos = append(amigos, amigo)
		}

		c.JSON(200, gin.H{"amigos": amigos})
	}
}

// Função com a finalidade de contar todas as amizades de um usuário.
func (a *Amizade) ContarAmizades(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idUsuario := c.Param("id_usuario")

		row := db.QueryRow("SELECT COUNT(*) FROM amizades WHERE id_usuario = $1", idUsuario)

		var quantidade int
		err := row.Scan(&quantidade)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao contar amizades"})
			return
		}

		c.JSON(200, gin.H{"quantidade_amizades": quantidade})
	}
}

// Função com a finalidade de sugerir amigos aleatórios para um usuário.
func (a *Amizade) SugerirAmigos(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		idUsuario := c.Param("id_usuario")

		rows, err := db.Query("SELECT u.id_usuario, u.nickname, u.tecnologia, u.biografia FROM usuarios u WHERE u.id_usuario != $1 AND u.id_usuario NOT IN (SELECT a.id_usuario_seguindo FROM amizades a WHERE a.id_usuario = $1) ORDER BY RANDOM() LIMIT 3", idUsuario)

		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao sugerir amigos"})
			return
		}
		defer rows.Close()

		var amigos []Usuario

		for rows.Next() {
			var amigo Usuario
			if err := rows.Scan(&amigo.ID_Usuario, &amigo.Nickname, &amigo.Tecnologia, &amigo.Biografia); err != nil {
				c.JSON(500, gin.H{"message": "Erro ao sugerir amigos"})
				return
			}
			amigos = append(amigos, amigo)
		}

		c.JSON(200, gin.H{"sugestoes_amigos": amigos})
	}
}


