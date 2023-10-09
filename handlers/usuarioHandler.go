package handlers

// Importando bibliotecas para a criação da classe e funções do usuário.
import (
	"database/sql"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

// Estrutura do usuário.
type Usuario struct {
	ID_Usuario int `json:"id_usuario"`

	Nickname string `json:"nickname"`

	Senha string `json:"senha"`

	Telefone string `json:"telefone"`

	Tecnologia string `json:"tecnologia"`

	Seguidores int `json:"seguidores"`
}

//Token
type Claims struct {
    ID_Usuario int `json:"id_usuario"`
    jwt.StandardClaims
}

var jwtKey = []byte("my_secret_key")

// Função para verificar se o token está na tabela de tokens inválidos
func tokenEstaNaTabelaDeTokensInvalidos(db *sql.DB, tokenString string) bool {
	query := "SELECT COUNT(*) FROM tokens_invalidos WHERE token_invalido = $1"
	var count int
	err := db.QueryRow(query, tokenString).Scan(&count)
	if err != nil {
		log.Println("Erro ao consultar a tabela de tokens inválidos:", err)
		return true 
	}
	return count > 0
}

// Função com finalidade de validação do token para as funções do usuário.
func (u *Usuario) ValidarOToken(db *sql.DB, tokenString string) (int, error) {
	
	if tokenEstaNaTabelaDeTokensInvalidos(db, tokenString) {
		return 0, nil
	}

	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})

	if err != nil || !tkn.Valid {
		return 0, err
	}

	return claims.ID_Usuario, nil
}


// Função com finalidade de geração do token para as funções do usuário.
func GerarOToken(usuario Usuario) (string, error) {

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &Claims{
		ID_Usuario: usuario.ID_Usuario,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	
	if err != nil {
		return "Erro ao gerar token", err
	}

	return tokenString, nil
}
///////////////////////////////////////////////////////////////////////////////////////////////

// Função com finalidade de login do usuário.
func (u *Usuario) Entrar(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var usuario Usuario

		if err := c.BindJSON(&usuario); err != nil {
			c.JSON(400, gin.H{"message": "Erro ao fazer login"})
			return
		}

		row := db.QueryRow("SELECT id_usuario, nickname, senha FROM usuarios WHERE nickname = $1 AND senha = $2", usuario.Nickname, usuario.Senha)

		err := row.Scan(&usuario.ID_Usuario, &usuario.Nickname, &usuario.Senha)

		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário ou senha incorretos"})
			return
		}

		token, _ := GerarOToken(usuario)

		http.SetCookie(c.Writer, &http.Cookie{
			Name:     "token",
			Value:    token,
			Expires:  time.Now().Add(24 * time.Hour),
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteStrictMode,
		})
		
		c.JSON(200, gin.H{"message": "Login efetuado com sucesso!", "token": token, "usuario": usuario})
	}
}

// Função com finalidade de registrar um usuário no sistema.
func (u *Usuario) Registrar(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		var novoUsuario Usuario

		_, err := db.Exec("INSERT INTO usuarios (nickname, senha, telefone, tecnologia) VALUES ($1, $2, $3, $4)", novoUsuario.Nickname, novoUsuario.Senha, novoUsuario.Telefone, novoUsuario.Tecnologia)
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao criar usuário"})
			return
		}

		c.JSON(200, gin.H{"message": "Usuário criado com sucesso!"})
	}
}

// Função com a finalidade de retornar as informações de qualquer usuário utilizando o nickname do mesmo.
func (u *Usuario) PegarInformacoesDoUsuarioAtravesDoNickname(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		nickname := c.Param("nickname")

		token, err := c.Request.Cookie("token")

		if err != nil {
			c.JSON(401, gin.H{"message": "Token inválido"})
			return
		}

		tokenValue := token.Value

		_, err = u.ValidarOToken(db, tokenValue)

		if err != nil {
			c.JSON(401, gin.H{"message": "Token inválido"})
			return
		}

		var usuario Usuario

		row := db.QueryRow("SELECT id_usuario, nickname, senha, telefone, tecnologia, seguidores FROM usuarios WHERE nickname = $1", nickname)

		err = row.Scan(&usuario.ID_Usuario, &usuario.Nickname, &usuario.Senha, &usuario.Telefone, &usuario.Tecnologia, &usuario.Seguidores)

		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário inexistente"})
			return
		}

		c.JSON(200, gin.H{"usuario": usuario})
	}
}

// Função com a finalidade de pegar as informações do usuário, utilizando o token do mesmo.
func (u *Usuario) PegarInformacoesDoUsuarioAtravesDoToken(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		token, err := c.Request.Cookie("token")

		if err != nil {
			c.JSON(401, gin.H{"message": "Token inválido"})
			return
		}

		tokenValue := token.Value

		var usuario Usuario

		idUsuario, err := u.ValidarOToken(db, tokenValue)

		if err != nil {
			c.JSON(401, gin.H{"message": "Token inválido"})
			return
		}

		row := db.QueryRow("SELECT id_usuario, nickname, senha, telefone, tecnologia, seguidores FROM usuarios WHERE id_usuario = $1", idUsuario)

		err = row.Scan(&usuario.ID_Usuario, &usuario.Nickname, &usuario.Senha, &usuario.Telefone, &usuario.Tecnologia, &usuario.Seguidores)

		if err != nil {
			c.JSON(404, gin.H{"message": "Usuário inexistente"})
			return
		}

		c.JSON(200, gin.H{"usuario": usuario})
	}
}

// Função com a finalidade de retornar os nicknames de todos os usuários.
func (u *Usuario) PegarInformacoesDeTodosOsUsuariosMenosAsMinhas(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		id_usuario := c.Param("id_usuario")

		rows, err := db.Query("SELECT id_usuario, nickname, telefone, tecnologia, seguidores FROM usuarios WHERE id_usuario != $1", id_usuario)

		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao buscar usuários"})
			return
		}

		var usuarios []Usuario

		for rows.Next() {

			var usuario Usuario

			err = rows.Scan(&usuario.ID_Usuario, &usuario.Nickname, &usuario.Telefone, &usuario.Tecnologia, &usuario.Seguidores)

			if err != nil {
				c.JSON(500, gin.H{"message": "Erro ao processar usuários"})
				return
			}

			usuarios = append(usuarios, usuario)
		}

		c.JSON(200, gin.H{"usuarios": usuarios})
	}
}

// Função com finalidade de login do usuário.
func (u *Usuario) Sair(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {

		token, err := c.Request.Cookie("token")

		if err != nil {
			c.JSON(401, gin.H{"message": "Token inválido"})
			return
		}

		tokenValue := token.Value

		cookie := &http.Cookie{
			Name:     "token",
			Value:    "",
			Expires:  time.Unix(0, 0), 
			HttpOnly: true,
			Secure:   true,
			SameSite: http.SameSiteStrictMode,
			Path:     "/", 
		}
		
		http.SetCookie(c.Writer, cookie)

		_, err = db.Exec("INSERT INTO tokens_invalidos (token_invalido) VALUES ($1)", tokenValue)
		
		if err != nil {
			c.JSON(500, gin.H{"message": "Erro ao inserir token inválido"})
			return
		}

		c.JSON(200, gin.H{"message":"Saiu com sucesso!"})

	}
}