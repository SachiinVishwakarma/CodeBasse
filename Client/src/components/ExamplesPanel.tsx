import React, { useState } from 'react';
import { Code, Copy, Play, ChevronDown, ChevronRight, BookOpen, Zap, Calculator, Heart, Star } from 'lucide-react';

interface Example {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  code: string;
  icon: React.ReactNode;
}

interface ExamplesPanelProps {
  onLoadExample: (code: string) => void;
  onRunCode: () => void;
  isDarkMode: boolean;
}

const examples: Example[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Your first C program - prints a greeting message',
    difficulty: 'Beginner',
    category: 'Basics',
    icon: <Heart className="h-4 w-4" />,
    code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    printf("Welcome to C programming!\\n");
    return 0;
}`
  },
  {
    id: 'variables',
    title: 'Variables & Data Types',
    description: 'Learn about different data types in C',
    difficulty: 'Beginner',
    category: 'Basics',
    icon: <BookOpen className="h-4 w-4" />,
    code: `#include <stdio.h>

int main() {
    // Integer variables
    int age = 25;
    int year = 2024;
    
    // Float variables
    float height = 5.9;
    double pi = 3.14159;
    
    // Character variables
    char grade = 'A';
    char name[] = "CodeBase";
    
    // Print all variables
    printf("Name: %s\\n", name);
    printf("Age: %d years\\n", age);
    printf("Height: %.1f feet\\n", height);
    printf("Grade: %c\\n", grade);
    printf("Year: %d\\n", year);
    printf("Pi value: %.5f\\n", pi);
    
    return 0;
}`
  },
  {
    id: 'calculator',
    title: 'Simple Calculator',
    description: 'Basic arithmetic operations with user input',
    difficulty: 'Beginner',
    category: 'Math',
    icon: <Calculator className="h-4 w-4" />,
    code: `#include <stdio.h>

int main() {
    float num1, num2;
    char operator;
    float result;
    
    printf("=== Simple Calculator ===\\n");
    printf("Enter first number: ");
    scanf("%f", &num1);
    
    printf("Enter operator (+, -, *, /): ");
    scanf(" %c", &operator);
    
    printf("Enter second number: ");
    scanf("%f", &num2);
    
    switch(operator) {
        case '+':
            result = num1 + num2;
            printf("%.2f + %.2f = %.2f\\n", num1, num2, result);
            break;
        case '-':
            result = num1 - num2;
            printf("%.2f - %.2f = %.2f\\n", num1, num2, result);
            break;
        case '*':
            result = num1 * num2;
            printf("%.2f * %.2f = %.2f\\n", num1, num2, result);
            break;
        case '/':
            if(num2 != 0) {
                result = num1 / num2;
                printf("%.2f / %.2f = %.2f\\n", num1, num2, result);
            } else {
                printf("Error: Division by zero!\\n");
            }
            break;
        default:
            printf("Error: Invalid operator!\\n");
    }
    
    return 0;
}`
  },
  {
    id: 'loops',
    title: 'Loops & Patterns',
    description: 'For loops, while loops, and pattern printing',
    difficulty: 'Beginner',
    category: 'Control Flow',
    icon: <Zap className="h-4 w-4" />,
    code: `#include <stdio.h>

