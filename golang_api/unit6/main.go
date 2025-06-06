package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func printAndSleep(num int) {
	defer wg.Done()

	time.Sleep(1 * time.Second)
	fmt.Println(num)

}

//CHANNELS

//CHANNELS

func main() {
	wg.Add(10)

	for i := 1; i <= 10; i++ {
		printAndSleep(i)
	}

	wg.Wait()

	//CHANNELS

	//CHANNELS
}
