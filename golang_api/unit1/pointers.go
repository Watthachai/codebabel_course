package main

import "fmt"

func unit_9() {
	i := 20

	p := &i // & ->> คือการหา Address ของค่า i

	fmt.Println(*p) //--> การใส่ * บนหน้าตัวแปร คือการชี้ว่าตัวแปร p คือค่าอะไรซึ่งแตกต่างจาก &
}
