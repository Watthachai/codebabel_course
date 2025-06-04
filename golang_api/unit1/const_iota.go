package main

import "fmt"

func main_unit_three() {
	const (
		sun = iota + 1
		mon
		tue
		_
		_
		sat
	)
	fmt.Println("sat =", sat)
}
