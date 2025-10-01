export default function StepButton({number} : {number : number}){
    return (
        <div className="w-24 h-10 bg-tealzero rounded-md flex items-center justify-center mb-4">
        <button className="font-semibold text-white cursor-pointer hover:underline underline-offset-4">
            Step {number} 
        </button>
        </div>
    );
}