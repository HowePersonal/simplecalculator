const screen = document.querySelector(".screen")
screen.innerHTML = 0

userInputs = []

let add = (a, b) => {
    return a + b;
}

let subtract = (a, b) => {
    return a - b;
}

let multiple = (a, b) => {
    return a * b;
}

let divide = (a, b) => {
    return a / b;
}

let round = (num) => {
    const factor = Math.pow(10, 4)
    return Math.round(num * factor) / factor
}

operatorObj = {
    "+": add,
    "-": subtract,
    "x": multiple,
    "/": divide,
}


let showInput = () => {
    adjustScreen()
    if (userInputs.length == 0) {
        screen.innerHTML = 0
    } else {
        screen.innerHTML = userInputs.join("")
    }
    
    
}

let showCompute = (value) => {
    adjustScreen()
    screen.innerHTML = value
}

let operate = (operator, a, b) => {
    if (operator == "/" && b == "0") {
        alert("INFINITY...")
        return
    }
    result = operatorObj[operator](a, b);
    [...result.toString()].forEach(n => userInputs.push(n))
    adjustScreen()
    showCompute(round(result))
}

let buttonNumClicked = (value) => {
    userInputs.push(value)
    showInput()
}

let buttonOperatorClicked = (value) => {
    let operatorExist = userInputs.find(n => n == "+" || n == "-" || n == "x" || n == "/")
    if (operatorExist) {
        compute()
        userInputs.push(value)
        showInput()
    }
    else if (userInputs.length > 0 && userInputs[userInputs.length-1].match("[1-9]")) {
        userInputs.push(value)
        showInput()
    } 
    
}

let buttonDelete = () => {
    if (userInputs.length > 0) {
        userInputs.pop()
        showInput()
    } 
}

let buttonClear = () => {
    userInputs = []
    showInput()
}

let compute = () => {
    console.log(userInputs)
    v1 = ""
    v2 = ""
    operator = ""
    for (i = 0; i < userInputs.length; i++) {
        
        if (userInputs[i].match("[0-9]|[\.]")) {
            v1 += userInputs[i]
        } else {
            operator = userInputs[i]
            break
        }
    }
    
    for (i = v1.length+1; i < userInputs.length; i++) {
        v2 += userInputs[i]
    }
    buttonClear()
    operate(operator, Number(v1), Number(v2))
}

let adjustScreen = () => {
    console.log(userInputs.length.toString())
    if (userInputs.length >= 12 && userInputs.length % 12 == 1) {
        let columns = Math.floor(userInputs.length/12) + 1
        screen.style.height = (columns * 40).toString() + "px"
    } else if (userInputs.length < 12) {
        screen.style.height = "40px"
    }
    
}