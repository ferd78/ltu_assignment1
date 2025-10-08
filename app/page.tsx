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
    { id: 1, title: "Setup", content: "Make sure you have VSCode installed." },
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


  // delete steps
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


  //update title
  const updateStepTitle = (stepId: number, title: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, title } : step
    );
    setSteps(updatedSteps);
  };


  //update the content 
  const updateStepContent = (stepId: number, content: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, content } : step
    );
    setSteps(updatedSteps);
  };


  //function to be copied to clipboard
  const copyToClipboard = async () => {
    try {
      const htmlCode = generateHTML();
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const currentStep = steps.find(step => step.id === activeStep);

  const generateHTML = () => {
    const tabButtons = steps.map((step, index) => 
      `<button class="tablinks" onclick="openTab(event, 'Step${step.id}')">${index + 1}. ${step.title}</button>`
    ).join('\n    ');

    const tabContents = steps.map((step, index) => {
      const isFirst = index === 0;
      const displayStyle = isFirst ? 'block' : 'none';
      
      // Format content with proper HTML line breaks
      const formattedContent = step.content
        .split('\n')
        .map(line => {
          // Check if line looks like code (starts with special characters or commands)
          if (line.trim().startsWith('sudo') || 
              line.trim().startsWith('#') || 
              line.trim().startsWith('<') ||
              line.trim().startsWith('!') ||
              line.includes('dnf') || 
              line.includes('systemctl')) {
            return `<pre style="background: #f8f8f8; padding: 10px; border-radius: 5px; overflow-x: auto;">${line}</pre>`;
          } else if (line.trim() === '') {
            return '<br>';
          } else {
            return `<p>${line}</p>`;
          }
        })
        .join('');
      
      return `<div id="Step${step.id}" class="tabcontent" style="display:${displayStyle}; padding: 6px 12px; border: 1px solid #ccc; border-top: none;">
  <h3>${step.title}</h3>
  ${formattedContent}
</div>`;
    }).join('\n\n');

    return `<!DOCTYPE html>
<html>
<head>
  <title>Lab Steps</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .tab {
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
    }
    .tab button {
      background-color: inherit;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      padding: 14px 16px;
      transition: 0.3s;
      font-size: 17px;
    }
    .tab button:hover {
      background-color: #ddd;
    }
    .tab button.active {
      background-color: #ccc;
    }
    .tabcontent {
      animation: fadeEffect 1s;
    }
    @keyframes fadeEffect {
      from {opacity: 0;}
      to {opacity: 1;}
    }
    pre {
      background: #f8f8f8;
      border: 1px solid #ddd;
      border-left: 3px solid #38b2ac;
      color: #666;
      page-break-inside: avoid;
      font-family: monospace;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 1.6em;
      max-width: 100%;
      overflow: auto;
      padding: 1em 1.5em;
      display: block;
      word-wrap: break-word;
    }
  </style>
</head>
<body>
  <div class="tab">
    ${tabButtons}
  </div>

  ${tabContents}

  <p><br></p>
  <p><br></p>
  <p>&nbsp;</p>
  <p><br></p>

  <script>
    function openTab(evt, tabName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      if (evt && evt.currentTarget) {
        evt.currentTarget.className += " active";
      }
    }
  </script>
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
      {/* Header */}
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

      {/* Main content (HTML Generator)*/}
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
                  placeholder="Step title..."
                />
                <textarea
                  value={currentStep.content}
                  onChange={(e) => updateStepContent(currentStep.id, e.target.value)}
                  className={`w-full h-48 p-3 ${theme === 'dark' ? 'bg-darkblue' : 'bg-teal'} rounded text-white resize-none`}
                  placeholder="Step content..."
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Output  */}
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
            {generateHTML()}
          </pre>
        </div>
      </div>
    </div>
  );
}