package main

import "fmt"

func arr_slice() {
	arr := [5]string{"A", "B", "C", "D", "E"}

	result := arr[2:4]

	result[0] = "M"
	arr[0] = "X"

	fmt.Println(result, arr)

	s := []string{"A", "B", "C", "D", "E"}

	s2 := append(s, "F")

	fmt.Println(s, cap(s2), s2)

	//การดำเนินการบน slice
	words := []string{"Hello", "Hi", "Bye", "Thailand", "Japan"}

	//find
	fmt.Println(words[2])

	//append
	words = append(words, "Go!")
	fmt.Println((words))

	//remove --> index => 2 (Bye)
	words = append(words[:2], words[3:]...)
	fmt.Println((words))

	//Empty Slice VS Nil Slice

}
