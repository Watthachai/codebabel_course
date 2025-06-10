package middleware

import (
	"course-go/models"
	"net/http"

	"github.com/casbin/casbin/v2"
	"github.com/gin-gonic/gin"
)

func Authorize() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		user, ok := ctx.Get("sub")
		if !ok {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		userModel := user.(*models.User)

		enforcer, err := casbin.NewEnforcer("config/acl_model.conf", "config/policy.csv")
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to initialize enforcer"})
			return
		}

		// Use user role instead of user object
		// Casbin expects: subject, object, action
		subject := userModel.Role // or userModel.Email, depending on your policy
		object := ctx.Request.URL.Path
		action := ctx.Request.Method

		allowed, err := enforcer.Enforce(subject, object, action)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to enforce policy"})
			return
		}

		if !allowed {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "You are not allowed to access this resource",
			})
			return
		}

		ctx.Next()
	}
}
