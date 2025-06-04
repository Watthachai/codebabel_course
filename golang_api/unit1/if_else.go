package main

import (
	"fmt"
	"runtime"
)

func if_else() {
	num := 21

	if num%2 == 0 {
		println("Even")
	} else {
		println("Odd")
	}

	os := runtime.GOOS
	fmt.Println(os)

}
