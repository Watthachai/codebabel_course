package controller_test

import (
	"testing"

	"github.com/stretchr/testify/suite"
)

type ArticleTestSuite struct {
	suite.Suite
}

func (s *ArticleTestSuite) TestFindAll() {
	s.Equal("", "")
}

func TestArticleTestSuite(t *testing.T) {
	suite.Run(t, new(ArticleTestSuite))
}