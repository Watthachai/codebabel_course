package main

import "fmt"

func inc(num *int) {
	*num++
}
func pbv() {
	i := 20

	inc(&i)

	fmt.Println(i)
}
