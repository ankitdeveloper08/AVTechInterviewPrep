import { InterviewQuestion } from '../types';

export const questionsPart1: InterviewQuestion[] = [
  {
    id: 1,
    questionNumber: 1,
    category: 'C# / OOPS',
    title: 'WHAT ARE THE MAIN CONCEPTS OF OOPS? WHAT ARE CLASSES AND OBJECTS?',
    shortSummary: 'The 4 pillars of OOPS are Abstraction, Encapsulation, Inheritance, and Polymorphism, built around Classes and Objects.',
    detailedPoints: [
      'Here are the main concepts of OOPS:',
      '1. Encapsulation: Wrapping data and methods into a single unit and restricting direct access via access modifiers.',
      '2. Abstraction: Hiding implementation details and exposing only the essential features to the outside world.',
      '3. Inheritance: Creating a parent-child relationship between classes for code reusability and extensibility.',
      '4. Polymorphism: "Many forms" - allowing the same method name to behave differently in different contexts.',
      'CLASS - A class is a Template or BLUEPRINT that contains fields, methods, properties, and constructors.',
      'OBJECT - An object is an INSTANCE of a class with state and behavior allocated in heap memory.',
      'Key Class Members:',
      '• Constructor: A special method executed automatically when an object is instantiated.',
      '• Field: A variable of any type that stores the internal state/data.',
      '• Property: A member that provides a flexible mechanism to read, write, or compute the value of a private field (getter/setter).',
      '• Method: A code block containing a series of statements that performs actions.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public class Employee
{
    // 1. Constructor
    public Employee()
    {
        // Initialization code
    }

    // 2. Field (Data)
    private int experience;

    // 3. Property (Encapsulation Wrapper)
    public int Experience
    {
        get { return experience; }
        set { experience = value; }
    }

    // 4. Method (Action)
    public void CalculateSalary()
    {
        int salary = Experience * 300000;
        Console.WriteLine($"Salary: {salary}");
    }
}

// Creating an Object in Main:
static void Main(string[] args)
{
    // Object instantiation
    Employee objEmployee = new Employee();
    objEmployee.Experience = 3;
    objEmployee.CalculateSalary();
    Console.ReadLine();
}`,
      explanation: 'Employee is the blueprint (class); objEmployee is the physical entity created in memory (object).'
    },
    diagram: {
      type: 'oops-concepts',
      title: 'Core Concepts of Object-Oriented Programming'
    },
    keyTakeaways: [
      'A class is a logical blueprint; an object is the physical instance in memory.',
      'Classes contain Fields (state), Properties (guarded access), Methods (behavior), and Constructors (lifecycle).',
      'The 4 core pillars: Encapsulation, Abstraction, Inheritance, Polymorphism.'
    ],
    interviewTips: 'Interviewers often follow up with: "Is class stored in stack or heap?" Classes are reference types, so class metadata is in the loader heap, and object instances live on the managed heap while object reference pointers live on the stack.',
    companyTags: ['Microsoft', 'Infosys', 'TCS', 'Accenture', 'Wipro'],
    difficulty: 'Easy'
  },
  {
    id: 2,
    questionNumber: 2,
    category: 'C# / OOPS',
    title: 'WHAT IS INHERITANCE? WHY INHERITANCE IS IMPORTANT?',
    shortSummary: 'Inheritance establishes a parent-child relationship where a derived class inherits fields, properties, and methods from a base class.',
    detailedPoints: [
      'Inheritance is creating a PARENT-CHILD relationship between two classes where child automatically gets the properties and methods of the parent class when inherited from the base class.',
      'For example: Employee is a Parent (Base) class and PermanentEmployee is a Child (Derived) class.',
      'When an instance of PermanentEmployee is created, it automatically acquires CalculateSalary() and Experience from Employee, even though they are not re-written in PermanentEmployee.',
      'Inheritance Use & Advantages:',
      '• REUSABILITY of code: Write once in base class and reuse across multiple child classes.',
      '• Prevents DUPLICITY of code: Avoid repeating identical fields and algorithms.',
      '• Extensibility: If a new ContractEmployee is needed tomorrow, derive from Employee without modifying existing classes.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Base / Parent / Super class
public class Employee
{
    public int Experience { get; set; }

    public void CalculateSalary()
    {
        int salary = Experience * 300000;
        Console.WriteLine("Salary: " + salary);
    }
}

// Derived / Child / Sub class
public class PermanentEmployee : Employee
{
    // Automatically inherits Experience & CalculateSalary()
}

static void Main(string[] args)
{
    PermanentEmployee pEmployee = new PermanentEmployee();
    pEmployee.Experience = 5;
    // CalculateSalary() comes from the parent Employee class
    pEmployee.CalculateSalary();
    Console.ReadLine();
}`,
      explanation: 'PermanentEmployee reuses logic from Employee without duplicating any code.'
    },
    diagram: {
      type: 'inheritance-types',
      title: 'Parent-Child Relationship'
    },
    keyTakeaways: [
      'Promotes code reusability and simplifies code maintenance.',
      'Established in C# using the colon `:` syntax.',
      'C# classes support single implementation inheritance, but multiple interface implementation.'
    ],
    interviewTips: 'Be ready to explain the "IS-A" relationship (PermanentEmployee IS-A Employee) vs "HAS-A" (Composition). Prefer composition over inheritance when behavior changes dynamically.',
    companyTags: ['TCS', 'Cognizant', 'HCL', 'Wipro'],
    difficulty: 'Easy'
  },
  {
    id: 3,
    questionNumber: 3,
    category: 'C# / OOPS',
    title: 'WHAT ARE THE DIFFERENT TYPES OF INHERITANCE?',
    shortSummary: 'C# supports Single, Multilevel, and Hierarchical inheritance for classes; Multiple inheritance is supported exclusively through Interfaces.',
    detailedPoints: [
      '1. Single Inheritance: One Base class inherited by one Derived class (BaseClass -> DerivedClass).',
      '2. Multiple Inheritance: Multiple Base classes inherited by a single derived class. In C#, multiple class inheritance is NOT allowed to prevent the Diamond Problem. It can ONLY be achieved with Interfaces (1 base class + multiple interfaces).',
      '3. Multilevel Inheritance: Grandparent -> Parent -> Child. The child inherits members of both Parent and Grandparent classes.',
      '4. Hierarchical Inheritance: One base class is inherited by multiple derived classes (e.g. BaseClass inherited by DerivedClass1, DerivedClass2, DerivedClass3). This is the most commonly used inheritance pattern.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// 1. Single Inheritance
class Animal { public void Eat() { } }
class Dog : Animal { public void Bark() { } }

// 2. Multiple Inheritance (via Interfaces in C#)
interface IFlyable { void Fly(); }
interface ISwimmable { void Swim(); }
class Duck : Animal, IFlyable, ISwimmable
{
    public void Fly() => Console.WriteLine("Duck Flying");
    public void Swim() => Console.WriteLine("Duck Swimming");
}

// 3. Multilevel Inheritance
class LivingBeing { }
class AnimalLiving : LivingBeing { }
class Labrador : AnimalLiving { }

// 4. Hierarchical Inheritance
class Vehicle { }
class Car : Vehicle { }
class Bike : Vehicle { }`,
      explanation: 'C# allows multiple inheritance strictly via interfaces to eliminate diamond ambiguity.'
    },
    diagram: {
      type: 'inheritance-types',
      title: 'Inheritance Types in C#'
    },
    keyTakeaways: [
      'C# does not support multiple class inheritance.',
      'Multiple interface inheritance provides polymorphism without fragile base class conflicts.',
      'Multilevel chains should not exceed 3-4 levels to maintain clarity.'
    ],
    interviewTips: 'Explain the "Diamond Problem" if asked why C# avoids multiple class inheritance: if class D inherits from B and C, which both override a method in A, compiler cannot decide which implementation D should invoke.',
    companyTags: ['Microsoft', 'Tech Mahindra', 'Accenture'],
    difficulty: 'Medium'
  },
  {
    id: 4,
    questionNumber: 4,
    category: 'C# / OOPS',
    title: 'HOW TO PREVENT A CLASS FROM BEING INHERITED?',
    shortSummary: 'By applying the `sealed` keyword to the class declaration. Sealed classes cannot be inherited.',
    detailedPoints: [
      'Use the `sealed` keyword in the class definition.',
      'If you try to derive a class from a sealed class, the compiler generates a build error: CS0509: \'ChildClass\': cannot derive from sealed type \'ParentClass\'.',
      'Why seal a class?',
      '• Security: Prevents malicious or erroneous modification of critical framework types (like System.String).',
      '• Performance: Enables runtime devirtualization optimizations because the compiler knows no subclass can override its methods.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Sealed base class
public sealed class SecurityProvider
{
    public bool ValidateToken(string token) => true;
}

// Attempting to inherit results in compile error CS0509:
// class CustomProvider : SecurityProvider // COMPILE ERROR!
// {
// }`,
      explanation: 'System.String in the .NET BCL is sealed for security and caching invariants.'
    },
    keyTakeaways: [
      '`sealed` keyword locks down class inheritance.',
      'Methods can also be sealed if they override a virtual method: `public sealed override void Method()`.',
      'Prevents unintended polymorphism and secures design contracts.'
    ],
    interviewTips: 'Mention `System.String` and `System.Math` as well-known sealed classes in .NET Framework.',
    companyTags: ['Microsoft', 'IBM', 'CTS'],
    difficulty: 'Easy'
  },
  {
    id: 5,
    questionNumber: 5,
    category: 'C# / OOPS',
    title: 'WHAT IS ABSTRACTION?',
    shortSummary: 'Abstraction hides internal implementation complexities and presents only the essential functional interface to the consumer.',
    detailedPoints: [
      'Abstraction is the process of hiding implementation details and exposing only the essential features of an object.',
      'It focuses on what an object does, not how it does it.',
      'In C#, abstraction is implemented using Abstract Classes and Interfaces.',
      'Abstract classes can have both abstract methods (without body) and concrete methods (with body).',
      'The consumer calls methods like `obj.MakeSound()` or `obj.Eat()` without needing to know internal engine algorithms.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public abstract class Animal
{
    // Abstract method: no body, derived class MUST implement
    public abstract void MakeSound();

    // Concrete method: default implementation provided
    public void Eat() => Console.WriteLine("Eating...");
}

public class Dog : Animal
{
    public override void MakeSound() => Console.WriteLine("Bark");
}

static void Main()
{
    Animal obj = new Dog();
    obj.MakeSound(); // Output: Bark
    obj.Eat();       // Output: Eating...
}`,
      explanation: 'The client interacts with the Animal abstract contract without worrying about Dog internal mechanics.'
    },
    keyTakeaways: [
      'Focuses on external interface ("what") rather than internal execution ("how").',
      'Achieved using abstract classes (`abstract`) and interfaces (`interface`).',
      'Abstract classes cannot be directly instantiated.'
    ],
    interviewTips: 'Differentiate Abstraction (showing essential features/what) vs Encapsulation (data hiding/how to protect internal state).',
    companyTags: ['Infosys', 'TCS', 'Microsoft'],
    difficulty: 'Easy'
  },
  {
    id: 6,
    questionNumber: 6,
    category: 'C# / OOPS',
    title: 'WHAT IS ENCAPSULATION?',
    shortSummary: 'Encapsulation is bundling data and methods inside a class and restricting direct access using access modifiers and properties.',
    detailedPoints: [
      'Definition: "Encapsulation is the concept of wrapping data and methods inside a class and restricting direct access to data using access modifiers. It provides data hiding, better control, security, and maintainability. In C#, encapsulation is commonly achieved using private fields with public properties."',
      'Fields represent raw data and should be private.',
      'Public properties provide getters and setters to validate, encrypt, or control read/write access.',
      'Directly exposing fields (`public int Experience`) violates encapsulation because callers can set invalid states without validation.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public class Employee
{
    // Private field: hidden from outside
    private int empExperience;

    // Public property: controls access to private field
    public int EmpExperience
    {
        get { return empExperience; }
        set
        {
            if (value < 0)
                throw new ArgumentException("Experience cannot be negative");
            empExperience = value;
        }
    }
}

static void Main(string[] args)
{
    Employee objEmployee = new Employee();
    // objEmployee.empExperience = 3; // COMPILE ERROR: private field
    objEmployee.EmpExperience = 3;    // Validated through property
}`,
      explanation: 'Encapsulation safeguards internal variables and guarantees object invariants.'
    },
    keyTakeaways: [
      'Protects internal state from unauthorized or invalid mutations.',
      'Implemented using private backing fields and public getter/setter properties.',
      'Enables adding validation, formatting, or encryption logic later without breaking caller contracts.'
    ],
    interviewTips: 'Quote: "Encapsulation is often referred to as data hiding with public gateways."',
    companyTags: ['Accenture', 'Capgemini', 'Wipro'],
    difficulty: 'Easy'
  },
  {
    id: 7,
    questionNumber: 7,
    category: 'C# / OOPS',
    title: 'WHAT IS POLYMORPHISM AND WHAT ARE ITS TYPES?',
    shortSummary: 'Polymorphism ("many forms") allows methods to perform different logic based on the calling object or argument signature.',
    detailedPoints: [
      'Polymorphism means "many forms". It allows the same method name or object to behave differently in different contexts.',
      'In simple terms: Same method name, different implementations.',
      'C# supports two main types of Polymorphism:',
      '1. Compile-time Polymorphism (Static Binding / Early Binding):',
      '   • Achieved via Method Overloading and Operator Overloading.',
      '   • The compiler decides which method to call at compile time.',
      '2. Run-time Polymorphism (Dynamic Binding / Late Binding):',
      '   • Achieved via Method Overriding using `virtual` in base class and `override` in derived class.',
      '   • The CLR decides which method to call at runtime based on the actual object type.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// 1. Compile-Time Polymorphism (Method Overloading)
public class Calculator
{
    public int Add(int a, int b) => a + b;
    public double Add(double a, double b) => a + b;
}

// 2. Run-Time Polymorphism (Method Overriding)
public class Animal
{
    public virtual void MakeSound() => Console.WriteLine("Animal sound");
}

public class Dog : Animal
{
    public override void MakeSound() => Console.WriteLine("Dog barks");
}

static void Main()
{
    Animal pet = new Dog();
    pet.MakeSound(); // Output: "Dog barks" (evaluated at runtime via vtable)
}`,
      explanation: 'Overloading resolves at compile time; overriding resolves at runtime using the object virtual method table (vtable).'
    },
    keyTakeaways: [
      'Compile-time: Overloading, early binding, faster execution.',
      'Run-time: Overriding, late binding, requires inheritance and virtual/override keywords.',
      'Base reference can hold derived object and execute polymorphic overridden methods.'
    ],
    interviewTips: 'Interviewers love to test the difference between static and dynamic binding: static is determined by the reference type; dynamic is determined by the runtime instance type.',
    companyTags: ['Microsoft', 'Infosys', 'Tech Mahindra'],
    difficulty: 'Medium'
  },
  {
    id: 8,
    questionNumber: 8,
    category: 'C# / OOPS',
    title: 'WHAT IS METHOD OVERLOADING? IN HOW MANY WAYS A METHOD CAN BE OVERLOADED?',
    shortSummary: 'Method overloading allows multiple methods in the same class with identical names but differing parameter lists (count, types, or order).',
    detailedPoints: [
      'Method overloading is a type of polymorphism in which we create multiple methods of the same name in the same class, and all methods work in different ways.',
      'It is compile-time polymorphism because the .NET compiler / CLR knows at compilation which method to invoke based on arguments.',
      'Method overloading can be done in 3 ways:',
      '1. Number of parameters are different (e.g. `Add(int a, int b)` vs `Add(int a, int b, int c)`).',
      '2. Types of parameters are different (e.g. `Add(int a, int b)` vs `Add(double a, double b)`).',
      '3. Order of parameters are different (e.g. `Add(double a, int b)` vs `Add(int a, double b)`).',
      'Note: Changing only the RETURN TYPE does NOT overload a method in C# and results in a compile error.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public class MathService
{
    // 1. Different number of parameters
    public int Add(int a, int b) => a + b;
    public int Add(int a, int b, int c) => a + b + c;

    // 2. Different type of parameters
    public double Add(double a, double b) => a + b;

    // 3. Different order of parameters
    public double Add(double a, int b) => a + b;
    public double Add(int a, double b) => a + b;

    // INVALID: Changing return type only is NOT allowed!
    // public double Add(int a, int b) => (double)(a + b); // Error CS0111
}`,
      explanation: 'Methods must have unique signatures based on parameter types, counts, or order.'
    },
    keyTakeaways: [
      'Same method name within the same class.',
      'Differentiated by parameter count, types, or ordering.',
      'Return type alone is NOT part of method signature for overloading.'
    ],
    interviewTips: 'Remember this classic trick question: "Can we overload methods by changing return type only?" Answer is firmly NO.'
  },
  {
    id: 9,
    questionNumber: 9,
    category: 'C# / OOPS',
    title: 'WHAT IS THE DIFFERENCE BETWEEN OVERLOADING AND OVERRIDING?',
    shortSummary: 'Overloading happens within the same class with different parameters; Overriding happens in derived classes with identical signatures using virtual/override.',
    detailedPoints: [
      'Key Differences:',
      '1. Scope: Overloading occurs within the SAME class; Overriding requires INHERITANCE across base and derived classes.',
      '2. Signature: Overloading requires DIFFERENT parameters; Overriding requires the EXACT SAME signature and return type.',
      '3. Keywords: Overloading uses NO special keywords; Overriding uses `virtual` (or `abstract`) in base and `override` in derived class.',
      '4. Binding: Overloading is Compile-Time (Early Binding); Overriding is Run-Time (Late Binding).'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// OVERRIDING EXAMPLE:
public class BaseClass
{
    public virtual void Greetings()
    {
        Console.WriteLine("BaseClass Saying Hello!");
    }
}

public class SubClass : BaseClass
{
    public override void Greetings()
    {
        Console.WriteLine("SubClass Saying Hello!");
    }
}

static void Main()
{
    BaseClass obj = new SubClass();
    obj.Greetings(); // Calls SubClass Greetings due to overriding!
}`,
      explanation: 'Overriding substitutes the runtime method implementation in the vtable.'
    },
    keyTakeaways: [
      'Overloading = Same class + different parameters (Compile time).',
      'Overriding = Base and Child classes + same signature + virtual/override (Runtime).',
      'Overriding provides true dynamic polymorphism.'
    ],
    companyTags: ['Microsoft', 'TCS', 'Accenture', 'HCL'],
    difficulty: 'Medium'
  },
  {
    id: 10,
    questionNumber: 10,
    category: 'C# / OOPS',
    title: 'WHAT IS THE DIFFERENCE BETWEEN METHOD OVERRIDING AND METHOD HIDING?',
    shortSummary: 'Overriding alters the implementation at runtime using virtual/override; Hiding shadows the base implementation using the new keyword based on reference type.',
    detailedPoints: [
      'Method Overriding: Uses `virtual` in base and `override` in derived. When called via a base class reference holding a child object, the derived method executes.',
      'Method Hiding (Shadowing): Uses the `new` keyword in the derived class. The base class method is hidden, NOT replaced.',
      'When calling a hidden method through a base class reference, the BASE method executes, not the derived one!'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public class BaseClass
{
    public virtual void Print() => Console.WriteLine("BaseClass Print");
}

public class DerivedOverride : BaseClass
{
    public override void Print() => Console.WriteLine("ChildClass Overridden");
}

public class DerivedHiding : BaseClass
{
    public new void Print() => Console.WriteLine("ChildClass Hidden");
}

static void Main()
{
    BaseClass b1 = new DerivedOverride();
    b1.Print(); // Output: "ChildClass Overridden" (Dynamic dispatch)

    BaseClass b2 = new DerivedHiding();
    b2.Print(); // Output: "BaseClass Print" (Static dispatch to base!)
}`,
      explanation: 'Method hiding does not replace the vtable pointer, so base reference still targets base logic.'
    },
    keyTakeaways: [
      'Override modifies the virtual table entry for the method.',
      'Hiding (`new`) creates a brand new independent method that shadows the base method.',
      'Overriding is dynamic; hiding is static bound to reference type.'
    ],
    companyTags: ['Microsoft', 'Infosys'],
    difficulty: 'Hard'
  },
  {
    id: 12,
    questionNumber: 12,
    category: 'C# / OOPS',
    title: 'WHAT IS THE DIFFERENCE BETWEEN AN ABSTRACT CLASS AND AN INTERFACE?',
    shortSummary: 'Abstract classes can have method definitions, state, and constructors; interfaces define pure contracts and support multiple inheritance.',
    detailedPoints: [
      '1. Implementation: Abstract class contains both declaration and definition (concrete methods). Interface historically contains only declarations (C# 8 introduced default interface methods, but abstract class still holds instance state).',
      '2. Multiple Inheritance: A class can inherit only ONE abstract class, but can implement MULTIPLE interfaces.',
      '3. Constructors & Fields: Abstract classes can have constructors, destructors, and fields. Interfaces CANNOT have constructors or instance fields.',
      '4. Speed & Performance: Abstract classes are slightly faster because interfaces require indirect interface map lookups.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public abstract class Employee
{
    // Can have fields and constructors
    private string name;
    public Employee(string name) { this.name = name; }

    // Declared only
    public abstract void Project();

    // Defined method
    public void Role() => Console.WriteLine("Software Engineer");
}

public interface IEmployee
{
    // Pure contract
    void Project();
    void Manager();
}`,
      explanation: 'Use abstract classes for closely related object hierarchies sharing code; use interfaces for peripheral capabilities.'
    },
    keyTakeaways: [
      'Abstract class = IS-A relationship with shared code.',
      'Interface = CAN-DO contract supporting multiple inheritance.',
      'Interfaces cannot have instance state or constructors.'
    ],
    companyTags: ['Microsoft', 'Amazon', 'Wipro', 'TCS'],
    difficulty: 'Medium'
  },
  {
    id: 17,
    questionNumber: 17,
    category: 'C# / OOPS',
    title: 'WHAT ARE ACCESS SPECIFIERS? WHAT IS THE DEFAULT ACCESS MODIFIER IN A CLASS?',
    shortSummary: 'Access modifiers define visibility: public, private, protected, internal, protected internal, private protected. Default for class is internal; for members is private.',
    detailedPoints: [
      'Access specifiers are keywords that specify the accessibility of a class, method, property, or field.',
      'C# Access Modifiers:',
      '• public: Accessible from anywhere (within same assembly or referenced assemblies).',
      '• private: Accessible only within the same class/struct.',
      '• protected: Accessible within the containing class and derived classes.',
      '• internal: Accessible within the same assembly (project).',
      '• protected internal: Accessible within the same assembly OR from derived classes in other assemblies.',
      '• private protected: Accessible only within the containing class or derived classes in the same assembly.',
      'DEFAULT MODIFIERS in C#:',
      '• Default access modifier for a CLASS is: `internal`',
      '• Default access modifier for CLASS MEMBERS (methods, fields) is: `private`',
      '• Default for INTERFACES is: `internal` (members are public)'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// Default access modifier is 'internal'
class Program 
{
    // Default member modifier is 'private'
    int counter; 

    static void Main(string[] args)
    {
        Console.WriteLine("Hello World");
    }
}`,
      explanation: 'A top-level class without a modifier defaults to internal; members inside default to private.'
    },
    keyTakeaways: [
      'Class default = internal.',
      'Class member default = private.',
      'Protected internal is a union (same assembly OR derived class).',
      'Private protected is an intersection (same assembly AND derived class).'
    ],
    companyTags: ['TCS', 'Infosys', 'Accenture'],
    difficulty: 'Easy'
  },
  {
    id: 18,
    questionNumber: 18,
    category: 'C# / OOPS',
    title: 'WHAT IS BOXING AND UNBOXING?',
    shortSummary: 'Boxing converts a Value Type into a Reference Type (Heap allocation); Unboxing extracts the Value Type back from the object (Stack copy).',
    detailedPoints: [
      'Boxing: The implicit conversion of a value type (int, float, struct) to `object` or an interface type. An object is allocated on the managed heap and the value is copied into it.',
      'Unboxing: The explicit conversion of an `object` reference back to a value type. Checks type safety and copies value back to the stack.',
      'Performance Impact:',
      'Boxing and unboxing carry high CPU and GC overhead because heap allocations trigger Garbage Collection.',
      'Solution: Generics (like `List<int>` instead of `ArrayList`) eliminate boxing and unboxing completely.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `static void Main(string[] args)
{
    int num = 100;       // Value type on Stack

    object obj = num;    // BOXING: allocates object on Heap and copies 100

    int i = (int)obj;    // UNBOXING: explicit cast extracting 100 back to Stack
}`,
      explanation: 'Boxing creates heap pressure. Generics like List<T> eliminate boxing completely.'
    },
    diagram: {
      type: 'boxing-unboxing',
      title: 'Memory Representation of Boxing & Unboxing'
    },
    keyTakeaways: [
      'Boxing = Value type -> Reference type (Heap allocation).',
      'Unboxing = Reference type -> Value type (Explicit cast to stack).',
      'Generics prevent boxing/unboxing overhead.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Cognizant'],
    difficulty: 'Medium'
  },
  {
    id: 19,
    questionNumber: 19,
    category: 'C# / OOPS',
    title: 'WHAT IS THE DIFFERENCE BETWEEN "STRING" AND "STRINGBUILDER"? WHEN TO USE WHAT?',
    shortSummary: 'String is immutable (each modification allocates a new string in memory); StringBuilder is mutable (modifications happen in-place within an expandable buffer).',
    detailedPoints: [
      '1. Mutability: `String` is IMMUTABLE. Once created, its characters cannot be changed. Any concatenation or replacement allocates a new string in memory.',
      '2. Mutable Buffer: `StringBuilder` (in System.Text) is MUTABLE. It modifies the internal buffer in-place without creating new objects every time.',
      '3. When to use String: When you have few modifications or static strings (e.g. 1-3 operations). String literals benefit from string interning.',
      '4. When to use StringBuilder: When concatenating strings inside loops or executing multiple repetitive string manipulations (e.g. generating CSV, HTML, or large queries).'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// String (Immutable): Creates multiple memory allocations
string str = "Interview";
str = str + "Happy"; // A 2nd string object is allocated in heap

// StringBuilder (Mutable): Modifies in-place
var sb = new StringBuilder();
sb.Append("Interview");
sb.Append("Happy"); // Same buffer modified, zero unnecessary GC allocations
string finalResult = sb.ToString();`,
      explanation: 'Using string in loops produces huge GC Generation 0 churn. Use StringBuilder for heavy alterations.'
    },
    keyTakeaways: [
      'String is immutable and thread-safe.',
      'StringBuilder is mutable and optimal for intensive formatting/concatenation.',
      'String interning allows identical literal strings to share heap memory.'
    ],
    companyTags: ['TCS', 'Wipro', 'Tech Mahindra'],
    difficulty: 'Easy'
  },
  {
    id: 27,
    questionNumber: 27,
    category: 'C# / OOPS',
    title: 'WHAT IS THE DIFFERENCE BETWEEN "THROW EX" AND "THROW"?',
    shortSummary: '`throw` preserves the original stack trace up to the root exception line; `throw ex` resets the stack trace to the catch statement, losing the original error location.',
    detailedPoints: [
      'This is one of the most critical debugging questions asked in .NET interviews!',
      '• `throw`: Re-throws the active exception while preserving the COMPLETE original call stack trace. The developer sees the exact line number inside the helper method where the fault originated.',
      '• `throw ex`: Resets the exception call stack to the current catch line. The original source line where the error occurred is obliterated, making debugging in production very difficult.',
      'Rule: Always use `throw;` to rethrow exceptions, never `throw ex;`.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public static void ProcessOrder()
{
    try
    {
        int a = 10, b = 0;
        int c = a / b; // Exception at line 6
    }
    catch (Exception ex)
    {
        // BAD: throw ex;  -> Stack trace says error is at line 11!
        // GOOD:
        throw; // Preserves stack trace pointing directly to line 6!
    }
}`,
      explanation: 'throw ex wipes out the original point of failure from the call stack.'
    },
    keyTakeaways: [
      '`throw;` preserves the full call stack trace.',
      '`throw ex;` resets the stack trace to the catch block.',
      'Always adhere to `throw;` as a production best practice.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Amazon'],
    difficulty: 'Medium'
  },
  {
    id: 33,
    questionNumber: 33,
    category: 'C# / OOPS',
    title: 'WHAT IS IENUMERABLE IN C#?',
    shortSummary: 'IEnumerable is the base interface that enables forward-only iteration over a collection using foreach and supports LINQ deferred execution.',
    detailedPoints: [
      'IEnumerable is an interface in `System.Collections` (and `IEnumerable<T>` in `System.Collections.Generic`) that allows iteration over a collection using `foreach`.',
      'It contains a single method: `IEnumerator GetEnumerator()`.',
      'The generic version `IEnumerable<T>` is type-safe and commonly used in LINQ.',
      'Almost all C# collections (`List<T>`, `Array`, `Dictionary<K,V>`) implement `IEnumerable`.',
      'Provides DEFERRED / LAZY EXECUTION: Data is fetched item-by-item only when iterated through.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `var employees = new List<Employee>
{
    new Employee { Id = 1, Name = "Bill" },
    new Employee { Id = 2, Name = "Steve" }
};

// Iteration is enabled because List<T> implements IEnumerable<T>
foreach (var employee in employees)
{
    Console.WriteLine($"{employee.Id} : {employee.Name}");
}`,
      explanation: 'foreach calls GetEnumerator(), MoveNext(), and Current under the hood.'
    },
    keyTakeaways: [
      'Fundamental interface for collection traversal in .NET.',
      'Enables foreach loops and LINQ query operators.',
      'Read-only forward-only cursor.'
    ],
    companyTags: ['TCS', 'Accenture', 'Microsoft'],
    difficulty: 'Easy'
  },
  {
    id: 35,
    questionNumber: 35,
    category: 'C# / OOPS',
    title: 'WHAT IS THE DIFFERENCE BETWEEN IENUMERABLE AND IQUERYABLE IN C#? WHY USE IQUERYABLE IN SQL QUERIES?',
    shortSummary: 'IEnumerable executes filtering client-side in application memory; IQueryable translates LINQ expressions into native SQL and filters on the database server.',
    detailedPoints: [
      '1. Namespace: IEnumerable is in `System.Collections`, while IQueryable is in `System.Linq`.',
      '2. Query Execution:',
      '   • IEnumerable: Brings all records from the database into client memory and then applies filters locally. Heavy network overhead and slow for large datasets.',
      '   • IQueryable: Translates the LINQ expression tree directly into a SQL query (with WHERE, ORDER BY, TOP clauses) and executes on the database server. Only filtered rows are transmitted across the wire.',
      '3. Paging & Performance: Use IQueryable for remote databases (Entity Framework, Linq to SQL). Use IEnumerable for in-memory collections.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// IEnumerable: Fetches ALL records to memory first!
// SQL: SELECT * FROM Employees
IEnumerable<Employee> list = db.Employees.Where(e => e.Salary > 50000);

// IQueryable: Server-side database filter
// SQL: SELECT * FROM Employees WHERE Salary > 50000
IQueryable<Employee> query = db.Employees.Where(e => e.Salary > 50000);`,
      explanation: 'IQueryable compiles expression trees into server SQL; IEnumerable filters in local RAM.'
    },
    keyTakeaways: [
      'IEnumerable = In-memory filtering (client side).',
      'IQueryable = Out-of-memory SQL filtering (database server side).',
      'Always use IQueryable for database queries to prevent memory leaks and network congestion.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Accenture', 'HCL'],
    difficulty: 'Hard'
  },
  {
    id: 52,
    questionNumber: 52,
    category: '.NET Framework',
    title: 'WHAT ARE THE IMPORTANT COMPONENTS OF .NET FRAMEWORK? WHAT ARE THEIR ROLES?',
    shortSummary: 'The main components of the .NET Framework are CLR, CTS, CLS, and FCL/BCL.',
    detailedPoints: [
      'The .NET architecture consists of several core layers:',
      '1. CLR (Common Language Runtime): The execution engine that handles memory management (Garbage Collection), thread management, security verification, and JIT (Just-In-Time) compilation of MSIL into native machine code.',
      '2. CTS (Common Type System): A set of rules defining how data types must be declared, defined, and used across all .NET languages (e.g. C#, VB.NET, F#). Guarantees cross-language interoperability.',
      '3. CLS (Common Language Specification): A subset of CTS that defines rules that all languages must adhere to in order to ensure libraries written in one language can be consumed by another.',
      '4. FCL / BCL (Framework / Base Class Library): Comprehensive collection of reusable classes, namespaces, and value types (e.g. System.String, System.IO, System.Threading, System.Collections).'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// .NET Source Code (C#)
//        ↓ [C# Compiler]
// Managed Assembly (MSIL - Microsoft Intermediate Language + Metadata)
//        ↓ [CLR JIT Compiler]
// Native Machine Code (x86 / x64 CPU Instructions)`,
      explanation: 'The CLR acts as the virtual machine translating intermediate bytecode into native execution.'
    },
    keyTakeaways: [
      'CLR is the execution engine providing GC, JIT, and thread management.',
      'CTS ensures cross-language type compatibility.',
      'CLS ensures cross-language component interaction.',
      'FCL provides standard built-in libraries.'
    ],
    companyTags: ['TCS', 'Wipro', 'Infosys', 'IBM'],
    difficulty: 'Medium'
  },
  {
    id: 55,
    questionNumber: 55,
    category: '.NET Framework',
    title: 'WHAT IS GARBAGE COLLECTION (GC) AND HOW DOES IT WORK?',
    shortSummary: 'GC is an automatic memory manager that tracks object references on the managed heap and deallocates unused memory.',
    detailedPoints: [
      'The Garbage Collector (GC) manages the allocation and release of memory on the managed heap.',
      'When an application creates objects using `new`, memory is allocated on the managed heap.',
      'When memory pressure rises or a threshold is reached, GC runs automatically in the background:',
      '1. Mark phase: Identifies all reachable/live objects starting from application roots (stack variables, static references, CPU registers).',
      '2. Sweep / Compact phase: Destroys unreferenced objects and compacts remaining live objects to eliminate memory fragmentation.',
      'Can we force GC? Yes, via `GC.Collect()`, but this is strongly discouraged in production because GC is self-optimizing.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `static void Main(string[] args)
{
    Employee obj1 = new Employee();
    Manager obj2 = new Manager();
    
    // Once methods exit and references go out of scope, 
    // obj1 and obj2 become eligible for Garbage Collection.
    // GC cleans them automatically without manual free() or delete!
}`,
      explanation: 'GC eliminates manual memory management bugs such as memory leaks and dangling pointers.'
    },
    diagram: {
      type: 'gc-generations',
      title: 'Garbage Collection Generations & Managed Heap'
    },
    keyTakeaways: [
      'Automatic memory management for managed resources.',
      'Operates on the Managed Heap using generational algorithms.',
      'Calling `GC.Collect()` manually is typically an anti-pattern.'
    ],
    companyTags: ['Microsoft', 'Amazon', 'Accenture'],
    difficulty: 'Medium'
  },
  {
    id: 56,
    questionNumber: 56,
    category: '.NET Framework',
    title: 'WHAT ARE GENERATIONS IN GARBAGE COLLECTION?',
    shortSummary: 'GC splits the heap into Generation 0 (short-lived), Generation 1 (buffer), and Generation 2 (long-lived) to optimize collection speed.',
    detailedPoints: [
      'Generations are a performance optimization mechanism based on empirical software behavior: newly created objects usually have short lifetimes.',
      '• Generation 0: Holds newly allocated short-lived objects (e.g. temporary variables inside functions). Collected most frequently and very quickly.',
      '• Generation 1: Acts as a buffer between short-lived and long-lived objects. Objects surviving Gen 0 are promoted to Gen 1.',
      '• Generation 2: Holds long-lived objects (e.g. static data, application-wide caches, singleton instances). Collected least frequently during full GC cycles.',
      '• Large Object Heap (LOH): Objects 85,000+ bytes go directly to LOH and are treated as Gen 2.'
    ],
    diagram: {
      type: 'gc-generations',
      title: 'Object Promotion Across Gen 0 -> Gen 1 -> Gen 2'
    },
    keyTakeaways: [
      'Gen 0 = Shortest lived, collected most frequently.',
      'Gen 1 = Intermediate buffer generation.',
      'Gen 2 = Long lived objects, full GC collection.',
      'Objects >= 85KB bypass Gen 0 and go straight to the Large Object Heap (LOH).'
    ],
    companyTags: ['Microsoft', 'CTS', 'Infosys'],
    difficulty: 'Hard'
  },
  {
    id: 57,
    questionNumber: 57,
    category: '.NET Framework',
    title: 'WHAT IS THE DIFFERENCE BETWEEN "DISPOSE" AND "FINALIZE"?',
    shortSummary: 'Dispose is deterministically called by user code to release unmanaged resources; Finalize is non-deterministically invoked by GC before object reclamation.',
    detailedPoints: [
      '1. Invocation: `Dispose()` is invoked manually or via `using` statements by developer code; `Finalize()` is called by the Garbage Collector.',
      '2. Timing: Dispose is deterministic (runs immediately); Finalize is non-deterministic (runs whenever GC decides).',
      '3. Interface: Dispose is part of `IDisposable`; Finalize is defined as a destructor syntax `~ClassName()` overriding `Object.Finalize`.',
      '4. Performance Cost: Dispose has ZERO GC penalty; Finalize forces the object into the finalization queue, delaying reclamation across multiple GC cycles.',
      '5. Best Practice: Implement standard Dispose pattern and call `GC.SuppressFinalize(this)` inside `Dispose()`.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `public class DemoResource : IDisposable
{
    private bool disposed = false;

    // Deterministic release called by developer or 'using' statement
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this); // Tells GC not to call finalizer!
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!disposed)
        {
            if (disposing) {
                // Free managed resources
            }
            // Free unmanaged resources (handles, file pointers)
            disposed = true;
        }
    }

    // Finalizer (safety net only)
    ~DemoResource()
    {
        Dispose(false);
    }
}`,
      explanation: 'The standard dispose pattern releases resources immediately and prevents finalizer overhead.'
    },
    keyTakeaways: [
      'Dispose = Manual / deterministic (IDisposable).',
      'Finalize = Automatic / non-deterministic (GC destructor).',
      'Always call `GC.SuppressFinalize(this)` when Dispose runs.'
    ],
    companyTags: ['Microsoft', 'Accenture', 'TCS'],
    difficulty: 'Hard'
  },
  {
    id: 62,
    questionNumber: 62,
    category: '.NET Framework',
    title: 'WHAT IS THE DIFFERENCE BETWEEN THREADS AND TASKS?',
    shortSummary: 'A Thread is a low-level OS execution unit; a Task is a higher-level abstraction on the ThreadPool with async/await and return value support.',
    detailedPoints: [
      '• Thread: Low-level operating system construct with high overhead (~1MB stack per thread). Difficult to manage, cancel, or get return values from.',
      '• Task: Higher-level abstraction from the Task Parallel Library (TPL) running on background ThreadPool threads.',
      'Key Advantages of Tasks over Threads:',
      '1. Return Values: Tasks support return values via `Task<TResult>` (Threads have no native return mechanism).',
      '2. Chaining: Tasks can easily be chained with `.ContinueWith()` or `await`.',
      '3. Exception Handling: Tasks aggregate exceptions cleanly via `AggregateException`.',
      '4. Resource Efficiency: Tasks reuse ThreadPool threads instead of spinning up costly OS threads.'
    ],
    codeSnippet: {
      language: 'csharp',
      code: `// 1. Heavyweight Thread (manual lifecycle)
Thread thread = new Thread(() => Console.WriteLine("Thread running"));
thread.Start();

// 2. Modern Task (ThreadPool backed with return value)
Task<int> task = Task.Run(() => {
    Thread.Sleep(500);
    return 42;
});

// Awaiting task result asynchronously
int result = await task;
Console.WriteLine($"Result: {result}");`,
      explanation: 'Tasks run on the managed thread pool and integrate smoothly with async/await.'
    },
    keyTakeaways: [
      'Task is a wrapper around ThreadPool threads.',
      'Tasks support async/await, cancellation tokens, and return values.',
      'Prefer Task over Thread for modern concurrent applications.'
    ],
    companyTags: ['Microsoft', 'Infosys', 'Cognizant'],
    difficulty: 'Medium'
  }
];
