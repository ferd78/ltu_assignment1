"use client";
import StepButton from "./StepButton";


export default function Home() {
  return (
    <div className="w-screen flex justify-around pt-12 gap-72 font-semibold text-white pr-12">

      <div className="flex flex-col">
        <div className="absolute left-10 top-48 ">
          <h1> Tabs </h1>
        </div>
        <h1> Tabs Headers:[+]</h1>
        <div className="flex flex-col gap-4 pt-5">
          <StepButton number={1}/>
          <StepButton number={2}/>
          <StepButton number={3}/>
        </div>
       
      </div>

      <h1> Tabs Content</h1>

      <h1> Output</h1>
    </div>
  );
}
