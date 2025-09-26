"use client";
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';
import StepButton from "./StepButton";

interface Step {
  id: number;
  title: string;
  content: string;
}

export default function Home() {
  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: "Install VSCode", content: "This is your HTML + JS output." },
  ]);
  const [activeStep, setActiveStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // saved cookies for the stepButton component and last saved step
  useEffect(() => {
    const savedSteps = localStorage.getItem('steps');
    const savedActiveStep = localStorage.getItem('activeStep');
    
    if (savedSteps) {
      try {
        setSteps(JSON.parse(savedSteps));
      } catch (error) {
        console.error('Error parsing saved steps:', error);
      }
    }
    
    if (savedActiveStep) {
      setActiveStep(parseInt(savedActiveStep));
    }
  }, []);

  // Save to localStorage whenever steps or activeStep changes
  useEffect(() => {
    localStorage.setItem('steps', JSON.stringify(steps));
    localStorage.setItem('activeStep', activeStep.toString());
  }, [steps, activeStep]);

  const addStep = () => {
    if (steps.length < 15) {
      const newId = steps.length + 1;
      const newSteps = [
        ...steps,
        { id: newId, title: `Step ${newId}`, content: `Content for step ${newId}` }
      ];
      setSteps(newSteps);
      setActiveStep(newId);
    }
  };

  const deleteStep = (stepId: number) => {
    if (steps.length > 1) {
      const filteredSteps = steps.filter(step => step.id !== stepId);
      const updatedSteps = filteredSteps.map((step, index) => ({
        ...step,
        id: index + 1
      }));
      setSteps(updatedSteps);
      
      if (activeStep === stepId) {
        setActiveStep(updatedSteps[0]?.id || 1);
      }
    }
  };

  const updateStepTitle = (stepId: number, title: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, title } : step
    );
    setSteps(updatedSteps);
  };

  const updateStepContent = (stepId: number, content: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, content } : step
    );
    setSteps(updatedSteps);
  };

  const copyToClipboard = async () => {
    if (currentStep) {
      const htmlCode = generateHTML(currentStep.title, currentStep.content);
      try {
        await navigator.clipboard.writeText(htmlCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const currentStep = steps.find(step => step.id === activeStep);

  const generateHTML = (title: string, content: string) => {
    return `<!DOCTYPE html>
<html>
<head>
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #2d3748;
      border-bottom: 3px solid #38b2ac;
      padding-bottom: 10px;
    }
    p {
      color: #4a5568;
      line-height: 1.6;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <p>${content}</p>
  </div>
</body>
</html>`;
  };

  // This is a load state that prevents hydration error
  if (!mounted) {
    return (
      <div className="w-full flex flex-col lg:flex-row justify-around pt-12 font-semibold text-white pr-0 lg:pr-12 gap-8 lg:gap-0 px-4 lg:px-0 pb-20">
        <div className="flex flex-col order-1 lg:order-1">
          <div className="lg:absolute left-10 top-48">
            <h1>Tabs</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1>Tabs Headers</h1>
            <button className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center text-white font-bold cursor-not-allowed">+</button>
          </div>
          <div className="flex flex-col gap-2 pt-5">
            <div className="w-24 h-10 bg-tealzero rounded-md flex items-center justify-center mb-4">
              <div className="font-semibold text-white">Step 1</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 order-2 lg:order-2">
          <h1>Tabs Content</h1>
          <div className="h-48 w-3/4 lg:w-96 rounded-xl p-6 bg-tealzero">
            <div className="flex flex-col items-center justify-center gap-4 h-full">
              <div className="w-full p-2 bg-teal rounded text-white text-center font-semibold">Loading...</div>
              <div className="w-full h-48 p-3 bg-teal rounded text-white resize-none">Loading...</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 order-3 lg:order-3 w-full lg:max-w-2xl">
          <div className="flex items-center gap-4">
            <h1>Output</h1>
          </div>
          <div className="p-4 rounded-xl w-3/4 lg:max-w-2xl max-h-84 overflow-auto bg-tealzero">
            <div className="flex justify-end mb-2">
              <button className="px-4 py-2 bg-gray-500 rounded-md text-white font-semibold cursor-not-allowed">
                Copy Code
              </button>
            </div>
            <pre className="text-sm whitespace-pre-wrap">Loading...</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col lg:flex-row justify-around pt-12 font-semibold text-white pr-0 lg:pr-12 gap-8 lg:gap-0 px-4 lg:px-0 pb-20">
      {/* Tabs Headers Section */}
      <div className="flex flex-col order-1 lg:order-1">
        <div className="lg:absolute left-10 top-48">
          <h1>Tabs</h1>
        </div>
        <div className="flex items-center gap-2">
          <h1>Tabs Headers</h1>
          <button
            onClick={addStep}
            disabled={steps.length >= 15}
            className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center text-white font-bold hover:bg-green-600 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
        <div className="flex flex-col gap-2 pt-5">
          {steps.map((step) => (
            <StepButton
              key={step.id}
              number={step.id}
              isActive={step.id === activeStep}
              onClick={() => setActiveStep(step.id)}
              onDelete={() => deleteStep(step.id)}
              canDelete={steps.length > 1}
              theme={theme}
            />
          ))}
        </div>
      </div>

      {/* Tabs Content Section */}
      <div className="flex flex-col items-center gap-4 order-2 lg:order-2">
        <h1>Tabs Content</h1>
        <div className={`h-48 w-3/4 lg:w-96 rounded-xl p-6 ${theme === 'dark' ? 'bg-lighterblue' : 'bg-tealzero'}`}>
          <div className="flex flex-col items-center justify-center gap-4 h-full">
            {currentStep && (
              <>
                <input
                  type="text"
                  value={currentStep.title}
                  onChange={(e) => updateStepTitle(currentStep.id, e.target.value)}
                  className={`w-full p-2 ${theme === 'dark' ? 'bg-darkblue' : 'bg-teal'} rounded text-white text-center font-semibold`}
                  placeholder={currentStep.id === 1 ? "Step title..." : ""}
                />
                <textarea
                  value={currentStep.content}
                  onChange={(e) => updateStepContent(currentStep.id, e.target.value)}
                  className={`w-full h-48 p-3 ${theme === 'dark' ? 'bg-darkblue' : 'bg-teal'} rounded text-white resize-none`}
                  placeholder={currentStep.id === 1 ? "Step content..." : ""}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Output Section */}
      <div className="flex flex-col items-center gap-4 order-3 lg:order-3 w-full lg:max-w-2xl">
        <div className="flex items-center gap-4">
          <h1>Output</h1>
        </div>
        <div className={`p-4 rounded-xl w-3/4 lg:max-w-2xl max-h-84 overflow-auto ${theme === 'dark' ? 'bg-lighterblue' : 'bg-tealzero'}`}>
          <div className="flex justify-end mb-2">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-green-500 rounded-md text-white font-semibold hover:bg-green-600 transition-colors cursor-pointer"
            >
              {copied ? "Copied!" : "Copy Code"}
            </button>
          </div>
          <pre className="text-sm whitespace-pre-wrap">
            {currentStep ? generateHTML(currentStep.title, currentStep.content) : "No step selected"}
          </pre>
        </div>
      </div>
    </div>
  );
}
