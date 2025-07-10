class car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;
    maxspeed = 200;
    acceleration = 5;
    constructor (setBrand, setModel) {
        this.brand = setBrand;
        this.model = setModel;
    }

    displayInfo() {
        console.log(`Brand: ${this.brand}   Model: ${this.model}   Speed: ${this.speed} km/h   Trunk Open: ${convertBoolean(this.isTrunkOpen)}`)
    }
    go() {
        if (!this.isTrunkOpen) {
            this.speed += Number(this.acceleration);
            if(this.speed >= this.maxspeed)  {
                this.speed = this.maxspeed
            }
            console.log(`You speeded up! You are going ${this.speed}Km/h`)
        } else if (this.isTrunkOpen) {
            console.log('You cant go! Trunk is open!')
        }
    }

    brake() {
        
        this.speed -= Number(this.acceleration);
        if (this.speed <= 0) {
            this.speed = 0
        }
        console.log(`You speeded down! You are going ${this.speed}Km/h`)
    }

    openTrunk() {
        this.isTrunkOpen = true;
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }


}

class raceCar extends car{
    acceleration = 0;
    
    constructor(setBrand, setModel, setAcceleration) {
        super(setBrand, setModel)
        this.acceleration = setAcceleration
        this.maxspeed = 300;
    }

    openTrunk() {
        console.log('We are in a race car U STUPID?')
    }

    closeTrunk() {
    }

    

}


const car1 = new car('toyota','corolla')
car1.displayInfo()

const car2 = new car('Tesla','model 3')
car2.displayInfo()

const raceCar1 = new raceCar('McLaren', 'F1', 20)
raceCar1.displayInfo()
raceCar1.go()
raceCar1.go()
raceCar1.openTrunk()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.go()
raceCar1.displayInfo()

function convertBoolean(boolean) {
    if (!boolean) {
        return 'No'
    }
    return 'Yes'
}