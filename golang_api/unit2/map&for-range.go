package main

import "fmt"

func mapsssss() {
	credits := map[string]int{
		"Java":   3,
		"C++":    3,
		"Python": 4,
	}

	delete(credits, "Python")

	result, ok := credits["Java"]

	fmt.Println(result, ok)

	// for -  range
	courses := []string{"Java", "C++", "Python"}

	for _, v := range courses {
		//fmt.Println(k, v)
		fmt.Println(v)
	}
	for k, v := range credits {
		fmt.Println(k, v)
	}
}
