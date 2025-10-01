"use client";
import StepButton from "./StepButton";


export default function Home() {
  return (
    <div className="w-screen flex justify-around pt-12 font-semibold text-white pr-12">

      <div className="flex flex-col">
        <div className="absolute left-10 top-48 ">
          <h1> Tabs </h1>
        </div>
        <h1> Tabs Headers:[+]</h1>
        <div className="flex flex-col gap-2 pt-5">
          <StepButton number={1}/>
          <StepButton number={2}/>
          <StepButton number={3}/>
        </div>
       
      </div>

      <div className="flex flex-col items-center gap-4 ">
        <h1> Tabs Content</h1>
        <div className="h-48 w-48 bg-tealzero rounded-xl">
          <div className="flex flex-col items-center justify-center gap-4 pt-4">
            <h2 className="text-center"> Step 1: Install VSCode</h2>
            <p className="text-center"> This is your HTML + JS output. </p>
          </div>
        </div>
      </div>
      
      
      <div className="flex flex-col items-center gap-4">
        <h1> Output</h1>
        <div className="p-2 bg-tealzero rounded-xl">
          <pre className="">
          {`
          <!DOCTYPE html>
          <html>
          <head><title>Generated</title></head>
          <body style="font-family: Arial;">
            <h1>Step 1: Install VSCode</h1>
            <p>This is your HTML + JS output.</p>
          </body>
          </html>`
          }
          </pre>
        </div>
      </div>
      
    </div>
  );
}
