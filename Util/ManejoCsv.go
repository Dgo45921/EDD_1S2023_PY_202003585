package Util

import (
	"encoding/csv"
	"fmt"
	"os"
)

func LeerCsv(path string) {
	fd, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("Successfully opened the CSV file")
	defer fd.Close()

	// Lee el csv
	fileReader := csv.NewReader(fd)
	records, err := fileReader.ReadAll()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(records)
}
