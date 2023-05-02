
export default class HashTable{
    constructor(){
        this.table = new Array(7)
        this.capacity = 7
        this.utilization = 0
    }

    insert(student){
        let index = this.calculateIndex(student.id)
        if(index < this.capacity){
            try{
                if(!this.table[index]){
                    this.table[index] = student
                    this.utilization++
                    this.tableCapacity()
                }else{
                    let counter = 1
                    index = this.recalculateIndex(student.id,counter)
                    while(this.table[index] != null){
                        counter++
                        index = this.recalculateIndex(student.id, counter)
                    }
                    this.table[index] = student
                    this.utilization++
                    this.tableCapacity()
                }
            }catch(err){
                console.log(err)
            }
        }
    }

    calculateIndex(id){
        let stringId = id.toString()
        let divisor = 0
        for(let i = 0; i < stringId.length; i++){
            divisor = divisor + stringId.charCodeAt(i)
        }
        return divisor % this.capacity
    }

    tableCapacity(){
        let auxUtilization = this.capacity*0.75
        if(this.utilization > auxUtilization){
            this.capacity = nextPrime(this.capacity)
            this.utilization = 0
            this.reInsert()
        }
    }



    reInsert(){
        const auxiliar_tabla = this.table
        this.table = new Array(this.capacity)
        auxiliar_tabla.forEach((alumno) => {
            this.insert(alumno)
        })
    }

    recalculateIndex(carnet, intento){
        let nuevo_indice = this.calculateIndex(carnet) + intento*intento
        return this.newIndex(nuevo_indice)
    }

    newIndex(num){
        let newP = 0
        if(num < this.capacity){
            newP = num
        }else{
            newP = num - this.capacity
            newP = this.newIndex(newP)
        }
        return newP
    }

    searchUser(id){
        let index = this.calculateIndex(id)
        if(index < this.capacity){
            try{
                if(this.table[index] == null){

                    return true
                }else if(this.table[index] && this.table[index].id === id){

                    return true
                }else{
                    let counter = 1
                    index = this.recalculateIndex(id,counter)
                    while(this.table[index]){
                        counter++
                        index = this.recalculateIndex(id, counter)
                        if(this.table[index].id === id){

                            return true
                        }
                    }
                }
            }catch(err){
                console.log(err)
            }
        }
        return false
    }



}

function isPrime(n)
{

    if (n <= 1) return false;
    if (n <= 3) return true;


    if (n%2 === 0 || n%3 === 0) return false;

    for (let i=5; i*i<=n; i=i+6)
        if (n%i === 0 || n%(i+2) === 0)
            return false;

    return true;
}


function nextPrime(N)
{


    if (N <= 1)
        return 2;

    let prime = N;
    let found = false;

    while (!found) {
        prime++;

        if (isPrime(prime))
            found = true;
    }

    return prime;
}


