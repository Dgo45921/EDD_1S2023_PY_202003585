export function count_repeatedfiles(file_list, name){
    let contador = 0
    let actual = file_list
    while (actual){
        if (actual.path === name || actual.path.startsWith(name)) {contador++}
        actual = actual.next
    }
    return contador
}

export function abs_pathGenerator(path){
    let string = ""
    for (let i = 0; i <path.length ; i++) {
        string +=  path[i] + "/"
    }
    return string
}


