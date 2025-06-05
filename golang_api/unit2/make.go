package main

import "fmt"

func makeee() {
	s1 := []int{1, 2, 3, 4, 5}

	fmt.Println(s1, len(s1), cap(s1))

	s2 := make([]int, 0, 5)
	s2 = append(s2, 1)

	fmt.Println(s2)

	s3 := append(s2, 6)

	fmt.Println(s3)
}
