package main

import (
	"errors"
	"fmt"
)

// คุณสมบัติของ Panic และการใช้งาน
func findIndex(s []int, num int) (int, error) {
	for i, n := range s {
		if n == num {
			return i, nil
		}
	}
	return 0, errors.New("Number nor found")
}

// EOF คุณสมบัติของ Panic และการใช้งาน

// PANIC RECOVER
func f() {
	panic("from f")
}

func g() {
	f()
}

func h() {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println(r, "Recover")
		}
	}()

	g()
}

// EOF PANIC RECOOVER
func main() {
	//คุณสมบัติของ Panic และการใช้งาน
	i, err := findIndex([]int{1, 2, 3}, 2)
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(i)
	}
	//EOF คุณสมบัติของ Panic และการใช้งาน

	// PANIC RECOVER
	// EOF PANIC RECOOVER

	h()
}