int main() {
    int i, j, n = 5;
    
    printf("=== Loop Examples ===\\n\\n");
    
    // For loop example
    printf("1. Counting from 1 to 10:\\n");
    for(i = 1; i <= 10; i++) {
        printf("%d ", i);
    }
    printf("\\n\\n");
    
    // While loop example
    printf("2. Even numbers from 2 to 20:\\n");
    i = 2;
    while(i <= 20) {
        printf("%d ", i);
        i += 2;
    }
    printf("\\n\\n");
    
    // Pattern printing
    printf("3. Star pattern:\\n");
    for(i = 1; i <= n; i++) {
        for(j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }
    
    printf("\\n4. Number triangle:\\n");
    for(i = 1; i <= n; i++) {
        for(j = 1; j <= i; j++) {
            printf("%d ", j);
        }
        printf("\\n");
    }
    
    return 0;
}`
  },
  {
    id: 'arrays',
    title: 'Arrays & Functions',
    description: 'Working with arrays and creating functions',
    difficulty: 'Intermediate',
    category: 'Data Structures',
    icon: <Star className="h-4 w-4" />,
    code: `#include <stdio.h>

// Function to find maximum element
int findMax(int arr[], int size) {
    int max = arr[0];
    for(int i = 1; i < size; i++) {
        if(arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

// Function to calculate average
float calculateAverage(int arr[], int size) {
    int sum = 0;
    for(int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return (float)sum / size;
}

// Function to print array
void printArray(int arr[], int size) {
    printf("Array elements: ");
    for(int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int numbers[] = {45, 23, 78, 12, 67, 34, 89, 56};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    
    printf("=== Array Operations ===\\n\\n");
    
    printArray(numbers, size);
    
    int max = findMax(numbers, size);
    printf("Maximum element: %d\\n", max);
    
    float avg = calculateAverage(numbers, size);
    printf("Average: %.2f\\n", avg);
    
    // Sorting (bubble sort)
    printf("\\nSorting array...\\n");
    for(int i = 0; i < size-1; i++) {
        for(int j = 0; j < size-i-1; j++) {
            if(numbers[j] > numbers[j+1]) {
                int temp = numbers[j];
                numbers[j] = numbers[j+1];
                numbers[j+1] = temp;
            }
        }
    }
    
    printf("Sorted ");
    printArray(numbers, size);
    
    return 0;
}`
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Series',
    description: 'Generate Fibonacci sequence using recursion',
    difficulty: 'Intermediate',
    category: 'Algorithms',
    icon: <Code className="h-4 w-4" />,
    code: `#include <stdio.h>

// Recursive function to calculate Fibonacci
int fibonacci(int n) {
    if(n <= 1) {
        return n;
    }
    return fibonacci(n-1) + fibonacci(n-2);
}

// Iterative function for better performance
void fibonacciSeries(int n) {
    int first = 0, second = 1, next;
    
    printf("Fibonacci Series (first %d terms):\\n", n);
    
    if(n >= 1) printf("%d ", first);
    if(n >= 2) printf("%d ", second);
    
    for(int i = 3; i <= n; i++) {
        next = first + second;
        printf("%d ", next);
        first = second;
        second = next;
    }
    printf("\\n\\n");
}

int main() {
    int n = 10;
    
    printf("=== Fibonacci Examples ===\\n\\n");
    
    // Using iterative approach
    fibonacciSeries(n);
    
    // Using recursive approach for individual terms
    printf("Using recursion:\\n");
    printf("5th Fibonacci number: %d\\n", fibonacci(5));
    printf("8th Fibonacci number: %d\\n", fibonacci(8));
    printf("10th Fibonacci number: %d\\n", fibonacci(10));
    
    // Check if a number is in Fibonacci series
    int num = 21;
    int found = 0;
    for(int i = 0; i <= 20; i++) {
        if(fibonacci(i) == num) {
            found = 1;
            printf("\\n%d is the %dth Fibonacci number\\n", num, i);
            break;
        }
    }
    
    if(!found) {
        printf("\\n%d is not a Fibonacci number\\n", num);
    }
    
    return 0;
}`
  }
];

const ExamplesPanel: React.FC<ExamplesPanelProps> = ({ onLoadExample, onRunCode, isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedExample, setExpandedExample] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(examples.map(ex => ex.category)))];
  
  const filteredExamples = selectedCategory === 'All' 
    ? examples 
    : examples.filter(ex => ex.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleLoadAndRun = (code: string) => {
    onLoadExample(code);
    setTimeout(() => {
      onRunCode();
    }, 500);
  };

  return (
    <div className="h-full flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50 dark:border-slate-700/50 bg-gray-50/80 dark:bg-slate-800/80">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-blue-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Code Examples</h3>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {filteredExamples.length} examples
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-3 border-b border-gray-200/50 dark:border-slate-700/50">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Examples List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
        {filteredExamples.map(example => (
          <div
            key={example.id}
            className="bg-white/60 dark:bg-slate-800/60 rounded-xl border border-gray-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Example Header */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {example.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {example.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {example.description}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}>
                  {example.difficulty}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-3">
                <button
                  onClick={() => onLoadExample(example.code)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors duration-200"
                >
                  <Code className="h-3 w-3" />
                  <span>Load</span>
                </button>
                
                <button
                  onClick={() => handleLoadAndRun(example.code)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors duration-200"
                >
                  <Play className="h-3 w-3" />
                  <span>Run</span>
                </button>

                <button
                  onClick={() => handleCopyCode(example.code, example.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium transition-colors duration-200"
                >
                  <Copy className="h-3 w-3" />
                  <span>{copiedId === example.id ? 'Copied!' : 'Copy'}</span>
                </button>

                <button
                  onClick={() => setExpandedExample(expandedExample === example.id ? null : example.id)}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium transition-colors duration-200"
                >
                  {expandedExample === example.id ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                  <span>Preview</span>
                </button>
              </div>
            </div>

            {/* Code Preview */}
            {expandedExample === example.id && (
              <div className="border-t border-gray-200/50 dark:border-slate-700/50 bg-gray-50/50 dark:bg-slate-900/50">
                <pre className="p-4 text-xs font-mono text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap">
                  {example.code}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200/50 dark:border-slate-700/50 bg-gray-50/80 dark:bg-slate-800/80">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Click "Load" to edit code, "Run" to execute immediately
        </p>
      </div>
    </div>
  );
};

export default ExamplesPanel;