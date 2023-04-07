class CalorieTracker{
    constructor(){
        this._calorieLimit = 2100;
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];

        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._dispplayCaloriesRemaining();
        this._displayCaloriesProgress();
    }

//Public methods

    addMeal(meal){
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._render();
    }

    addWorkout(workout){
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
    }

    //Private methods

    _displayCaloriesTotal(){
        const totalCaloriesEl = document.getElementById('calories-total');
        totalCaloriesEl.innerHTML = this._totalCalories;

    }

    _displayCaloriesLimit(){
        const calorieLimitEl = document.getElementById('calories-limit');
        calorieLimitEl.innerHTML = this._calorieLimit;

    }

    _displayCaloriesConsumed(){
        const caloriesConsumedEl = document.getElementById('calories-consumed');
        const consumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
        
        caloriesConsumedEl.innerHTML = consumed;
    }

    _displayCaloriesBurned(){
        const caloriesBurnedEl = document.getElementById('calories-burned');
        const burned = this._workouts.reduce((total, workout) => total + workout.calories, 0);

        caloriesBurnedEl.innerHTML = burned;
    }

    _dispplayCaloriesRemaining(){
        const caloriesRemainingEl = document.getElementById('calories-remaining');
        const remaining = this._calorieLimit - this._totalCalories;
        const progressEl = document.getElementById('calories-progress');
       
        caloriesRemainingEl.innerHTML = remaining;

        if (remaining <= 0) {
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-light');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-danger');
            progressEl.classList.remove('bg-success');
            progressEl.classList.add('bg-danger');
        } else {
            caloriesRemainingEl.parentElement.parentElement.classList.remove('bg-danger');
            caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
            progressEl.classList.remove('bg-danger');
            progressEl.classList.add('bg-success');
        }
    }

    _displayCaloriesProgress(){
        const progressEl = document.getElementById('calories-progress');
        const percentage = (this._totalCalories / this._calorieLimit) * 100;
        const width = Math.min(percentage, 100);

        progressEl.style.width = `${width}%`;


    }

    _render(){
        this._displayCaloriesBurned();
        this._displayCaloriesConsumed();
        this._displayCaloriesTotal();
        this._dispplayCaloriesRemaining();
        this._displayCaloriesProgress();
    }

}

class Meal {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name = name;
        this.calories = calories;
    }
}

class Workout {
    constructor(name, calories) {
        this.id = Math.random().toString(16).slice(2);
        this.name =- name;
        this.calories = calories;
    }
}

const breakfast = new Meal('roll', 378);
const lunch = new Meal("Lunch", 413);


const item = new CalorieTracker();
item.addMeal(lunch);
const run = new Workout('Sprint', 198)
item.addWorkout(run)
item.addMeal(breakfast)
