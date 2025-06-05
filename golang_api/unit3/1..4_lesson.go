package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode/utf8"
)

func strNbyte() {
	//1. String and []byte
	str := "Hello World"
	firstletter := str[0]

	fmt.Println(firstletter)         // ASCII => H
	fmt.Println(string(firstletter)) // H
	fmt.Println(len(str))            // nums of str

	for i := 0; i < len(str); i++ {
		fmt.Println((string(str[i])))
	}

	//การใช้งาน Rune
	// rune => int32
	str1 := "สวัสดีชาวโลก"

	word := []rune(str1)

	fmt.Println(word[0])
	fmt.Println(string(word[0]))
	fmt.Println(utf8.RuneCountInString(str1))

	for _, char := range str1 {
		fmt.Println(string(char))
	}

	//ฟังก์ชันของ strings
	str_result_1 := strings.Contains("AunLearner", "Aun")
	str_result_2 := strings.Count("สวัสดี โชคดีนะ", "ดี")
	str_result_3 := strings.HasPrefix("Hello World", "Hell")
	str_result_4 := strings.HasSuffix("Hello World", "ld")
	str_result_5 := strings.Join([]string{"สวัสดี", "ชาวโลก"}, "-")
	str_result_6 := strings.ToUpper("hello")
	str_result_7 := strings.ToLower("HelLO")

	fmt.Println(str_result_1, str_result_2, str_result_3, str_result_4, str_result_5, str_result_6, str_result_7)

	//Number Parsing

	//a, _ := strconv.ParseFloat("3.14", 64)
	//fmt.Println(a) // 3.14
	//
	//e, _ := strconv.ParseInt("0110", 2, 64)
	//fmt.Println(e) // 6
	//
	//i, _ := strconv.ParseUint("123", 10, 64)
	//fmt.Println(i) // 123
	//
	//o, _ := strconv.Atoi("65")
	//fmt.Println(o) // 65
	//
	//w := strconv.Itoa(65)
	//fmt.Println(w) // 65

	// b, err := strconv.ParseFloat("XXXX", 64)
	b, err := strconv.ParseFloat("2222", 64)
	if err != nil {
		fmt.Println("Error")
	} else {
		fmt.Println(b)
	}
}
