/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
    GoogleGenerativeAI,
    // HarmCategory,
    // HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not defined in the environment variables.');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

    export const GernerateTutorialLayoutAI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate a course or tutorial on following detail with field as course name  , description, along with chapter name , about, duration: Category 'Programming', Topic: Python, Level: Basic, Duration: 1 hours, noOfChapter: 5 , in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course\": {\n    \"name\": \"Python Programming Basics\",\n    \"description\": \"This introductory course will guide you through the fundamentals of Python programming. You'll learn about data types, variables, operators, control flow, and basic programming concepts. By the end, you'll be able to write simple Python programs and understand the core principles of this versatile language.\",\n    \"category\": \"Programming\",\n    \"topic\": \"Python\",\n    \"level\": \"Basic\",\n    \"duration\": \"1 hour\",\n    \"chapters\": [\n      {\n        \"name\": \"Introduction to Python\",\n        \"about\": \"This chapter provides an overview of Python's history, its key features, and why it's a popular choice for various programming tasks.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Data Types and Variables\",\n        \"about\": \"Learn about Python's built-in data types (integers, floats, strings, booleans) and how to declare and use variables to store data.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"name\": \"Operators and Expressions\",\n        \"about\": \"Explore different types of operators (arithmetic, comparison, logical) and understand how to build expressions to perform calculations and make comparisons.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Control Flow (if-else, loops)\",\n        \"about\": \"Learn about conditional statements (if, else, elif) and loops (for, while) to control the flow of your programs based on conditions.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"name\": \"Functions and Modules\",\n        \"about\": \"Understand how to define and call functions to organize your code into reusable blocks. Get introduced to modules for extending your Python capabilities.\",\n        \"duration\": \"15 minutes\"\n      }\n    ]\n  }\n}\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  