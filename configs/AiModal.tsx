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

    export const GenerateContentChapter_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic: Python Basic , Chapter: Variable and Datatype, in JSON Format with the list of array with field as title, explaing on given chapter in detail, Code Example(Code field in <precode> format) if applicable.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"title\": \"Variables\",\n    \"explanation\": \"Variables are like containers that hold data in a program. They allow us to store and manipulate information efficiently.  To use a variable, you first need to give it a name (identifier) and then assign it a value.\",\n    \"code\": \"<precode>\\n# Assigning a value to a variable\\nname = \\\"Alice\\\"\\n\\n# Accessing the value of a variable\\nprint(name)\\n</precode>\"\n  },\n  {\n    \"title\": \"Variable Naming Rules\",\n    \"explanation\": \"Variable names must follow specific rules:\\n\\n* They must start with a letter (a-z, A-Z) or an underscore (_).\\n* They can contain letters, numbers, and underscores.\\n* They are case-sensitive (name and Name are different variables).\\n* They should be descriptive and meaningful to improve code readability.\",\n    \"code\": \"<precode>\\n# Valid variable names\\nmy_variable = 10\\nuser_name = \\\"Bob\\\"\\n\\n# Invalid variable names\\n123variable = 5  # Starts with a number\\nuser name = \\\"Carol\\\"  # Contains a space\\n</precode>\"\n  },\n  {\n    \"title\": \"Data Types\",\n    \"explanation\": \"Data types define the kind of data a variable can hold. Python has several built-in data types, each with its own characteristics and behavior.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Integer (int)\",\n    \"explanation\": \"Integers are whole numbers without any decimal points. They are used for representing numerical values like ages, quantities, or scores.\",\n    \"code\": \"<precode>\\n# Integer example\\nage = 25\\nprint(age)\\n</precode>\"\n  },\n  {\n    \"title\": \"Float (float)\",\n    \"explanation\": \"Floats represent numbers with decimal points. They are used for representing measurements, percentages, or financial values.\",\n    \"code\": \"<precode>\\n# Float example\\nprice = 19.99\\nprint(price)\\n</precode>\"\n  },\n  {\n    \"title\": \"String (str)\",\n    \"explanation\": \"Strings are sequences of characters enclosed in single or double quotes. They are used for representing text, words, or sentences.\",\n    \"code\": \"<precode>\\n# String example\\ngreetings = \\\"Hello, world!\\\"\\nprint(greetings)\\n</precode>\"\n  },\n  {\n    \"title\": \"Boolean (bool)\",\n    \"explanation\": \"Booleans represent truth values, either True or False. They are used in logical operations and conditional statements.\",\n    \"code\": \"<precode>\\n# Boolean example\\nis_active = True\\nprint(is_active)\\n</precode>\"\n  },\n  {\n    \"title\": \"List (list)\",\n    \"explanation\": \"Lists are ordered collections of items enclosed in square brackets. They can hold items of different data types and can be modified.\",\n    \"code\": \"<precode>\\n# List example\\ncolors = [\\\"red\\\", \\\"green\\\", \\\"blue\\\"]\\nprint(colors)\\n</precode>\"\n  },\n  {\n    \"title\": \"Tuple (tuple)\",\n    \"explanation\": \"Tuples are similar to lists, but they are immutable, meaning their elements cannot be changed after creation. They are enclosed in parentheses.\",\n    \"code\": \"<precode>\\n# Tuple example\\ncoordinates = (10, 20)\\nprint(coordinates)\\n</precode>\"\n  },\n  {\n    \"title\": \"Dictionary (dict)\",\n    \"explanation\": \"Dictionaries are unordered collections of key-value pairs enclosed in curly braces. Keys must be unique and immutable, while values can be of any type.\",\n    \"code\": \"<precode>\\n# Dictionary example\\nuser = {\\\"name\\\": \\\"Alice\\\", \\\"age\\\": 30}\\nprint(user)\\n</precode>\"\n  },\n  {\n    \"title\": \"Type Conversion\",\n    \"explanation\": \"You can convert data from one type to another using built-in functions.\",\n    \"code\": \"<precode>\\n# Integer to string\\nnumber = 10\\nnumber_str = str(number)\\nprint(number_str)\\n\\n# String to integer\\ntext = \\\"15\\\"\\nnumber = int(text)\\nprint(number)\\n</precode>\"\n  }\n]\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  