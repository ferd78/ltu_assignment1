"use client";
import StepButton from "./StepButton";


export default function Home() {
  return (
    <div className="w-screen flex justify-evenly pt-8 gap-32 font-semibold text-white">
      <div className="flex flex-col gap-4">
        <h1> Tabs </h1>
        <h1> Tabs Headers:[+]</h1>
        <StepButton number={1}/>
      </div>

      <h1> Tabs Content</h1>

      <h1> Output</h1>
    </div>
  );
}
