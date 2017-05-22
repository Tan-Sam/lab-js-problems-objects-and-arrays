// Customer Object
var Customer = function (customerInfo) {
  // ** your code here**
  this.id = customerInfo.id;
  this.name = customerInfo.name;
  this.carRented = null;
};

// Car Object
var Car = function (carInfo) {
  // ** field inits**
  this.id = carInfo.id;
  this.producer = carInfo.producer;
  this.model = carInfo.model;
  this.rentalPricePerDay = carInfo.rentalPrice;
  this.available = true;
  this.customer = null;
  this.rentalDuration = 0;

  this.quotePrice = function(rentalDuration){
    return (this.rentalPrice * rentalDuration);
  };

  this.reserve = function(newCustomer,
                          newRentalDuration) {
    if(this.available){
      this.available = false;
      this.customer = newCustomer;
      this.rentalDuration = newRentalDuration;
      return true;
    }
    else {
      return false;
    }
  };

  this.return = function() {
    if(this.available) {
      return "Sorry, this car have already been returned.";
    }
    else {
      this.available = true;
      this.customer = null;
      this.rentalDuration = null;
    }
  }


};

// Vendor Object
var Vendor = function(name) {
  this.name = name;
  this.cars = [];
  this.customers = [];

  this.findCarIndex = function (carID) {
    return this.cars.findIndex(function(car){
      return (car.id === carID);
    });
  };

  this.findCustomerIndex = function (customerID) {
    return this.customers.findIndex(function(customer){
      return (customer.id === customerID);
    });
  };

  this.getCar = function (carID) {
    return this.cars.find(function(car){
      return (car.id === carID);
    });
  };

  this.getCustomer = function (customerID) {
    return this.customers.find(function(customer){
      return (customer.id === customerID);
    });
  };

  // **your code here**
  this.addCar = function(carObj) {
    if(this.findCarIndex(carObj.id) >= 0){
      console.log('ID already exists.');
    }
    else {
      this.cars.push(carObj);
      console.log('Car ' + carObj.model + ' added to warehouse.');
    }
  };

  this.addCustomer = function(customerObj) {
    var custIndex = this.findCustomerIndex(customerObj.id);
    if(custIndex >=0) {
      console.log('Customer already exists.');
    }
    else {
      this.customers.push(customerObj);
      console.log('Customer ' +
                   customerObj.name +
                  ' added to customer registry.');
    }
  };

  this.removeCar = function(carId) {
    var foundCarIndex = this.findCarIndex(carId);
    if(foundCarIndex >= 0) {
      this.cars.splice(foundCarIndex, 1);
    }
    else {
      console.log('Car not found.');
    }
  };

  this.removeCustomer = function(customerID) {
    var foundCustomerIndex = this.findCustomerIndex(customerID);
    if(foundCustomerIndex >= 0) {
      this.customers.splice(foundCustomerIndex, 1);
    }
    else {
      console.log('Customer doesn\'t exist: ' + customerID);
    }
  };

  this.availableCars = function(){
    return this.cars.filter(function(car){
      return car.available;
    })
  };

  this.rentCar = function(customerID,
                          rentalDuration) {
    var ac = this.availableCars();
    if(ac.length > 0) {
      var custIndex = this.findCustomerIndex(customerID);
      if(custIndex >= 0) {
          var cust = this.customers[custIndex];
          cust.carRented = ac[0];
          cust.carRented.reserve(cust, rentalDuration);

          console.log('The car has been reserved.');
      }
      else {
        console.log("Please provide a valid customerID");
      }
    }
    else {
      console.log("All our cars have been rented.");
    }
  };

  this.returnCar = function(customerId) {
    var custIndex = this.findCustomerIndex(customerId);
    if(custIndex >= 0) {
      var cust = this.customers[custIndex];
      cust.carRented.return();
      cust.carRented = null;
      console.log( "The car has been returned. Thank you for using our service");
    }
    else {
      console.log("Please provide a valid customerID");
    }
  };

  this.totalRevenue = function() {
    function CalcRev(accumulator, value){
      if(!value.available){
         return accumulator + (value.rentalDuration * value.rentalPricePerDay);
      }
      else {
        return accumulator;
      }
    }

    var tr = this.cars.reduce(CalcRev, 0);
      console.log('The total revenue is ' + tr);
  };
};

// Codes you can run to test your code
var customerInfo = {
  id: "001",
  name: "Sherman"
};
var customerA = new Customer(customerInfo);

var carInfo = {
  id: "001",
  producer: "Toyota",
  model: "Subra",
  rentalPrice: 200,
};

var carA = new Car(carInfo);

var vendor = new Vendor('Jens Limited');
vendor.addCustomer(customerA);

console.log(vendor.availableCars());
vendor.addCar(carA);
console.log(vendor.availableCars());

vendor.rentCar(customerA.id, 6);

//vendor.returnCar(customerA.id);

vendor.totalRevenue();
