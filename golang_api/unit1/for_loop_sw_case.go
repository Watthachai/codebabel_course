package main

import "fmt"

func forloop_sw() {
	for n := 1; n <= 10; n++ {
		fmt.Println(n)
	}

	switch day := "Sunday"; day {
	case "Sunday", "Saturday":
		fmt.Println("Weekend")
	default:
		fmt.Println("Workday")
	}
}
