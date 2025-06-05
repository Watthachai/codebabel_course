package main

import "fmt"

type user struct {
	name string
	age  uint
}

type article struct {
	title   string
	excerpt string
	body    string
	user
	// ^^ type user struct { // size=24 (0x18)
	// name string
	// age  uint
	// } // 2::: Type Embedding
}

// Define method
type enrollment struct {
	semester string
	courses  []string
}

func (e enrollment) courseAt(index uint) string {
	return e.courses[index]
}

func (e *enrollment) addCourse(cuorse string) {
	e.courses = append(e.courses, cuorse)
}

// EOF Define method //

// 4 Interface //
type pdf struct {
	content string
}

type generator interface {
	generate()
}

func (p pdf) generate() {
	fmt.Println("Gen....")
}

// EOF of Interface //

func old_main() {
	fmt.Println("Hello, World! >> UNIT - 4")
	// 1 Struct
	u := user{"AUN", 24}

	fmt.Println(u)

	a := article{
		title:   "Title",
		excerpt: "EEEE",
		body:    "BBB",
		user:    u,
	}

	fmt.Println(a)

	//alternative way
	a_1 := article{
		title:   "TT",
		excerpt: "EE",
		body:    "BB",
		user:    user{name: "AUN", age: 24},
	}

	fmt.Println(a_1)

	//3 การนิยาม Methods และ Method Receiver

	e := enrollment{semester: "1/68", courses: []string{"Java", "C#"}}

	result := e.courseAt(0)

	fmt.Println(result)

	(&e).addCourse("Go")

	fmt.Println(e.courses)

	//4 & 5 Interface | Method Sets
	var gen generator

	gen = &pdf{content: "MY PDF"}

	gen.generate()

	// Insertion
	//tp_assert()
}
