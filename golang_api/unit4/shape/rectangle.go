package shape

type Rectangle struct {
	Width  float64
	Height float64
}

func (r Rectangle) Area() float64 {
	return 2 * (r.Width + r.Height)
}
