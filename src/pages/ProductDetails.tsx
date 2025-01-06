import React, { useState } from "react";

const StepCounter = () => {
    const [counter, setCounter] = useState(0);
    const [step, setStep] = useState(1);

    const handleStepChange = (e) => {
        // Update step based on user input
        setStep(step - 1 || step + 1)
    };

    const increaseCount = () => {
        // Increment counter by step
        setCounter(counter + step)
    };

    const decreaseCount = () => {
        // Decrement counter by step
        setCounter(counter - step)
    };

    const resetCount = () => {
        setCounter(0)
    };

    return (
        <div className="flex flex-col items-center justify-center p-5">
            <h1>Counter: {counter}</h1>

            <input 
                type="number" 
                value={step} 
                onChange={handleStepChange} 
                className="border rounded p-2 my-3"
                placeholder="Enter step value"
            />

            <div className="flex space-x-4">
                <button 
                    onClick={decreaseCount} 
                    className="border rounded p-3 bg-red-200 hover:bg-red-300">
                    Decrease
                </button>
                <button 
                    onClick={increaseCount} 
                    className="border rounded p-3 bg-green-200 hover:bg-green-300">
                    Increase
                </button>
            </div>

            <button 
                onClick={resetCount} 
                className="border rounded p-3 bg-gray-200 hover:bg-gray-300 mt-4">
                Reset
            </button>
        </div>
    );
};

export default StepCounter;
